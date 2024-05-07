"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";

import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { firestore } from "../../context/FirbaseContext";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import TechSalary from "../../components/TechSalary";
const page = () => {
  const { access, setAccess } = useGlobalContext();
  const router = useRouter();

  const [teacherData, setTeacherData] = useState([]);
  const [schoolData, setschoolData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredSchool, setFilteredSchool] = useState([]);
  const [showSalaryData, setShowSalaryData] = useState(false);

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:School Wise Teacher Data";
    if (!access) {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  const userData = async () => {
    const q = query(collection(firestore, "teachers"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setTeacherData(data);
    const q2 = query(collection(firestore, "schools"));

    const querySnapshot2 = await getDocs(q2);
    const data2 = querySnapshot2.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setschoolData(data2);
  };

  useEffect(() => {
    userData();
  }, []);

  const [inputField, setInputField] = useState({
    id: "",
    school: "",
    pp: 0,
    i: 0,
    ii: 0,
    iii: 0,
    iv: 0,
    v: 0,
    total_student: 0,
  });
  useEffect(() => {}, [inputField]);
  const update = async () => {
    try {
      const docRef = doc(firestore, "schools", inputField.id);
      await updateDoc(docRef, {
        school: inputField.school,
        pp: inputField.pp,
        i: inputField.i,
        ii: inputField.ii,
        iii: inputField.iii,
        iv: inputField.iv,
        v: inputField.v,
        total_student: parseInt(
          inputField.pp +
            inputField.i +
            inputField.ii +
            inputField.iii +
            inputField.iv +
            inputField.v
        ),
      });

      toast.success("Congrats! School Data Updated Successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      userData();
    } catch (e) {
      toast.error("Unable To Send Query!!!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const getLocalData = () => {
    setInputField({
      id: filteredSchool[0].id,
      school: filteredSchool[0].school,
      pp: filteredSchool[0].pp,
      i: filteredSchool[0].i,
      ii: filteredSchool[0].ii,
      iii: filteredSchool[0].iii,
      iv: filteredSchool[0].iv,
      v: filteredSchool[0].v,
    });
    if (typeof window !== "undefined") {
      document.getElementById("sch_name").value = filteredSchool[0].school;

      document.getElementById("pp").value = filteredSchool[0].pp;
      document.getElementById("i").value = filteredSchool[0].i;
      document.getElementById("ii").value = filteredSchool[0].ii;
      document.getElementById("iii").value = filteredSchool[0].iii;
      document.getElementById("iv").value = filteredSchool[0].iv;
      document.getElementById("v").value = filteredSchool[0].v;
      document.getElementById("total_student").value =
        filteredSchool[0].total_student;
    }
  };

  return (
    <div className="container my-5">
      {!showSalaryData ? (
        <>
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="col-md-6 mx-auto mb-3">
            <select
              className="form-select"
              defaultValue={""}
              onChange={(e) => {
                setFilteredData(
                  teacherData.filter((el) => el.udise.match(e.target.value))
                );

                setFilteredSchool(
                  schoolData.filter((el) => el.udise.match(e.target.value))
                );
              }}
              aria-label="Default select example"
            >
              <option value="">Select School Name</option>
              {schoolData.length > 0
                ? schoolData.map((el) => {
                    return (
                      <option key={el.id} value={el.udise}>
                        {el.school}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          {filteredSchool.length > 0 ? (
            <div className="container my-3 mx-auto">
              <div className="row my-3">
                <div className="col-md-6">
                  <h4 className="text-primary text center">
                    SCHOOL NAME: {filteredSchool[0].school}
                  </h4>
                </div>
                <div className="col-md-6">
                  <h4 className="text-primary text center">
                    GP NAME: {filteredSchool[0].gp}
                  </h4>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 m-1">
                  <h6 className="text-primary text center">
                    UDISE: {filteredSchool[0].udise}
                  </h6>
                </div>
                <div className="col-md-3 m-1">
                  <h6 className="text-primary text center">
                    Total Teacher: {filteredData.length}
                  </h6>
                </div>
                <div className="col-md-3 m-1">
                  <h6 className="text-primary text center">
                    Total Student {filteredSchool[0].year - 1}:{" "}
                    {filteredSchool[0].student}
                  </h6>
                </div>
                <div className="col-md-3 m-1">
                  <h6 className="text-primary text center">
                    Total Student {filteredSchool[0].year}:{" "}
                    {filteredSchool[0].total_student}
                  </h6>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-md-3 m-1">
                  <h6 className="text-primary text center">
                    No. of Pre Primary Students: {filteredSchool[0].pp}
                  </h6>
                </div>
                <div className="col-md-3 m-1">
                  <h6 className="text-primary text center">
                    No. of Class I Students: {filteredSchool[0].i}
                  </h6>
                </div>
                <div className="col-md-3 m-1">
                  <h6 className="text-primary text center">
                    No. of Class II Students: {filteredSchool[0].ii}
                  </h6>
                </div>
                <div className="col-md-3 m-1">
                  <h6 className="text-primary text center">
                    No. of Class III Students: {filteredSchool[0].iii}
                  </h6>
                </div>
                <div className="col-md-3 m-1">
                  <h6 className="text-primary text center">
                    No. of Class IV Students: {filteredSchool[0].iv}
                  </h6>
                </div>
                {filteredSchool[0].v > 0 ? (
                  <div className="col-md-3 m-1">
                    <h6 className="text-primary text center">
                      No. of Class V Students: {filteredSchool[0].v}
                    </h6>
                  </div>
                ) : null}
              </div>
              <div className="my-2">
                {(filteredData.length > 2 &&
                  filteredSchool[0].total_student >= 100 &&
                  Math.floor(
                    filteredSchool[0].total_student / filteredData.length
                  ) >= 40) ||
                (filteredData.length > 2 &&
                  filteredSchool[0].total_student < 100 &&
                  Math.floor(
                    filteredSchool[0].total_student / filteredData.length
                  ) > 35) ||
                (filteredData.length <= 2 &&
                  Math.floor(
                    filteredSchool[0].total_student / filteredData.length
                  ) > 35) ? (
                  <div>
                    <h4 className="m-0 text-danger text-center">
                      Student Teacher Ratio is{" "}
                      {Math.floor(
                        filteredSchool[0].total_student / filteredData.length
                      )}
                      , Less Teacher
                    </h4>
                    <br />
                  </div>
                ) : (filteredData.length > 2 &&
                    Math.floor(
                      filteredSchool[0].total_student / filteredData.length
                    ) >= 30) ||
                  filteredData.length <= 2 ||
                  Math.floor(
                    filteredSchool[0].total_student / filteredData.length
                  ) <= 30 ? (
                  <div>
                    <h4 className="m-0 text-success text-center">
                      Student Teacher Ratio is{" "}
                      {Math.floor(
                        filteredSchool[0].total_student / filteredData.length
                      )}
                      , Normal
                    </h4>
                    <br />
                  </div>
                ) : (
                  <div>
                    <h4 className="m-0 text-danger text-center">
                      Student Teacher Ratio is{" "}
                      {Math.floor(
                        filteredSchool[0].total_student / filteredData.length
                      )}
                      , Excess Teacher
                    </h4>
                    <br />
                  </div>
                )}
              </div>
              <div className="my-2">
                {access === "admin" ? (
                  <>
                    {/* <!-- Button trigger modal --> */}
                    <button
                      type="button"
                      className="btn btn-primary mb-3"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={getLocalData}
                    >
                      Update Student Data
                    </button>
                    <br />
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => setShowSalaryData(!showSalaryData)}
                    >
                      All Teacher's Salary Data
                    </button>

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
                      <div className="modal-dialog modal-lg">
                        <form id="up_q_modal">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="staticBackdropLabel"
                              >
                                UPDATE {filteredSchool[0].school} DATA:
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="row d-flex justify-content-center">
                                <div className="mb-3 col-lg-6">
                                  <label className="form-label">
                                    School Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="sch_name"
                                    name="school"
                                    defaultValue={filteredSchool[0].school}
                                    onChange={(e) => {
                                      setInputField({
                                        ...inputField,
                                        school: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="mb-3 col-lg-6">
                                  <h3 className="text-info text-center">
                                    Total Teacher: {filteredData.length}
                                  </h3>
                                </div>
                                <div className="mb-3 col-lg-6">
                                  <label className="form-label">
                                    PP Student
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="pp"
                                    id="pp"
                                    defaultValue={filteredSchool[0].pp}
                                    onChange={(e) => {
                                      setInputField({
                                        ...inputField,
                                        pp: parseInt(e.target.value),
                                      });
                                    }}
                                  />
                                </div>
                                <div className="mb-3 col-lg-6">
                                  <label className="form-label">
                                    Class I Student
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="i"
                                    name="i"
                                    defaultValue={filteredSchool[0].i}
                                    onChange={(e) => {
                                      setInputField({
                                        ...inputField,
                                        i: parseInt(e.target.value),
                                      });
                                    }}
                                  />
                                </div>
                                <div className="mb-3 col-lg-6">
                                  <label className="form-label">
                                    Class II Student
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="ii"
                                    name="ii"
                                    defaultValue={filteredSchool[0].ii}
                                    onChange={(e) => {
                                      setInputField({
                                        ...inputField,
                                        ii: parseInt(e.target.value),
                                      });
                                    }}
                                  />
                                </div>
                                <div className="mb-3 col-lg-6">
                                  <label className="form-label">
                                    Class III Student
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="iii"
                                    name="iii"
                                    defaultValue={filteredSchool[0].iii}
                                    onChange={(e) => {
                                      setInputField({
                                        ...inputField,
                                        iii: parseInt(e.target.value),
                                      });
                                    }}
                                  />
                                </div>
                                <div className="mb-3 col-lg-6">
                                  <label className="form-label">
                                    Class IV Student
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="iv"
                                    name="iv"
                                    defaultValue={filteredSchool[0].iv}
                                    onChange={(e) => {
                                      setInputField({
                                        ...inputField,
                                        iv: parseInt(e.target.value),
                                      });
                                    }}
                                  />
                                </div>
                                <div className="mb-3 col-lg-6">
                                  <label className="form-label">
                                    Class V Student
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="v"
                                    name="v"
                                    defaultValue={filteredSchool[0].v}
                                    onMouseEnter={(e) => {
                                      setInputField({
                                        ...inputField,
                                        v: parseInt(e.target.value),
                                      });
                                    }}
                                  />
                                </div>
                                <div className="mb-3 col-lg-6">
                                  <label className="form-label">
                                    Total Student
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="total_student"
                                    name="total_student"
                                    value={parseInt(
                                      inputField.pp +
                                        inputField.i +
                                        inputField.ii +
                                        inputField.iii +
                                        inputField.iv +
                                        inputField.v
                                    )}
                                    onChange={(e) => {
                                      setInputField({
                                        ...inputField,
                                        total_student: parseInt(
                                          inputField.pp +
                                            inputField.i +
                                            inputField.ii +
                                            inputField.iii +
                                            inputField.iv +
                                            inputField.v
                                        ),
                                      });
                                    }}
                                  />
                                </div>
                              </div>
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
                                onClick={update}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="row mx-auto my-3 rounded justify-content-evenly">
            {filteredData.map((el) => {
              return (
                <div className="col-md-3 m-2 p-2 rounded bg-light" key={el.id}>
                  <h6 className="text-center text-primary">
                    Teacher Name: {el.tname}
                  </h6>
                  <h6 className="text-center text-primary">
                    Designation: {el.desig}
                  </h6>
                  <div className="d-flex flex-row justify-content-center text-center align-items-center">
                    <h6 className="text-center text-primary">
                      Association: &nbsp;
                    </h6>
                    <h6
                      className={`text-center ${
                        el.association === "WBTPTA"
                          ? "text-success"
                          : el.association === "WBPTA"
                          ? "text-primary"
                          : el.association === "BJP"
                          ? "text-warning"
                          : "text-danger"
                      } `}
                    >
                      {el.association}
                    </h6>
                  </div>
                  {access === "admin" ? (
                    <h6>
                      <a
                        href={`tel: +91${el.phone}`}
                        className="d-inline-block mb-1  p-0 text-decoration-none"
                      >
                        Phone: {el.phone}
                      </a>
                    </h6>
                  ) : el.gender === "male" ? (
                    <h6>
                      <a
                        href={`tel: +91${el.phone}`}
                        className="d-inline-block mb-1  p-0 text-decoration-none"
                      >
                        Phone: {el.phone}
                      </a>
                    </h6>
                  ) : null}

                  {access === "admin" ? (
                    <>
                      <h6 className="text-primary">DOB: {el.dob}</h6>
                      <h6 className="text-primary">DOJ: {el.doj}</h6>
                      <h6 className="text-primary">
                        DOJ in This School: {el.dojnow}
                      </h6>
                      <h6 className="text-primary">DOR: {el.dor}</h6>
                      <h6 className="text-primary">Training: {el.training}</h6>
                      <h6 className="text-primary">Address: {el.address}</h6>
                    </>
                  ) : null}
                  {el.hoi === "Yes" ? (
                    <h6 className="text-success">Head of The Institute</h6>
                  ) : null}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <TechSalary data={filteredData} />
      )}
    </div>
  );
};

export default page;
