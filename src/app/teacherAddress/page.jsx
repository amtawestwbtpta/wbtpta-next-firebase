"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";

import DataTable from "react-data-table-component";
import { Loader } from "rsuite";
import { firestore } from "../../context/FirbaseContext";
import { collection, getDocs, query } from "firebase/firestore";
const TeacherAddress = () => {
  const { access, setAccess } = useGlobalContext();
  const router = useRouter();

  const [showTable, setShowTable] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const userData = async () => {
    const q = query(collection(firestore, "teachers"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    let newData = data.sort(function (a, b) {
      var nameA = a.school.toLowerCase(),
        nameB = b.school.toLowerCase();
      if (nameA < nameB)
        //sort string ascending
        return -1;
      if (nameA > nameB) return 1;
      return 0; //default return value (no sorting)
    });
    setData(newData);
    setShowTable(true);
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Teacher's Address";
    userData();
  }, []);

  useEffect(() => {
    const result = data.filter((el) => {
      return el.tname.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search, data]);

  const columns = [
    {
      name: "Sl",
      selector: (row, ind) => ind + 1,

      center: +true,
    },
    {
      name: "Teacher Name",
      selector: (row) => row.tname,
      sortable: true,
      center: +true,
      wrap: true,
    },
    {
      name: "School Name",
      selector: (row) => row.school,
      sortable: true,
      center: +true,
      wrap: true,
    },
    {
      name: "UDISE NO.",
      selector: (row) => row.udise,

      center: +true,
    },
    {
      name: "Address",
      selector: (row) => row.address,

      center: +true,
      wrap: true,
    },
  ];

  return (
    <div className="container-fluid text-center my-5">
      {showTable ? (
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          fixedHeader
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search"
              className="w-25 form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
          subHeaderAlign="right"
        />
      ) : (
        <Loader center content="loading" size="lg" />
      )}
    </div>
  );
};

export default TeacherAddress;
