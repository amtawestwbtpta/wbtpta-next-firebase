"use client";
import ropa from "../../modules/ropa";
import React, { Suspense, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import {
  INR,
  GetMonthName,
  printDate,
  months,
  RoundTo,
} from "../../modules/calculatefunctions";
import { DA, HRA, NEXTDA } from "../../modules/constants";
import OSMSPaySLip from "../../components/OSMSPaySLip";
import dynamic from "next/dynamic";
const PaySlipOsmsNew = () => {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Please Wait...</p>,
    }
  );
  const { state, stateObject } = useGlobalContext();
  const router = useRouter();
  let details = stateObject;
  let tname,
    desig,
    school,
    disability,
    empid,
    pan,
    dataYear,
    basic,
    mbasic,
    addl,
    da,
    hra,
    ma,
    gross,
    prevmbasic,
    gpf,
    gpfprev,
    julyGpf,
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
  let ir = Math.round(mbasic * 0.04);
  addl = parseInt(details.addl);
  ma = parseInt(details.ma);
  gpf = parseInt(details.gpf);
  gpfprev = parseInt(details.gpfprev);
  julyGpf = parseInt(details.julyGpf);
  gsli = parseInt(details.gsli);
  udise = details.udise;
  bank = details.bank;
  account = details.account;
  ifsc = details.ifsc;
  dataYear = details.dataYear;

  let netpay;

  let basicpay;
  let pfund;
  let date = new Date();
  let today = new Date();
  // let date = new Date();
  const [index, setIndex] = useState(today.getMonth());
  const [month, setMonth] = useState(GetMonthName(today.getMonth() - 1));
  // let junelast = new Date(`${date.getFullYear()}-07-31`);
  if (dataYear === date.getFullYear()) {
    if (index > 6) {
      basicpay = basic;
      da = Math.round(basicpay * DA);
      pfund = julyGpf;
    } else if (index < 7 || index > 3) {
      basicpay = mbasic;
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
    pfund = gpfprev;
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

  if (dataYear === 2024 && index === 7) {
    gross = basic + da + ir + hra + addl + ma;
  } else {
    gross = basic + da + hra + addl + ma;
  }

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
            className="btn btn-info text-white font-weight-bold p-2 m-2 rounded"
            onClick={() => router.back()}
          >
            Go Back
          </button>
          <button
            type="button"
            className="btn btn-success text-white font-weight-bold p-2 m-2 rounded"
            onClick={() => {
              const data = {
                tname,
                desig,
                school,
                empid,
                pan,
                addl,
                da,
                hra,
                ma,
                gross,
                ptax,
                gsli,
                udise,
                bank,
                account,
                ifsc,
                lastmonth,
                month,
                netpay,
                basicpay,
                pfund,
                today,
                level,
                cell,
                deduction,
              };
              router.push(
                `/downloadOsmsPayslip?data=${JSON.stringify(data)}&key=${
                  process.env.NEXT_PUBLIC_ANYKEY
                }`
              );
            }}
          >
            Go To Download
          </button>
          <div className="mx-auto">
            <PDFDownloadLink
              document={
                <OSMSPaySLip
                  data={{
                    tname,
                    desig,
                    school,
                    empid,
                    pan,
                    addl,
                    da,
                    hra,
                    ma,
                    gross,
                    ptax,
                    gsli,
                    udise,
                    bank,
                    account,
                    ifsc,
                    lastmonth,
                    month,
                    netpay,
                    basicpay,
                    pfund,
                    today,
                    level,
                    cell,
                    deduction,
                    dataYear,
                    index,
                    ir
                  }}
                />
              }
              fileName={`PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR THE MONTH OF ${lastmonth.toUpperCase()}.pdf`}
              style={{
                textDecoration: "none",
                padding: 11,
                color: "#fff",
                backgroundColor: "darkgreen",
                border: "1px solid #4a4a4a",
                width: "40%",
                borderRadius: 10,
                margin: 20,
              }}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Please Wait..." : "Download Payslip"
              }
            </PDFDownloadLink>
          </div>
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
            padding: 50,
            maxWidth: "960px",
            zoom: 0.9,
            whiteSpace: "nowrap",
            color: "#000",
          }}
        >
          <div className="main" style={{ zoom: "1.3" }}>
            <div
              className="top"
              style={{ fontSize: "smaller", margin: "10px auto" }}
            >
              <div>
                <img
                  className="img2"
                  src="https://firebasestorage.googleapis.com/v0/b/awwbtpta.appspot.com/o/images%2Fiosms.png?alt=media&token=f21c8d21-ac4e-4f2e-b416-2064d91ffe4f"
                  style={{ position: "absolute", width: 80, left: 51 }}
                  alt="OSMS LOGO"
                />
              </div>
              <div
                className="heading dejavu"
                style={{
                  margin: "auto",
                  width: "100%",
                  marginLeft: 38,
                }}
              >
                <h5 style={{ textAlign: "center", marginLeft: -54 }}>
                  GOVT. OF WEST BENGAL
                </h5>
                <h6 style={{ textAlign: "center", marginLeft: -54 }}>
                  OFFICE OF THE SUB INSPECTOR OF SCHOOLS
                </h6>
                <h6
                  style={{
                    textAlign: "center",
                    marginLeft: -54,
                    color: "#004080",
                  }}
                >
                  AMTA WEST CIRCLE, HAORA
                </h6>
                <h6 style={{ textAlign: "center", marginLeft: -54 }}>
                  PAY SLIP FOR THE MONTH OF {month.toUpperCase()},
                  {today.getFullYear()}
                </h6>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary text-white font-weight-bold p-2 rounded noprint"
              onClick={() => {
                if (typeof window !== undefined) {
                  window.print();
                }
              }}
            >
              Print Payslip
            </button>

            <div
              className="dejaVuCondensed"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: "0.6rem",
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
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
                className="idDiv"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
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
              className="myTable dejaVuCondensed"
              style={{
                border: "1px solid gray",
                fontSize: "0.9rem",
                borderCollapse: "separate",
                borderSpacing: 1,
              }}
            >
              <tr className="dejavu">
                <th
                  style={{
                    borderRight: "1px solid gray",
                    borderBottom: "1px solid gray",
                    padding: "2px 0 2px 0",
                    textAlign: "center",
                    borderCollapse: "separate",
                    borderSpacing: 1,
                  }}
                  colSpan="2"
                >
                  EARNING(Rs)
                </th>
                <th
                  style={{
                    borderRight: "1px solid gray",
                    borderBottom: "1px solid gray",
                    padding: "2px 0 2px 0",
                    textAlign: "center",
                    borderCollapse: "separate",
                    borderSpacing: 1,
                  }}
                  colSpan="2"
                >
                  DEDUCTION(Rs)
                </th>
                <th
                  style={{
                    borderRight: "1px solid gray",
                    borderBottom: "1px solid gray",
                    padding: "2px 0 2px 0",
                    textAlign: "center",
                    borderCollapse: "separate",
                    borderSpacing: 1,
                  }}
                  colSpan="2"
                >
                  RECOVERIES OF LOAN(Rs)
                </th>
                <th
                  style={{
                    borderBottom: "1px solid gray",
                    padding: "2px 0 2px 0",
                    textAlign: "center",
                    borderCollapse: "separate",
                    borderSpacing: 1,
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
                      <table className="dejaVuCondensed">
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
                      className="dejaVuCondensed"
                      style={{
                        textAlign: "left",
                        paddingRight: "16pt",
                        borderRight: "1px solid gray",
                        borderCollapse: "separate",
                        borderSpacing: 1,
                      }}
                    >
                      <table
                        style={{
                          marginRight: -20,
                        }}
                      >
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
                          <td style={{ textAlign: "right" }}>
                            {dataYear === 2024 && index === 7 ? ir : 0}
                          </td>
                        </tr>
                      </table>
                    </td>
                    <th style={{ textAlign: "left" }}>
                      <table className="dejavu">
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
                      className="dejaVuCondensed"
                      style={{
                        textAlign: "center",
                        borderRight: "1px solid gray",
                        borderCollapse: "separate",
                        borderSpacing: 1,
                      }}
                    >
                      <table style={{ marginRight: "5px" }}>
                        <tr>
                          <td style={{ textAlign: "right" }}>{pfund}</td>
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
                        borderRight: "1px solid gray",
                      }}
                    >
                      <table style={{ marginRight: 1 }}></table>
                    </td>
                  </>
                ) : (
                  <>
                    <th className="dejavu" style={{ textAlign: "left" }}>
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
                      className="dejaVuCondensed"
                      style={{
                        textAlign: "left",
                        borderRight: "1px solid gray",
                        paddingRight: "20pt",
                        borderCollapse: "separate",
                        borderSpacing: 1,
                      }}
                    >
                      <table style={{ marginRight: -20 }}>
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
                          <td style={{ textAlign: "right" }}>
                            {dataYear === 2024 && index === 7 ? ir : 0}
                          </td>
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
                      <table className="dejavu">
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
                      className="dejaVuCondensed"
                      style={{
                        textAlign: "right",
                        paddingRight: "6pt",
                        paddingTop: "20pt",
                        borderRight: "1px solid gray",
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
                        borderRight: "1px solid gray",
                      }}
                    >
                      <table style={{ marginRight: 1 }}></table>
                    </td>
                  </>
                )}
              </tr>
              <tr className="dejavu">
                <th
                  colSpan="2"
                  style={{
                    borderTop: "1px solid gray",
                    borderCollapse: "separate",
                    borderSpacing: 1,
                  }}
                >
                  <table className="dejavu">
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
                    borderTop: "1px solid gray",
                    borderCollapse: "separate",
                    borderSpacing: 1,
                  }}
                >
                  {deduction}
                </th>

                <th
                  colSpan="2"
                  style={{
                    borderTop: "1px solid gray",
                    borderCollapse: "separate",
                    borderSpacing: 1,
                  }}
                ></th>
                <th
                  colSpan="2"
                  style={{
                    borderTop: "1px solid gray",
                    borderCollapse: "separate",
                    borderSpacing: 1,
                  }}
                ></th>
              </tr>
              <tr>
                <td
                  colSpan="8"
                  style={{
                    borderTop: "1px solid gray",
                    borderCollapse: "separate",
                    borderSpacing: 1,
                  }}
                >
                  <table className="dejavu">
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
                <td
                  colSpan="8"
                  style={{
                    borderTop: "1px solid gray",
                    borderCollapse: "separate",
                    borderSpacing: 1,
                  }}
                >
                  <table className="dejavu">
                    <tr>
                      <th style={{ textAlign: "left", width: 85 }}>NET PAY:</th>
                      <th style={{ textAlign: "left" }}>
                        {netpay} ({INR(netpay)})
                      </th>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="8">
                  <table className="dejavu">
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
            className="disclaimer dejaVuCondensed"
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
            className="disclaimer2 dejaVuCondensed"
            style={{ margin: "20px auto 10px 10px", textAlign: "left" }}
          >
            <p style={{ fontSize: "medium" }}>
              <span className="dejavu" style={{ fontSize: "medium" }}>
                Disclaimer:
              </span>{" "}
              This is a computer generated Pay Slip and hence does not require
              any signature.
            </p>
          </div>
          <div
            className="hr"
            style={{
              height: 2,
              borderTop: "0.5px solid",
              width: "100%",
              margin: "auto",
            }}
          ></div>
          <div
            className="footer dejavu"
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
