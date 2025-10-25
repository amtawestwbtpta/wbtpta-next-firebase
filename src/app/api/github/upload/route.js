import { NextResponse } from "next/server";
const githubUsername = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;
export async function POST(req) {
  try {
    const { fileName, fileContentBase64, repoName } = await req.json();
    const tag = "v1";

    // 1️⃣ Get or create release
    let release;
    const releaseTagUrl = `https://api.github.com/repos/${githubUsername}/${repoName}/releases/tags/${tag}`;
    const releasesUrl = `https://api.github.com/repos/${githubUsername}/${repoName}/releases`;

    let releaseRes = await fetch(releaseTagUrl, {
      headers: { Authorization: `token ${token}` },
    });

    if (releaseRes.ok) {
      release = await releaseRes.json();
    } else {
      const createRes = await fetch(releasesUrl, {
        method: "POST",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tag_name: tag,
          name: tag,
          body: "Auto-created release via Next.js API",
        }),
      });
      if (!createRes.ok) {
        const err = await createRes.text();
        return NextResponse.json(
          { error: `Failed to create release: ${err}` },
          { status: 500 }
        );
      }
      release = await createRes.json();
    }

    const releaseId = release.id;
    const uploadUrl = release.upload_url.split("{")[0];

    // 2️⃣ Check and delete existing asset with same name
    const assetsRes = await fetch(
      `https://api.github.com/repos/${githubUsername}/${repoName}/releases/${releaseId}/assets`,
      {
        headers: { Authorization: `token ${token}` },
      }
    );
    const assets = await assetsRes.json();
    const existing = assets.find((a) => a.name === fileName);
    if (existing) {
      await fetch(
        `https://api.github.com/repos/${githubUsername}/${repoName}/releases/assets/${existing.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `token ${token}` },
        }
      );
    }

    // 3️⃣ Upload new file (binary body)
    const uploadRes = await fetch(
      `${uploadUrl}?name=${encodeURIComponent(fileName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/octet-stream",
        },
        body: Buffer.from(fileContentBase64, "base64"),
      }
    );

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      return NextResponse.json(
        { error: `Upload failed: ${err}` },
        { status: 500 }
      );
    }

    const data = await uploadRes.json();
    return NextResponse.json({ download_url: data.browser_download_url });
  } catch (err) {
    console.error("❌ Upload error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
