"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import {
  getServiceLife,
  monthNamesWithIndex,
  uniqArray,
} from "../../modules/calculatefunctions";

const YearWiseTeachers = () => {
  const { state, teachersState } = useGlobalContext();
  const router = useRouter();
  const data = teachersState.filter((el) => el.association === "WBTPTA");

  const [filteredData, setFilteredData] = useState([]);
  const [moreFilteredData, setMoreFilteredData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [joiningMonths, setJoiningMonths] = useState([]);
  const [serviceArray, setServiceArray] = useState([]);

  const handleChange = (e) => {
    if (e.target.value !== "") {
      const selectedValue = e.target.value;
      let x = [];
      let y = [];
      data.map((teacher) => {
        const joiningYear = teacher.doj.split("-")[2];
        const joiningMonth = teacher.doj.split("-")[1];
        if (joiningYear === selectedValue) {
          x.push(teacher);
        }
        if (joiningYear === selectedValue) {
          monthNamesWithIndex.map((month) => {
            if (joiningMonth === month.index) {
              y.push(month);
            }
          });
        }
      });
      setSelectedYear(selectedValue);
      setFilteredData(x);
      setMoreFilteredData(x);
      setJoiningMonths(uniqArray(y).sort((a, b) => a.rank - b.rank));
    } else {
      setFilteredData([]);
      setSelectedYear("");
    }
  };
  const handleMonthChange = (month) => {
    let x = [];
    data.map((teacher) => {
      const joiningYear = teacher.doj.split("-")[2];
      const joiningMonth = teacher.doj.split("-")[1];
      if (joiningYear === selectedYear && joiningMonth === month) {
        return x.push(teacher);
      }
    });
    setFilteredData(x);
  };
  const getData = () => {
    let x = [];
    data.map((teacher) => {
      const joiningYear = teacher.doj.split("-")[2];
      x.push(joiningYear);
      x = uniqArray(x);
      x = x.sort((a, b) => a - b);
    });

    setServiceArray(x);
  };

  const getArrayLength = (year) => {
    let x = [];
    data.map((teacher) => {
      const joiningYear = teacher.doj.split("-")[2];
      if (joiningYear === year) {
        x.push(teacher);
      }
    });
    return x.length;
  };

  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="container-fluid my-3">
      <h3 className="text-center text-primary">Year Wise Teachers</h3>
      <div className="col-md-4 mx-auto mb-3 noprint">
        <select
          className="form-select"
          defaultValue={""}
          onChange={handleChange}
          aria-label="Default select example"
        >
          <option className="text-center text-primary" value="">
            Select Joining Year
          </option>
          {serviceArray.map((el) => (
            <option
              className="text-center text-success text-wrap"
              key={el.id}
              value={el}
            >
              {el +
                " - " +
                (new Date().getFullYear() - parseInt(el)) +
                " Year - " +
                getArrayLength(el) +
                ` ${getArrayLength(el) > 1 ? " Teachers" : " Teacher"}`}
            </option>
          ))}
        </select>
      </div>
      {selectedYear ? (
        <div>
          {joiningMonths.length > 1 && (
            <h4 className="text-center text-primary">
              Filter By Joining Month
            </h4>
          )}
        </div>
      ) : null}
      <div className="row d-flex justify-content-center noprint">
        {joiningMonths.length > 1 && (
          <div className="col-md-4 mx-auto mb-3 noprint">
            <select
              className="form-select"
              defaultValue={""}
              onChange={(e) => {
                let value = e.target.value;
                if (value) {
                  handleMonthChange(value);
                }
              }}
              aria-label="Default select example"
            >
              <option value="" className="text-center text-primary">
                Select Joining Month
              </option>
              {joiningMonths.map((month, index) => (
                <option
                  className="text-center text-success"
                  key={index}
                  value={month.index}
                >
                  {month.monthName +
                    " - " +
                    moreFilteredData.filter(
                      (m) => m.doj.split("-")[1] === month.index
                    ).length +
                    ` ${
                      moreFilteredData.filter(
                        (m) => m.doj.split("-")[1] === month.index
                      ).length > 1
                        ? " Teachers"
                        : " Teacher"
                    }`}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {filteredData.length > 0 && (
        <div>
          <div className="d-flex flex-row justify-content-center m-2">
            <div className="m-1 noprint">
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
            <div className="m-1 noprint">
              <button
                type="button"
                className="btn btn-warning  p-2 rounded"
                onClick={() => router.back()}
              >
                Go Back
              </button>
            </div>
          </div>
          <h4 className="text-center text-primary">
            {moreFilteredData.length > 1 ? "Teachers" : "Teacher"} Joined on
            Year {selectedYear}
          </h4>
          <h4 className="text-center text-primary">
            Total {filteredData.length} Teachers
          </h4>
        </div>
      )}
      <div className="container text-center">
        <div className="row d-flex justify-content-center">
          {selectedYear ? (
            filteredData.length > 0 ? (
              filteredData.map((el, index) => {
                return (
                  <div
                    key={index}
                    className="rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2 nobreak"
                    style={{ backgroundColor: "seashell" }}
                  >
                    <h6 className="text-center text-black">
                      {index + 1}) Teacher's Name:
                      <br /> {el.tname} ({`${el.desig}`})
                    </h6>
                    <h6 className="text-center text-black">
                      School:
                      <br /> {el.school}
                    </h6>
                    <h6>
                      <a
                        href={`tel: +91${el.phone}`}
                        className="d-inline-block  text-decoration-none text-black"
                      >
                        Mobile: {el.phone}
                      </a>
                    </h6>
                    <h6 className="text-center text-black">
                      Service Life:
                      <br /> {getServiceLife(el.doj)}
                    </h6>
                    <h6 className="text-center text-black">
                      Date of Joining:
                      <br /> {el.doj}
                    </h6>
                    <h6 className="text-center text-black">
                      DOJ at This Post in This School:
                      <br /> {el.dojnow}
                    </h6>
                    <h6 className="text-center text-black">
                      Date of Birth:
                      <br /> {el.dob}
                    </h6>
                    <h6 className="text-center text-black">
                      Date of Retirement:
                      <br /> {el.dor}
                    </h6>
                  </div>
                );
              })
            ) : (
              <h4 className="text-center text-primary">
                No Teachers found for the selected Year.
              </h4>
            )
          ) : null}
        </div>
      </div>{" "}
      {filteredData.length > 0 && (
        <div>
          <div className="d-flex flex-row justify-content-center m-2">
            <div className="m-1 noprint">
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
            <div className="m-1 noprint">
              <button
                type="button"
                className="btn btn-warning  p-2 rounded"
                onClick={() => router.back()}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearWiseTeachers;
