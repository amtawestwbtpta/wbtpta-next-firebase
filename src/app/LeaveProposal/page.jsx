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
export default function Page() {
  const router = useRouter();
  const { state, stateObject } = useGlobalContext();
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveNature, setLeaveNature] = useState("");
  const [startingDate, setStartingDate] = useState(todayInString());
  const [endingDate, setEndingDate] = useState(todayInString());
  const [leaveDays, setLeaveDays] = useState(0);
  const [childBirthDate, setChildBirthDate] = useState(todayInString());
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
  return (
    <div className="container">
      {loader && <Loader />}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
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
                    <label className="m-2">Reason of Leave</label>
                    <input
                      type="text"
                      className="form-control"
                      value={leaveReason}
                      onChange={(e) => setLeaveReason(e.target.value)}
                      placeholder="ENTER Reason of Leave"
                    />
                  </div>
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
                        calculateDays();
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
                      type="text"
                      readOnly
                      className="form-control"
                      id="date"
                      value={leaveDays}
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
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success m-2"
                  type="button"
                  onClick={() => {
                    setShowModal(false);
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
    </div>
  );
}
