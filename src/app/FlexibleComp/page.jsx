"use client";
import React, { useEffect, useState } from "react";
import {
  createDownloadLink,
  getValues,
  uniq,
} from "../../modules/calculatefunctions";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
function FlexibleComp() {
  const { state, teachersState } = useGlobalContext();
  const router = useRouter();
  const [teacherData, setTeacherData] = useState([
    "school",
    "udise",
    "tname",
    "gender",
    "ph",
    "desig",
    "fname",
    "circle",
    "sis",
    "gp",
    "association",
    "phone",
    "email",
    "dob",
    "doj",
    "dojnow",
    "dor",
    "bank",
    "account",
    "ifsc",
    "empid",
    "training",
    "pan",
    "address",
    "basic",
    "mbasic",
    "prevmbasic",
    "addl",
    "da",
    "mda",
    "hra",
    "mhra",
    "ma",
    "gross",
    "mgross",
    "gpf",
    "gpfprev",
    "mptax",
    "jptax",
    "gsli",
    "netpay",
    "mnetpay",
    "bonus",
    "arrear",
    "question",
    "hoi",
    "newHt",
    "showAccount",
    "service",
    "id",
    "rank",
    "dataYear",
  ]);

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isclicked, setIsclicked] = useState(false);
  const [search, setSearch] = useState("");
  const [heading, setHeading] = useState("");
  const [fkey, setFkey] = useState("");
  const [fvalue, setFvalue] = useState("");
  const [firstItem, setFirstItem] = useState(0);
  const [visibleItems, setVisibleItems] = useState(10);
  const [showPagination, setShowPagination] = useState(true);
  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
    setFirstItem((prevFirstItem) => prevFirstItem + 10);
  };
  const loadPrev = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems - 10);
    setFirstItem((prevFirstItem) => prevFirstItem - 10);
  };

  const userData = async () => {
    setFetchedData(teachersState);
    setFilteredData(teachersState);
  };

  function handleSelect(e) {
    let y = [];

    y = [...selectedKeys, e.target.value];
    if (y.filter((el) => el === e.target.value).length > 1) {
      y = uniq(y);
    }
    setSelectedKeys(y);
    setTeacherData(teacherData.filter((el) => el !== e.target.value));
    if (typeof window !== undefined) {
      document.getElementById("selectForm").value = "";
    }
  }

  useEffect(() => {
    if (!state) {
      router.push("/logout");
    }
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    document.title = heading.toUpperCase();
  }, [selectedKeys, teacherData, heading]);
  useEffect(() => {
    userData();
  }, []);
  return (
    <div className="container-fluid my-5 mx-auto">
      {!isSubmitted ? (
        <>
          <div className="noprint col-md-4 mx-auto mb-3">
            <select
              className="form-select"
              defaultValue={""}
              onChange={handleSelect}
              aria-label="Default select example"
              id="selectForm"
            >
              <option value="">Select Key Name</option>
              {teacherData
                .sort((a, b) => a.localeCompare(b))
                .map((el, ind) => (
                  <option value={el} key={ind}>
                    {el}
                  </option>
                ))}
            </select>
          </div>
          {selectedKeys.length > 0 && (
            <>
              <div className=" justify-content-center align-items-center mx-auto">
                {selectedKeys.map((el, ind) => (
                  <span
                    className={`btn btn-sm btn-${
                      (ind + 1) % 2 === 0 ? "primary" : "success"
                    } fs-6 m-1`}
                    key={ind}
                    onClick={() => {
                      setSelectedKeys(
                        selectedKeys.filter((keys) => keys !== el)
                      );
                      setTeacherData([...teacherData, el]);
                    }}
                  >
                    {el} <i className={` bi bi-x `}></i>
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-info noprint text-white font-weight-bold p-2 m-5 rounded"
                onClick={() => {
                  setIsSubmitted(true);
                }}
              >
                Submit
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <div>
            <input
              className="form-control w-50 noprint"
              type="text"
              value={search}
              placeholder="Enter Teacher Name"
              onChange={(e) => {
                setSearch(e.target.value);
                setFilteredData(
                  fetchedData.filter((el) => {
                    return el.tname
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  })
                );
              }}
            />
            <div className="my-2">
              <input
                className="form-control w-50 noprint"
                type="text"
                value={heading}
                placeholder="Enter Table Heading"
                onChange={(e) => {
                  setHeading(e.target.value);
                }}
              />
            </div>
            <div className="my-2 row justify-content-center align-items-center mx-auto">
              <input
                className="form-control w-25  m-2 noprint"
                type="text"
                value={fkey}
                placeholder="Enter Key Name"
                onChange={(e) => {
                  setFkey(e.target.value);
                }}
                style={{ height: 50 }}
              />
              <input
                className="form-control  m-2 noprint"
                type="text"
                value="="
                placeholder="Condition"
                disabled
                style={{ height: 50, width: 50 }}
              />

              <input
                className="form-control w-25  m-2 noprint"
                type="text"
                value={fvalue}
                placeholder="Enter Value"
                onChange={(e) => {
                  setFvalue(e.target.value);
                }}
                style={{ height: 50 }}
              />
              {fkey !== "" && fvalue !== "" && (
                <div className="">
                  <button
                    type="button"
                    className="btn btn-info noprint text-white font-weight-bold p-2 m-5 rounded"
                    style={{ height: 50, width: 100 }}
                    onClick={() => {
                      setFilteredData(
                        filteredData.filter((el) => el[fkey] === fvalue)
                      );
                    }}
                  >
                    Filter
                  </button>
                  <button
                    type="button"
                    className="btn btn-success noprint text-white font-weight-bold p-2 m-5 rounded"
                    style={{ height: 50, width: 100 }}
                    onClick={() => {
                      setFilteredData(
                        filteredData.filter((el) => el.association === 'WBTPTA')
                      );
                    }}
                  >
                    Filter WBTPTA
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger noprint text-white font-weight-bold p-2 m-5 rounded"
                    style={{ height: 50, width: 100 }}
                    onClick={() => {
                      setFilteredData(fetchedData);
                      setFkey("");
                      setFvalue("");
                    }}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
            <div className="my-2 noprint">
              <button
                type="button"
                className="btn btn-danger noprint text-white font-weight-bold p-2 m-5 rounded"
                onClick={() => {
                  setIsSubmitted(false);
                  setSelectedKeys([]);
                  setTeacherData([
                    "school",
                    "udise",
                    "tname",
                    "gender",
                    "ph",
                    "desig",
                    "fname",
                    "circle",
                    "sis",
                    "gp",
                    "association",
                    "phone",
                    "email",
                    "dob",
                    "doj",
                    "dojnow",
                    "dor",
                    "bank",
                    "account",
                    "ifsc",
                    "empid",
                    "training",
                    "pan",
                    "address",
                    "basic",
                    "mbasic",
                    "prevmbasic",
                    "addl",
                    "da",
                    "mda",
                    "hra",
                    "mhra",
                    "ma",
                    "gross",
                    "mgross",
                    "gpf",
                    "gpfprev",
                    "mptax",
                    "jptax",
                    "gsli",
                    "netpay",
                    "mnetpay",
                    "bonus",
                    "arrear",
                    "question",
                    "hoi",
                    "newHt",
                    "showAccount",
                    "service",
                    "id",
                    "rank",
                    "dataYear",
                  ]);
                  setHeading("");
                  setFkey("");
                  setFvalue("");
                  setFirstItem(0);
                  setVisibleItems(10);
                  setShowPagination(true);
                }}
              >
                Close
              </button>
            </div>
            <h3 className="text-center mx-auto">{heading.toUpperCase()}</h3>
            <table className="table table-white table-hover table-striped table-borderd align-middle table-responsive mx-auto text-center">
              <thead>
                <tr className="text-center">
                  <th className="text-center">Sl No.</th>
                  {selectedKeys.map((el, ind) => (
                    <th className="text-center" key={ind}>
                      {el.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getValues(
                  selectedKeys,
                  filteredData.slice(firstItem, visibleItems),
                  firstItem
                )}
              </tbody>
            </table>
          </div>

          {showPagination && (
            <div>
              {firstItem >= 10 && (
                <button
                  type="button"
                  className="btn btn-info noprint text-white font-weight-bold p-2 m-5 rounded"
                  onClick={() => {
                    setFirstItem(0);
                    setVisibleItems(10);
                  }}
                >
                  <i className="bi bi-chevron-bar-left"></i>
                </button>
              )}
              {firstItem >= 10 && (
                <button
                  type="button"
                  className="btn btn-primary noprint text-white font-weight-bold p-2 m-5 rounded"
                  onClick={loadPrev}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
              )}
              {visibleItems < filteredData.length && (
                <button
                  type="button"
                  className="btn btn-success noprint text-white font-weight-bold p-2 m-5 rounded"
                  onClick={loadMore}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              )}
              {visibleItems < filteredData.length && (
                <button
                  type="button"
                  className="btn btn-warning noprint text-white font-weight-bold p-2 m-5 rounded"
                  onClick={() => {
                    setFirstItem(filteredData.length - 10);
                    setVisibleItems(filteredData.length);
                  }}
                >
                  <i className="bi bi-chevron-bar-right"></i>
                </button>
              )}
            </div>
          )}
          {showPagination ? (
            <button
              type="button"
              className="btn btn-warning noprint text-white font-weight-bold p-2 m-5 rounded"
              onClick={() => {
                setFirstItem(0);
                setVisibleItems(filteredData.length);
                setShowPagination(false);
              }}
            >
              Hide Pagination
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-warning noprint text-white font-weight-bold p-2 m-5 rounded"
              onClick={() => {
                setFirstItem(0);
                setVisibleItems(10);
                setShowPagination(true);
              }}
            >
              Show Pagination
            </button>
          )}
          <button
            type="button"
            className="btn btn-info noprint text-white font-weight-bold p-2 m-5 rounded"
            onClick={() => {
              if (typeof window !== undefined) {
                window.print();
              }
            }}
            style={{ height: 50, width: 100 }}
          >
            Print
          </button>
          {!isclicked ? (
            <button
              type="button"
              className="btn btn-primary noprint text-white font-weight-bold p-2 m-5 rounded"
              onClick={() => {
                setFilteredData(
                  filteredData.filter((el) => el.association === "WBTPTA")
                );
                setIsclicked(true);
                if (showPagination) {
                  setFirstItem(0);
                  setVisibleItems(10);
                } else {
                  setFirstItem(0);
                  setVisibleItems(filteredData.length);
                }
              }}
            >
              Only WBTPTA Teachers
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-warning noprint text-white font-weight-bold p-2 m-5 rounded"
              onClick={() => {
                setFilteredData(fetchedData);
                setIsclicked(false);
                if (showPagination) {
                  setFirstItem(0);
                  setVisibleItems(10);
                } else {
                  setFirstItem(0);
                  setVisibleItems(filteredData.length);
                }
              }}
            >
              All Teachers
            </button>
          )}
          <button
            type="button"
            className="btn btn-success noprint text-white font-weight-bold p-2 m-5 rounded"
            onClick={() => {
              createDownloadLink(filteredData, "teachers");
            }}
          >
            Download
          </button>
          <div>
            <button
              type="button"
              className="btn btn-danger noprint text-white font-weight-bold p-2 m-5 rounded"
              onClick={() => {
                setIsSubmitted(false);
                setSelectedKeys([]);
                setTeacherData([
                  "school",
                  "udise",
                  "tname",
                  "gender",
                  "ph",
                  "desig",
                  "fname",
                  "circle",
                  "sis",
                  "gp",
                  "association",
                  "phone",
                  "email",
                  "dob",
                  "doj",
                  "dojnow",
                  "dor",
                  "bank",
                  "account",
                  "ifsc",
                  "empid",
                  "training",
                  "pan",
                  "address",
                  "basic",
                  "mbasic",
                  "prevmbasic",
                  "addl",
                  "da",
                  "mda",
                  "hra",
                  "mhra",
                  "ma",
                  "gross",
                  "mgross",
                  "gpf",
                  "gpfprev",
                  "mptax",
                  "jptax",
                  "gsli",
                  "netpay",
                  "mnetpay",
                  "bonus",
                  "arrear",
                  "question",
                  "hoi",
                  "newHt",
                  "showAccount",
                  "service",
                  "id",
                  "rank",
                  "dataYear",
                ]);
                setHeading("");

                setFirstItem(0);
                setVisibleItems(10);
                setFkey("");
                setFvalue("");
                setShowPagination(true);
              }}
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default FlexibleComp;
