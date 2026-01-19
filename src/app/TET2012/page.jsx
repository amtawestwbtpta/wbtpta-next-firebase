"use client";
import React, { useState } from "react";
import RESULT from "./tet12.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
export default function TET2012() {
  const [allResult, setAllResult] = useState(RESULT);
  const [filteredData, setFilteredData] = useState(RESULT);
  const [rollSearch, setRollSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const columns = [
    {
      name: "Sl",
      selector: (row, ind) => ind + 1,
      width: "10%",
      center: +true,
    },
    {
      name: "Roll No",
      selector: (row) => row?.roll,
      sortable: true,
      wrap: true,
      center: +true,
      width: "20%",
    },
    {
      name: "Teacher Name",
      selector: (row) => row?.name,
      sortable: true,
      wrap: true,
      center: +true,
      width: "25%",
    },
    {
      name: "PH",
      selector: (row) => row?.ph,
      sortable: true,
      wrap: true,
      center: +true,
      width: "5%",
    },
    {
      name: "Category 1",
      selector: (row) => row?.cat1,
      sortable: true,
      wrap: true,
      center: +true,
      width: "10%",
    },
    {
      name: "Category 2",
      selector: (row) => row?.cat2,
      sortable: true,
      wrap: true,
      center: +true,
      width: "10%",
    },
    {
      name: "Marks",
      selector: (row) => row?.marks,
      sortable: true,
      wrap: true,
      center: +true,
      width: "20%",
    },
  ];

  return (
    <div className="container-fluid text-center my-3">
      <h3 className="text-primary m-2">TET 2012 Result</h3>
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
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        fixedHeader
        subHeader
        subHeaderComponent={
          <>
            <input
              type="text"
              placeholder="Search by Roll"
              className="w-25 form-control m-2"
              value={rollSearch}
              onFocus={() => setNameSearch("")}
              onChange={(e) => {
                setRollSearch(e.target.value);
                setFilteredData(
                  allResult.filter((el) =>
                    el?.roll
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase()),
                  ),
                );
              }}
            />
            <input
              type="text"
              placeholder="Search By Name"
              className="w-25 form-control m-2"
              value={nameSearch}
              onFocus={() => setRollSearch("")}
              onChange={(e) => {
                setNameSearch(e.target.value);
                setFilteredData(
                  allResult.filter((el) =>
                    el?.name
                      ?.toLowerCase()
                      ?.includes(e.target.value.toLowerCase()),
                  ),
                );
              }}
            />
          </>
        }
        subHeaderAlign="right"
        paginationPerPage={40}
      />
    </div>
  );
}
