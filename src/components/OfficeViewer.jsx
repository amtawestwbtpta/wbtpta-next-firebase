"use client";
import { useState } from "react";

export default function FileViewer({ fileUrl }) {
  const [error, setError] = useState(false);

  const ext = fileUrl.split(".").pop().toLowerCase();

  const isOffice = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(ext);

  const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    fileUrl
  )}`;

  // For PDF/Image/Video browsers handle automatically
  const normalUrl = fileUrl;

  return (
    <>
      {!error ? (
        <iframe
          src={isOffice ? officeViewerUrl : normalUrl}
          onError={() => setError(true)}
          style={{
            width: "100%",
            height: "100vh",
            border: "none",
          }}
        />
      ) : (
        <div style={{ padding: 20 }}>
          ❌ Unable to load file.
          <br />
          Possible causes: File is not public, CORS blocked, or URL wrong.
        </div>
      )}
    </>
  );
}
