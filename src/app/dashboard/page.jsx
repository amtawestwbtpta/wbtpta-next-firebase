"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Typed from "typed.js";
import {
  decryptObjData,
  encryptData,
  getCookie,
} from "../../modules/encryption";
import {
  NumInWords,
  IndianFormat,
  RoundTo,
} from "../../modules/calculatefunctions";
import { useGlobalContext } from "../../context/Store";
import { DA, HRA } from "../../modules/constants";
const page = () => {
  const { state, setState } = useGlobalContext();
  const router = useRouter();
  const el = React.useRef(null);
  const [tooltip, setTooltip] = useState(false);
  let teacherdetails,
    userdetails,
    udise,
    tname,
    desig,
    disability,
    school,
    gp,
    url,
    phone,
    email,
    dob,
    doj,
    dojnow,
    dor,
    bank,
    account,
    ifsc,
    empid,
    training,
    pan,
    address,
    basic,
    mbasic,
    ma,
    gpf,
    gpfprev,
    ptax,
    gsli,
    addl,
    fname;
  let details = getCookie("tid");
  if (details) {
    teacherdetails = decryptObjData("tid");
    userdetails = decryptObjData("uid");
    udise = teacherdetails.udise;
    tname = teacherdetails.tname;
    desig = teacherdetails.desig;
    disability = teacherdetails.disability;
    school = teacherdetails.school;
    gp = teacherdetails.gp;
    url = userdetails.url;
    phone = teacherdetails.phone;
    email = teacherdetails.email;
    dob = teacherdetails.dob;
    doj = teacherdetails.doj;
    dojnow = teacherdetails.dojnow;
    dor = teacherdetails.dor;
    bank = teacherdetails.bank;
    account = teacherdetails.account;
    ifsc = teacherdetails.ifsc;
    empid = teacherdetails.empid;
    training = teacherdetails.training;
    pan = teacherdetails.pan;
    address = teacherdetails.address;
    basic = teacherdetails.basic;
    mbasic = teacherdetails.mbasic;
    ma = teacherdetails.ma;
    addl = teacherdetails.addl;
    gpf = teacherdetails.gpf;
    gpfprev = teacherdetails.gpfprev;

    gsli = teacherdetails.gsli;
    fname = teacherdetails.fname;
  }

  let date = new Date();
  let setda, sethra, setgross, setbasicpay, setnetpay, pfund;
  let junelast = new Date(`${date.getFullYear()}-07-31`);
  if (date >= junelast) {
    setbasicpay = basic;
    pfund = gpf;
  } else if (
    date.getMonth() === 0 ||
    date.getMonth() === 1 ||
    date.getMonth() === 3
  ) {
    setbasicpay = basic;

    pfund = gpf;
  } else {
    setbasicpay = mbasic;

    pfund = gpfprev;
  }
  setda = Math.round(setbasicpay * DA);
  sethra = Math.round(setbasicpay * HRA);
  setgross = setbasicpay + setda + sethra + addl + ma;
  if (setgross > 40000) {
    ptax = 200;
  } else if (setgross > 25000) {
    ptax = 150;
  } else if (setgross > 15000) {
    ptax = 130;
  } else if (setgross > 10000) {
    ptax = 110;
  } else {
    ptax = 0;
  }

  if (disability === "YES") {
    ptax = 0;
  }
  setnetpay = setgross - pfund - ptax - gsli;

  const [hide, setHide] = useState(false);
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Dashboard";

    const typed = new Typed(el.current, {
      strings: [`Welcome ${tname},<br /> ${desig}, of <br /> ${school}`],
      typeSpeed: 50,
      loop: true,
      loopCount: Infinity,
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!state) {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container my-2">
      <div
        className="col-md-3 mx-auto "
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
      >
        <img
          src={url}
          alt="profile"
          className="profileImage"
          onClick={() => router.push("/ChangePhoto")}
        />
        <div className="mx-auto">
          {tooltip && (
            <span className="text-success">Change Profile Photo</span>
          )}
        </div>
      </div>
      <div className="mx-auto my-2" style={{ height: "120px" }}>
        <span
          className="text-primary text-center fs-3 mb-3 web-message"
          ref={el}
        />
      </div>

      <button
        type="button"
        className="btn rounded btn-info my-3"
        onClick={(e) => {
          hide === false
            ? (e.currentTarget.textContent = "Hide Your Data")
            : (e.currentTarget.textContent = "Show Your Data");

          setHide(!hide);
        }}
      >
        Show Your Data
      </button>
      <div className="container text-center d-flex flex-column justify-content-center">
        {hide ? (
          <div className="row d-flex justify-content-center text-black">
            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Teacher Name: </label>
              </div>
              <div>
                <p>{tname}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Father's Name: </label>
              </div>
              <div>
                <p>{fname}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>School Name: </label>
              </div>
              <div>
                <p>{school}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>UDISE: </label>
              </div>
              <div>
                <p>{udise}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Designation: </label>
              </div>
              <div>
                <p>{desig}</p>
              </div>
            </div>
            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Gram Panchayet: </label>
              </div>
              <div>
                <p>{gp}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Mobile: </label>
              </div>
              <div>
                <a
                  href="tel: +91{phone}"
                  className="d-inline-block fs-6 text-decoration-none text-dark"
                >
                  {phone}
                </a>
                <br />
              </div>
            </div>
            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Email: &nbsp; </label>
              </div>
              <div className="blank"></div>
              <div>
                <p>{email}</p>
              </div>
            </div>
            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Date of Birth: </label>
              </div>
              <div>
                <p>{dob}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Date of Joining: </label>
              </div>
              <div>
                <p>{doj}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>DOJ in Present School: </label>
              </div>
              <div>
                <p>{dojnow}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Date of Retirement: </label>
              </div>
              <div>
                <p>{dor}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Employee ID: </label>
              </div>
              <div>
                <p>{empid}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Training: </label>
              </div>
              <div>
                <p>{training}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>PAN: </label>
              </div>
              <div>
                <p>{pan}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Address: </label>
              </div>
              <div>
                <p>{address}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>BANK: </label>
              </div>
              <div>
                <p>{bank}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Account No: </label>
              </div>
              <div>
                <p>{account}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>IFS Code: </label>
              </div>
              <div>
                <p>{ifsc}</p>
                <p id="ifsc" className="text-wrap"></p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>BASIC: </label>
              </div>
              <div>
                <p>{setbasicpay}</p>
              </div>
            </div>
            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>DA: </label>
              </div>
              <div>
                <p>{setda}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>HRA: </label>
              </div>
              <div>
                <p>{sethra}</p>
              </div>
            </div>

            {ma > 0 && (
              <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                <div>
                  <label>MA: </label>
                </div>
                <div>
                  <p>{ma}</p>
                </div>
              </div>
            )}
            {addl > 0 && (
              <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                <div>
                  <label>ADDL. REMUN.: </label>
                </div>
                <div>
                  <p>{addl}</p>
                </div>
              </div>
            )}

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Gross Pay: </label>
              </div>
              <div>
                <p>{setgross}</p>
              </div>
            </div>

            {gpf > 0 ? (
              gpf === gpfprev ? (
                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>GPF: </label>
                  </div>
                  <div>
                    <p>{gpf}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                  <div>
                    <label>March GPF: </label>
                  </div>
                  <div>
                    <p>{gpfprev}</p>
                  </div>
                  <div>
                    <label>April GPF: </label>
                  </div>
                  <div>
                    <p>{gpf}</p>
                  </div>
                </div>
              )
            ) : null}

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>P. TAX: </label>
              </div>
              <div>
                <p>{ptax}</p>
              </div>
            </div>

            {gsli > 0 && (
              <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
                <div>
                  <label>GSLI: </label>
                </div>
                <div>
                  <p>{gsli}</p>
                </div>
              </div>
            )}

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Netpay: </label>
              </div>
              <div>
                <p>{setnetpay}</p>
              </div>
            </div>

            <div className="bg-info rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
              <div>
                <label>Netpay in Words: </label>
              </div>
              <div>
                <p>{NumInWords(setnetpay)}</p>
              </div>
            </div>
          </div>
        ) : null}
        <div>
          <Link className="btn btn-primary rounded" href="/update_self">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
