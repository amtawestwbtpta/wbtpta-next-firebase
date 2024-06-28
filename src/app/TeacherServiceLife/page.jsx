"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../context/Store";
import {
  getServiceAge,
  getServiceLife,
} from "../../modules/calculatefunctions";
const TechSalary = () => {
  const { state, teachersState } = useGlobalContext();
  const router = useRouter();
  const [data, setData] = useState(
    teachersState.filter((el) => el.association === "WBTPTA")
  );
  const [filteredData, setFilteredData] = useState([]);
  const [serviceLife, setServiceLife] = useState("");
  const [target, setTarget] = useState("");

  const serviceLifeRange = [
    {
      id: 1,
      serviceLife: "0 - 1 Years",
      value: [0],
      target: "1 Year",
    },
    {
      id: 2,
      serviceLife: "1 - 2 Years",
      value: [1, 2],
      target: "2 Years",
    },
    {
      id: 3,
      serviceLife: "9 - 10 Years",
      value: [9, 10],
      target: "10 Years",
    },
    {
      id: 4,
      serviceLife: "17 - 18 Years",
      value: [17, 18],
      target: "18 Years",
    },
    {
      id: 5,
      serviceLife: "19 - 20 Years",
      value: [19, 20],
      target: "20 Years",
    },
    {
      id: 6,
      serviceLife: "58 - 60 Years",
      value: [58, 59, 60],
      target: "60 Years",
    },
  ];
  const handleChange = (e) => {
    if (e.target.value !== "") {
      let selectedValue = JSON.parse(e.target.value.split("_")[0]);
      console.log(e.target.value);
      let x = [];
      data.map((el) => {
        selectedValue.map((elem) => {
          if (getServiceAge(el.doj) === elem) {
            x.push(el);
          }
        });
      });
      setFilteredData(x);
      setServiceLife(e.target.value.split("_")[1]);
      setTarget(e.target.value.split("_")[2]);
    } else {
      setFilteredData([]);
      setServiceLife("");
    }
  };
  useEffect(() => {
    if (!state) {
      router.push("/login");
    }
    document.title = `All Teacher's Service Life`;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {}, [filteredData, data, serviceLife]);
  return (
    <div className="container-fluid my-3">
      <h3 className="text-center text-primary">Teacher's Service Life</h3>

      <div className="col-md-4 mx-auto mb-3 noprint">
        <select
          className="form-select"
          defaultValue={""}
          onChange={handleChange}
          aria-label="Default select example"
        >
          <option value="">Select Service Life</option>
          {serviceLifeRange.map((el) => {
            return (
              <option
                key={el.id}
                value={
                  JSON.stringify(el.value) +
                  "_" +
                  el.serviceLife +
                  "_" +
                  el.target
                }
              >
                {el.serviceLife}
              </option>
            );
          })}
        </select>
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
            Service Life: {serviceLife}
          </h4>
          <h4 className="text-center text-primary">
            Total {filteredData.length} Teachers
          </h4>
        </div>
      )}
      <div className="container text-center">
        <div className="row d-flex justify-content-center">
          {serviceLife !== "" ? (
            filteredData.length > 0 ? (
              filteredData.map((el, index) => (
                <div
                  key={index}
                  className="rounded shadow-sm d-flex flex-column justify-content-evenly text-center col-md-3 m-2 p-2 nobreak"
                  style={{ backgroundColor: "seashell" }}
                >
                  <h6 className="text-center text-primary">
                    Teacher's Name:
                    <br /> {el.tname} ({`${el.desig}`})
                  </h6>
                  <h6 className="text-center text-primary">
                    School:
                    <br /> {el.school}
                  </h6>
                  <h6 className="text-center text-black">
                    Date of Joining:
                    <br /> {el.doj}
                  </h6>

                  <h6 className="text-center text-primary">
                    Service Life:
                    <br /> {getServiceLife(el.doj)}
                  </h6>
                  {serviceLife !== "58 - 60 Years" ? (
                    <h6 className="text-center text-success">
                      Date of Completion of {target}:<br />
                      {parseInt(el.doj?.split("-")[0]) - 1 > 9
                        ? parseInt(el.doj?.split("-")[0]) - 1
                        : `0${parseInt(el.doj?.split("-")[0]) - 1}`}
                      -{el.doj?.split("-")[1]}-
                      {serviceLife === "0 - 1 Years"
                        ? parseInt(el.doj?.split("-")[2]) + 1
                        : serviceLife === "1 - 2 Years"
                        ? parseInt(el.doj?.split("-")[2]) + 2
                        : serviceLife === "9 - 10 Years"
                        ? parseInt(el.doj?.split("-")[2]) + 10
                        : serviceLife === "17 - 18 Years"
                        ? parseInt(el.doj?.split("-")[2]) + 18
                        : serviceLife === "19 - 20 Years"
                        ? parseInt(el.doj?.split("-")[2]) + 20
                        : ""}
                    </h6>
                  ) : (
                    <h6 className="text-center text-success">
                      Date of Retirement: {el.dor}
                    </h6>
                  )}
                </div>
              ))
            ) : (
              <h6 className="text-center text-success">
                No Teachers found for the selected service life.
              </h6>
            )
          ) : (
            <h6 className="text-center text-success">
              Please Select Any Year Range From Above Choice
            </h6>
          )}
        </div>
      </div>
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
  );
};

export default TechSalary;
