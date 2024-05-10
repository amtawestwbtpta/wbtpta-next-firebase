"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import axios from "axios";
import { firestore } from "../../context/FirbaseContext";
import { doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { decryptObjData, getCookie } from "../../modules/encryption";
import {
  getCurrentDateInput,
  getSubmitDateInput,
} from "../../modules/calculatefunctions";
const UpdateSelf = () => {
  const { access, setAccess } = useGlobalContext();
  const router = useRouter();
  useEffect(() => {
    if (!access) {
      router.push("/login");
    }
  }, []);
  let details = getCookie("tid");
  let userdetails;
  if (details) {
    userdetails = decryptObjData("tid");
  }

  let teachersID = userdetails?.teachersID;
  let id = userdetails?.id;
  let tname = userdetails?.tname;
  let school = userdetails?.school;
  let phone = userdetails?.phone;
  let email = userdetails?.email;
  let dob = userdetails?.dob;
  let doj = userdetails?.doj;
  let dojnow = userdetails?.dojnow;
  let dor = userdetails?.dor;
  let account = userdetails?.account;
  let empid = userdetails?.empid;
  let pan = userdetails?.pan;
  let address = userdetails?.address;
  let bonus = userdetails?.bonus;
  let arrear = userdetails?.arrear;

  let fname = userdetails?.fname;

  const [inputField, setInputField] = useState({
    id: id,
    empid: empid,
    tname: tname,
    fname: fname,
    email: email,
    phone: phone,
    account: account,
    pan: pan,
    dob: dob,
    doj: doj,
    dojnow: dojnow,
    dor: dor,
    arrear: arrear,
    bonus: bonus,
    address: address,
  });
  const [errField, setErrField] = useState({
    errtname: "",
    errfname: "",
    erremail: "",
    errphone: "",
    erraccount: "",
    errpan: "",
    errarrear: "",
    errbonus: "",
    erraddress: "",
  });
  const validForm = () => {
    let formIsValid = true;

    setErrField({
      errtname: "",
      errfname: "",
      erremail: "",
      errphone: "",
      erraccount: "",
      errpan: "",
      errdob: "",
      errdoj: "",
      errdojnow: "",
      errdor: "",
      errarrear: "",
      errbonus: "",
      erraddress: "",
    });
    if (inputField.tname === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errtname: "Please Enter Teacher Name",
      }));
    }
    if (inputField.fname === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errfname: "Please Enter Father's Name",
      }));
    }
    if (inputField.email === "" || !ValidateEmail(inputField.email)) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        erremail: "Please Enter Valid email",
      }));
    }
    if (inputField.phone === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errphone: "Please Enter Phone No.",
      }));
    }

    if (inputField.account === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        erraccount: "Please Enter Account No.",
      }));
    }
    if (inputField.pan === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errpan: "Please Enter PAN No.",
      }));
    }

    if (inputField.arrear === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errarrear: "Please Enter Arrear Amount.",
      }));
    }
    if (inputField.bonus === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        errbonus: "Please Enter Bonus Amount.",
      }));
    }
    if (inputField.address === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        erraddress: "Please Enter Address Amount.",
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
  const updateBtn = async () => {
    if (validForm()) {
      try {
        const url = `/api/updself`;
        let response = await axios.post(url, inputField);
        let record = response.data;
        if (response.status === 200) {
          const docRef = doc(firestore, "teachers", teachersID);
          await updateDoc(docRef, inputField);
          const docRef2 = doc(firestore, "userteachers", id);
          await updateDoc(docRef2, {
            empid: empid,
            tname: tname,
            email: email,
            phone: phone,
            pan: pan,
          });
          toast.success("Congrats! You Profile Datas Chaged Successfully!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            router.push("/logout");
          }, 1500);
        } else {
          toast.error("Something Went Wrong!", {
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
        toast.error("Updation Failed", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.clear();
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } else {
      toast.error("Form Is Invalid", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="container mt-5">
      <div className=" font-weight-bold d-flex justify-content-center">
        <h5>
          DISPLAYING DETAILED DATA OF {tname} of {school}
        </h5>
      </div>
      <form method="post" className="container">
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="row">
          <div className="input-group mb-3 col-md-6">
            <label className="input-group-text">Full Name</label>
            <input
              onChange={(e) =>
                setInputField({ ...inputField, tname: e.target.value })
              }
              type="text"
              className="form-control"
              id="tname"
              name="tname"
              placeholder="Full Name"
              defaultValue={tname}
            />
            {errField.errtname.length > 0 && (
              <span className="error">{errField.errtname}</span>
            )}
          </div>
          <div className="input-group mb-3 col-md-4">
            <label className="input-group-text">Father's Name</label>
            <input
              onChange={(e) =>
                setInputField({ ...inputField, fname: e.target.value })
              }
              type="text"
              className="form-control"
              id="fname"
              name="fname"
              placeholder="Father's Name"
              defaultValue={fname}
            />
            {errField.errfname.length > 0 && (
              <span className="error">{errField.errfname}</span>
            )}
          </div>
          <div className="input-group mb-3 col-md-4">
            <label className="input-group-text">Email address</label>
            <input
              onChange={(e) =>
                setInputField({ ...inputField, email: e.target.value })
              }
              type="email"
              className="form-control"
              id="Email"
              name="email"
              placeholder="Email"
              defaultValue={email}
            />
            {errField.erremail.length > 0 && (
              <span className="error">{errField.erremail}</span>
            )}
          </div>
          <div className="input-group mb-3 col-md-4">
            <label className="input-group-text">Mobile No.</label>
            <input
              onChange={(e) =>
                setInputField({ ...inputField, phone: e.target.value })
              }
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Mobile No."
              defaultValue={phone}
            />
            {errField.errphone.length > 0 && (
              <span className="error">{errField.errphone}</span>
            )}
          </div>
          <div className="input-group mb-3 col-md-4">
            <label className="input-group-text">Salary Account No.</label>
            <input
              onChange={(e) =>
                setInputField({ ...inputField, account: e.target.value })
              }
              type="text"
              className="form-control"
              id="account"
              name="account"
              placeholder="Salary Account No."
              defaultValue={account}
            />
            {errField.erraccount.length > 0 && (
              <span className="error">{errField.erraccount}</span>
            )}
          </div>
          <div className="input-group mb-3 col-md-4">
            <label className="input-group-text">PAN No.</label>
            <input
              onChange={(e) =>
                setInputField({ ...inputField, pan: e.target.value })
              }
              type="text"
              className="form-control"
              id="pan"
              name="pan"
              placeholder="PAN No."
              defaultValue={pan}
            />
            {errField.errpan.length > 0 && (
              <span className="error">{errField.errpan}</span>
            )}
          </div>
          <div className="input-group mb-3 col-md-4">
            <label className="input-group-text">Date Of Birth:</label>

            <input
              onChange={(e) =>
                setInputField({
                  ...inputField,
                  dob: getSubmitDateInput(e.target.value),
                })
              }
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              defaultValue={getCurrentDateInput(dob)}
              required
            />
          </div>
          <div className="input-group mb-3 col-md-4">
            <label className="input-group-text">Date Of Joining:</label>

            <input
              onChange={(e) =>
                setInputField({
                  ...inputField,
                  doj: e.target.value,
                })
              }
              type="date"
              className="form-control"
              id="doj"
              name="doj"
              defaultValue={getCurrentDateInput(doj)}
              required
            />
          </div>
          <div className="input-group mb-3 col-md-4">
            <label className="input-group-text">
              Date Of Joining in Current School:
            </label>

            <input
              onChange={(e) =>
                setInputField({
                  ...inputField,
                  dojnow: getSubmitDateInput(e.target.value),
                })
              }
              type="date"
              className="form-control"
              id="dojnow"
              name="dojnow"
              defaultValue={getCurrentDateInput(dojnow)}
              required
            />
          </div>
          <div className="input-group mb-3 col-md-4">
            <label className="input-group-text">Date Of Retirement:</label>

            <input
              onChange={(e) =>
                setInputField({
                  ...inputField,
                  dor: getSubmitDateInput(e.target.value),
                })
              }
              type="date"
              className="form-control"
              id="dor"
              name="dor"
              defaultValue={getCurrentDateInput(dor)}
              required
            />
          </div>

          <div className="input-group mb-3 col-md-4">
            <label className="input-group-text">Total Arrear Received</label>
            <input
              onChange={(e) =>
                setInputField({ ...inputField, arrear: e.target.value })
              }
              type="number"
              className="form-control"
              id="arrear"
              name="arrear"
              placeholder="Total Arrear Received"
              defaultValue={arrear}
            />
            {errField.errarrear.length > 0 && (
              <span className="error">{errField.errarrear}</span>
            )}
          </div>
          <div className="input-group mb-3 col-md-4">
            <label className="input-group-text">Bonus Recived</label>
            <input
              onChange={(e) =>
                setInputField({ ...inputField, bonus: e.target.value })
              }
              type="number"
              className="form-control"
              id="bonus"
              name="bonus"
              placeholder="Bonus Recived"
              defaultValue={bonus}
            />
            {errField.errbonus.length > 0 && (
              <span className="error">{errField.errbonus}</span>
            )}
          </div>
          <div className="input-group mb-3 col-md-4">
            <label className="input-group-text">Address</label>
            <textarea
              onChange={(e) =>
                setInputField({ ...inputField, address: e.target.value })
              }
              name="address"
              id="address"
              cols="3"
              rows="3"
              className="form-control"
              defaultValue={address}
              style={{ resize: "none" }}
              required
            />
            {errField.erraddress.length > 0 && (
              <span className="error">{errField.erraddress}</span>
            )}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary m-1"
          onClick={updateBtn}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-danger m-1"
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateSelf;
