"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { firestore } from "../../context/FirbaseContext";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import Loader from "../../components/Loader";
import {
  RoundTo,
  NumInWords,
  ptaxCalc,
  calculateRetirementDate,
  funcda,
  funchra,
  funcmda,
  funcmhra,
  gross,
  netpay,
  getCurrentDateInput,
  getSubmitDateInput,
  getSubmitDateSlashInput,
  generateID,
} from "../../modules/calculatefunctions";
import { DA, HRA } from "../../modules/constants";

import { v4 as uuid } from "uuid";
import axios from "axios";

const AddTeacher = () => {
  const router = useRouter();
  const {
    state,
    teachersState,
    schoolState,
    setTeachersState,
    setTeacherUpdateTime,
  } = useGlobalContext();
  const [data, setData] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [teachersData, setTeachersData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loader, setLoader] = useState(false);
  const sch_search = async (e) => {
    setData(schoolState);
    setTeachersData(teachersState);
    setTeacherId(
      "teachers" + (teachersState.length + 101) + "-" + uuid().split("-")[0]
    );
  };
  const [inputField, setInputField] = useState({
    school: "",
    udise: "",
    tname: "",
    gender: "male",
    ph: 0,
    disability: "MO",
    desig: "AT",
    fname: "",
    circle: "taw",
    sis: "AMTA WEST CIRCLE",
    gp: "",
    association: "WBTPTA",
    phone: "",
    email: "",
    dob: "01-01-1990",
    doj: getSubmitDateSlashInput(new Date().toLocaleDateString()),
    dojnow: getSubmitDateSlashInput(new Date().toLocaleDateString()),
    dor: "01-01-2050",
    bank: "",
    account: "",
    ifsc: "",
    empid: generateID(),
    training: "TRAINED",
    pan: "",
    address: "",
    basic: 28900,
    mbasic: 28900,
    prevmbasic: 28900,
    addl: 0,
    da: 0,
    mda: 0,
    hra: 0,
    mhra: 0,
    ma: 500,
    gross: 0,
    mgross: 0,
    mptax: 0,
    gpf: 0,
    gpfprev: 0,
    julyGpf: 0,
    ptax: 150,
    gsli: 0,
    jptax: 0,
    netpay: 0,
    mnetpay: 0,
    bonus: 0,
    arrear: 0,
    question: "taw",
    hoi: "No",
    service: "inservice",
    id: "",
    rank: 3,
    newHt: false,
    registered: false,
    showAccount: false,
    dataYear: new Date().getFullYear(),
  });
  const [errField, setErrField] = useState({
    errschool: "",
    errudise: "",
    errtname: "",
    errgender: "",
    errtsname: "",
    errph: "",
    errdesig: "",
    errfname: "",
    errgp: "",
    errassociation: "",
    errphone: "",
    erremail: "",
    errdob: "",
    errdoj: "",
    errdojnow: "",
    errdor: "",
    errbank: "",
    erraccount: "",
    errifsc: "",
    errempid: "",
    errtraining: "",
    errpan: "",
    erraddress: "",
    errbasic: "",
    errmbasic: "",
    errma: "",
    errgpf: "",
    errgsli: "",
    errarrear: "",
    errbonus: "",
    errquestion: "",
    errhoi: "",
    errservice: "",
  });
  const ifsc_ser = (ifsc) => {
    if (ifsc.length === 11) {
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
      document.getElementById("bankdiv").innerHTML = "";
    }
  };
  const formHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const julyBasicPay = (junebasic) => {
    if (junebasic >= 24000) {
      return RoundTo(junebasic + junebasic * 0.03, 100);
    } else {
      return 0;
    }
  };
  const prevmbasic = (junebasic) => {
    if (junebasic >= 24000) {
      return RoundTo(junebasic - junebasic * 0.03, 100);
    } else {
      return 0;
    }
  };

  const validForm = () => {
    let formIsValid = true;
    setErrField({
      errschool: "",
      errudise: "",
      errtname: "",
      errtsname: "",
      errgender: "",
      errph: "",
      errdesig: "",
      errfname: "",
      errgp: "",
      errassociation: "",
      errphone: "",
      erremail: "",
      errdob: "",
      errdoj: "",
      errdojnow: "",
      errdor: "",
      errbank: "",
      erraccount: "",
      errifsc: "",
      errempid: "",
      errtraining: "",
      errpan: "",
      erraddress: "",
      errbasic: "",
      errmbasic: "",
      errma: "",
      errgpf: "",
      errgsli: "",
      errarrear: "",
      errbonus: "",
      errquestion: "",
      errhoi: "",
      errservice: "",
    });

    if (inputField.school === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errschool: "Please Enter School Name",
      }));
    }
    if (inputField.udise === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errudise: "Please Enter School UDISE",
      }));
    }
    if (inputField.tname === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errtname: "Please Enter Name",
      }));
    }

    if (inputField.ph === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errph: "Please Enter PH",
      }));
    }
    if (inputField.desig === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errdesig: "Please Enter Designation",
      }));
    }
    if (inputField.fname === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errfname: "Please Enter Father's Name",
      }));
    }
    if (inputField.gp === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errgp: "Please Enter GP Name",
      }));
    }
    if (inputField.association === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errassociation: "Please Enter Association",
      }));
    }

    if (inputField.phone === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errphone: "Please Enter Mobile Number",
      }));
    }
    if (inputField.email === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        erremail: "Please Enter Email",
      }));
    } else if (!ValidateEmail(inputField.email)) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        erremail: "Please Enter Valid Email",
      }));
    }
    if (inputField.bank === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errbank: "Please Enter Bank",
      }));
    }
    if (inputField.account === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        erraccount: "Please Enter Account",
      }));
    }

    if (inputField.ifsc === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errifsc: "Please Enter IFSC",
      }));
    }

    if (inputField.empid === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errempid: "Please Enter Empid",
      }));
    }
    if (inputField.empid.length !== 8) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errempid: "Please Enter Valid Empid",
      }));
    }
    if (inputField.pan === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errpan: "Please Enter Pan",
      }));
    }
    if (inputField.pan.length !== 10) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errpan: "Please Enter Valid Pan",
      }));
    }
    if (inputField.address === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        erraddress: "Please Enter Address",
      }));
    }
    if (inputField.basic === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errbasic: "Please Enter Basic",
      }));
    }
    if (inputField.mbasic === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errmbasic: "Please Enter March Basic",
      }));
    }
    if (inputField.ma === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errma: "Please Enter MA",
      }));
    }
    if (inputField.gpf === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errgpf: "Please Enter GPF",
      }));
    }

    if (inputField.gsli === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errgsli: "Please Enter GSLI",
      }));
    }
    if (inputField.arrear === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errarrear: "Please Enter Arrear",
      }));
    }
    if (inputField.bonus === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errbonus: "Please Enter bonus",
      }));
    }

    return formIsValid;
  };
  function ValidateEmail(mail) {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail)) {
      return true;
    }
    // alert("You have entered an invalid email address!");
    return false;
  }

  const submitForm = async () => {
    if (validForm()) {
      try {
        setLoader(true);
        const url = `/api/addTeacher`;
        let response = await axios.post(url, inputField);
        let record = response.data;
        if (record.success) {
          await setDoc(doc(firestore, "teachers", teacherId), inputField);
          let x = teachersState;
          x = [...x, inputField];
          let newData = x.sort(function (a, b) {
            var nameA = a.school.toLowerCase(),
              nameB = b.school.toLowerCase();
            if (nameA < nameB)
              //sort string ascending
              return -1;
            if (nameA > nameB) return 1;
            return 0; //default return value (no sorting)
          });
          setTeachersState(newData);
          setTeacherUpdateTime(Date.now());
          setLoader(false);
          toast.success(
            `Congratulation ${inputField.tname} Successfully Registered!`,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          setTimeout(() => {
            router.push("/teacherdatabase");
          }, 1500);
        } else {
          setLoader(false);
          toast.error("Teacher Entry Failed", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (e) {
        setLoader(false);
        console.log(e);
        toast.error("Teacher Entry Failed", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };
  const resetForm = () => {
    setErrField({
      errschool: "",
      errudise: "",
      errtname: "",
      errgender: "",
      errtsname: "",
      errph: "",
      errdesig: "",
      errfname: "",
      errgp: "",
      errassociation: "",
      errphone: "",
      erremail: "",
      errdob: "",
      errdoj: "",
      errdojnow: "",
      errdor: "",
      errbank: "",
      erraccount: "",
      errifsc: "",
      errempid: "",
      errtraining: "",
      errpan: "",
      erraddress: "",
      errbasic: "",
      errmbasic: "",
      errma: "",
      errgpf: "",
      errgsli: "",
      errarrear: "",
      errbonus: "",
      errquestion: "",
      errhoi: "",
      errservice: "",
    });
    setInputField({
      school: "",
      udise: "",
      tname: "",
      gender: "male",
      ph: 0,
      disability: "MO",
      desig: "AT",
      fname: "",
      circle: "taw",
      sis: "AMTA WEST CIRCLE",
      gp: "",
      association: "WBTPTA",
      phone: "",
      email: "",
      dob: "01-01-1990",
      doj: getSubmitDateSlashInput(new Date().toLocaleDateString()),
      dojnow: getSubmitDateSlashInput(new Date().toLocaleDateString()),
      dor: "01-01-2050",
      bank: "",
      account: "",
      ifsc: "",
      empid: generateID(),
      training: "TRAINED",
      pan: "",
      address: "",
      basic: 28900,
      mbasic: 28900,
      prevmbasic: 28900,
      addl: 0,
      da: 0,
      mda: 0,
      hra: 0,
      mhra: 0,
      ma: 500,
      gross: 0,
      mgross: 0,
      mptax: 0,
      gpf: 0,
      gpfprev: 0,
      julyGpf: 0,
      ptax: 150,
      gsli: 0,
      jptax: 0,
      netpay: 0,
      mnetpay: 0,
      bonus: 0,
      arrear: 0,
      question: "taw",
      hoi: "No",
      service: "inservice",
      id: "",
      rank: 3,
      newHt: false,
      registered: false,
      showAccount: false,
      dataYear: new Date().getFullYear(),
    });
    setShowForm(false);
    if (typeof window !== undefined) {
      document.getElementById("school").value = "";
    }
  };
  useEffect(() => {
    sch_search();
  }, []);
  useEffect(() => {
    if (state !== "admin") {
      router.push("/login");
    }
  }, []);
  useEffect(() => {}, [inputField, teacherId]);
  return (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="all-data" id="box">
        <div className="container my-4">
          <h3>AMTA WEST CIRCLE ADD TEACHER SECTION:</h3>
        </div>
        {loader ? <Loader /> : null}
        <div className="container fw-bold">
          <form action="" autoComplete="off" method="post" id="form">
            <div className="row align-items-center">
              <div className="mb-3 col-md-6">
                <label className="form-label">School Name</label>
                <div className="mx-auto mb-3">
                  <select
                    className="form-select"
                    defaultValue=""
                    name="school"
                    id="school"
                    onChange={(e) => {
                      setInputField({
                        ...inputField,
                        school: e.target.value.split("-")[0],
                        udise: e.target.value.split("-")[1],

                        id: teacherId,
                      });
                      setShowForm(true);
                    }}
                  >
                    <option value="">Select School Name</option>
                    {data.length > 0
                      ? data.map((el) => {
                          return (
                            <option
                              key={el.id}
                              value={el.school + "-" + el.udise}
                            >
                              {el.school}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
                {errField.errschool.length > 0 && (
                  <span className="error">{errField.errschool}</span>
                )}
              </div>
              {showForm ? (
                <>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">UDISE</label>
                    <input
                      type="number"
                      className="form-control"
                      id="udise"
                      name="udise"
                      placeholder="UDISE Code"
                      value={inputField.udise}
                      onChange={formHandler}
                    />
                    {errField.errudise.length > 0 && (
                      <span className="error">{errField.errudise}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tname"
                      name="tname"
                      placeholder="Full Name"
                      value={inputField.tname}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          tname: e.target.value.toUpperCase(),
                        })
                      }
                    />

                    {errField.errtname.length > 0 && (
                      <span className="error">{errField.errtname}</span>
                    )}
                  </div>

                  <div className="mb-3 col-md-3">
                    <label className="form-label">
                      Is Physically Chalanged ?:
                    </label>
                    <select
                      className="form-select form-select-sm mb-3"
                      aria-label=".form-select-sm example"
                      name="ph"
                      required
                      defaultValue={inputField.ph}
                      onChange={(e) => {
                        setInputField({
                          ...inputField,
                          ph: e.target.value,
                          disability: e.target.value === 1 ? "YES" : "NO",
                        });
                      }}
                    >
                      <option value="">Select PH </option>
                      <option value={0}>No</option>
                      <option value={1}>Yes</option>
                    </select>
                    {errField.errph.length > 0 && (
                      <span className="error">{errField.errph}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Gender:</label>
                    <select
                      className="form-select form-select-sm mb-3"
                      aria-label=".form-select-sm example"
                      name="gender"
                      required
                      defaultValue={inputField.gender}
                      onChange={(e) => {
                        setInputField({
                          ...inputField,
                          gender: e.target.value,
                        });
                      }}
                    >
                      <option value="">Select Gender </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errField.errgender.length > 0 && (
                      <span className="error">{errField.errgender}</span>
                    )}
                  </div>
                  <div className="mb-0 col-md-3">
                    <label className="form-label">Designation</label>
                    <select
                      className="form-select form-select-sm mb-3"
                      aria-label=".form-select-sm example"
                      name="desig"
                      value={inputField.desig}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          desig: e.target.value,
                          addl: e.target.value === "HT" ? 400 : 0,
                        })
                      }
                    >
                      <option value="">Select Designation</option>
                      <option value="AT">AT</option>
                      <option value="HT">HT</option>
                    </select>
                    {errField.errdesig.length > 0 && (
                      <span className="error">{errField.errdesig}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Father's Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fname"
                      name="fname"
                      placeholder="Father's Name"
                      value={inputField.fname}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          fname: e.target.value.toUpperCase(),
                        })
                      }
                    />
                    {errField.errfname.length > 0 && (
                      <span className="error">{errField.errfname}</span>
                    )}
                  </div>

                  <div className="mb-3 col-md-3">
                    <label className="form-label">Association</label>

                    <select
                      className="form-select form-select-sm mb-3"
                      aria-label=".form-select-sm example"
                      name="association"
                      id="association"
                      defaultValue={inputField.association}
                      onChange={formHandler}
                    >
                      <option value="">Select Association</option>
                      <option value="WBTPTA">WBTPTA</option>
                      <option value="NOT WBTPTA">NOT WBTPTA</option>
                      <option value="ABPTA">ABPTA</option>
                      <option value="WBPTA">WBPTA</option>
                      <option value="BJP">BJP</option>
                    </select>
                    {errField.errassociation.length > 0 && (
                      <span className="error">{errField.errassociation}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Is HOI?</label>

                    <select
                      className="form-select form-select-sm mb-3"
                      aria-label=".form-select-sm example"
                      name="hoi"
                      id="hoi"
                      defaultValue={inputField.hoi}
                      onChange={formHandler}
                    >
                      <option value="">Select Is HOI</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errField.errassociation.length > 0 && (
                      <span className="error">{errField.errassociation}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Is Registered?</label>

                    <select
                      className="form-select form-select-sm mb-3"
                      aria-label=".form-select-sm example"
                      name="registered"
                      id="registered"
                      defaultValue={inputField.registered}
                      onChange={formHandler}
                    >
                      <option value="">Select Is Registered</option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Mobile No.</label>

                    <input
                      type="number"
                      maxLength="10"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Mobile No."
                      onInput={maxLengthCheck}
                      value={inputField.phone}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          phone: e.target.value,
                        })
                      }
                    />

                    {errField.errphone.length > 0 && (
                      <span className="error">{errField.errphone}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="Email"
                      name="email"
                      placeholder="Email"
                      value={inputField.email}
                      onChange={formHandler}
                    />
                    {errField.erremail.length > 0 && (
                      <span className="error">{errField.erremail}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Date Of Birth:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      name="dob"
                      placeholder="Date Of Birth"
                      defaultValue={getCurrentDateInput(inputField.dob)}
                      onChange={(e) => {
                        setInputField({
                          ...inputField,
                          dob: getSubmitDateInput(e.target.value),
                        });
                      }}
                      onMouseLeave={() => {
                        setInputField({
                          ...inputField,
                          dor: calculateRetirementDate(
                            getCurrentDateInput(inputField.dob)
                          ),
                        });
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Date Of Joining:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="doj"
                      name="doj"
                      placeholder="Date Of Joining"
                      defaultValue={inputField.doj}
                      onChange={(e) => {
                        setInputField({
                          ...inputField,
                          doj: getSubmitDateInput(e.target.value),
                        });
                        console.log(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">
                      Date Of Joining in Current School:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dojnow"
                      name="dojnow"
                      placeholder="Date Of Joining"
                      defaultValue={inputField.dojnow}
                      onChange={(e) => {
                        setInputField({
                          ...inputField,
                          dojnow: getSubmitDateInput(e.target.value),
                        });
                      }}
                    />
                  </div>

                  <div className="mb-3 col-md-3">
                    <label className="form-label">Date Of Retirement:</label>
                    <h6>{inputField.dor}</h6>
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Bank Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="bank"
                      name="bank"
                      placeholder="Bank"
                      value={inputField.bank}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          bank: e.target.value.toUpperCase(),
                        })
                      }
                    />
                    {errField.errbank.length > 0 && (
                      <span className="error">{errField.errbank}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Salary Account No.</label>
                    <input
                      type="text"
                      className="form-control"
                      id="account"
                      name="account"
                      placeholder="Salary Account No."
                      value={inputField.account}
                      onChange={formHandler}
                    />
                    {errField.errbank.length > 0 && (
                      <span className="error">{errField.errbank}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">IFSC CODE</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ifsc_inp"
                      name="ifsc"
                      maxLength={11}
                      placeholder="IFSC CODE"
                      value={inputField.ifsc}
                      onChange={(e) => {
                        setInputField({
                          ...inputField,
                          ifsc: e.target.value.toUpperCase(),
                        });
                        ifsc_ser(e.target.value.toUpperCase());
                      }}
                    />
                    {errField.errifsc.length > 0 && (
                      <span className="error">{errField.errifsc}</span>
                    )}
                  </div>
                  <div
                    className="mb-3 col-md-3 text-primary text-center"
                    id="bankdiv"
                    style={{ zoom: 0.6 }}
                  ></div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Employee ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="empid"
                      name="empid"
                      maxLength={8}
                      placeholder="Employee ID"
                      value={inputField.empid}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          empid: e.target.value.toUpperCase(),
                        })
                      }
                    />
                    {errField.errempid.length > 0 && (
                      <span className="error">{errField.errempid}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Training</label>
                    <br />
                    <select
                      className="form-select form-select-sm mb-3"
                      aria-label=".form-select-sm example"
                      name="training"
                      defaultValue={inputField.training}
                      onChange={formHandler}
                    >
                      <option value="">Select Training From Below</option>
                      <option value="TRAINED">TRAINED</option>
                      <option value="NON TRAINED">NON TRAINED</option>
                    </select>
                    {errField.errtraining.length > 0 && (
                      <span className="error">{errField.errtraining}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">PAN No.</label>
                    <input
                      type="text"
                      className="form-control"
                      id="pan"
                      name="pan"
                      maxLength={10}
                      placeholder="PAN No."
                      value={inputField.pan}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          pan: e.target.value.toUpperCase(),
                        })
                      }
                    />
                    {errField.errpan.length > 0 && (
                      <span className="error">{errField.errpan}</span>
                    )}
                  </div>

                  <div className="mb-3 col-md-3">
                    <label className="form-label">Address:</label>
                    <textarea
                      name="address"
                      id="address"
                      cols="5"
                      rows="5"
                      className="form-control"
                      placeholder="Address"
                      style={{ resize: "none" }}
                      value={inputField.address}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          address: e.target.value.toUpperCase(),
                        })
                      }
                    ></textarea>
                    {errField.erraddress.length > 0 && (
                      <span className="error">{errField.erraddress}</span>
                    )}
                  </div>

                  <div className="mb-3 col-md-3">
                    <label className="form-label">March Basic</label>
                    <input
                      type="number"
                      className="form-control"
                      id="mbasic"
                      name="mbasic"
                      placeholder="March Basic"
                      value={inputField.mbasic}
                      onChange={(e) => {
                        setInputField({
                          ...inputField,
                          mbasic: parseInt(e.target.value),
                          basic: julyBasicPay(parseInt(e.target.value)),
                          prevmbasic: prevmbasic(parseInt(e.target.value)),
                        });
                      }}
                    />
                    {errField.errmbasic.length > 0 && (
                      <span className="error">{errField.errmbasic}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">July Basic</label>
                    <input
                      type="number"
                      className="form-control"
                      id="basic"
                      name="basic"
                      placeholder="July Basic"
                      value={inputField.basic}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          basic: parseInt(e.target.value),
                        })
                      }
                    />
                    {errField.errbasic.length > 0 && (
                      <span className="error">{errField.errbasic}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Medical Allowance</label>
                    <input
                      type="number"
                      className="form-control"
                      id="ma"
                      name="ma"
                      placeholder="Medical Allowance"
                      value={inputField.ma}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          ma: parseInt(e.target.value),
                        })
                      }
                    />
                    {errField.errma.length > 0 && (
                      <span className="error">{errField.errma}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">GPF</label>
                    <input
                      type="number"
                      className="form-control"
                      id="gpf"
                      name="gpf"
                      placeholder="GPF"
                      value={inputField.gpf}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          gpf: parseInt(e.target.value),
                          gpfprev: parseInt(e.target.value),
                          julyGpf: parseInt(e.target.value),
                        })
                      }
                    />
                    {errField.errgpf.length > 0 && (
                      <span className="error">{errField.errgpf}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">GSLI</label>
                    <input
                      type="number"
                      className="form-control"
                      id="gsli"
                      name="gsli"
                      placeholder="GSLI"
                      value={inputField.gsli}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          gsli: parseInt(e.target.value),
                        })
                      }
                    />
                    {errField.errgsli.length > 0 && (
                      <span className="error">{errField.errgsli}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Total Arrear Received</label>
                    <input
                      type="number"
                      className="form-control"
                      id="arrear"
                      name="arrear"
                      placeholder="Total Arrear Received"
                      value={inputField.arrear}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          arrear: parseInt(e.target.value),
                        })
                      }
                    />
                    {errField.errarrear.length > 0 && (
                      <span className="error">{errField.errarrear}</span>
                    )}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Bonus Recived</label>
                    <input
                      type="number"
                      className="form-control"
                      id="bonus"
                      name="bonus"
                      placeholder="Bonus Recived"
                      value={inputField.bonus}
                      onChange={(e) =>
                        setInputField({
                          ...inputField,
                          bonus: parseInt(e.target.value),
                        })
                      }
                    />
                    {errField.errbonus.length > 0 && (
                      <span className="error">{errField.errbonus}</span>
                    )}
                  </div>
                  <div className="mb-0 col-md-3">
                    <label className="form-label">GRAM PANCHAYET</label>
                    <br />
                    <select
                      className="form-select form-select-sm mb-3"
                      aria-label=".form-select-sm example"
                      name="gp"
                      id="gp_inp"
                      defaultValue={inputField.gp}
                      onChange={(e) => {
                        let filteredData = teachersData.filter((el) =>
                          el.tname
                            .toUpperCase()
                            .match(inputField.tname.toUpperCase())
                        );
                        let totalTeachers = teachersData.filter(
                          (el) => el.udise === inputField.udise
                        ).length;

                        if (filteredData.length > 0) {
                          setInputField({
                            ...inputField,
                            tsname:
                              inputField.tname +
                              Math.floor(Math.random() * 10000),
                            gp: e.target.value,
                            da: funcda(inputField.mbasic),
                            mda: funcmda(inputField.mbasic),
                            hra: funchra(inputField.mbasic),
                            mhra: funcmhra(inputField.mbasic),
                            mgross: gross(inputField.mbasic, inputField.addl),
                            gross: gross(inputField.basic, inputField.addl),
                            mptax: ptaxCalc(
                              gross(inputField.mbasic, inputField.addl)
                            ),
                            jptax: ptaxCalc(
                              gross(inputField.basic, inputField.addl)
                            ),
                            netpay: netpay(
                              inputField.basic,
                              inputField.addl,
                              inputField.ph,
                              inputField.gpf,
                              inputField.gsli
                            ),
                            mnetpay: netpay(
                              inputField.mbasic,
                              inputField.addl,
                              inputField.ph,
                              inputField.gpf,
                              inputField.gsli
                            ),
                            rank: totalTeachers + 1,
                            netpayword: NumInWords(
                              inputField.basic +
                                inputField.addl +
                                inputField.basic * DA +
                                inputField.basic * HRA +
                                inputField.ma -
                                inputField.gpf -
                                inputField.gsli -
                                (inputField.ph === 0
                                  ? 0
                                  : ptaxCalc(
                                      gross(inputField.mbasic, inputField.addl)
                                    ))
                            ),
                          });
                        } else {
                          setInputField({
                            ...inputField,
                            tsname: inputField.tname,
                            gp: e.target.value,
                            da: funcda(inputField.mbasic),
                            mda: funcmda(inputField.mbasic),
                            hra: funchra(inputField.mbasic),
                            mhra: funcmhra(inputField.mbasic),
                            mgross: gross(inputField.mbasic, inputField.addl),
                            gross: gross(inputField.basic, inputField.addl),
                            netpay: netpay(
                              inputField.basic,
                              inputField.addl,
                              inputField.ph,
                              inputField.gpf,
                              inputField.gsli
                            ),
                            mnetpay: netpay(
                              inputField.mbasic,
                              inputField.addl,
                              inputField.ph,
                              inputField.gpf,
                              inputField.gsli
                            ),
                            mptax: ptaxCalc(
                              gross(inputField.mbasic, inputField.addl)
                            ),
                            jptax: ptaxCalc(
                              gross(inputField.basic, inputField.addl)
                            ),
                            rank: totalTeachers + 1,
                            netpayword: NumInWords(
                              inputField.basic +
                                inputField.addl +
                                inputField.basic * DA +
                                inputField.basic * HRA +
                                inputField.ma -
                                inputField.gpf -
                                inputField.gsli -
                                (inputField.ph === 0
                                  ? 0
                                  : ptaxCalc(
                                      gross(inputField.mbasic, inputField.addl)
                                    ))
                            ),
                          });
                        }
                      }}
                    >
                      <option value="">Select GP From Below</option>
                      <option value="AMORAGORI">AMORAGORI</option>
                      <option value="BKBATI">BKBATI</option>
                      <option value="GAZIPUR">GAZIPUR</option>
                      <option value="JHAMTIA">JHAMTIA</option>
                      <option value="JHIKIRA">JHIKIRA</option>
                      <option value="JOYPUR">JOYPUR</option>
                      <option value="NOWPARA">NOWPARA</option>
                      <option value="THALIA">THALIA</option>
                    </select>
                    {errField.errgp.length > 0 && (
                      <span className="error">{errField.errgp}</span>
                    )}
                  </div>
                  <div className="mb-3 form-check col-md-6">
                    <button
                      type="submit"
                      className="btn btn-sm rounded btn-success m-2"
                      onClick={(e) => {
                        e.preventDefault();
                        submitForm();
                      }}
                    >
                      Add Teacher
                    </button>

                    <button
                      className="btn btn-sm rounded btn-danger m-2"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </button>

                    <button
                      type="reset"
                      className="btn btn-sm rounded btn-warning m-2"
                      onClick={resetForm}
                    >
                      Reset
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
