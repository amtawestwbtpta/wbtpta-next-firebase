"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../context/Store";
import { NumInWords } from "../../modules/calculatefunctions";
import { DA, HRA } from "../../modules/constants";

const ViewDetails = () => {
  const { state, stateObject } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (state !== "admin") {
      localStorage.clear();
      router.push("/logout");
    }
  }, []);

  const details = stateObject;

  // let id = details.id;
  // let circle = details.circle;
  // let sl = details.sl;
  let udise = details.udise;
  // let tsname = details.tsname;
  let tname = details.tname;
  let desig = details.desig;
  let school = details.school;
  let disability = details.disability;
  // let sis = details.sis;
  let gp = details.gp;
  // let association = details.association;
  let phone = details.phone;
  let email = details.email;
  let dob = details.dob;
  let doj = details.doj;
  let dojnow = details.dojnow;
  let dor = details.dor;
  let bank = details.bank;
  let account = details.account;
  let ifsc = details.ifsc;
  let empid = details.empid;
  let training = details.training;
  let pan = details.pan;

  let address = details.address;
  let basic = details.basic;
  let mbasic = details.mbasic;
  let addl = details.addl;
  let da = details.da;
  let hra = details.hra;
  let ma = details.ma;
  let gross = details.gross;
  let gpf = details.gpf;
  let ptax = details.ptax;
  let gsli = details.gsli;
  let fname = details.fname;
  let question = details.question;
  let hoi = details.hoi;

  let date = new Date();
  let basicpay, netpay;
  let junelast = new Date(`${date.getFullYear()}-07-31`);
  if (date >= junelast) {
    basicpay = basic;
  } else {
    basicpay = mbasic;
  }
  da = Math.round(basicpay * DA);
  hra = Math.round(basicpay * HRA);

  gross = basicpay + da + hra + addl + ma;

  if (gross > 40000) {
    ptax = 200;
  } else if (gross > 25000) {
    ptax = 150;
  } else if (gross > 15000) {
    ptax = 130;
  } else if (gross > 10000) {
    ptax = 110;
  } else {
    ptax = 0;
  }

  if (disability === "YES") {
    ptax = 0;
  }

  let deduction = gsli + gpf + ptax;

  netpay = gross - deduction;
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Teacher's Details";
  }, []);
  return (
    <div className="container my-5 text-center d-flex flex-column justify-content-center">
      <h6 className="text-primary my-3 text center">
        Details of {tname} of {school}
      </h6>
      <div className="row d-flex justify-content-center text-black">
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Teacher Name: </label>
          </div>
          <div>
            <p>{tname}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Father's Name: </label>
          </div>
          <div>
            <p>{fname}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>School Name: </label>
          </div>
          <div>
            <p>{school}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>UDISE: </label>
          </div>
          <div>
            <p>{udise}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Designation: </label>
          </div>
          <div>
            <p>{desig}</p>
          </div>
        </div>
        {disability === "YES" ? (
          <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
            <div>
              <label>Is Disable? </label>
            </div>
            <div>
              <p>{disability}</p>
            </div>
          </div>
        ) : null}
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Is HOI? </label>
          </div>
          <div>
            <p>{hoi}</p>
          </div>
        </div>
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Gram Panchayet: </label>
          </div>
          <div>
            <p>{gp}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Mobile: </label>
          </div>
          <div>
            <a
              href={`tel: +91${phone}`}
              className="d-inline-block fs-6 text-decoration-none text-dark"
            >
              {phone}
            </a>
            <br />
          </div>
        </div>
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Email: &nbsp; </label>
          </div>
          <div className="blank"></div>
          <div>
            <p>{email}</p>
          </div>
        </div>
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Date of Birth: </label>
          </div>
          <div>
            <p>{dob}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Date of Joining: </label>
          </div>
          <div>
            <p>{doj}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>DOJ in Present School: </label>
          </div>
          <div>
            <p>{dojnow}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Date of Retirement: </label>
          </div>
          <div>
            <p>{dor}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Employee ID: </label>
          </div>
          <div>
            <p>{empid}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Training: </label>
          </div>
          <div>
            <p>{training}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>PAN: </label>
          </div>
          <div>
            <p>{pan}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Address: </label>
          </div>
          <div>
            <p>{address}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>BANK: </label>
          </div>
          <div>
            <p>{bank}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Account No: </label>
          </div>
          <div>
            <p>{account}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>IFS Code: </label>
          </div>
          <div>
            <p>{ifsc}</p>
            <p id="ifsc" className="text-wrap"></p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>BASIC: </label>
          </div>
          <div>
            <p>{basicpay}</p>
          </div>
        </div>
        {addl > 0 ? (
          <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
            <div>
              <label>Additional Allowance: </label>
            </div>
            <div>
              <p>{addl}</p>
            </div>
          </div>
        ) : null}
        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>DA: </label>
          </div>
          <div>
            <p>{da}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>HRA: </label>
          </div>
          <div>
            <p>{hra}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>MA: </label>
          </div>
          <div>
            <p>{ma}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Gross Pay: </label>
          </div>
          <div>
            <p>{gross}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>GPF: </label>
          </div>
          <div>
            <p>{gpf}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>P. TAX: </label>
          </div>
          <div>
            <p>{ptax}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>GSLI: </label>
          </div>
          <div>
            <p>{gsli}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Netpay: </label>
          </div>
          <div>
            <p>{netpay}</p>
          </div>
        </div>

        <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
          <div>
            <label>Netpay in Words: </label>
          </div>
          <div>
            <p>{NumInWords(netpay)}</p>
          </div>
        </div>
        {question === "admin" ? (
          <div className="bg-light rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2">
            <div>
              <label>Question state: </label>
            </div>
            <div>
              <p>{question}</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="col-md-4 mx-auto">
        <button
          type="button"
          className="btn btn-success btn-sm noprint m-3"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.print();
            }
          }}
        >
          Print
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm noprint m-3"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ViewDetails;
