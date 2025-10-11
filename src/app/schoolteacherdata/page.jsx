"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { firestore } from "../../context/FirebaseContext";
import { doc, updateDoc } from "firebase/firestore";
import StudentCount from "../../components/StudentCount";
import StudentInput from "../../components/StudentInput";
import { decryptData } from "../../modules/encryption";
import { myAPIKey } from "../../modules/constants";
const SchoolTeacherData = () => {
  const {
    state,
    schoolState,
    setSchoolState,
    teachersState,
    setSchoolUpdateTime,
    setStateArray,
    setStateObject,
  } = useGlobalContext();
  const router = useRouter();
  const token = decryptData(myAPIKey);
  const [teacherData, setTeacherData] = useState(teachersState);
  const [schoolData, setschoolData] = useState(schoolState);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredSchool, setFilteredSchool] = useState({
    pp: 0,
    i: 0,
    ii: 0,
    iii: 0,
    iv: 0,
    v: 0,
    id: "",
    school: "",
    gp: "",
    year: 2025,
    udise: "",
    student_2023: 0,
    student_2024: 0,
    student_2025: 0,
  });
  const [total_student, setTotal_student] = useState(0);
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:School Wise Teacher Data";
    if (!state) {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [inputField, setInputField] = useState({
    pp: 0,
    i: 0,
    ii: 0,
    iii: 0,
    iv: 0,
    v: 0,
    id: "",
    school: "",
    gp: "",
    year: 2025,
    udise: "",
    student_2023: 0,
    student_2024: 0,
    student_2025: 0,
  });
  const update = async () => {
    const newData = {
      ...inputField,
      pp: parseInt(inputField.pp),
      i: parseInt(inputField.i),
      ii: parseInt(inputField.ii),
      iii: parseInt(inputField.iii),
      iv: parseInt(inputField.iv),
      v: parseInt(inputField.v),
      student_2023: parseInt(inputField.student_2023),
      student_2024: parseInt(inputField.student_2024),
      student_2025: parseInt(inputField.student_2025),
      year: parseInt(inputField.year),
    };
    try {
      const docRef = doc(firestore, "schools", newData.id);
      await updateDoc(docRef, newData);
      let y = schoolState.filter((el) => el.id !== newData.id);
      y = [...y, newData];
      y = y.sort(function (a, b) {
        var nameA = a.school.toLowerCase(),
          nameB = b.school.toLowerCase();
        if (nameA < nameB)
          //sort string ascending
          return -1;
        if (nameA > nameB) return 1;
        return 0; //default return value (no sorting)
      });
      try {
        // Ensure we upload valid JSON content to GitHub
        const jsonContent = JSON.stringify(y, null, 2);
        const content = Buffer.from(jsonContent, "utf-8").toString("base64");
        const url =
          "https://api.github.com/repos/amtawestwbtpta/awwbtptadata/contents/schools.json";
        let sha = null;
        try {
          const check = await fetch(url, {
            headers: { Authorization: `token ${token}` },
          });
          if (check.ok) {
            const data = await check.json();
            sha = data.sha;
          }
        } catch (error) {
          console.log(error);
        }
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
          body: JSON.stringify({
            message: "Update school data",
            content: content,
            branch: "main",
            sha,
          }),
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to update data on GitHub", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setSchoolState(y);
      setSchoolUpdateTime(Date.now());
      setschoolData(y);
      setFilteredSchool(newData);
      toast.success("Congrats! School Data Updated Successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      toast.error("Unable To Send Query!!!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleSelection = (e) => {
    const value = e.target.value;
    if (value) {
      const tData = teacherData.filter((el) => el.udise.match(value));
      const sData = schoolData.filter((el) => el.udise.match(value))[0];
      setFilteredData(tData);
      setStateArray(tData);
      setFilteredSchool(sData);
      setInputField(sData);
      const totalStudents =
        parseInt(sData.pp) +
        parseInt(sData.i) +
        parseInt(sData.ii) +
        parseInt(sData.iii) +
        parseInt(sData.iv) +
        parseInt(sData.v);
      setTotal_student(totalStudents);
    } else {
      toast.error("Please Select School Name");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
  }, [inputField, schoolData, filteredSchool, teacherData]);
  useEffect(() => {
    setTeacherData(teachersState);
    setschoolData(schoolState);
    //eslint-disable-next-line
  }, [schoolState, teachersState]);

  return (
    <div className="container my-5">
      <>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="col-md-6 mx-auto mb-3">
          <select
            className="form-select"
            defaultValue={""}
            onChange={handleSelection}
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

        {filteredSchool.school && (
          <div className="container my-3 mx-auto">
            <div className="row my-3">
              <div className="col-md-6">
                <h4 className="text-primary text-center">
                  SCHOOL NAME: {filteredSchool.school}
                </h4>
              </div>
              <div className="col-md-6">
                <h4 className="text-primary text-center">
                  GP NAME: {filteredSchool.gp}
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 m-1">
                <h6 className="text-primary text-center">
                  UDISE: {filteredSchool.udise}
                </h6>
              </div>
              <div className="col-md-3 m-1">
                <h6 className="text-primary text-center">
                  Total Teacher: {filteredData.length}
                </h6>
              </div>
              <StudentCount
                info={filteredSchool}
                divClassNames={"col-md-3 m-1"}
                hClassNames={"text-primary text-center"}
              />
            </div>
            <div className="row my-2">
              <div className="col-md-3 m-1">
                <h6 className="text-primary text-center">
                  No. of Pre Primary Students: {filteredSchool.pp}
                </h6>
              </div>
              <div className="col-md-3 m-1">
                <h6 className="text-primary text-center">
                  No. of Class I Students: {filteredSchool.i}
                </h6>
              </div>
              <div className="col-md-3 m-1">
                <h6 className="text-primary text-center">
                  No. of Class II Students: {filteredSchool.ii}
                </h6>
              </div>
              <div className="col-md-3 m-1">
                <h6 className="text-primary text-center">
                  No. of Class III Students: {filteredSchool.iii}
                </h6>
              </div>
              <div className="col-md-3 m-1">
                <h6 className="text-primary text-center">
                  No. of Class IV Students: {filteredSchool.iv}
                </h6>
              </div>
              {filteredSchool.v > 0 ? (
                <div className="col-md-3 m-1">
                  <h6 className="text-primary text-center">
                    No. of Class V Students: {filteredSchool.v}
                  </h6>
                </div>
              ) : null}
            </div>
            <div className="my-2">
              {(filteredData.length > 2 &&
                total_student >= 100 &&
                Math.floor(total_student / filteredData.length) >= 40) ||
              (filteredData.length > 2 &&
                total_student < 100 &&
                Math.floor(total_student / filteredData.length) > 35) ||
              (filteredData.length <= 2 &&
                Math.floor(total_student / filteredData.length) > 35) ? (
                <div>
                  <h4 className="m-0 text-danger text-center">
                    Student Teacher Ratio is{" "}
                    {Math.floor(total_student / filteredData.length)}, Less
                    Teacher
                  </h4>
                  <br />
                </div>
              ) : (filteredData.length > 2 &&
                  Math.floor(total_student / filteredData.length) >= 30) ||
                filteredData.length <= 2 ||
                Math.floor(total_student / filteredData.length) <= 30 ? (
                <div>
                  <h4 className="m-0 text-success text-center">
                    Student Teacher Ratio is{" "}
                    {Math.floor(total_student / filteredData.length)}, Normal
                  </h4>
                  <br />
                </div>
              ) : (
                <div>
                  <h4 className="m-0 text-danger text-center">
                    Student Teacher Ratio is{" "}
                    {Math.floor(total_student / filteredData.length)}, Excess
                    Teacher
                  </h4>
                  <br />
                </div>
              )}
            </div>
            <div className="my-2">
              {state === "admin" ? (
                <>
                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    className="btn btn-primary mb-3"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => {
                      setInputField(filteredSchool);
                    }}
                  >
                    Update Student Data
                  </button>
                  <br />
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      router.push("/techsalary");
                      setStateArray(filteredData);
                    }}
                  >
                    All Teacher's Salary Data
                  </button>
                  <div className="mx-auto my-3 noprint">
                    <button
                      type="button"
                      className="btn btn-primary p-2 rounded"
                      onClick={() => {
                        router.push(`/TeacherPhotoCorner`);
                        setStateArray(filteredData);
                      }}
                    >
                      Teacher's Photo Corner
                    </button>
                  </div>
                  <div className="mx-auto my-3 noprint">
                    <button
                      type="button"
                      className="btn btn-info p-2 rounded"
                      onClick={() => {
                        router.push(`/TechersAccuitance`);
                        setStateArray(filteredData);
                      }}
                    >
                      Teacher's Accuitance
                    </button>
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
                    <div className="modal-dialog modal-lg">
                      <form id="up_q_modal">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="staticBackdropLabel"
                            >
                              UPDATE {inputField.school} DATA:
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
                              <StudentInput
                                info={inputField}
                                onInfoChange={setInputField}
                                divClassNames="col-md-6 mb-3"
                                hClassNames="text-primary text-center"
                              />
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                              onClick={() => {
                                setInputField(filteredSchool);
                              }}
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
        )}

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
                {state === "admin" ? (
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

                {state === "admin" ? (
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
                {state === "admin" && (
                  <div>
                    <button
                      type="button"
                      className="btn btn-warning btn-sm mx-2"
                      onClick={() => {
                        router.push("/EditTeacher");
                        setStateObject(el);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-success"
                      onClick={() => {
                        router.push("/ViewDetails");
                        setStateObject(el);
                      }}
                    >
                      View
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>
    </div>
  );
};

export default SchoolTeacherData;
