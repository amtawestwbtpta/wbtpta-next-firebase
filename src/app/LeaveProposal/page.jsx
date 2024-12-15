"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  getCurrentDateInput,
  getSubmitDateInput,
  todayInString,
} from "../../modules/calculatefunctions";
import LeaveProposal from "../../components/LeaveProposal";
import dynamic from "next/dynamic";
export default function Page() {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Please Wait...</p>,
    }
  );
  const router = useRouter();
  const { state, stateObject } = useGlobalContext();
  const { tname, desig, school, doj, phone, hoi, gender } = stateObject;
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [leaveNature, setLeaveNature] = useState("");
  const [startingDate, setStartingDate] = useState(todayInString());
  const [endingDate, setEndingDate] = useState(todayInString());
  const [leaveDays, setLeaveDays] = useState(0);
  const [childBirthDate, setChildBirthDate] = useState(todayInString());
  const [village, setVillage] = useState("");
  const [po, setPo] = useState("");
  const calculateDays = () => {
    const start = new Date(getCurrentDateInput(startingDate));
    const end = new Date(getCurrentDateInput(endingDate));
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setLeaveDays(diffDays);
    return diffDays;
  };
  useEffect(() => {
    if (state !== "admin") {
      router.push("/");
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
  }, [startingDate, endingDate, leaveDays]);
  return (
    <div className="container">
      {loader && <Loader />}
      <button
        type="button"
        className="btn btn-dark m-2"
        onClick={() => router.push("/teacherdatabase")}
      >
        Go Back
      </button>
      <button
        type="button"
        className="btn btn-primary m-2"
        onClick={() => {
          setShowModal(true);
          setShowDownloadBtn(false);
        }}
      >
        Enter Details
      </button>
      {showModal && (
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
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Enter Required Details
                </h1>
              </div>
              <div className="modal-body">
                <div className="mx-auto col-md-6">
                  <div className="mb-3">
                    <label htmlFor="purpose_type" className="form-label">
                      Nature of Leave
                    </label>
                    <select
                      className="form-select"
                      id="purpose_type"
                      defaultValue={leaveNature}
                      onChange={(e) => {
                        if (e.target.value !== "") {
                          setLeaveNature(e.target.value);
                        } else {
                          setLeaveNature("");
                          toast.error("Select Nature of Leave");
                        }
                      }}
                    >
                      <option value="">Select nature of Leave</option>
                      <option value="HPL">HPL</option>
                      <option value="COMMUTED">COMMUTED</option>
                      <option value="MATERNITY">MATERNITY</option>
                      <option value="MEDICAL">MEDICAL</option>
                      <option value="LWP">LWP</option>
                      <option value="CCL">CCL</option>
                      <option value="PATERNITY">PATERNITY</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Starting Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      defaultValue={getCurrentDateInput(startingDate)}
                      onChange={(e) => {
                        setStartingDate(getSubmitDateInput(e.target.value));
                        // calculateDays();
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Ending Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      defaultValue={getCurrentDateInput(endingDate)}
                      onChange={(e) => {
                        setEndingDate(getSubmitDateInput(e.target.value));
                        calculateDays();
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Total Leave Days
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="date"
                      placeholder="Total Leave Days"
                      value={leaveDays}
                      onChange={(e) => {
                        if (e.target.value !== "") {
                          setLeaveDays(parseInt(e.target.value));
                        } else {
                          setLeaveDays("");
                        }
                      }}
                    />
                  </div>
                  {leaveNature === "MATERNITY" && (
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        Child Birth Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        defaultValue={getCurrentDateInput(childBirthDate)}
                        onChange={(e) => {
                          setChildBirthDate(getSubmitDateInput(e.target.value));
                        }}
                      />
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">School Village</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="School Village"
                      id="date"
                      value={village}
                      onChange={(e) => {
                        setVillage(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">School Post Office</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="School Post Office"
                      id="date"
                      value={po}
                      onChange={(e) => {
                        setPo(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success m-2"
                  type="button"
                  onClick={() => {
                    if (leaveNature !== "") {
                      setShowModal(false);
                      setShowDownloadBtn(true);
                    } else {
                      toast.error("Select Nature of Leave");
                    }
                  }}
                >
                  Save
                </button>
                <button
                  className="btn btn-dark m-2"
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDownloadBtn && (
        <div className="my-3">
          <PDFDownloadLink
            document={
              <LeaveProposal
                data={{
                  tname,
                  school,
                  desig,
                  doj,
                  leaveNature,
                  leaveDays,
                  startingDate,
                  endingDate,
                  childBirthDate,
                  phone,
                  village,
                  po,
                  hoi,
                  gender,
                }}
              />
            }
            fileName={`Leave Proposal Format of ${tname} of ${school}.pdf`}
            style={{
              textDecoration: "none",
              padding: "10px",
              color: "#fff",
              backgroundColor: "navy",
              border: "1px solid #4a4a4a",
              width: "40%",
              borderRadius: 10,
            }}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Please Wait..." : "Download Leave Proposal Format"
            }
          </PDFDownloadLink>
        </div>
      )}

      {/* {showDownloadBtn && (
        <div className="mt-3">
          <LeaveProposal
            data={{
              tname,
              school,
              desig,
              doj,
              leaveNature,
              leaveDays,
              startingDate,
              endingDate,
              childBirthDate,
              phone,
              village,
              po,
              hoi,
              gender,
            }}
          />
        </div>
      )} */}
    </div>
  );
}
