"use client";
import React, { useEffect, useContext, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";

import { decryptObjData, getCookie } from "../../modules/encryption";

const StudentsPhotoCorner = () => {
  const { access, redirectData } = useGlobalContext();
  const router = useRouter();

  let studentdata = JSON.parse(redirectData.split("details=")[1]);
  let userdetails = decryptObjData("tid");
  let school = userdetails.school;
  const [filteredData, setFilteredData] = useState(studentdata);

  const filterStudents = (index) => {
    setFilteredData(studentdata.filter((el) => el.nclass === index));
  };

  useEffect(() => {
    if (!access) {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {}, [filteredData]);
  return (
    <div className="container text-center mx-auto flex-wrap my-2 timesFont">
      <h4 className="text-center">
        STUDENT CORNER OF {school} OF THE YEAR {new Date().getFullYear()}
      </h4>
      <div className="mt-3 noprint mx-auto col-md-4">
        <button
          type="button"
          className="btn btn-sm m-2 btn-info"
          onClick={() => filterStudents(0)}
        >
          PP
        </button>
        <button
          type="button"
          className="btn btn-sm m-2 btn-primary"
          onClick={() => filterStudents(1)}
        >
          I
        </button>
        <button
          type="button"
          className="btn btn-sm m-2 btn-secondary"
          onClick={() => filterStudents(2)}
        >
          II
        </button>
        <button
          type="button"
          className="btn btn-sm m-2 btn-warning"
          onClick={() => filterStudents(3)}
        >
          III
        </button>
        <button
          type="button"
          className="btn btn-sm m-2 btn-dark"
          onClick={() => filterStudents(4)}
        >
          IV
        </button>
        <button
          type="button"
          className="btn btn-sm m-2 btn-success"
          onClick={() => setFilteredData(studentdata)}
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-sm m-2 btn-info"
          onClick={() => window.print()}
        >
          Print
        </button>
        <button
          type="button"
          className="btn btn-sm m-2 btn-danger"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
      <div className="row mx-auto text-center">
        {filteredData.map((el, index) => {
          return (
            <div
              style={{
                width: "200px",
                margin: "5px",
                border: "1px solid black",
                borderRadius: "10px",
                padding: "5px",
              }}
              className="justify-content-center align-items-center text-center"
              key={index}
            >
              <div className="align-items-center">
                <div
                  style={{
                    width: "100px",
                    height: "130px",
                    margin: "auto",
                    marginBottom: "5px",
                    // borderWidth: "1px",
                    // borderRadius: "5px",
                    // borderColor: "1px solid black",
                  }}
                  className="text-center justify-content-center align-items-center border-1 border-dark"
                ></div>
              </div>
              <h6 className="m-1 p-0 text-center text-wrap">
                {el.class.split(" (A)").join("")}
              </h6>

              <h6>Roll No.- {el.roll_no}</h6>

              <h6 className="m-1 p-0 text-center text-wrap">
                Name: {el.student_name}
              </h6>
              <h6 className="m-1 p-0 text-center text-wrap">
                Mother's Name: {el.mother_name}
              </h6>
              <h6 className="m-1 p-0 text-center text-wrap">
                Father's Name: {el.father_name}
              </h6>

              <a
                href={`tel: +91${el.mobile}`}
                className="d-inline-block fs-7  text-decoration-none text-dark"
              >
                Mobile: {el.mobile}
              </a>
              <h6 className="m-1 p-0 text-center text-wrap">
                Student ID: {el.student_id}
              </h6>
              <h6 className="m-1 p-0 text-center text-wrap">
                DOB: {el.birthdate}
              </h6>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentsPhotoCorner;
