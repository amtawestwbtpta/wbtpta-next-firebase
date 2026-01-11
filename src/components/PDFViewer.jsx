"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Loader from "./Loader";

// Ensure we only run this on the client-side
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

const PDFViewer = ({ pdfUrl, url = "" }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileSource, setFileSource] = useState(pdfUrl);
  const containerRef = useRef(null);
  const [key, setKey] = useState(0);

  // Memoize options using the same version dynamically
  const pdfOptions = useMemo(() => {
    const pdfjsVersion = pdfjs.version;
    return {
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/cmaps/`,
      cMapPacked: true,
    };
  }, []);

  // Reset state when pdfUrl changes
  useEffect(() => {
    setFileSource(pdfUrl);
    setNumPages(null);
    setPageNumber(1);
    setLoading(true);
    setError(null);
    setKey((prev) => prev + 1);
  }, [pdfUrl]);
  // Handle container resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF loading error:", error);
    if (fileSource === pdfUrl && url && url !== pdfUrl) {
      setFileSource(url);
      setLoading(true);
      setError(null);
      setKey((prev) => prev + 1);
    } else {
      setError(error.message || "Failed to load PDF");
      setLoading(false);
    }
  };

  const changePage = (offset) => {
    setPageNumber((prevPage) =>
      Math.max(1, Math.min(numPages, prevPage + offset))
    );
  };
  // Add this function to handle PDF reload
  const reloadPDF = () => {
    setKey((prev) => prev + 1);
    setLoading(true);
    setError(null);
    setNumPages(null);
    setPageNumber(1);
  };

  if (!pdfUrl) {
    return <Loader />;
  }

  return (
    <div className="pdf-viewer-container">
      {/* Download button */}
      <div className="pdf-download-container">
        <a
          href={fileSource}
          download
          className="pdf-download-button"
          aria-label="Download PDF"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download PDF
        </a>
      </div>

      {/* PDF display */}
      <div ref={containerRef} className="pdf-display-container">
        {loading && <Loader />}
        {error && <div className="pdf-error">Error: {error}</div>}

        {error ? (
          <div className="pdf-error">
            <p>Error: {error}</p>
            <button onClick={reloadPDF} className="retry-button">
              Retry Loading PDF
            </button>
          </div>
        ) : (
          <>
            <Document
              key={key}
              file={fileSource}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<Loader />}
              options={pdfOptions} // Use memoized options
            >
              <Page
                pageNumber={pageNumber}
                width={containerWidth}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </Document>

            {/* Navigation controls */}
            <div className="pdf-navigation">
              <button
                onClick={() => changePage(-1)}
                disabled={pageNumber <= 1}
                aria-label="Previous page"
              >
                ‹
              </button>

              <span>
                Page {pageNumber} of {numPages || "--"}
              </span>

              <button
                onClick={() => changePage(1)}
                disabled={pageNumber >= (numPages || 0)}
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
