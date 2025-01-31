"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../context/Store";
import { months, titleCase } from "../../modules/calculatefunctions";
import { DA, HRA, PREV6DA, PREVDA } from "../../modules/constants";
import axios from "axios";
import Loader from "../../components/Loader";
const TechAccuitance = () => {
  const { state, stateArray } = useGlobalContext();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [school, setSchool] = useState("");
  const [editTeacher, setEditTeacher] = useState({});
  const [year, setYear] = useState(new Date().getFullYear()-1);
  useEffect(() => {
    if (!state) {
      router.push("/logout");
    }

    // eslint-disable-next-line
  }, []);
 
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
    setShowTable(false);
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
    setShowTable(true);
  };
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
  useEffect(() => {
    getSalary();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-fluid my-5">
      {showTable ? (
        <>
          <div className="table-resposive text-center my-2">
            <div className="noprint my-3 mx-auto">
              <h3 className="text-center text-primary">
                Acquittance Register of {titleCase(school)} for the Year {year}
              </h3>
              <div
                className="rounded p-2 col-md-4 mx-auto"
                style={{ backgroundColor: "#a19e9d" }}
              >
                <h4 className="text-black">Select Year</h4>
                {/* <button
                  type="button"
                  className="btn btn-primary m-2"
                  onClick={() => {
                    setYear(new Date().getFullYear() - 2);
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
                  {new Date().getFullYear() - 2}
                </button> */}
                <button
                  type="button"
                  className="btn btn-success m-2"
                  onClick={() => {
                    setYear(new Date().getFullYear()-1);
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
                  {new Date().getFullYear()-1}
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
                            .length > 0 ? (
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
                          ) : (
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
                          {/* <!-- Button trigger modal --> */}
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => {
                              setEditTeacher(teacher);
                              if (typeof window !== undefined) {
                                document.getElementById("rank").value =
                                  teacher.rank;
                              }
                            }}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      {editTeacher?.tname}
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="tname" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="tname"
                          name="tname"
                          value={editTeacher?.tname}
                          onChange={(e) => {
                            setEditTeacher({
                              ...editTeacher,
                              tname: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="rank" className="form-label">
                          Rank
                        </label>

                        <select
                          className="form-select form-select-sm"
                          name="rank"
                          id="rank"
                          aria-label=".form-select-sm example"
                          defaultValue={editTeacher?.rank}
                          onChange={(e) => {
                            setEditTeacher({
                              ...editTeacher,
                              rank: parseInt(e.target.value),
                            });
                          }}
                        >
                          <option value="">Select Teacher Rank</option>
                          {filteredData.map((teacher, ind) => (
                            <option key={ind} value={ind + 1}>
                              {ind + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="rank" className="form-label">
                          March Basic
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="rank"
                          name="rank"
                          value={editTeacher?.mbasic}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setEditTeacher({
                                ...editTeacher,
                                mbasic: parseInt(e.target.value),
                              });
                            } else {
                              setEditTeacher({
                                ...editTeacher,
                                mbasic: "",
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="rank" className="form-label">
                          July Basic
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="rank"
                          name="rank"
                          value={editTeacher?.basic}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setEditTeacher({
                                ...editTeacher,
                                basic: parseInt(e.target.value),
                              });
                            } else {
                              setEditTeacher({
                                ...editTeacher,
                                basic: "",
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="rank" className="form-label">
                          Previous March Basic
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="rank"
                          name="rank"
                          value={editTeacher?.prevmbasic}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setEditTeacher({
                                ...editTeacher,
                                prevmbasic: parseInt(e.target.value),
                              });
                            } else {
                              setEditTeacher({
                                ...editTeacher,
                                prevmbasic: "",
                              });
                            }
                          }}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        const updatedArray = filteredData
                          .map((t) =>
                            t.id === editTeacher?.id ? editTeacher : t
                          )
                          .sort((a, b) => a.rank - b.rank);
                        setFilteredData(updatedArray);
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
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
                  <h3 className="text-black font-weight-bold m-2">
                    HOWRAH DISTRICT PRIMARY SCHOOL COUNCIL
                  </h3>
                  <h5 className="text-black m-2">
                    ACQUITTANCE ROLL OF {school}, AMTA WEST CIRCLE
                  </h5>
                  <h5 className="text-black m-2">
                    FOR THE MONTH OF {month.toUpperCase()}, {year}
                  </h5>
                  <div className="d-flex flex-row text-center mx-auto justify-content-center align-items-center my-1">
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
                      {year === 2024 && index === 6 ? (
                        <th
                          className="text-center"
                          style={{ border: "1px solid" }}
                        >
                          IR
                        </th>
                      ) : null}
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
                        const id=el?.id
                        let prevmbasic = el.prevmbasic;
                        let basic = el.basic;
                        let mbasic = el.mbasic;
                        let ir = Math.round(mbasic * 0.04);
                        let addl = el.addl;
                        let ma = el.ma;
                        let gpf = el.gpf;
                        let gpfprev = el.gpfprev;
                        let julyGpf = el.julyGpf;
                        let gsli = el.gsli;
                        let disability = el.disability;
                        let date = new Date();
                        let da;
                        // console.log(junelast)
                        let basicpay;
                        let ptax;
                        let pfund;
                        let gross;
                        const prevJanuarySalary=prevJanuary.filter(e=>e.id===id)[0]
                        const prevFebruarySalary=prevFebruary.filter(e=>e.id===id)[0]
                        const marchSalary=march.filter(e=>e.id===id)[0]
                        const aprilSalary=april.filter(e=>e.id===id)[0]
                        const maySalary=may.filter(e=>e.id===id)[0]
                        const juneSalary=june.filter(e=>e.id===id)[0]
                        const julySalary=july.filter(e=>e.id===id)[0]
                        const augustSalary=august.filter(e=>e.id===id)[0]
                        const septemberSalary=september.filter(e=>e.id===id)[0]
                        const octoberSalary=october.filter(e=>e.id===id)[0]
                        const novemberSalary=november.filter(e=>e.id===id)[0]
                        const decemberSalary=december.filter(e=>e.id===id)[0]
                        const januarySalary=january.filter(e=>e.id===id)[0]
                        const februarySalary=february.filter(e=>e.id===id)[0]
                        

                        if (year === date.getFullYear() - 2) {
                          if (index <= 5) {
                            basicpay = prevmbasic;
                            pfund = gpfprev;
                            da = Math.round(basicpay * PREV6DA);
                            if (el.newHt) {
                              addl = 0;
                            }
                          } else {
                            pfund = gpfprev;
                            if (el.newHt && index <= 9) {
                              addl = 0;
                            }
                            basicpay = mbasic;
                            da = Math.round(basicpay * PREV6DA);
                          }
                        } else {
                          if (index === 0) {
                            basicpay = januarySalary?.basic;
                            da = Math.round(basicpay * januarySalary?.daPercent);
                            pfund = januarySalary?.gpf;
                            ma = januarySalary?.ma;
                          } else if (index === 1) {
                            basicpay = januarySalary?.basic;
                            da = Math.round(basicpay * januarySalary?.daPercent);
                            pfund = januarySalary?.gpf;
                            ma = januarySalary?.ma;
                          } else if (index === 2) {
                            basicpay = marchSalary?.basic;
                            da = Math.round(basicpay * marchSalary?.daPercent);
                            pfund = marchSalary?.gpf;
                            ma = marchSalary?.ma;
                          } else if (index === 3) {
                            basicpay = aprilSalary?.basic;
                            da = Math.round(basicpay * aprilSalary?.daPercent);
                            pfund = aprilSalary?.gpf;
                            ma = aprilSalary?.ma;
                          } else if (index === 4) {
                            basicpay = maySalary?.basic;
                            da = Math.round(basicpay * maySalary?.daPercent);
                            pfund = maySalary?.gpf;
                            ma = maySalary?.ma;
                          } else if (index === 5) {
                            basicpay = juneSalary?.basic;
                            da = Math.round(basicpay * juneSalary?.daPercent);
                            pfund = juneSalary?.gpf;
                            ma = juneSalary?.ma;
                          } else if (index === 6) {
                            basicpay = julySalary?.basic;
                            da = Math.round(basicpay * julySalary?.daPercent);
                            pfund = julySalary?.gpf;
                            ma = julySalary?.ma;
                          } else if (index === 7) {
                            basicpay = augustSalary?.basic;
                            da = Math.round(basicpay * augustSalary?.daPercent);
                            pfund = augustSalary?.gpf;
                            ma = augustSalary?.ma;
                          } else if (index === 8) {
                            basicpay = septemberSalary?.basic;
                            da = Math.round(basicpay * septemberSalary?.daPercent);
                            pfund = septemberSalary?.gpf;
                            ma = septemberSalary?.ma;
                          } else if (index === 9) {
                            basicpay = octoberSalary?.basic;
                            da = Math.round(basicpay * octoberSalary?.daPercent);
                            pfund = octoberSalary?.gpf;
                            ma = octoberSalary?.ma;
                          } else if (index === 10) {
                            basicpay = novemberSalary?.basic;
                            da = Math.round(basicpay * novemberSalary?.daPercent);
                            pfund = novemberSalary?.gpf;
                            ma = novemberSalary?.ma;
                          } else if (index === 11) {
                            basicpay = decemberSalary?.basic;
                            da = Math.round(basicpay * decemberSalary?.daPercent);
                            pfund = decemberSalary?.gpf;
                            ma = decemberSalary?.ma;
                          } else if (index === 12) {
                            basicpay = januarySalary?.basic;
                            da = Math.round(basicpay * januarySalary?.daPercent);
                            pfund = januarySalary?.gpf;
                            ma = januarySalary?.ma;
                          } else if (index === 13) {
                            basicpay = februarySalary?.basic;
                            da = Math.round(basicpay * februarySalary?.daPercent);
                            pfund = februarySalary?.gpf;
                            ma = februarySalary?.ma;
                          }
                        }

                        let hra = Math.round(basicpay * HRA);

                        if (year === 2024 && index === 6) {
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

                        let netpay = gross - deduction;

                        if (el.monthData[index].value && basicpay!==0) {
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
                              {year === 2024 && index === 6 && (
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
