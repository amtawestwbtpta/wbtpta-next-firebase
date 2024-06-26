"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../context/Store";
import { months, titleCase } from "../../modules/calculatefunctions";
import { DA, HRA, PREV6DA, PREVDA } from "../../modules/constants";
import { Loader } from "rsuite";
const TechAccuitance = () => {
  const { state, stateArray } = useGlobalContext();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [school, setSchool] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    if (!state) {
      router.push("/logout");
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let monthArray = [
      { month: "January", value: true },
      { month: "February", value: true },
      { month: "March", value: true },
      { month: "April", value: true },
      { month: "May", value: true },
      { month: "June", value: true },
      { month: "July", value: true },
      { month: "August", value: true },
      { month: "September", value: true },
      { month: "October", value: true },
      { month: "November", value: true },
      { month: "December", value: true },
    ];
    let x = [];

    stateArray.map((el) => {
      let mainObj = el;
      let newObj = { ...mainObj, monthData: monthArray };
      return x.push(newObj);
    });
    setFilteredData(x);
    setMainData(x);
    setSchool(stateArray[0]?.school);
    setShowTable(true);
    document.title = `Accuitance Register of ${
      stateArray[0]?.school
    } for the Year ${
      new Date().getFullYear() - 1
    }- ${new Date().getFullYear()}`;
    // eslint-disable-next-line
  }, [stateArray]);

  useEffect(() => {
    // eslint-disable-next-line
  }, [year, filteredData, mainData]);

  return (
    <div className="container-fluid my-5">
      {showTable ? (
        <>
          <div className="table-resposive text-center my-2">
            <div className="noprint my-3 mx-auto">
              <h3 className="text-center text-primary">
                Accuitance Register of {titleCase(school)} for the Year {year}
              </h3>
              <div
                className="rounded p-2 col-md-4 mx-auto"
                style={{ backgroundColor: "#a19e9d" }}
              >
                <h4 className="text-black">Select Year</h4>
                <button
                  type="button"
                  className="btn btn-primary m-2"
                  onClick={() => {
                    setYear(new Date().getFullYear() - 1);
                    if (typeof window !== undefined) {
                      let trList = document.querySelectorAll("tr");
                      let divList = document.querySelectorAll("div");
                      for (let i = 0; i < trList.length; i++) {
                        trList[i].classList.remove("d-none");
                      }
                      for (let i = 0; i < divList.length; i++) {
                        divList[i].classList.remove("d-none");
                      }
                    }
                  }}
                >
                  {new Date().getFullYear() - 1}
                </button>
                <button
                  type="button"
                  className="btn btn-success m-2"
                  onClick={() => {
                    setYear(new Date().getFullYear());
                    if (typeof window !== undefined) {
                      let trList = document.querySelectorAll("tr");
                      let divList = document.querySelectorAll("div");
                      for (let i = 0; i < trList.length; i++) {
                        trList[i].classList.remove("d-none");
                      }
                      for (let i = 0; i < divList.length; i++) {
                        divList[i].classList.remove("d-none");
                      }
                    }
                  }}
                >
                  {new Date().getFullYear()}
                </button>
              </div>

              <div
                className="rounded p-2 m-2 col-md-4 mx-auto"
                style={{ backgroundColor: "#a19e9d" }}
              >
                <h4 className="text-black">Remove Teacher</h4>
                <table className="table table-hover table-sm table-bordered border-black border-1 align-middle table-responsive text-center rounded">
                  <thead>
                    <tr>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        SL. NO.
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        TEACHER'S NAME
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mainData.map((teacher, index) => (
                      <tr key={index} className="teacher-tr">
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {index + 1}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {teacher.tname}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          {filteredData.filter((t) => t.id === teacher.id)
                            .length > 0 && (
                            <button
                              type="button"
                              className="btn btn-danger btn-sm m-1"
                              onClick={() => {
                                const updatedArray = filteredData.filter(
                                  (t) => t.id !== teacher.id
                                );
                                setFilteredData(updatedArray);
                              }}
                            >
                              Remove
                            </button>
                          )}
                          {filteredData.filter((t) => t.id === teacher.id)
                            .length === 0 && (
                            <button
                              type="button"
                              className="btn btn-success btn-sm m-1"
                              onClick={() => {
                                const updatedArray = [
                                  ...filteredData,
                                  teacher,
                                ].sort((a, b) => a.rank - b.rank);
                                setFilteredData(updatedArray);
                              }}
                            >
                              Add
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mx-auto my-3 noprint">
              <button
                type="button"
                className="btn btn-primary text-white font-weight-bold p-2 rounded"
                onClick={() => {
                  if (typeof window !== undefined) {
                    window.print();
                  }
                }}
              >
                Print Page
              </button>
            </div>
            <div className="mx-auto my-3 noprint">
              <button
                type="button"
                className="btn btn-warning  font-weight-bold p-2 rounded"
                onClick={() => router.back()}
              >
                Go Back
              </button>
            </div>
            <div className="table-resposive-md" style={{ overflowX: "scroll" }}>
              {months.map((month, index) => (
                <div
                  className={`container-fluid nobreak my-2 ${month}-table`}
                  key={index}
                >
                  <div className="d-flex flex-row text-center mx-auto justify-content-center align-items-center my-1">
                    <h4 className="text-black m-2">
                      {titleCase(month)}, {year}
                    </h4>
                    <div className="noprint m-2">
                      <button
                        type="button"
                        className="btn btn-danger font-weight-bold p-2 rounded"
                        onClick={() => {
                          if (typeof window !== undefined) {
                            document
                              .querySelector(`.${month}-table`)
                              .classList.add("d-none");
                          }
                        }}
                      >
                        Remove Month
                      </button>
                    </div>
                  </div>
                  <table
                    className="table table-hover table-sm table-bordered border-black border-1 align-middle table-responsive text-center text-black"
                    id="team-list"
                  >
                    <thead>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        SL. NO.
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        TEACHER'S NAME
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        DESIG-
                        <br />
                        NATION
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        BASIC PAY
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        <p style={{ fontSize: 8 }}>
                          ADDL.
                          <br />
                          ALLOWANCE
                        </p>
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        DA
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        HRA
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        MA
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        GROSS
                        <br /> SALARY
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        GPF
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        GSLI
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        PTAX
                      </th>
                      <th
                        className="text-center text-wrap"
                        style={{ border: "1px solid" }}
                      >
                        TOTAL
                        <br /> DEDUCTION
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        NET
                        <br /> SALARY
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "1px solid" }}
                      >
                        SIGNATURE OF THE TEACHER
                      </th>
                      <th
                        className="text-center noprint"
                        style={{ border: "1px solid" }}
                      >
                        ACTION
                      </th>
                    </thead>
                    <tbody>
                      {filteredData.map((el, ind) => {
                        let prevmbasic = el.prevmbasic;
                        let basic = el.basic;
                        let mbasic = el.mbasic;
                        let addl = el.addl;
                        let ma = el.ma;
                        let gpf = el.gpf;
                        let gsli = el.gsli;
                        let disability = el.disability;
                        let date = new Date();
                        let da;
                        // console.log(junelast)
                        let basicpay;
                        let ptax;
                        if (year === date.getFullYear() - 1) {
                          if (index <= 5) {
                            basicpay = prevmbasic;
                            da = Math.round(basicpay * PREV6DA);
                            if (el.newHt) {
                              addl = 0;
                            }
                          } else {
                            if (el.newHt && index <= 9) {
                              addl = 0;
                            }
                            basicpay = mbasic;
                            da = Math.round(basicpay * PREV6DA);
                          }
                        } else {
                          if (index <= 5) {
                            basicpay = mbasic;
                            if (index <= 2) {
                              da = Math.round(basicpay * PREVDA);
                            } else {
                              da = Math.round(basicpay * DA);
                            }
                          } else {
                            basicpay = basic;
                            da = Math.round(basicpay * DA);
                          }
                        }

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

                        let deduction = gsli + gpf + ptax;

                        let netpay = gross - deduction;

                        if (el.monthData[index].value) {
                          return (
                            <tr
                              key={ind}
                              id={`tr${
                                el.id + "-" + ind + "-" + month + "-" + index
                              }`}
                            >
                              <td
                                className="text-center"
                                style={{ border: "1px solid" }}
                              >
                                {/* {ind + 1} */}
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
                                {gpf}
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
                                {deduction}
                              </td>
                              <td
                                className="text-center"
                                style={{ border: "1px solid" }}
                              >
                                {netpay}
                              </td>
                              <th
                                className="text-center"
                                style={{ border: "1px solid", height: 100 }}
                              ></th>
                              <td
                                className="text-center noprint"
                                style={{ border: "1px solid" }}
                              >
                                <button
                                  type="button"
                                  className="btn btn-danger text-white font-weight-bold p-2 rounded"
                                  onClick={() => {
                                    if (typeof window !== undefined) {
                                      document
                                        .getElementById(
                                          `tr${
                                            el.id +
                                            "-" +
                                            ind +
                                            "-" +
                                            month +
                                            "-" +
                                            index
                                          }`
                                        )
                                        .classList.add("d-none");
                                    }
                                  }}
                                >
                                  Remove Teacher
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto my-3 noprint">
            <button
              type="button"
              className="btn btn-primary text-white font-weight-bold p-2 rounded"
              onClick={() => {
                if (typeof window !== undefined) {
                  window.print();
                }
              }}
            >
              Print Page
            </button>
          </div>
          <div className="mx-auto my-3 noprint">
            <button
              type="button"
              className="btn btn-warning  font-weight-bold p-2 rounded"
              onClick={() => router.back()}
            >
              Go Back
            </button>
          </div>
        </>
      ) : (
        <Loader center content="loading" size="lg" />
      )}
    </div>
  );
};

export default TechAccuitance;
