"use client";

import ropa from "../../modules/ropa";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { decryptObjData, getCookie } from "../../modules/encryption";
import { DA, HRA, NEXTDA } from "../../modules/constants";
import {
  GetMonthName,
  NumInWords,
  RoundTo,
  months,
  printDate,
} from "../../modules/calculatefunctions";
const PayslipWbtpta = () => {
  const { state, stateObject } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    document.title = `PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR THE MONTH OF ${lastmonth?.toUpperCase()}`;
    if (!state) {
      router.push("/login");
    }
  });

  let details = stateObject;
  let {
    tname,
    desig,
    school,
    disability,
    empid,
    pan,
    basic,
    mbasic,
    prevmbasic,
    addl,
    da,
    hra,
    ma,
    gross,
    gpf,
    gpfprev,
    julyGpf,
    ptax,
    gsli,
    udise,
    dataYear,
  } = details;

  let netpay;
  let pfund;
  let basicpay;

  let today = new Date();
  let date = new Date();
  const [index, setIndex] = useState(today.getMonth());
  const [month, setMonth] = useState(GetMonthName(today.getMonth() - 1));
  let lastmonth = GetMonthName(today.getMonth() - 1);

  if (dataYear === date.getFullYear()) {
    if (index > 6) {
      basicpay = basic;
      da = Math.round(basicpay * DA);
      pfund = julyGpf;
    } else if (index < 7 || index > 3) {
      basicpay = basic;
      da = Math.round(basicpay * DA);
      pfund = gpf;
    } else {
      basicpay = mbasic;
      pfund = gpfprev;
      da = Math.round(basicpay * PREVDA);
    }
  } else if (dataYear === date.getFullYear() - 1) {
    basicpay = prevmbasic;
    da = Math.round(basicpay * PREV6DA);
    pfund = gpfprev;
  } else {
    pfund = gpf;
    if (index > 6) {
      basicpay = RoundTo(basic + basic * 0.03, 100);
      da = Math.round(basicpay * NEXTDA);
    } else {
      basicpay = basic;
      da = Math.round(basicpay * DA);
    }
  }
  let level = ropa(basicpay).lv;
  let cell = ropa(basicpay).ce;

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

  let deduction = gsli + pfund + ptax;

  netpay = gross - deduction;

  useEffect(() => {
    document.title = `PAYSLIP OF ${tname.toUpperCase()} OF ${school.toUpperCase()}`;
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
  }, [month, index]);

  return (
    <Suspense>
      <div
        className="my-5 container"
        style={{
          fontFamily: "Times New Roman",
          color: "#000",
        }}
      >
        <div className="mx-auto my-3 noprint">
          <button
            type="button"
            className="btn btn-primary text-white font-weight-bold p-2 rounded"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print();
              }
            }}
          >
            Print Payslip
          </button>
        </div>

        <div className="mx-auto noprint mb-5">
          <button
            type="button"
            className="btn btn-info text-white font-weight-bold p-2 rounded"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
        <div className="mx-auto my-3 col-md-2 noprint">
          <h6 className="text-primary">Select Salary Month:</h6>
          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-sm example"
            name="Month"
            required
            defaultValue={month + "-" + (index + 1)}
            onChange={(e) => {
              setMonth(e.target.value.split("-")[0]);
              setIndex(parseInt(e.target.value.split("-")[1]));
            }}
          >
            <option value="">Select Month </option>
            {months.map((el, ind) => {
              return (
                <option value={el + "-" + (ind + 1)} key={ind}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <h4 className="mb-2">
            WEST BENGAL TRAINAMOOL PRIMARY TEACHERS' ASSOCIATION
          </h4>
          <h5 className="mb-2">
            * AMTA WEST CIRCLE * HOWRAH GRAMIN DISTRICT *
          </h5>
          <h5>
            * Sikshak Bhawan, Vill.- Joypur Fakirdas, P.O.- Joypur, P.S.-
            JoyPur, District- Howrah, PIN-711401. *
          </h5>
        </div>

        <h4 className="my-4 border-2">
          PAY SLIP FOR THE MONTH OF {month.toUpperCase()},
          {lastmonth?.toUpperCase() === "DECEMBER"
            ? today.getFullYear() - 1
            : today.getFullYear()}
        </h4>
        <div className="row">
          <table
            className="table table-bordered  border-1 border-black"
            width={"100%"}
            style={{
              border: "1px solid",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            <tr>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
                colSpan="2"
              >
                TEACHER'S NAME
              </th>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
                colSpan="3"
              >
                <p className="text-center fs-5">{tname}</p>
              </th>
            </tr>
            <tr>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                DESIGNATION:
              </th>

              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                ID
              </th>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                PAN:
              </th>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
                colSpan="2"
                rowSpan={2}
              >
                {level}, {cell}
              </th>
            </tr>
            <tr>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                {desig}
              </th>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                {empid}
              </th>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                {pan}
              </th>
            </tr>
            <tr>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                SCHOOL NAME
              </th>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
                colSpan="4"
              >
                <p className="text-center fs-5">
                  {school}, UDISE:({udise})
                </p>
              </th>
            </tr>
            <tr>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
                colSpan="2"
              >
                EARNINGS
              </th>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
                colSpan="2"
              >
                DEDUCTIONS
              </th>
              <td
                rowSpan="7"
                style={{
                  wordWrap: "break-word",
                  minWidth: "50px",
                  maxWidth: "50px",
                  border: "1px solid",
                }}
              >
                <p className="text-danger text-wrap text-center">
                  <b>REMARKS:</b>
                  <br /> This Payslip is Only For Reference Purpose. It can not
                  be used as a Valid Proof of Salary. Please Use Payslip which
                  is available form SIS Office as a Valid Salary Proof.
                </p>
              </td>
            </tr>
            <tr>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                BASIC PAY
              </th>
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid",
                  fontSize: "16px",
                }}
              >
                {basicpay}
              </td>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                GPF
              </th>
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid",
                  fontSize: "16px",
                }}
              >
                {pfund}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                ADDL. REMUN.
              </th>
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid",
                  fontSize: "16px",
                }}
              >
                {addl}
              </td>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                PTAX
              </th>
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid",
                  fontSize: "16px",
                }}
              >
                {ptax}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                DA
              </th>
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid",
                  fontSize: "16px",
                }}
              >
                {da}
              </td>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                GSLI
              </th>
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid",
                  fontSize: "16px",
                }}
              >
                {gsli}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                HRA
              </th>
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid",
                  fontSize: "16px",
                }}
              >
                {hra}
              </td>
              <td
                rowSpan="2"
                colSpan="2"
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                <img
                  src="https://raw.githubusercontent.com/ultimate365/jsondata/main/logo.png"
                  alt="LOGO"
                  width={"100vw"}
                  className="opacity-25 p-2"
                />
              </td>
            </tr>
            <tr>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                MA
              </th>
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid",
                  fontSize: "16px",
                }}
              >
                {ma}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                GROSS SALARY
              </th>
              <td
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                {gross}
              </td>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                TOTAL DEDUCTIONS
              </th>
              <td
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                {deduction}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                NET SALARY
              </th>
              <td
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                {netpay}
              </td>
              <td
                style={{
                  border: "1px solid",
                  textAlign: "center",
                  fontSize: "16px",
                }}
                colSpan="4"
              >
                {NumInWords(netpay)}
              </td>
            </tr>
          </table>
        </div>

        <div
          className="d-flex justify-content-between align-items-center fw-bold pt-2"
          style={{ borderTop: "1px solid", marginTop: "100px" }}
        >
          <a
            className="d-inline-block text-decoration-none text-left text-dark fst-italic"
            href="https://awwbtpta.github.io/web"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://awwbtpta.github.io/web
          </a>
          <p>Page-1</p>
          <p className="fst-italic">{printDate()}</p>
        </div>
      </div>
    </Suspense>
  );
};

export default PayslipWbtpta;
