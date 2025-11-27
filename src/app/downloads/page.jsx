"use client";
import React, { useEffect, useState } from "react";
import { firestore } from "../../context/FirebaseContext";
import { collection, getDocs, query } from "firebase/firestore";
import Loader from "../../components/Loader";
import { createDownloadLink } from "../../modules/calculatefunctions";
import { useGlobalContext } from "../../context/Store";
import { AndroidAppLink } from "@/modules/constants";
import GoogleDriveDownload from "../../components/GoogleDriveDownload";
import dynamic from "next/dynamic";
const Downloads = () => {
  const PDFViewer = dynamic(() => import("../../components/PDFViewer"), {
    ssr: false,
    loading: () => <div>Loading PDF viewer...</div>,
  });
  const [data, setData] = useState(false);
  const { state } = useGlobalContext();
  const [allData, setAllData] = useState([]);
  const [showFile, setShowFile] = useState(false);
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [isRelease, setIsRelease] = useState(false);

  const getData = async () => {
    const q = query(collection(firestore, "downloads"));

    const querySnapshot = await getDocs(q);
    const datas = querySnapshot.docs
      .map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }))
      .sort((a, b) => b.date - a.date);
    setData(true);
    setAllData(datas);
  };
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Downloads";
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container-fluid my-5">
      <h3 className="text-primary text-center">Downloads</h3>
      {state === "admin" && (
        <button
          type="button"
          className="btn btn-sm m-3 btn-warning"
          onClick={() => {
            createDownloadLink(allData, "downloads");
          }}
        >
          Download Data
        </button>
      )}
      {data ? (
        <div className="container-fluid overflow-auto d-flex">
          <table className="table table-responsive table-hover table-striped table-success rounded-2 container-fluid px-lg-3 py-lg-2 ">
            <thead>
              <tr>
                <th>Sl</th>
                <th>File Name</th>
                <th>Format</th>
                <th>View</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Our Android App</td>
                <td>APK</td>
                <td></td>
                <td>
                  <GoogleDriveDownload
                    fileId={AndroidAppLink}
                    text="Download"
                    className="btn btn-success rounded text-decoration-none"
                  />
                </td>
              </tr>
              {allData.map((el, ind) => {
                return (
                  <tr key={ind}>
                    <td>{ind + 2}</td>
                    <td>{el.fileName.toUpperCase()}</td>
                    <td>
                      {el.fileType === "application/pdf"
                        ? "PDF"
                        : el.fileType === "application/msword"
                        ? "WORD"
                        : el.fileType ===
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ? "WORD"
                        : el.fileType ===
                          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                        ? "POWERPOINT"
                        : el.fileType === "application/vnd.ms-excel"
                        ? "EXCEL"
                        : el.fileType ===
                          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        ? "EXCEL"
                        : el.fileType ===
                          "application/vnd.ms-excel.sheet.macroEnabled.12"
                        ? "EXCEL"
                        : el.fileType === "application/vnd.ms-powerpoint"
                        ? "EXCEL"
                        : el.fileType === "application/zip"
                        ? "ZIP"
                        : el.fileType === "application/vnd.rar"
                        ? "RAR"
                        : el.fileType === "text/csv"
                        ? "CSV"
                        : el.fileType ===
                          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                        ? "POWERPOINT"
                        : ""}
                    </td>
                    <td>
                      {(el.fileType === "application/pdf" ||
                        el.fileType === "image/jpeg" ||
                        el.fileType === "image/png") && (
                        <button
                          type="button"
                          className="btn btn-primary rounded text-decoration-none"
                          onClick={() => {
                            setShowFile(true);
                            setUrl(el.githubUrl || el.url);
                            setFileName(el.fileName);
                            setFileType(el.fileType);
                            setIsRelease(el.isRealease);
                          }}
                        >
                          View
                        </button>
                      )}
                    </td>
                    <td>
                      <a
                        href={el.githubUrl}
                        className="btn btn-success rounded text-decoration-none"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}
      {showFile && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
          aria-modal="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="addNoticeLabel">
                  {fileName}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setShowFile(false);
                    setUrl("");
                    setFileName("");
                    setFileType("");
                  }}
                ></button>
              </div>
              <div className="modal-body modal-xl">
                {fileType === "application/pdf" ? (
                  !isRelease ? (
                    <PDFViewer pdfUrl={url} />
                  ) : (
                    <a
                      href={url}
                      className="btn btn-success rounded text-decoration-none"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  )
                ) : (
                  <img src={url} className="rounded-2 w-100 my-3" alt="..." />
                )}
              </div>
              <div className="modal-footer d-flex flex-column">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowFile(false);
                    setUrl("");
                    setFileName("");
                    setFileType("");
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Downloads;
