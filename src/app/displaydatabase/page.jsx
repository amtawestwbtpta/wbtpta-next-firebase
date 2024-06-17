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
import { decryptObjData, getCookie } from "../../modules/encryption";
const DisplayDatabase = () => {
  const { state, setState } = useGlobalContext();
  const router = useRouter();

  let teacherdetails = {
    convenor: "",
    gp: "",
    school: "",
    circle: "",
    tname: "",
    udise: "",
  };

  let details = getCookie("tid");
  if (details) {
    teacherdetails = decryptObjData("tid");
  }
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

    setData(data);
    setShowTable(true);
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:User Databse";
    userData();
  }, []);

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
      center: +true,
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
    },
    {
      name: "School Name",
      selector: (row) => row.school,
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      wrap: true,
      center: +true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      wrap: true,
      center: +true,
    },
    {
      name: "Pan",
      selector: (row) => row.pan,
      wrap: true,
    },
    {
      name: "state",
      selector: (row) => row.circle,
      sortable: true,
      wrap: true,
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
      wrap: true,
    },
    {
      name: "Update User Login",
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
      wrap: true,
    },
    {
      name: "Reset Password",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-sm btn-warning"
          onClick={() => {
            // eslint-disable-next-line
            let message = confirm(
              `Are You Sure To Reset Password of ${row.tname}? `
            );
            message
              ? resetPassword(row)
              : toast.success(`User Password Not Rested!`, {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,

                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
          }}
        >
          Reset Password
        </button>
      ),
      wrap: true,
    },
  ];
  // console.log(inputField);
  const deleteUser = async (user) => {
    const url = `https://awwbtpta-backend.onrender.com/users/delUser`;
    try {
      setLoader(true);
      let response = await axios.post(url, {
        id: user.id,
      });
      if (response.status === 200) {
        await deleteDoc(doc(firestore, "userteachers", user.id));
        await deleteDoc(doc(firestore, "profileImage", user.id));
        await updateDoc(doc(firestore, "teachers", user.id), {
          registered: false,
        });
        const desertRef = ref(storage, `profileImage/${user.photoName}`);
        await deleteObject(desertRef);
        await delTokens(user);

        setLoader(false);
        userData();
        toast.success(`User Deleted Successfully`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

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

        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    // console.log(user.teachersID);
    // console.log(res);
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
        toast.success("Congrats! User Login is Disabled Successfully!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
        userData();
      })
      .catch((e) => {
        toast.success("Congrats! User Login Disable Updation Failed!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

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
        toast.success("Congrats! User Login is Enabled Successfully!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
        userData();
      })
      .catch((e) => {
        toast.success("Congrats! User Login Enable Updation Failed!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  const resetPassword = async (user) => {
    const docRef = doc(firestore, "userteachers", user.id);
    await updateDoc(docRef, {
      password: bcrypt.hashSync(user.empid, 10),
    })
      .then(() => {
        toast.success("Congrats! User Password Reset was Successful!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
        userData();
      })
      .catch((e) => {
        toast.success("Congrats! User Password Reset Failed!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
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
