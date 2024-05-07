"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import Loader from "../../components/Loader";
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";
import { firestore } from "../../context/FirbaseContext";
import { collection, getDocs, query } from "firebase/firestore";
const FindTeacher = () => {
  const { access, setAccess } = useGlobalContext();
  const router = useRouter();
  const [showTable, setShowTable] = useState(false);
  useEffect(() => {
    if (!access) {
      router.push("/login");
    }
  });

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  const userData = async () => {
    const q = query(collection(firestore, "teachers"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setData(data);
    setShowTable(true);
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Teachers Database";
    userData();
  }, []);
  useEffect(() => {
    // console.log(data);
    const result = data.filter((el) => {
      return el.tname.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search, data]);

  const columns = [
    {
      name: "Sl",
      selector: (row, ind) => ind + 1,
      width: "5",
    },
    {
      name: "Teacher Name",
      selector: (row) => row.tname,
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "School Name",
      selector: (row) => row.school,
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "Mobile",
      selector: (row) =>
        access === "admin" ? (
          <a
            href={`tel: +91${row.phone}`}
            className="d-inline-block mb-2 text-decoration-none text-dark"
          >
            <i className="bi bi-telephone-fill"></i>
            {"  "}
            +91{row.phone}
          </a>
        ) : row.gender === "male" ? (
          <a
            href={`tel: +91${row.phone}`}
            className="d-inline-block mb-2 text-decoration-none text-dark"
          >
            <i className="bi bi-telephone-fill"></i>
            {"  "}
            +91{row.phone}
          </a>
        ) : (
          "CONTACT US"
        ),
      sortable: true,
      wrap: true,
      center: +true,
    },
  ];

  return (
    <div className="container text-center my-5">
      {showTable ? (
        <>
          <h3 className="text-center text-primary">Displaying Teachers Data</h3>
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
                className="form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
            subHeaderAlign="right"
          />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default FindTeacher;
