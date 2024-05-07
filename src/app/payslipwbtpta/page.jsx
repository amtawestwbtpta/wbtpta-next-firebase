"use client";

import ropa from "../../modules/ropa";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { decryptObjData, getCookie } from "../../modules/encryption";
const PayslipWbtpta = () => {
  const { access, setAccess } = useGlobalContext();
  const router = useRouter();

  const searchParams = useSearchParams();

  let details = JSON.parse(searchParams.get("details"));
  let tname,
    desig,
    school,
    disability,
    empid,
    pan,
    basic,
    mbasic,
    addl,
    da,
    hra,
    ma,
    gross,
    gpf,
    ptax,
    gsli,
    udise;
  let userdetails = getCookie("uid");
  let userDcryptedDetails;
  if (!details) {
    if (userdetails) {
      userDcryptedDetails = decryptObjData("tid");
      tname = userDcryptedDetails.tname;
      desig = userDcryptedDetails.desig;
      udise = userDcryptedDetails.udise;
      school = userDcryptedDetails.school;
      empid = userDcryptedDetails.empid;
      disability = userDcryptedDetails.disability;
      pan = userDcryptedDetails.pan;
      basic = parseInt(userDcryptedDetails.basic);
      mbasic = parseInt(userDcryptedDetails.mbasic);
      addl = parseInt(userDcryptedDetails.addl);
      ma = parseInt(userDcryptedDetails.ma);
      gpf = parseInt(userDcryptedDetails.gpf);
      gsli = parseInt(userDcryptedDetails.gsli);
    }
  } else {
    tname = details.tname;
    desig = details.desig;
    school = details.school;
    disability = details.disability;
    empid = details.empid;
    pan = details.pan;
    basic = parseInt(details.basic);
    mbasic = parseInt(details.mbasic);
    addl = parseInt(details.addl);
    ma = parseInt(details.ma);
    gpf = parseInt(details.gpf);
    gsli = parseInt(details.gsli);
    udise = details.udise;
  }

  let netpay;

  let basicpay;

  let today = new Date();
  let date = new Date();

  let lastmonth = GetMonthName(today.getMonth() - 1);
  if (date.getMonth() === 0 || date.getMonth() === 1 || date.getMonth() === 3) {
    basicpay = basic;
  } else {
    basicpay = mbasic;
  }
  let level = ropa(basicpay).lv;
  let cell = ropa(basicpay).ce;
  let dapercent = lastmonth.toUpperCase() === "DECEMBER" ? 6 / 100 : 10 / 100;
  let hrapercent = 12 / 100;

  da = Math.round(basicpay * dapercent);
  hra = Math.round(basicpay * hrapercent);

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

  function NumInWords(number) {
    const first = [
      "",
      "one ",
      "two ",
      "three ",
      "four ",
      "five ",
      "six ",
      "seven ",
      "eight ",
      "nine ",
      "ten ",
      "eleven ",
      "twelve ",
      "thirteen ",
      "fourteen ",
      "fifteen ",
      "sixteen ",
      "seventeen ",
      "eighteen ",
      "nineteen ",
    ];
    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];
    const mad = ["", "thousand", "million", "billion", "trillion"];
    let word = "";

    for (let i = 0; i < mad.length; i++) {
      let tempNumber = number % (100 * Math.pow(1000, i));
      if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
        if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
          word = titleCase(
            first[Math.floor(tempNumber / Math.pow(1000, i))] +
              mad[i] +
              " " +
              word
          );
        } else {
          word = titleCase(
            tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] +
              " " +
              first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] +
              mad[i] +
              " " +
              word
          );
        }
      }

      tempNumber = number % Math.pow(1000, i + 1);
      if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0)
        word = titleCase(
          first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] +
            "hunderd " +
            word
        );
    }
    // return word;
    return `Rupees ${word} Only`;
  }

  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }

  function GetMonthName(monthNumber) {
    monthNumber = monthNumber < 0 ? 11 : monthNumber;
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNumber];
  }

  function printDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const nthNumber = (number) => {
      return number > 0
        ? ["th", "st", "nd", "rd"][
            (number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10
          ]
        : "";
    };

    return `Date of Generation  ${day}${nthNumber(day)} of ${month}, ${year} `;
  }

  useEffect(() => {
    document.title = `PAYSLIP OF ${tname.toUpperCase()} OF ${school.toUpperCase()} FOR THE MONTH OF ${lastmonth.toUpperCase()}`;
    if (!access) {
      router.push("/login");
    }
  }, []);
  return (
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
          onClick={window.print}
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
      <div>
        <h4 className="mb-2">
          WEST BENGAL TRAINAMOOL PRIMARY TEACHERS' ASSOCIATION
        </h4>
        <h5 className="mb-2">* AMTA WEST CIRCLE * HOWRAH GRAMIN DISTRICT *</h5>
        <h5>
          * Sikshak Bhawan, Vill.- Joypur Fakirdas, P.O.- Joypur, P.S.- JoyPur,
          District- Howrah, PIN-711401. *
        </h5>
      </div>

      <h4 className="my-4 border-2">
        PAY SLIP FOR THE MONTH OF {lastmonth.toUpperCase()},
        {lastmonth.toUpperCase() === "DECEMBER"
          ? today.getFullYear() - 1
          : today.getFullYear()}
      </h4>
      <div className="row">
        <table
          className="table table-bordered  border-1 border-black"
          width={"100%"}
          style={{ border: "1px solid", textAlign: "center", fontSize: "16px" }}
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
                <br /> This Payslip is Only For Reference Purpose. It can not be
                used as a Valid Proof of Salary. Please Use Payslip which is
                available form SIS Office as a Valid Salary Proof.
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
              {gpf}
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
  );
};

export default PayslipWbtpta;
