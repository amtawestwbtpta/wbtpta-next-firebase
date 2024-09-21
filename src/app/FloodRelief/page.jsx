"use client";
import React, { useEffect, useState } from "react";
import { firestore } from "../../context/FirbaseContext";
import { doc, setDoc, getDocs, query, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../context/Store";
import DataTable from "react-data-table-component";
import Loader from "../../components/Loader";
import {
  getCurrentDateInput,
  getSubmitDateInput,
  todayInString,
  IndianFormat,
  createDownloadLink,
} from "../../modules/calculatefunctions";
import { toast } from "react-toastify";
export default function FloodRelief() {
  const {
    state,
    floodReliefState,
    setfloodReliefState,
    floodReliefUpdateTime,
    setfloodReliefUpdateTime,
  } = useGlobalContext();
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [addDonation, setAddDonation] = useState(false);
  const [inputField, setInputField] = useState({
    id: `donor${floodReliefState.length + 100}`,
    name: "",
    amount: "",
    date: todayInString(),
    bank: "PARTHA",
  });
  const router = useRouter();

  const getData = async () => {
    try {
      setShowLoader(true);
      const querySnapshot = await getDocs(
        query(collection(firestore, "floodrelief"))
      );
      const data = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }));

      setAllData(data);
      setFilteredData(data);
      setfloodReliefState(data);
      setShowLoader(false);
      setInputField({ ...inputField, id: data.length + 100 });
      setfloodReliefUpdateTime(Date.now());
      console.log("called");
    } catch (error) {
      console.error("Error getting documents: ", error);
      setShowLoader(false);
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    try {
      await setDoc(doc(firestore, "floodrelief", inputField.id), inputField);
      setfloodReliefState([...floodReliefState, inputField]);
      setInputField({
        id: [...floodReliefState, inputField].length + 100,
        name: "",
        amount: "",
        date: todayInString(),
        bank: "PARTHA",
      });
      getData();
      setShowLoader(false);
      toast.success("Flood Relief Data Added Successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
      setShowLoader(false);
      toast.error("Error in Adding Flood Relief Data");
    }
  };

  const columns = [
    {
      name: "Sl",
      selector: (row, ind) => ind + 1,
      width: "2",
    },

    {
      name: "Teacher's Name",
      selector: (row) => row.name,
      sortable: +true,
      wrap: +true,
      center: +true,
    },
    {
      name: "Amount",
      selector: (row) => `₹ ${IndianFormat(row.amount)}`,
      sortable: +true,
      wrap: +true,
      center: +true,
    },
    {
      name: "Account",
      selector: (row) => row.bank,
      sortable: +true,
      wrap: +true,
      center: +true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: +true,
      wrap: +true,
      center: +true,
    },
  ];

  useEffect(() => {
    const difference = (Date.now() - floodReliefUpdateTime) / 1000 / 60 / 15;
    if (floodReliefState.length === 0 || difference >= 1) {
      getData();
    } else {
      setFilteredData(floodReliefState);
      setAllData(floodReliefState);
      setInputField({ ...inputField, id: floodReliefState.length + 100 });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
  }, [floodReliefState, allData, filteredData]);
  return (
    <div className="container">
      <h3 className="mb-3">Flood Relief Fund Raiser for Flood Disaster 2024</h3>
      {state === "admin" && (
        <div className="mb-3">
          <button
            type="button"
            className={`btn btn-${addDonation ? `primary` : `success`}`}
            onClick={() => setAddDonation(!addDonation)}
          >
            {addDonation ? "Hide Donation" : "Add New Donation"}
          </button>
          <button
            type="button"
            className="btn btn-sm m-3 btn-warning"
            onClick={() => {
              createDownloadLink(floodReliefState, "floodrelief");
            }}
          >
            Download Notice Data
          </button>
        </div>
      )}
      {state === "admin" && addDonation && (
        <div className="mb-3 row col-md-6 mx-auto justify-content-center align-items-center">
          <form action="" method="post">
            <div className="mb-3">
              <label htmlFor="name">Teacher's Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter Teacher's name"
                value={inputField.name}
                onChange={(e) =>
                  setInputField({
                    ...inputField,
                    name: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter Amount"
                className="form-control"
                value={inputField.amount}
                onChange={(e) =>
                  setInputField({
                    ...inputField,
                    amount: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="bank" className="form-label">
                Bank:
              </label>
              <select
                className="form-select"
                aria-label=".form-select-sm example"
                required
                id="bank"
                defaultValue={inputField.bank}
                onChange={(e) => {
                  setInputField({
                    ...inputField,
                    bank: e.target.value,
                  });
                }}
              >
                <option value="">Select Bank</option>
                <option value={"PARTHA"}>PARTHA</option>
                <option value={"BANDHAN"}>BANDHAN</option>
                <option value={"SBI"}>SBI</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control"
                defaultValue={getCurrentDateInput(inputField.date)}
                onChange={(e) =>
                  setInputField({
                    ...inputField,
                    date: getSubmitDateInput(e.target.value),
                  })
                }
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                if (
                  inputField.name !== "" &&
                  inputField.amount !== "" &&
                  inputField.bank !== ""
                ) {
                  submitData();
                } else {
                  toast.error("All fields are required");
                }
              }}
            >
              Add
            </button>
            <button
              type="button"
              className="btn btn-danger m-1"
              onClick={() => {
                setInputField({
                  id: `donor${floodReliefState.length + 100}`,
                  name: "",
                  amount: "",
                  date: todayInString(),
                  bank: "BANDHAN",
                });
              }}
            >
              Clear
            </button>
          </form>
        </div>
      )}
      {showLoader && <Loader />}
      {!showLoader && (
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
              placeholder="Search Teacher's Name"
              className="w-50 form-control"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value) {
                  const filtered = allData.filter((item) =>
                    item.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  );
                  setFilteredData(filtered);
                } else {
                  setFilteredData(allData);
                }
              }}
            />
          }
          subHeaderAlign="right"
        />
      )}
    </div>
  );
}
