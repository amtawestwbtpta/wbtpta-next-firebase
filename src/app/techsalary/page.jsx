"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../context/Store";
import Link from "next/link";
import { DA, HRA, NEXTDA, PREV6DA, PREVDA } from "../../modules/constants";
import {
  GetMonthName,
  RoundTo,
  months,
} from "../../modules/calculatefunctions";

import axios from "axios";
import Loader from "../../components/Loader";
const TechSalary = () => {
  const { state, stateArray, setStateObject } = useGlobalContext();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);
  const [school, setSchool] = useState("");
  const today = new Date();
  const date = new Date();
  const year = today.getFullYear();
  const [index, setIndex] = useState(today.getMonth() + 1);
  const [month, setMonth] = useState(GetMonthName(today.getMonth()));
  const thisMonth = GetMonthName(today.getMonth());
  const [loader, setLoader] = useState(false);
  const [prevJanuary, setPrevJanuary] = useState([]);
  const [prevFebruary, setPrevFebruary] = useState([]);
  const [march, setMarch] = useState([]);
  const [april, setApril] = useState([]);
  const [may, setMay] = useState([]);
  const [june, setJune] = useState([]);
  const [july, setJuly] = useState([]);
  const [august, setAugust] = useState([]);
  const [september, setSeptember] = useState([]);
  const [october, setOctober] = useState([]);
  const [november, setNovember] = useState([]);
  const [december, setDecember] = useState([]);
  const [january, setJanuary] = useState([]);
  const [february, setFebruary] = useState([]);
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
    setPrevJanuary(qA.data);
    setPrevFebruary(qB.data);
    setMarch(q1.data);
    setApril(q2.data);
    setMay(q3.data);
    setJune(q4.data);
    setJuly(q5.data);
    setAugust(q6.data);
    setSeptember(q7.data);
    setOctober(q8.data);
    setNovember(q9.data);
    setDecember(q10.data);
    setJanuary(q11.data);
    setFebruary(q12.data);
    setLoader(false);
  };

  useEffect(() => {
    if (!state) {
      router.push("/login");
    }
    getSalary();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setFilteredData(stateArray);
    setSchool(stateArray[0]?.school);

    document.title = `All Teacher's Salary Data of ${stateArray[0]?.school}`;
    // eslint-disable-next-line
  }, [stateArray]);

  return (
    <div className="container-fluid my-5">
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="table-resposive text-center my-2">
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
                {months
                  .slice(0, months.indexOf(thisMonth) + 1)
                  .map((el, ind) => {
                    return (
                      <option value={el + "-" + (ind + 1)} key={ind}>
                        {el}
                      </option>
                    );
                  })}
              </select>
            </div>
            <h3 className="text-center text-primary">
              All Teacher's Salary Data for The Month of {month.toUpperCase()}{" "}
              of {school}
            </h3>
            <div className="table-resposive-md" style={{ overflowX: "scroll" }}>
              <table className="table table-hover table-sm table-bordered border-black border-1 align-middle table-responsive text-center">
                <thead>
                  <tr>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      SL. NO.
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      TEACHER'S NAME
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      DESIGNATION
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      BASIC PAY
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      ADDL.
                      <br />
                      ALLOWANCE
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      DA
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      HRA
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      MA
                    </th>
                    {year === 2024 && index === 7 && (
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        IR
                      </th>
                    )}
                    <th className="text-center" style={{ border: "1px solid" }}>
                      GROSS PAY
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      GPF
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      GSLI
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      PTAX
                    </th>
                    <th className="text-center" style={{ border: "1px solid" }}>
                      NETPAY
                    </th>
                    <th
                      className="noprint text-center"
                      style={{ border: "1px solid" }}
                    >
                      PRINT PAYSLIP
                    </th>
                  </tr>
                </thead>
                <tbody id="tbody">
                  {filteredData.map((el, ind) => {
                    const id = el?.id;
                    let basic = el.basic;
                    let mbasic = el.mbasic;
                    let ir = Math.round(mbasic * 0.04);
                    let addl = el.addl;
                    let ma = el.ma;
                    let gpf = el.gpf;
                    let julyGpf = el.julyGpf;
                    let gpfprev = el.gpfprev;
                    let gsli = el.gsli;
                    let disability = el.disability;
                    let prevmbasic = el.prevmbasic;
                    let dataYear = el.dataYear;
                    let da;

                    // console.log(junelast)
                    let basicpay;
                    let ptax;
                    let pfund;
                    let gross;
                    const prevJanuarySalary = prevJanuary.filter(
                      (e) => e.id === id
                    )[0];
                    const prevFebruarySalary = prevFebruary.filter(
                      (e) => e.id === id
                    )[0];
                    const marchSalary = march.filter((e) => e.id === id)[0];
                    const aprilSalary = april.filter((e) => e.id === id)[0];
                    const maySalary = may.filter((e) => e.id === id)[0];
                    const juneSalary = june.filter((e) => e.id === id)[0];
                    const julySalary = july.filter((e) => e.id === id)[0];
                    const augustSalary = august.filter((e) => e.id === id)[0];
                    const septemberSalary = september.filter(
                      (e) => e.id === id
                    )[0];
                    const octoberSalary = october.filter((e) => e.id === id)[0];
                    const novemberSalary = november.filter(
                      (e) => e.id === id
                    )[0];
                    const decemberSalary = december.filter(
                      (e) => e.id === id
                    )[0];
                    const januarySalary = january.filter((e) => e.id === id)[0];
                    const februarySalary = february.filter(
                      (e) => e.id === id
                    )[0];
                    // if (dataYear === date.getFullYear()) {
                      if (index === 1) {
                        basicpay = januarySalary?.basic;
                        da = Math.round(basicpay * januarySalary?.daPercent);
                        pfund = januarySalary?.gpf;
                        ma = januarySalary?.ma;
                      } else if (index === 2) {
                        basicpay = februarySalary?.basic;
                        da = Math.round(basicpay * februarySalary?.daPercent);
                        pfund = februarySalary?.gpf;
                        ma = februarySalary?.ma;
                      } else if (index === 3) {
                        basicpay = marchSalary?.basic;
                        da = Math.round(basicpay * marchSalary?.daPercent);
                        pfund = marchSalary?.gpf;
                        ma = marchSalary?.ma;
                      } else if (index === 4) {
                        basicpay = aprilSalary?.basic;
                        da = Math.round(basicpay * aprilSalary?.daPercent);
                        pfund = aprilSalary?.gpf;
                        ma = aprilSalary?.ma;
                      } else if (index === 5) {
                        basicpay = maySalary?.basic;
                        da = Math.round(basicpay * maySalary?.daPercent);
                        pfund = maySalary?.gpf;
                        ma = maySalary?.ma;
                      } else if (index === 6) {
                        basicpay = juneSalary?.basic;
                        da = Math.round(basicpay * juneSalary?.daPercent);
                        pfund = juneSalary?.gpf;
                        ma = juneSalary?.ma;
                      } else if (index === 7) {
                        basicpay = julySalary?.basic;
                        da = Math.round(basicpay * julySalary?.daPercent);
                        pfund = julySalary?.gpf;
                        ma = julySalary?.ma;
                      } else if (index === 8) {
                        basicpay = augustSalary?.basic;
                        da = Math.round(basicpay * augustSalary?.daPercent);
                        pfund = augustSalary?.gpf;
                        ma = augustSalary?.ma;
                      } else if (index === 9) {
                        basicpay = septemberSalary?.basic;
                        da = Math.round(basicpay * septemberSalary?.daPercent);
                        pfund = septemberSalary?.gpf;
                        ma = septemberSalary?.ma;
                      } else if (index === 10) {
                        basicpay = octoberSalary?.basic;
                        da = Math.round(basicpay * octoberSalary?.daPercent);
                        pfund = octoberSalary?.gpf;
                        ma = octoberSalary?.ma;
                      } else if (index === 11) {
                        basicpay = novemberSalary?.basic;
                        da = Math.round(basicpay * novemberSalary?.daPercent);
                        pfund = novemberSalary?.gpf;
                        ma = novemberSalary?.ma;
                      } else if (index === 12) {
                        basicpay = decemberSalary?.basic;
                        da = Math.round(basicpay * decemberSalary?.daPercent);
                        pfund = decemberSalary?.gpf;
                        ma = decemberSalary?.ma;
                      } else if (index === 13) {
                        basicpay = januarySalary?.basic;
                        da = Math.round(basicpay * januarySalary?.daPercent);
                        pfund = januarySalary?.gpf;
                        ma = januarySalary?.ma;
                      } else if (index === 14) {
                        basicpay = februarySalary?.basic;
                        da = Math.round(basicpay * februarySalary?.daPercent);
                        pfund = februarySalary?.gpf;
                        ma = februarySalary?.ma;
                      }
                    // } else if (dataYear === date.getFullYear() - 1) {
                    //   basicpay = prevmbasic;
                    //   da = Math.round(basicpay * PREV6DA);
                    //   pfund = gpfprev;
                    // }
                    //  else {
                    //   pfund = gpfprev;
                    //   if (index > 6) {
                    //     basicpay = RoundTo(basic + basic * 0.03, 100);
                    //     da = Math.round(basicpay * NEXTDA);
                    //   } else {
                    //     basicpay = basic;
                    //     da = Math.round(basicpay * DA);
                    //   }
                    // }

                    // let da = Math.round(basicpay * DA);
                    let hra = Math.round(basicpay * HRA);

                    if (dataYear === 2024 && index === 7) {
                      gross = basicpay + da + ir + hra + addl + ma;
                    } else {
                      gross = basicpay + da + hra + addl + ma;
                    }
                    // console.log(gross)

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

                    let netpay = gross - deduction;
                    return (
                      <tr key={el.id}>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {ind + 1}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {el.tname}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {el.desig}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {basicpay}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {addl}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {da}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {hra}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {ma}
                        </td>
                        {year === 2024 && index === 7 && (
                          <td
                            className="text-center"
                            style={{ border: "1px solid" }}
                          >
                            {ir}
                          </td>
                        )}
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {gross}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {pfund}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {gsli}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {ptax}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {netpay}
                        </td>
                        <th
                          className="noprint text-center"
                          style={{ border: "1px solid" }}
                        >
                          {el.association === "WBTPTA" ? (
                            <Link
                              className="btn btn-info text-decoration-none"
                              href={`/payslipwbtpta`}
                              onClick={() => setStateObject(el)}
                            >
                              PRINT PAYSLIP
                            </Link>
                          ) : null}
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mx-auto my-3 noprint">
            <button
              type="button"
              className="btn btn-primary text-white p-2 rounded"
              onClick={() => {
                if (typeof window !== undefined) {
                  window.print();
                }
              }}
            >
              Print Statement
            </button>
          </div>
          <div className="mx-auto my-3 noprint">
            <button
              type="button"
              className="btn btn-warning  p-2 rounded"
              onClick={() => router.back()}
            >
              Go Back
            </button>
          </div>
          <div className="mx-auto my-3 noprint">
            <button
              type="button"
              className="btn btn-success  p-2 rounded"
              onClick={() => {
                router.push(`/TeacherPhotoCorner`);
              }}
            >
              Teacher's Photo Corner
            </button>
          </div>
          <div className="mx-auto my-3 noprint">
            <button
              type="button"
              className="btn btn-info  p-2 rounded"
              onClick={() => {
                router.push(`/TechAccuitance`);
              }}
            >
              Teacher's Accuitance
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TechSalary;
