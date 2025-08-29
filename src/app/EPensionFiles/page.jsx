"use client";
import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  compareObjects,
  createDownloadLink,
  getCurrentDateInput,
  getSubmitDateInput,
  titleCase,
  todayInString,
} from "../../modules/calculatefunctions";

import dynamic from "next/dynamic";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../context/FirebaseContext";
import Loader from "../../components/Loader";
import FamilyList from "../../pdfs/FamilyList";
import TopSheetEPension from "../../pdfs/TopSheetEPension";
import PensionHRA from "../../pdfs/PensionHRA";
import DCRGForm from "../../pdfs/DCRGForm";
import LTAForm from "../../pdfs/LTAForm";
import { set } from "mongoose";
import PensionLeaveForm from "../../pdfs/PensionLeaveForm";
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

  const {
    tname,
    desig,
    dob,
    doj,
    dojnow,
    dor,
    phone,
    email,
    hoi,
    gender,
    id,
    empid,
    school,
    udise,
    address,
    account,
    ifsc,
  } = stateObject;

  const [inputField, setInputField] = useState({
    tname,
    desig,
    dob,
    doj,
    dojnow,
    dor,
    phone,
    email,
    hoi,
    gender,
    id,
    empid,
    school,
    udise,
    address,
    account,
    ifsc,
    spouse: "",
    spouseDob: `01-01-${new Date().getFullYear() - 50}`,
    children: [],
    applicationNo: "",
  });
  const [prevData, setPrevData] = useState({
    tname,
    desig,
    dob,
    doj,
    dojnow,
    dor,
    phone,
    email,
    hoi,
    gender,
    id,
    empid,
    school,
    udise,
    address,
    account,
    ifsc,
    spouse: "",
    spouseDob: `01-01-${new Date().getFullYear() - 50}`,
    children: [],
    applicationNo: "",
  });
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [children, setChildren] = useState([
    {
      name: "",
      dob: `01-01-${new Date().getFullYear() - 25}`,
      gender: "",
    },
  ]);

  const [showFamily, setShowFamily] = useState(false);
  const [showTopSheet, setShowTopSheet] = useState(false);
  const [showHRAForm, setShowHRAForm] = useState(false);
  const [showDCRGForm, setShowDCRGForm] = useState(false);
  const [showLTAForm, setShowLTAForm] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const addChildren = () => {
    const newChildren = [
      ...children,
      { name: "", dob: `01-01-${new Date().getFullYear() - 25}`, gender: "" },
    ];
    setChildren(newChildren);
    setInputField({
      ...inputField,
      children: newChildren,
    });
  };

  const handleChildrenChange = (index, e) => {
    const list = [...children];
    const { name, value } = e.target;
    if (name === "dob") {
      list[index][name] = getSubmitDateInput(value);
    } else {
      list[index][name] = value;
    }
    setChildren(list);
    setInputField({ ...inputField, children: list });
  };

  const removeChildren = (index) => {
    const list = [...children];
    list.splice(index, 1);
    setChildren(list);
    setInputField({ ...inputField, children: list });
  };
  const ifsc_ser = (ifsc) => {
    const bankDiv = document.getElementById("bankdiv");
    if (ifsc.length === 11 && bankDiv) {
      fetch(`https://ifsc.razorpay.com/${ifsc}`)
        .then((res) => res.json())
        .then((data) => {
          document.getElementById("bankdiv").innerHTML =
            "<p>Bank Details<br>Bank Name: " +
            data.BANK +
            "<br/>" +
            "Branch: " +
            data.BRANCH +
            "<br/>" +
            "Address: " +
            data.ADDRESS +
            "<br/>" +
            "IFSC: " +
            data.IFSC +
            "<br/>" +
            "MICR: " +
            data.MICR +
            "<br/></p>";
        });
    } else {
      bankDiv.innerHTML = "";
    }
  };

  const saveData = async () => {
    if (isFormValid()) {
      setShowModal(false);
      setLoader(true);
      try {
        await setDoc(doc(firestore, "epension", inputField.id), inputField)
          .then(() => {
            toast.success("Pension Data Added Successfully!");
          })
          .catch((error) => {
            toast.error(error.message);
          })
          .finally(() => {
            setLoader(false);
          });
      } catch (error) {
        toast.error(error.message);
        setLoader(false);
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };
  const isFormValid = () => {
    if (
      !inputField.tname ||
      !inputField.desig ||
      !inputField.dob ||
      !inputField.doj ||
      !inputField.dojnow ||
      !inputField.dor ||
      !inputField.phone ||
      !inputField.email ||
      !inputField.hoi ||
      !inputField.gender ||
      !inputField.id ||
      !inputField.empid ||
      !inputField.school ||
      !inputField.address ||
      !inputField.account ||
      !inputField.ifsc ||
      !inputField.spouse ||
      !inputField.spouseDob
    ) {
      toast.error("Please fill all the fields");
      return false;
    }
    return true;
  };
  const getData = async () => {
    setLoader(true);
    try {
      const q = query(
        collection(firestore, "epension"),
        where("id", "==", inputField.id)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 0) {
        toast.error("No Previous Data Found");
        setLoader(false);
      } else {
        const data = querySnapshot.docs[0].data();
        setPrevData(data);
        setInputField(data);
        setChildren(data.children);
        setLoader(false);
        toast.success("Previous Data Found");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setLoader(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (state !== "admin") {
      router.push("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container timesFont">
      {loader && <Loader />}
      <div
        className="d-flex flex-column justify-content-center align-items-center mx-auto noprint"
        style={{ width: "50%" }}
      >
        <button
          type="button"
          className="btn btn-dark m-2"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
      <div className="my-1">
        <h3 className="text-primary fw-bold">{tname}</h3>
        <h5 className="text-success fw-bold">
          {desig === "HT" ? "HEAD TECHER" : "ASSISTANT TEACHER"}
        </h5>
        <h5 className="text-primary fw-bold">{school}</h5>
        <h5>Date of Birth: {dob}</h5>
        <h5>Date of Joining: {doj}</h5>
        <h5>Date of Retirement: {dor}</h5>
        <button
          type="button"
          className="btn btn-success m-2"
          onClick={() => {
            setShowModal(true);
            setShowFamily(false);
            setShowTopSheet(false);
            setShowHRAForm(false);
            setShowDCRGForm(false);
            setShowLTAForm(false);
            setShowLeaveForm(false);
            setTimeout(() => {
              ifsc_ser(inputField.ifsc);
            }, 200);
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
                  Enter Basic Details of {titleCase(tname)}, {desig} of{" "}
                  {titleCase(school)}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setShowModal(false);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={inputField.tname}
                    onChange={(e) => {
                      setInputField({ ...inputField, tname: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">School</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="School"
                    value={inputField.school}
                    onChange={(e) => {
                      setInputField({ ...inputField, school: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">UDISE</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="UDISE"
                    value={inputField.udise}
                    onChange={(e) => {
                      setInputField({ ...inputField, udise: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="purpose_type" className="form-label">
                    Designation
                  </label>
                  <select
                    className="form-select"
                    defaultValue={inputField.desig}
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        setInputField({ ...inputField, desig: e.target.value });
                      } else {
                        toast.error("Select Designation");
                      }
                    }}
                  >
                    <option value="">Select Designation</option>
                    <option value="HT">HEAD TEACHER</option>
                    <option value="AT">ASSISTANT TEACHER</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Employee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Employee ID"
                    value={inputField?.empid}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        empid: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date Of Birth:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={getCurrentDateInput(inputField?.dob)}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        dob: getSubmitDateInput(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date Of Joining:</label>

                  <input
                    type="date"
                    className="form-control"
                    value={getCurrentDateInput(inputField?.doj)}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        doj: getSubmitDateInput(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Date Of Joining in Current School:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={getCurrentDateInput(inputField?.dojnow)}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        dojnow: getSubmitDateInput(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date Of Retirement:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={getCurrentDateInput(inputField?.dor)}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        dor: getSubmitDateInput(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address:</label>
                  <textarea
                    name="address"
                    cols="5"
                    rows="3"
                    className="form-control"
                    placeholder="Address"
                    style={{ resize: "none" }}
                    value={inputField?.address}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        address: e.target.value,
                      });
                    }}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Mobile No.</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Mobile No."
                    value={inputField?.phone}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        phone: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={inputField?.email}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Account Number</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Account Number"
                    value={inputField?.account}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        account: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">IFS Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="IFS Code"
                    value={inputField?.ifsc}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        ifsc: e.target.value,
                      });
                      ifsc_ser(e.target.value);
                    }}
                  />
                </div>
                <div
                  className="mb-3 text-primary text-center"
                  id="bankdiv"
                  style={{ zoom: 0.6 }}
                ></div>
                <div className="mb-3">
                  <label className="form-label">Application No.</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Application No."
                    value={inputField?.applicationNo}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        applicationNo: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Spouse Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Spouse Name"
                    value={inputField?.spouse}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        spouse: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Spouse's Date Of Birth:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={getCurrentDateInput(inputField?.spouseDob)}
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        spouseDob: getSubmitDateInput(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
                {children.map((child, index) => (
                  <div key={index} className="mx-auto border rounded p-2 my-2">
                    <div className="d-flex justify-content-center align-items-center mb-2">
                      <h5 className="mb-0 text-center">Child {index + 1}</h5>
                      {children.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger m-2"
                          onClick={() => removeChildren(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className=" mb-3">
                      <label className="form-label">
                        Child {index + 1}'s Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Child's Name"
                        value={child.name}
                        onChange={(e) => handleChildrenChange(index, e)}
                      />
                    </div>
                    <div className=" mb-3">
                      <label className="form-label">
                        Child {index + 1}'s Date of Birth
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={getCurrentDateInput(child.dob)}
                        onChange={(e) => handleChildrenChange(index, e)}
                      />
                    </div>
                    <div className=" mb-3">
                      <label className="form-label">
                        Child {index + 1}'s Gender
                      </label>
                      <select
                        className="form-select"
                        name="gender"
                        value={child.gender}
                        onChange={(e) => handleChildrenChange(index, e)}
                      >
                        <option value="">Select Gender</option>
                        <option value="SON">SON</option>
                        <option value="DAUGHTER">DAUGHTER</option>
                      </select>
                    </div>
                  </div>
                ))}
                <button
                  className="btn btn-primary m-2"
                  type="button"
                  onClick={addChildren}
                >
                  Add Children
                </button>
              </div>
              <div className="modal-footer d-flex flex-column">
                <div>
                  <button
                    className="btn btn-primary m-2"
                    type="button"
                    // disabled={compareObjects(inputField, prevData)}
                    onClick={saveData}
                  >
                    Save
                  </button>

                  <button
                    className="btn btn-danger m-2"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success m-2"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Add to Database
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="d-flex flex-column justify-content-center align-items-center mx-auto noprint my-2"
        style={{ width: "50%" }}
      >
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={() => {
            setShowFamily(!showFamily);
            setShowTopSheet(false);
            setShowHRAForm(false);
            setShowDCRGForm(false);
            setShowLTAForm(false);
            setShowLeaveForm(false);
          }}
        >
          {showFamily ? "Hide" : "Show"} Family Form
        </button>
        {showFamily && (
          <div className="my-2 mx-auto">
            {/* <FamilyList data={inputField} /> */}
            <PDFDownloadLink
              document={<FamilyList data={inputField} />}
              fileName={`Family List of ${tname}.pdf`}
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
                loading ? "Please Wait..." : "Download Family List"
              }
            </PDFDownloadLink>
          </div>
        )}
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center mx-auto noprint my-2"
        style={{ width: "50%" }}
      >
        <button
          type="button"
          className="btn btn-info m-2"
          onClick={() => {
            setShowFamily(false);
            setShowTopSheet(!showTopSheet);
            setShowHRAForm(false);
            setShowDCRGForm(false);
            setShowLTAForm(false);
            setShowLeaveForm(false);
          }}
        >
          {showTopSheet ? "Hide" : "Show"} Top Sheet Form
        </button>
        {showTopSheet && (
          <div className="my-2 mx-auto">
            {/* <TopSheetEPension data={inputField} /> */}
            <PDFDownloadLink
              document={<TopSheetEPension data={inputField} />}
              fileName={`Top Sheet of ${tname}.pdf`}
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
                loading ? "Please Wait..." : "Download Top Sheet"
              }
            </PDFDownloadLink>
          </div>
        )}
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center mx-auto noprint my-2"
        style={{ width: "50%" }}
      >
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={() => {
            setShowFamily(false);
            setShowTopSheet(false);
            setShowHRAForm(!showHRAForm);
            setShowDCRGForm(false);
            setShowLTAForm(false);
            setShowLeaveForm(false);
          }}
        >
          {showHRAForm ? "Hide" : "Show"} HRA Form
        </button>
        {showHRAForm && (
          <div className="my-2 mx-auto">
            {/* <PensionHRA data={inputField} /> */}
            <PDFDownloadLink
              document={<PensionHRA data={inputField} />}
              fileName={`HRA Form of ${tname}.pdf`}
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
                loading ? "Please Wait..." : "Download HRA Form"
              }
            </PDFDownloadLink>
          </div>
        )}
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center mx-auto noprint my-2"
        style={{ width: "50%" }}
      >
        <button
          type="button"
          className="btn btn-success m-2"
          onClick={() => {
            setShowFamily(false);
            setShowTopSheet(false);
            setShowHRAForm(false);
            setShowDCRGForm(!showDCRGForm);
            setShowLTAForm(false);
            setShowLeaveForm(false);
          }}
        >
          {showDCRGForm ? "Hide" : "Show"} DCRG Form
        </button>
        {showDCRGForm && (
          <div className="my-2 mx-auto">
            {/* <DCRGForm data={inputField} /> */}
            <PDFDownloadLink
              document={<DCRGForm data={inputField} />}
              fileName={`DCRG Form of ${tname}.pdf`}
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
                loading ? "Please Wait..." : "Download DCRG Form"
              }
            </PDFDownloadLink>
          </div>
        )}
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center mx-auto noprint my-2"
        style={{ width: "50%" }}
      >
        <button
          type="button"
          className="btn btn-info m-2"
          onClick={() => {
            setShowFamily(false);
            setShowTopSheet(false);
            setShowHRAForm(false);
            setShowDCRGForm(false);
            setShowLTAForm(!showLTAForm);
            setShowLeaveForm(false);
          }}
        >
          {showLTAForm ? "Hide" : "Show"} LTA Form
        </button>
        {showLTAForm && (
          <div className="my-2 mx-auto">
            {/* <LTAForm data={inputField} /> */}
            <PDFDownloadLink
              document={<LTAForm data={inputField} />}
              fileName={`LTA Form of ${tname}.pdf`}
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
                loading ? "Please Wait..." : "Download LTA Form"
              }
            </PDFDownloadLink>
          </div>
        )}
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center mx-auto noprint my-2"
        style={{ width: "50%" }}
      >
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={() => {
            setShowFamily(false);
            setShowTopSheet(false);
            setShowHRAForm(false);
            setShowDCRGForm(false);
            setShowLTAForm(false);
            setShowLeaveForm(!showLeaveForm);
          }}
        >
          {showLeaveForm ? "Hide" : "Show"} Leave Form
        </button>
        {showLeaveForm && (
          <div className="my-2 mx-auto">
            {/* <PensionLeaveForm data={inputField} /> */}
            <PDFDownloadLink
              document={<PensionLeaveForm data={inputField} />}
              fileName={`Leave Form of ${tname}.pdf`}
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
                loading ? "Please Wait..." : "Download Leave Form"
              }
            </PDFDownloadLink>
          </div>
        )}
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center mx-auto noprint my-5"
        style={{ width: "50%" }}
      >
        <button
          type="button"
          className="btn btn-dark m-2"
          onClick={() => router.back()}
        >
          Go Back
        </button>

        <a
          href="https://epension.wb.gov.in/e_Pension/ApplicantLogin"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary m-2"
        >
          Go to e-Pension
        </a>
      </div>
    </div>
  );
}
