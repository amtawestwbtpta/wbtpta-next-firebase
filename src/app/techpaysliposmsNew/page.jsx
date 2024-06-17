"use client";

import ropa from "../../modules/ropa";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { decryptObjData, getCookie } from "../../modules/encryption";
import {
  NumInWords,
  GetMonthName,
  printDate,
  months,
} from "../../modules/calculatefunctions";
import { DA, HRA } from "../../modules/constants";
const PaySlipOsmsNew = () => {
  const { state, stateObject } = useGlobalContext();
  const router = useRouter();

  const searchParams = useSearchParams();

  // let details = JSON.parse(searchParams.get("details"));
  let details = stateObject;
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
    udise,
    bank,
    account,
    ifsc;

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
  bank = details.bank;
  account = details.account;
  ifsc = details.ifsc;

  let netpay;

  let basicpay;
  let date = new Date();
  let today = new Date();
  // let date = new Date();
  const [index, setIndex] = useState(today.getMonth());
  const [month, setMonth] = useState(GetMonthName(today.getMonth() - 1));
  // let junelast = new Date(`${date.getFullYear()}-07-31`);

  if (date.getMonth() === 0 || date.getMonth() === 1 || date.getMonth() === 3) {
    basicpay = basic;
  } else {
    basicpay = mbasic;
  }
  let level = ropa(basicpay).lv;
  let cell = ropa(basicpay).ce;
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

  let lastmonth = GetMonthName(today.getMonth() - 1);
  useEffect(() => {
    document.title = `PAYSLIP OF ${tname.toUpperCase()} OF ${school.toUpperCase()} FOR THE MONTH OF ${lastmonth.toUpperCase()}`;
    // eslint-disable-next-line
  }, []);
  useEffect(() => {}, [month, index]);
  useEffect(() => {
    if (state !== "admin") {
      router.push("/login");
    }
  }, []);
  return (
    <Suspense>
      <div>
        <div className="mx-auto my-3 noprint">
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
        <div
          className="containermain"
          style={{
            margin: 0,
            padding: 0,
            fontFamily: "Times",
            maxWidth: "960px",
            zoom: 0.9,
            whiteSpace: "nowrap",
            color: "#000",
          }}
        >
          <div class="main" style={{ zoom: "1.3" }}>
            <div
              class="top"
              style={{ fontSize: "smaller", margin: "10px auto" }}
            >
              <div>
                <img
                  class="img2"
                  src="https://firebasestorage.googleapis.com/v0/b/awwbtpta.appspot.com/o/images%2Fiosms.png?alt=media&token=f21c8d21-ac4e-4f2e-b416-2064d91ffe4f"
                  style={{ position: "absolute", width: 80, left: 10 }}
                  alt="OSMS LOGO"
                />
              </div>
              <div class="heading" style={{ margin: "auto", width: "100%" }}>
                <h5 style={{ textAlign: "center", marginLeft: -54 }}>
                  GOVT. OF WEST BENGAL
                </h5>
                <h5 style={{ textAlign: "center", marginLeft: -54 }}>
                  OFFICE OF THE SUB INSPECTOR OF SCHOOLS
                </h5>
                <h6
                  style={{
                    textAlign: "center",
                    marginLeft: -54,
                    color: "#004080",
                  }}
                >
                  AMTA WEST CIRCLE, HAORA
                </h6>
                <h5 style={{ textAlign: "center", marginLeft: -54 }}>
                  PAY SLIP FOR THE MONTH OF {month.toUpperCase()},
                  {today.getFullYear()}
                </h5>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary text-white font-weight-bold p-2 rounded noprint"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.print();
                }
              }}
            >
              Print Payslip
            </button>

            <div
              class="details"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: "0.8rem",
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <p>
                  <b>EMPLOYEE NAME:&nbsp;</b>
                  {tname}
                </p>
                <p>
                  <b>SCHOOL NAME:&nbsp;</b>
                  {school}(<b>UDISE:&nbsp;</b>
                  {udise})
                </p>
                <p>
                  <b>LEVEL:&nbsp;</b>
                  {level}&nbsp;<b>CELL:&nbsp;</b>
                  {cell}
                </p>
              </div>
              <div
                class="idDiv"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <p>
                  <b>EMPLOYEE ID:&nbsp;</b>
                  {empid}
                </p>
                <p>
                  <b>DESIGNATION:&nbsp;</b>
                  {desig}
                </p>
                <p>
                  <b>PAN:&nbsp;</b>
                  {pan}
                </p>
              </div>
            </div>

            <table
              class="myTable"
              style={{
                border: "1px solid",
                fontSize: "0.9rem",
                borderCollapse: "collapse",
              }}
            >
              <tr>
                <th
                  style={{
                    borderRight: "1px solid",
                    borderBottom: "1px solid",
                    padding: "2px 0 2px 0",
                    textAlign: "center",
                  }}
                  colSpan="2"
                >
                  EARNING(Rs)
                </th>
                <th
                  style={{
                    borderRight: "1px solid",
                    borderBottom: "1px solid",
                    padding: "2px 0 2px 0",
                    textAlign: "center",
                  }}
                  colSpan="2"
                >
                  DEDUCTION(Rs)
                </th>
                <th
                  style={{
                    borderRight: "1px solid",
                    borderBottom: "1px solid",
                    padding: "2px 0 2px 0",
                    textAlign: "center",
                  }}
                  colSpan="2"
                >
                  RECOVERIES OF LOAN(Rs)
                </th>
                <th
                  style={{
                    borderBottom: "1px solid",
                    padding: "2px 0 2px 0",
                    textAlign: "center",
                  }}
                  colSpan="2"
                >
                  OUT/ACCT.DED (Rs)
                </th>
              </tr>
              <tr>
                {desig === "AT" ? (
                  <>
                    <th style={{ textAlign: "left" }}>
                      <table>
                        <tr>
                          <th>BASIC</th>
                        </tr>
                        <tr>
                          <th>DA</th>
                        </tr>
                        <tr>
                          <th>HRA</th>
                        </tr>
                        <tr>
                          <th>MA</th>
                        </tr>
                        <tr>
                          <th>CA</th>
                        </tr>
                        <tr>
                          <th>CPF</th>
                        </tr>
                        <tr>
                          <th>IR</th>
                        </tr>
                      </table>
                    </th>
                    <td
                      style={{
                        textAlign: "left",
                        paddingRight: "10pt",
                        borderRight: "1px solid",
                      }}
                    >
                      <table style={{ marginRight: -30 }}>
                        <tr>
                          <td style={{ textAlign: "right" }}>{basicpay}</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>{da}</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>{hra}</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>{ma}</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>0</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>0</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>0</td>
                        </tr>
                      </table>
                    </td>
                    <th style={{ textAlign: "left" }}>
                      <table>
                        <tr>
                          <th>GPF</th>
                        </tr>
                        <tr>
                          <th>PF LOAN</th>
                        </tr>
                        <tr>
                          <th>CPF DEDUCT</th>
                        </tr>
                        <tr>
                          <th>PT</th>
                        </tr>
                        <tr>
                          <th>IT</th>
                        </tr>
                        <tr>
                          <th>GSLI</th>
                        </tr>
                        <tr>
                          <th>OVERDRAWN</th>
                        </tr>
                      </table>
                    </th>
                    <td
                      style={{
                        textAlign: "center",
                        borderRight: "1px solid",
                      }}
                    >
                      <table style={{ marginRight: "5px" }}>
                        <tr>
                          <td style={{ textAlign: "right" }}>{gpf}</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>0</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>0</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>{ptax}</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>0</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>{gsli}</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>0</td>
                        </tr>
                      </table>
                    </td>
                    <td
                      style={{ textAlign: "right", borderRight: "1px solid" }}
                    >
                      <table style={{ marginRight: 1 }}></table>
                    </td>
                  </>
                ) : (
                  <>
                    <th style={{ textAlign: "left", padding: "6pt" }}>
                      <table>
                        <tr>
                          <th>BASIC</th>
                        </tr>
                        <tr>
                          <th>ADDL. REMUN.</th>
                        </tr>
                        <tr>
                          <th>DA</th>
                        </tr>
                        <tr>
                          <th>HRA</th>
                        </tr>
                        <tr>
                          <th>MA</th>
                        </tr>
                        <tr>
                          <th>CA</th>
                        </tr>
                        <tr>
                          <th>CPF</th>
                        </tr>
                        <tr>
                          <th>IR</th>
                        </tr>
                      </table>
                    </th>
                    <td
                      style={{
                        textAlign: "right",
                        borderRight: "1px solid",
                        paddingRight: "14pt",
                      }}
                    >
                      <table style={{ marginRight: -30 }}>
                        <tr>
                          <td style={{ textAlign: "right" }}>{basicpay}</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>{addl}</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>{da}</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>{hra}</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>{ma}</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>0</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>0</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>0</td>
                        </tr>
                      </table>
                    </td>
                    <th
                      style={{
                        textAlign: "left",
                        // paddingRight: "6pt",
                        paddingTop: "20pt",
                      }}
                    >
                      <table>
                        <tr>
                          <th>GPF</th>
                        </tr>
                        <tr>
                          <th>PF LOAN</th>
                        </tr>
                        <tr>
                          <th>CPF DEDUCT</th>
                        </tr>
                        <tr>
                          <th>PT</th>
                        </tr>
                        <tr>
                          <th>IT</th>
                        </tr>
                        <tr>
                          <th>GSLI</th>
                        </tr>
                        <tr>
                          <th>OVERDRAWN</th>
                        </tr>
                      </table>
                    </th>
                    <td
                      style={{
                        textAlign: "right",
                        // paddingInline: "6pt",
                        paddingTop: "20pt",
                        borderRight: "1px solid",
                      }}
                    >
                      <table>
                        <tr>
                          <td style={{ textAlign: "right" }}>{gpf}</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>0</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>0</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>{ptax}</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>0</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>{gsli}</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "right" }}>0</td>
                        </tr>
                      </table>
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        borderRight: "1px solid",
                      }}
                    >
                      <table style={{ marginRight: 1 }}></table>
                    </td>
                  </>
                )}
              </tr>
              <tr>
                <th colSpan="2" style={{ borderTop: "1px solid" }}>
                  <table>
                    <tr>
                      <th style={{ textAlign: "left" }}>Total:</th>
                      <th style={{ textAlign: "right" }}>{gross}</th>
                    </tr>
                  </table>
                </th>

                <th
                  colSpan="2"
                  style={{
                    textAlign: "right",
                    paddingRight: "6pt",
                    borderTop: "1px solid",
                  }}
                >
                  {deduction}
                </th>

                <th colSpan="2" style={{ borderTop: "1px solid" }}></th>
                <th colSpan="2" style={{ borderTop: "1px solid" }}></th>
              </tr>
              <tr>
                <td colSpan="8" style={{ borderTop: "1px solid" }}>
                  <table>
                    <tr>
                      <th style={{ textAlign: "left", width: 85 }}>
                        GROSS PAY:
                      </th>
                      <th style={{ textAlign: "left" }}>{gross}</th>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="8" style={{ borderTop: "1px solid" }}>
                  <table>
                    <tr>
                      <th style={{ textAlign: "left", width: 85 }}>NET PAY:</th>
                      <th style={{ textAlign: "left" }}>
                        {netpay} {NumInWords(netpay)} Only
                      </th>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="8">
                  <table>
                    <tr>
                      <th>
                        Transferred to {bank} Account no {account} &emsp; IFS
                        Code {ifsc}
                      </th>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
          <div
            class="disclaimer"
            style={{ margin: "50px auto 300px 2px", textAlign: "left" }}
          >
            <p style={{ margin: "10px" }}>
              GP: Grade Pay, DA: Dearness Allowance, HRA: House Rent Allowance,
              MA: Medical Allowance, CA: Conveyance Allowance,
            </p>
            <p style={{ margin: "10px" }}>
              CPF: Contributory Provident Fund, GPF: General Provident Fund, PT:
              Professional Tax, IT: Income Tax,
            </p>
            <p style={{ margin: "10px" }}>
              GSLI: Group Savings Linked Insurance, IR: Interim Relief.
            </p>
          </div>
          <div
            class="disclaimer2"
            style={{ margin: "20px auto 10px 10px", textAlign: "left" }}
          >
            <p>
              Disclaimer: This is a computer generated Pay Slip and hence does
              not require any signature.
            </p>
          </div>
          <div
            class="hr"
            style={{
              height: 2,
              borderTop: "0.5px solid",
              width: "100%",
              margin: "auto",
            }}
          ></div>
          <div
            class="footer"
            style={{
              margin: "auto",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p>
                <b>
                  <i>osms.wbsed.gov.in</i>
                </b>
              </p>
            </div>
            <div>
              <p>
                <b>
                  <i>Page-1</i>
                </b>
              </p>
            </div>
            <div>
              <p>
                <b>
                  <i>Date of Generation: {printDate()}</i>
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default PaySlipOsmsNew;
