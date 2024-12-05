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
import Loader from "../../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";
const PaySlipOsmsNew = () => {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Please Wait...</p>,
    }
  );
  const thisYear = new Date().getFullYear();
  const nextYear = thisYear + 1;
  const prevYear = thisYear - 1;
  const dataExist = true;
  let PAYSLIPMONTHS;
  if (dataExist) {
    PAYSLIPMONTHS = [
      `January-${thisYear}`,
      `February-${thisYear}`,
      `March-${thisYear}`,
      `April-${thisYear}`,
      `May-${thisYear}`,
      `June-${thisYear}`,
      `July-${thisYear}`,
      `August-${thisYear}`,
      `September-${thisYear}`,
      `October-${thisYear}`,
      `November-${thisYear}`,
      `December-${thisYear}`,
      `January-${nextYear}`,
      `February-${nextYear}`,
      `March-${nextYear}`,
    ];
  } else {
    [`January-${prevYear}`, `February-${prevYear}`];
  }

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
  const [loader, setLoader] = useState(false);
  const [index, setIndex] = useState(today.getMonth()-1);
  const [month, setMonth] = useState(GetMonthName(today.getMonth() - 1));
  const [year, setYear] = useState(today.getFullYear());
  const [prevJanuary, setPrevJanuary] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma:500
  });
  const [prevFebruary, setPrevFebruary] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma:500
  });
  const [march, setMarch] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma:500
  });
  const [april, setApril] = useState([]);
  const [may, setMay] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma:500
  });
  const [june, setJune] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma:500
  });
  const [july, setJuly] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma:500
  });
  const [august, setAugust] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma:500
  });
  const [september, setSeptember] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma:500
  });
  const [october, setOctober] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma:500
  });
  const [november, setNovember] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma:500
  });
  const [december, setDecember] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma:500
  });
  const [january, setJanuary] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma:500
  });
  const [february, setFebruary] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma:500
  });

  if (index === 0) {
    basicpay = prevJanuary?.basic;
    da = Math.round(basicpay * prevJanuary?.daPercent);
    pfund = prevJanuary?.gpf;
    ma = prevJanuary?.ma;
  } else if (index === 1) {
    basicpay = prevFebruary?.basic;
    da = Math.round(basicpay * prevFebruary?.daPercent);
    pfund = prevFebruary?.gpf;
    ma = prevFebruary?.ma;
  } else if (index === 2) {
    basicpay = march?.basic;
    da = Math.round(basicpay * march?.daPercent);
    pfund = march?.gpf;
    ma = march?.ma;
  } else if (index === 3) {
    basicpay = april?.basic;
    da = Math.round(basicpay * april?.daPercent);
    pfund = april?.gpf;
    ma = april?.ma;
  } else if (index === 4) {
    basicpay = may?.basic;
    da = Math.round(basicpay * may?.daPercent);
    pfund = may?.gpf;
    ma = may?.ma;
  } else if (index === 5) {
    basicpay = june?.basic;
    da = Math.round(basicpay * june?.daPercent);
    pfund = june?.gpf;
    ma = june?.ma;
  } else if (index === 6) {
    basicpay = july?.basic;
    da = Math.round(basicpay * july?.daPercent);
    pfund = july?.gpf;
    ma = july?.ma;
  } else if (index === 7) {
    basicpay = august?.basic;
    da = Math.round(basicpay * august?.daPercent);
    pfund = august?.gpf;
    ma = august?.ma;
  } else if (index === 8) {
    basicpay = september?.basic;
    da = Math.round(basicpay * september?.daPercent);
    pfund = september?.gpf;
    ma = september?.ma;
  } else if (index === 9) {
    basicpay = october?.basic;
    da = Math.round(basicpay * october?.daPercent);
    pfund = october?.gpf;
    ma = october?.ma;
  } else if (index === 10) {
    basicpay = november?.basic;
    da = Math.round(basicpay * november?.daPercent);
    pfund = november?.gpf;
    ma = november?.ma;
  } else if (index === 11) {
    basicpay = december?.basic;
    da = Math.round(basicpay * december?.daPercent);
    pfund = december?.gpf;
    ma = december?.ma;
  } else if (index === 12) {
    basicpay = january?.basic;
    da = Math.round(basicpay * january?.daPercent);
    pfund = january?.gpf;
    ma = january?.ma;
  } else if (index === 13) {
    basicpay = february?.basic;
    da = Math.round(basicpay * february?.daPercent);
    pfund = february?.gpf;
    ma = february?.ma;
  }

  let level = ropa(basicpay).lv;
  let cell = ropa(basicpay).ce;

  hra = Math.round(basicpay * HRA);

  if (dataYear === 2024 && index === 6) {
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
  const getSalary = async () => {
    setLoader(true);
    const qA = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/prevJanuary.json"
    );
    const qB = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/prevFebruary.json"
    );
    const q1 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/march.json"
    );
    const q2 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/april.json"
    );
    const q3 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/may.json"
    );
    const q4 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/june.json"
    );
    const q5 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/july.json"
    );
    const q6 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/august.json"
    );
    const q7 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/september.json"
    );
    const q8 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/october.json"
    );
    const q9 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/november.json"
    );
    const q10 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/december.json"
    );
    const q11 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/january.json"
    );
    const q12 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/february.json"
    );
    setPrevJanuary(qA.data?.filter((el) => el.id === stateObject.id)[0]);
    setPrevFebruary(qB.data?.filter((el) => el.id === stateObject.id)[0]);
    setMarch(q1.data?.filter((el) => el.id === stateObject.id)[0]);
    setApril(q2.data?.filter((el) => el.id === stateObject.id)[0]);
    setMay(q3.data?.filter((el) => el.id === stateObject.id)[0]);
    setJune(q4.data?.filter((el) => el.id === stateObject.id)[0]);
    setJuly(q5.data?.filter((el) => el.id === stateObject.id)[0]);
    setAugust(q6.data?.filter((el) => el.id === stateObject.id)[0]);
    setSeptember(q7.data?.filter((el) => el.id === stateObject.id)[0]);
    setOctober(q8.data?.filter((el) => el.id === stateObject.id)[0]);
    setNovember(q9.data?.filter((el) => el.id === stateObject.id)[0]);
    setDecember(q10.data?.filter((el) => el.id === stateObject.id)[0]);
    setJanuary(q11.data?.filter((el) => el.id === stateObject.id)[0]);
    setFebruary(q12.data?.filter((el) => el.id === stateObject.id)[0]);
    setLoader(false);
  };

  useEffect(() => {
  }, [
    month,
    index,
    prevJanuary,
    prevFebruary,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
    january,
    february,
  ]);
  useEffect(() => {
    if (state !== "admin") {
      router.push("/login");
    }
    getSalary();
    document.title = `PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR THE MONTH OF ${lastmonth.toUpperCase()}`;
    // eslint-disable-next-line
  }, []);
  return (
    <Suspense>
      <div>
        {loader ? (
          <Loader />
        ) : (
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
              <div className="mx-auto my-5">
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
                        ir,
                      }}
                    />
                  }
                  fileName={`PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR THE MONTH OF ${lastmonth.toUpperCase()}.pdf`}
                  style={{
                    textDecoration: "none",
                    padding: 11,
                    color: "#fff",
                    backgroundColor: "purple",
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
                defaultValue={month + "-" + year + "-" + index}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setMonth(e.target.value.split("-")[0]);
                    setYear(e.target.value.split("-")[1]);
                    setIndex(parseInt(e.target.value.split("-")[2]));
                  } else {
                    toast.error("Please select a valid month");
                  }
                }}
              >
                <option value="">Select Month </option>
                {PAYSLIPMONTHS.map((el, ind) => {
                  return (
                    <option value={el + "-" + ind} key={ind}>
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
                      PAY SLIP FOR THE MONTH OF {month.toUpperCase()},{year}
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
                                {dataYear === 2024 && index === 6 ? ir : 0}
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
                                {dataYear === 2024 && index === 6 ? ir : 0}
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
                          <th style={{ textAlign: "left", width: 85 }}>
                            NET PAY:
                          </th>
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
                            Transferred to {bank} Account no {account} &emsp;
                            IFS Code {ifsc}
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
                  GP: Grade Pay, DA: Dearness Allowance, HRA: House Rent
                  Allowance, MA: Medical Allowance, CA: Conveyance Allowance,
                </p>
                <p style={{ margin: "10px" }}>
                  CPF: Contributory Provident Fund, GPF: General Provident Fund,
                  PT: Professional Tax, IT: Income Tax,
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
                  This is a computer generated Pay Slip and hence does not
                  require any signature.
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
        )}
      </div>
    </Suspense>
  );
};

export default PaySlipOsmsNew;
