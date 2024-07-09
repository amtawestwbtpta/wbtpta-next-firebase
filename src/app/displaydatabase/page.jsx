"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import axios from "axios";
import DataTable from "react-data-table-component";
import { storage, firestore } from "../../context/FirbaseContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { ref, deleteObject } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import bcrypt from "bcryptjs";
import Loader from "../../components/Loader";
import { createDownloadLink } from "../../modules/calculatefunctions";
const DisplayDatabase = () => {
  const {
    state,
    userState,
    setUserState,
    userUpdateTime,
    setUserUpdateTime,
    teachersState,
    setTeachersState,
    setTeacherUpdateTime,
  } = useGlobalContext();
  const router = useRouter();

  const [showTable, setShowTable] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loader, setLoader] = useState(false);
  const userData = async () => {
    const querySnapshot = await getDocs(
      query(collection(firestore, "userteachers"))
    );
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    let newData = data.sort((a, b) => a.createdAt - b.createdAt);
    setData(newData);
    setFilteredData(newData);
    setUserState(newData);
    setShowTable(true);
    setUserUpdateTime(Date.now());
  };

  useEffect(() => {
    const result = data.filter((el) => {
      return el.tname.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search, data]);
  useEffect(() => {}, [data]);
  const columns = [
    {
      name: "Sl",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "ID",
      selector: (row, index) => row.id,
      sortable: true,
    },
    {
      name: "Teacher Name",
      selector: (row) => row.tname,
      sortable: true,
      wrap: true,
    },
    {
      name: "Photo",
      selector: (row) => {
        return (
          <img
            src={row.url}
            alt="profilephoto"
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        );
      },
      wrap: true,
    },
    {
      name: "School Name",
      selector: (row) => row.school,
      sortable: true,
      wrap: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,

      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,

      wrap: true,
    },
    {
      name: "Pan",
      selector: (row) => row.pan,
      wrap: true,
    },
    {
      name: "EmpID",
      selector: (row) => row.empid,
      wrap: true,
    },
    {
      name: "IsMatched",
      selector: (row) =>
        compare(row.pan.toLowerCase(), row.password) ? (
          <h6 className="text-success">Yes</h6>
        ) : (
          <h6 className="text-primary">No</h6>
        ),
    },
    {
      name: "Access",
      selector: (row) => row.circle,
      sortable: true,
    },
    {
      name: "Registered On",
      selector: (row) => {
        let date = new Date(row.createdAt);
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
      },
      wrap: true,
    },
    {
      name: "Delete User",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            // eslint-disable-next-line
            let message = confirm(`Are You Sure To Delete User ${row.tname}`);
            message ? deleteUser(row) : alert("Teacher Not Deleted");
          }}
        >
          Delete
        </button>
      ),
    },
    {
      name: "Disable Login",
      cell: (row) =>
        row.disabled ? (
          <button
            type="button"
            className="btn btn-sm btn-success"
            onClick={() => {
              // eslint-disable-next-line
              let message = confirm(
                `Are You Sure To Restore User ${row.tname}'s Login? `
              );
              message ? restoreUser(row.id) : alert("User Login Not Restored!");
            }}
          >
            Unlock User
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-sm btn-warning"
            onClick={() => {
              // eslint-disable-next-line
              let message = confirm(
                `Are You Sure To Disable User ${row.tname}'s Login? `
              );
              message ? disableUser(row.id) : alert("User Login Not Disabled!");
            }}
          >
            Lock User
          </button>
        ),
    },
    {
      name: "Reset Password",
      cell: (row) =>
        !compare(row.pan.toLowerCase(), row.password) ? (
          <button
            type="button"
            className="btn btn-sm btn-warning"
            onClick={() => {
              // eslint-disable-next-line
              let message = confirm(
                `Are You Sure To Reset Password of ${row.tname}? `
              );
              message ? resetPassword(row) : alert("User Password Not Rested!");
            }}
          >
            Reset Password
          </button>
        ) : (
          <h6 className="text-primary">Password Need not to be Reset</h6>
        ),
    },
  ];
  // console.log(inputField);
  const deleteUser = async (user) => {
    const url = `https://awwbtpta.vercel.app/api/delteacher`;
    try {
      setLoader(true);
      let response = await axios.post(url, {
        id: user.id,
      });
      let record = response.data;
      if (record.success) {
        await deleteDoc(doc(firestore, "userteachers", user.id));
        await deleteDoc(doc(firestore, "profileImage", user.id));
        await updateDoc(doc(firestore, "teachers", user.id), {
          registered: false,
        });
        setUserState(userState.filter((el) => el.id !== user.id));
        let x = teachersState.filter((el) => el.id === user.id)[0];
        let y = teachersState.filter((el) => el.id !== user.id);
        x.registered = false;
        y = [...y, x];
        let c = y.sort(
          (a, b) => a.school.localeCompare(b.school) && b.rank > a.rank
        );
        setTeachersState(c);
        setUserUpdateTime(Date.now());
        setTeacherUpdateTime(Date.now());
        const desertRef = ref(storage, `profileImage/${user.photoName}`);
        await deleteObject(desertRef);
        await delTokens(user);

        setLoader(false);
        toast.success(`User Deleted Successfully`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setLoader(false);
        toast.error("Something Went Wrong!", {
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
    } catch (e) {
      setLoader(false);
      toast.error("Something Went Wrong!", {
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

  const delTokens = async (user) => {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, "tokens"),
        where("username", "==", user.username)
      )
    );
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    data.map(async (el) => {
      await deleteDoc(doc(firestore, "tokens", el.id));
    });
  };

  const disableUser = async (id) => {
    const docRef = doc(firestore, "userteachers", id);
    await updateDoc(docRef, {
      disabled: true,
    })
      .then(() => {
        let x = userState.filter((el) => el.id === id)[0];
        let y = userState.filter((el) => el.id !== id);
        x.disabled = true;
        y = [...y, x];
        let newData = y.sort((a, b) => a.createdAt - b.createdAt);
        setUserState(newData);
        setUserUpdateTime(Date.now());
        toast.success("Congrats! User Login is Disabled Successfully!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((e) => {
        toast.success("Congrats! User Login Disable Updation Failed!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  const restoreUser = async (id) => {
    const docRef = doc(firestore, "userteachers", id);
    await updateDoc(docRef, {
      disabled: false,
    })
      .then(() => {
        let x = userState.filter((el) => el.id === id)[0];
        let y = userState.filter((el) => el.id !== id);
        x.disabled = false;
        y = [...y, x];
        let newData = y.sort((a, b) => a.createdAt - b.createdAt);
        setUserState(newData);
        setUserUpdateTime(Date.now());
        toast.success("Congrats! User Login is Enabled Successfully!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((e) => {
        toast.success("Congrats! User Login Enable Updation Failed!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  const resetPassword = async (user) => {
    const docRef = doc(firestore, "userteachers", user.id);
    await updateDoc(docRef, {
      password: bcrypt.hashSync(user.empid.toLowerCase(), 10),
    })
      .then(() => {
        let x = userState.filter((el) => el.id === user.id)[0];
        let y = userState.filter((el) => el.id !== user.id);
        x.password = bcrypt.hashSync(user.empid.toLowerCase(), 10);
        y = [...y, x];
        let newData = y.sort((a, b) => a.createdAt - b.createdAt);
        setUserState(newData);
        setUserUpdateTime(Date.now());
        toast.success("Congrats! User Password Reset was Successful!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((e) => {
        toast.success("Congrats! User Password Reset Failed!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const getUserData = () => {
    const userDifference = (Date.now() - userUpdateTime) / 1000 / 60 / 3;
    if (userState.length === 0 || userDifference >= 1) {
      userData();
    } else {
      setData(userState);
      setFilteredData(userState);
      setShowTable(true);
    }
  };
  const compare = (userPassword, serverPassword) => {
    let match = bcrypt.compareSync(userPassword, serverPassword);

    return match;
  };
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:User Databse";
    getUserData();
    //eslint-disable-next-line
  }, []);
  useEffect(() => {}, [userState]);
  useEffect(() => {
    if (state !== "admin") {
      router.push("/login");
    }
  }, []);
  return (
    <div className="container text-center my-5">
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
      {loader ? <Loader /> : null}
      {showTable ? (
        <>
          <h3 className="text-center text-primary">
            Displaying Users Database
          </h3>
          <button
            type="button"
            className="btn btn-sm m-3 btn-warning"
            onClick={() => {
              createDownloadLink(data, "userteachers");
            }}
          >
            Download User Data
          </button>
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
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DisplayDatabase;
