"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  getCurrentDateInput,
  getSubmitDateInput,
  titleCase,
  todayInString,
} from "../../modules/calculatefunctions";
import LeaveProposalNew from "../../pdfs/LeaveProposalNew";
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
  const { tname, desig, school, doj, phone, hoi, gender, id } = stateObject;
  const [showModal, setShowModal] = useState(true);
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [leaveNature, setLeaveNature] = useState("");
  const [startingDate, setStartingDate] = useState(todayInString());
  const [endingDate, setEndingDate] = useState(todayInString());
  const [leaveDays, setLeaveDays] = useState(0);
  const [childBirthDate, setChildBirthDate] = useState(todayInString());
  const [village, setVillage] = useState("");
  const [po, setPo] = useState("");
  const [serviceAge, setServiceAge] = useState("");
  const [earnedLeave, setEarnedLeave] = useState("");
  const [balanceLeave, setBalanceLeave] = useState("");
  const [showEditLeave, setShowEditLeave] = useState(false);
  const [showEditLines, setShowEditLines] = useState(false);
  const calculateDays = () => {
    const start = new Date(getCurrentDateInput(startingDate));
    const end = new Date(getCurrentDateInput(endingDate));
    const endingYear = new Date(getCurrentDateInput(endingDate)).getFullYear();
    const joiningYear = new Date(getCurrentDateInput(doj)).getFullYear();
    const sAge = endingYear - joiningYear;
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setLeaveDays(diffDays);
    setServiceAge(sAge);
    setEarnedLeave(sAge * 30);
    setBalanceLeave(sAge * 30 - diffDays);
    return diffDays;
  };

  const [lineOne, setLineOne] = useState({
    c1: "",
    c2: "",
    c3: "",
    c4: "",
    c5: "",
    c6: "",
    c7: "",
    c8: "",
    c9: "",
  });
  const [lineTwo, setLineTwo] = useState({
    c1: "",
    c2: "",
    c3: "",
    c4: "",
    c5: "",
    c6: "",
    c7: "",
    c8: "",
    c9: "",
  });
  const [lineThree, setLineThree] = useState({
    c1: "",
    c2: "",
    c3: "",
    c4: "",
    c5: "",
    c6: "",
    c7: "",
    c8: "",
    c9: "",
  });
  const [lineFour, setLineFour] = useState({
    c1: "",
    c2: "",
    c3: "",
    c4: "",
    c5: "",
    c6: "",
    c7: "",
    c8: "",
    c9: "",
  });
  const [lineFive, setLineFive] = useState({
    c1: "",
    c2: "",
    c3: "",
    c4: "",
    c5: "",
    c6: "",
    c7: "",
    c8: "",
    c9: "",
  });
  const [lineSix, setLineSix] = useState({
    c1: "",
    c2: "",
    c3: "",
    c4: "",
    c5: "",
    c6: "",
    c7: "",
    c8: "",
    c9: "",
  });
  const fillLines = () => {
    setLineThree({
      c1:
        leaveNature === "HPL" ||
        leaveNature === "COMMUTED" ||
        leaveNature === "MEDICAL" ||
        leaveNature === "LWP"
          ? `${doj}\nTo\n${endingDate}`
          : endingDate.split("-")[2],
      c2:
        leaveNature === "MATERNITY"
          ? leaveDays
          : leaveNature === "CCL"
          ? 730
          : leaveNature === "PATERNITY"
          ? 30
          : `${serviceAge} x 30\n=${earnedLeave}`,
      c3: startingDate,
      c4: endingDate,
      c5: leaveDays,
      c6:
        leaveNature === "COMMUTED" ||
        leaveNature === "MEDICAL" ||
        leaveNature === "HPL"
          ? leaveDays * 2
          : "N/A",
      c7: leaveDays,
      c8:
        leaveNature == "MATERNITY"
          ? "NIL"
          : leaveNature == "PATERNITY"
          ? `(30 - ${leaveDays})\n=${30 - leaveDays}`
          : leaveNature === "CCL"
          ? 730 - leaveDays
          : `(${serviceAge * 30} - ${
              serviceAge * 30 - balanceLeave
            })\n= ${balanceLeave}`,
      c9: "NIL",
    });
  };
  useEffect(() => {
    if (state !== "admin") {
      router.push("/");
    }

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
  }, [startingDate, endingDate, leaveDays, leaveNature]);
  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center mx-auto"
        style={{ width: "50%" }}
      >
        <button
          type="button"
          className="btn btn-dark m-5"
          onClick={() => router.push("/teacherdatabase")}
        >
          Go Back
        </button>
        <button
          type="button"
          className="btn btn-primary m-5"
          onClick={() => {
            setShowModal(true);
            setShowDownloadBtn(false);
          }}
        >
          Enter Details
        </button>
      </div>
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
                  Enter Leave Details of {titleCase(tname)}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setShowModal(false);
                    setShowDownloadBtn(false);
                    setShowEditLeave(false);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="currentLeave">
                  <h5 className="m-0 p-0">Details of Current Leave</h5>
                  <div className="mx-auto col-md-6 my-2">
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
                        }}
                      />
                    </div>
                    <button
                      className="btn btn-success m-3"
                      onClick={() => {
                        calculateDays();
                        // accumulateEvents();
                      }}
                    >
                      Calculate Days
                    </button>
                    {leaveDays > 0 && (
                      <label htmlFor="date" className="form-label">
                        Total Leave Days : {leaveDays}
                      </label>
                    )}
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
                            setChildBirthDate(
                              getSubmitDateInput(e.target.value)
                            );
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
              </div>
              <div className="modal-footer d-flex flex-column">
                <div>
                  <button
                    className="btn btn-primary m-2"
                    type="button"
                    disabled={
                      leaveNature === "" ||
                      // village === "" ||
                      // po === "" ||
                      leaveDays === 0
                    }
                    onClick={() => {
                      if (leaveNature !== "") {
                        setShowModal(false);
                        setShowDownloadBtn(true);
                        fillLines();
                      } else {
                        toast.error("Select Nature of Leave");
                      }
                    }}
                  >
                    Save
                  </button>

                  <button
                    className="btn btn-warning m-2"
                    type="button"
                    disabled={
                      leaveNature === "" ||
                      // village === "" ||
                      // po === "" ||
                      leaveDays === 0
                    }
                    onClick={() => {
                      fillLines();
                      setShowEditLines(true);
                      setShowModal(false);
                    }}
                  >
                    {showEditLeave ? "Hide Edit" : "Edit Leave"}
                  </button>
                  <button
                    className="btn btn-danger m-2"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setShowDownloadBtn(false);
                      setShowEditLines(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditLines && (
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
                  Enter Leave Line Details of {titleCase(tname)}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setShowEditLines(false);
                    setShowModal(true);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mx-auto col-md-6 my-2">
                  <div className="details">
                    <h6>Date of Joining: {doj}</h6>
                    <h6>School: {school}</h6>
                    <h6>Designation: {desig}</h6>
                  </div>
                  <div className="editLeave">
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
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        Total Leaves Earned
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="date"
                        placeholder="Total Leaves Earned"
                        value={earnedLeave}
                        onChange={(e) => {
                          if (e.target.value !== "") {
                            setEarnedLeave(parseInt(e.target.value));
                          } else {
                            setEarnedLeave("");
                          }
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        Balance of Leave
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="date"
                        placeholder="Balance of Leave"
                        value={balanceLeave}
                        onChange={(e) => {
                          if (e.target.value !== "") {
                            setBalanceLeave(parseInt(e.target.value));
                          } else {
                            setBalanceLeave("");
                          }
                        }}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="lineOne">
                    <h6>Line One</h6>
                    <div className="mb-3">
                      <label className="form-label">Year</label>
                      <textarea
                        className="form-control"
                        placeholder="Year"
                        rows={3}
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                        value={lineOne.c1}
                        onChange={(e) => {
                          setLineOne({
                            ...lineOne,
                            c1: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Leave earned & nature of Leave
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Leave earned & nature of Leave"
                        rows={3}
                        value={lineOne.c2}
                        onChange={(e) => {
                          setLineOne({
                            ...lineOne,
                            c2: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Leave from</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Leave from"
                        value={lineOne.c3}
                        onChange={(e) => {
                          setLineOne({
                            ...lineOne,
                            c3: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Leave To</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Leave To"
                        value={lineOne.c4}
                        onChange={(e) => {
                          setLineOne({
                            ...lineOne,
                            c4: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">No. of Days</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="No. of Days"
                        value={lineOne.c5}
                        onChange={(e) => {
                          setLineOne({
                            ...lineOne,
                            c5: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">HPL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="HPL"
                        value={lineOne.c6}
                        onChange={(e) => {
                          setLineOne({
                            ...lineOne,
                            c6: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nature of Leave</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nature of Leave"
                        value={lineOne.c7}
                        onChange={(e) => {
                          setLineOne({
                            ...lineOne,
                            c7: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Balance of Leave</label>
                      <textarea
                        className="form-control"
                        placeholder="Year"
                        value={lineOne.c8}
                        onChange={(e) => {
                          setLineOne({
                            ...lineOne,
                            c8: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Previous Leave</label>
                      <textarea
                        className="form-control"
                        placeholder="Previous Leave"
                        rows={3}
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                        value={lineOne.c9}
                        onChange={(e) => {
                          setLineOne({
                            ...lineOne,
                            c9: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="lineTwo">
                    <h6>Line Two</h6>
                    <div className="mb-3">
                      <label className="form-label">Year</label>
                      <textarea
                        className="form-control"
                        placeholder="Year"
                        rows={3}
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                        value={lineTwo.c1}
                        onChange={(e) => {
                          setLineTwo({
                            ...lineTwo,
                            c1: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Leave earned & nature of Leave
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Leave earned & nature of Leave"
                        rows={3}
                        value={lineTwo.c2}
                        onChange={(e) => {
                          setLineTwo({
                            ...lineTwo,
                            c2: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Leave from</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Leave from"
                        value={lineTwo.c3}
                        onChange={(e) => {
                          setLineTwo({
                            ...lineTwo,
                            c3: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Leave To</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Leave To"
                        value={lineTwo.c4}
                        onChange={(e) => {
                          setLineTwo({
                            ...lineTwo,
                            c4: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">No. of Days</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="No. of Days"
                        value={lineTwo.c5}
                        onChange={(e) => {
                          setLineTwo({
                            ...lineTwo,
                            c5: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">HPL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="HPL"
                        value={lineTwo.c6}
                        onChange={(e) => {
                          setLineTwo({
                            ...lineTwo,
                            c6: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nature of Leave</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nature of Leave"
                        value={lineTwo.c7}
                        onChange={(e) => {
                          setLineTwo({
                            ...lineTwo,
                            c7: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Balance of Leave</label>
                      <textarea
                        className="form-control"
                        placeholder="Year"
                        value={lineTwo.c8}
                        onChange={(e) => {
                          setLineTwo({
                            ...lineTwo,
                            c8: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Previous Leave</label>
                      <textarea
                        className="form-control"
                        placeholder="Previous Leave"
                        rows={3}
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                        value={lineTwo.c9}
                        onChange={(e) => {
                          setLineTwo({
                            ...lineTwo,
                            c9: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="lineThree">
                    <h6>Line Three</h6>
                    <div className="mb-3">
                      <label className="form-label">Year</label>
                      <textarea
                        className="form-control"
                        placeholder="Year"
                        rows={3}
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                        value={lineThree.c1}
                        onChange={(e) => {
                          setLineThree({
                            ...lineThree,
                            c1: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Leave earned & nature of Leave
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Leave earned & nature of Leave"
                        rows={3}
                        value={lineThree.c2}
                        onChange={(e) => {
                          setLineThree({
                            ...lineThree,
                            c2: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Leave from</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Leave from"
                        value={lineThree.c3}
                        onChange={(e) => {
                          setLineThree({
                            ...lineThree,
                            c3: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Leave To</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Leave To"
                        value={lineThree.c4}
                        onChange={(e) => {
                          setLineThree({
                            ...lineThree,
                            c4: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">No. of Days</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="No. of Days"
                        value={lineThree.c5}
                        onChange={(e) => {
                          setLineThree({
                            ...lineThree,
                            c5: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">HPL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="HPL"
                        value={lineThree.c6}
                        onChange={(e) => {
                          setLineThree({
                            ...lineThree,
                            c6: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nature of Leave</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nature of Leave"
                        value={lineThree.c7}
                        onChange={(e) => {
                          setLineThree({
                            ...lineThree,
                            c7: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Balance of Leave</label>
                      <textarea
                        className="form-control"
                        placeholder="Year"
                        value={lineThree.c8}
                        onChange={(e) => {
                          setLineThree({
                            ...lineThree,
                            c8: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Previous Leave</label>
                      <textarea
                        className="form-control"
                        placeholder="Previous Leave"
                        rows={3}
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                        value={lineThree.c9}
                        onChange={(e) => {
                          setLineThree({
                            ...lineThree,
                            c9: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="lineFour">
                    <h6>Line Four</h6>
                    <div className="mb-3">
                      <label className="form-label">Year</label>
                      <textarea
                        className="form-control"
                        placeholder="Year"
                        rows={3}
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                        value={lineFour.c1}
                        onChange={(e) => {
                          setLineFour({
                            ...lineFour,
                            c1: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Leave earned & nature of Leave
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Leave earned & nature of Leave"
                        rows={3}
                        value={lineFour.c2}
                        onChange={(e) => {
                          setLineFour({
                            ...lineFour,
                            c2: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Leave from</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Leave from"
                        value={lineFour.c3}
                        onChange={(e) => {
                          setLineFour({
                            ...lineFour,
                            c3: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Leave To</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Leave To"
                        value={lineFour.c4}
                        onChange={(e) => {
                          setLineFour({
                            ...lineFour,
                            c4: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">No. of Days</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="No. of Days"
                        value={lineFour.c5}
                        onChange={(e) => {
                          setLineFour({
                            ...lineFour,
                            c5: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">HPL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="HPL"
                        value={lineFour.c6}
                        onChange={(e) => {
                          setLineFour({
                            ...lineFour,
                            c6: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nature of Leave</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nature of Leave"
                        value={lineFour.c7}
                        onChange={(e) => {
                          setLineFour({
                            ...lineFour,
                            c7: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Balance of Leave</label>
                      <textarea
                        className="form-control"
                        placeholder="Year"
                        value={lineFour.c8}
                        onChange={(e) => {
                          setLineFour({
                            ...lineFour,
                            c8: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Previous Leave</label>
                      <textarea
                        className="form-control"
                        placeholder="Previous Leave"
                        rows={3}
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                        value={lineFour.c9}
                        onChange={(e) => {
                          setLineFour({
                            ...lineFour,
                            c9: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="lineFive">
                    <h6>Line Five</h6>
                    <div className="mb-3">
                      <label className="form-label">Year</label>
                      <textarea
                        className="form-control"
                        placeholder="Year"
                        rows={3}
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                        value={lineFive.c1}
                        onChange={(e) => {
                          setLineFive({
                            ...lineFive,
                            c1: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Leave earned & nature of Leave
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Leave earned & nature of Leave"
                        rows={3}
                        value={lineFive.c2}
                        onChange={(e) => {
                          setLineFive({
                            ...lineFive,
                            c2: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Leave from</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Leave from"
                        value={lineFive.c3}
                        onChange={(e) => {
                          setLineFive({
                            ...lineFive,
                            c3: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Leave To</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Leave To"
                        value={lineFive.c4}
                        onChange={(e) => {
                          setLineFive({
                            ...lineFive,
                            c4: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">No. of Days</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="No. of Days"
                        value={lineFive.c5}
                        onChange={(e) => {
                          setLineFive({
                            ...lineFive,
                            c5: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">HPL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="HPL"
                        value={lineFive.c6}
                        onChange={(e) => {
                          setLineFive({
                            ...lineFive,
                            c6: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nature of Leave</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nature of Leave"
                        value={lineFive.c7}
                        onChange={(e) => {
                          setLineFive({
                            ...lineFive,
                            c7: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Balance of Leave</label>
                      <textarea
                        className="form-control"
                        placeholder="Year"
                        value={lineFive.c8}
                        onChange={(e) => {
                          setLineFive({
                            ...lineFive,
                            c8: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Previous Leave</label>
                      <textarea
                        className="form-control"
                        placeholder="Previous Leave"
                        rows={3}
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                        value={lineFive.c9}
                        onChange={(e) => {
                          setLineFive({
                            ...lineFive,
                            c9: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="lineSix">
                    <h6>Line Six</h6>
                    <div className="mb-3">
                      <label className="form-label">Year</label>
                      <textarea
                        className="form-control"
                        placeholder="Year"
                        rows={3}
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                        value={lineSix.c1}
                        onChange={(e) => {
                          setLineSix({
                            ...lineSix,
                            c1: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Leave earned & nature of Leave
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Leave earned & nature of Leave"
                        rows={3}
                        value={lineSix.c2}
                        onChange={(e) => {
                          setLineSix({
                            ...lineSix,
                            c2: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Leave from</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Leave from"
                        value={lineSix.c3}
                        onChange={(e) => {
                          setLineSix({
                            ...lineSix,
                            c3: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Leave To</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Leave To"
                        value={lineSix.c4}
                        onChange={(e) => {
                          setLineSix({
                            ...lineSix,
                            c4: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">No. of Days</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="No. of Days"
                        value={lineSix.c5}
                        onChange={(e) => {
                          setLineSix({
                            ...lineSix,
                            c5: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">HPL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="HPL"
                        value={lineSix.c6}
                        onChange={(e) => {
                          setLineSix({
                            ...lineSix,
                            c6: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nature of Leave</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nature of Leave"
                        value={lineSix.c7}
                        onChange={(e) => {
                          setLineSix({
                            ...lineSix,
                            c7: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Balance of Leave</label>
                      <textarea
                        className="form-control"
                        placeholder="Year"
                        value={lineSix.c8}
                        onChange={(e) => {
                          setLineSix({
                            ...lineSix,
                            c8: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Previous Leave</label>
                      <textarea
                        className="form-control"
                        placeholder="Previous Leave"
                        rows={3}
                        style={{
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                        value={lineSix.c9}
                        onChange={(e) => {
                          setLineSix({
                            ...lineSix,
                            c9: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary m-2"
                  type="button"
                  onClick={() => {
                    setShowEditLines(false);
                    setShowDownloadBtn(true);
                  }}
                >
                  Save
                </button>
                <button
                  className="btn btn-dark m-2"
                  type="button"
                  onClick={() => {
                    setShowEditLines(false);
                    setShowModal(true);
                  }}
                >
                  Close
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
              <LeaveProposalNew
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
                  serviceAge,
                  earnedLeave,
                  balanceLeave,
                  lineOne,
                  lineTwo,
                  lineThree,
                  lineFour,
                  lineFive,
                  lineSix,
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
        <div className="mt-3 mx-auto">
          <LeaveProposalNew
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
              serviceAge,
              earnedLeave,
              balanceLeave,
              lineOne,
              lineTwo,
              lineThree,
              lineFour,
              lineFive,
              lineSix,
            }}
          />
        </div>
      )} */}
    </div>
  );
}
