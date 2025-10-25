import { NextResponse } from "next/server";
const githubUsername = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;
export async function POST(req) {
  try {
    const { fileName, repoName } = await req.json();
    const tag = "v1";

    // Get release by tag
    const releaseRes = await fetch(
      `https://api.github.com/repos/${githubUsername}/${repoName}/releases/tags/${tag}`,
      { headers: { Authorization: `token ${token}` } }
    );

    if (!releaseRes.ok) {
      return NextResponse.json({ error: "Release not found" }, { status: 404 });
    }

    const release = await releaseRes.json();

    // Get assets
    const assetsRes = await fetch(release.assets_url, {
      headers: { Authorization: `token ${token}` },
    });
    const assets = await assetsRes.json();

    const asset = assets.find((a) => a.name === fileName);
    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Delete asset
    const delRes = await fetch(
      `https://api.github.com/repos/${githubUsername}/${repoName}/releases/assets/${asset.id}`,
      {
        method: "DELETE",
        headers: { Authorization: `token ${token}` },
      }
    );

    if (!delRes.ok) {
      const errText = await delRes.text();
      return NextResponse.json({ error: errText }, { status: delRes.status });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Delete error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
