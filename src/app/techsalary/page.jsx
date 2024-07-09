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
import { Loader } from "rsuite";
const TechSalary = () => {
  const { state, stateArray, setStateObject } = useGlobalContext();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);
  const [school, setSchool] = useState("");
  const today = new Date();
  const date = new Date();
  const [index, setIndex] = useState(today.getMonth() + 1);
  const [month, setMonth] = useState(GetMonthName(today.getMonth()));
  const thisMonth = GetMonthName(today.getMonth());
  useEffect(() => {
    if (!state) {
      router.push("/login");
    }

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
              {months.slice(0, months.indexOf(thisMonth) + 1).map((el, ind) => {
                return (
                  <option value={el + "-" + (ind + 1)} key={ind}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
          <h3 className="text-center text-primary">
            All Teacher's Salary Data for The Month of {month.toUpperCase()} of{" "}
            {school}
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
                  let basic = el.basic;
                  let mbasic = el.mbasic;
                  let addl = el.addl;
                  let ma = el.ma;
                  let gpf = el.gpf;
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
                  if (dataYear === date.getFullYear()) {
                    if (index > 6) {
                      basicpay = basic;
                      da = Math.round(basicpay * DA);
                      pfund = gpf;
                    } else {
                      basicpay = mbasic;
                      pfund = gpfprev;
                      if (index < 4) {
                        da = Math.round(basicpay * PREVDA);
                      } else {
                        da = Math.round(basicpay * DA);
                      }
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

                  // let da = Math.round(basicpay * DA);
                  let hra = Math.round(basicpay * HRA);

                  let gross = basicpay + da + hra + addl + ma;
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
    </div>
  );
};

export default TechSalary;
