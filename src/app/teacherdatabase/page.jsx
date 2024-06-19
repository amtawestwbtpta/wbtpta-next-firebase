"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firestore } from "../../context/FirbaseContext";
import { storage } from "../../context/FirbaseContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Loader from "../../components/Loader";
import { decryptObjData, getCookie } from "../../modules/encryption";
import {
  getCurrentDateInput,
  getSubmitDateInput,
} from "../../modules/calculatefunctions";
import bcrypt from "bcryptjs";
import { notifyAll } from "../../modules/notification";
import axios from "axios";
const TeacherDatabase = () => {
  const {
    state,
    teachersState,
    setTeachersState,
    setStateObject,
    setTeacherUpdateTime,
    setStateArray,
  } = useGlobalContext();
  const router = useRouter();
  const [showTable, setShowTable] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (state !== "admin") {
      localStorage.clear();
      router.push("/logout");
    }
    // eslint-disable-next-line
  }, []);
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
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [inputField, setinputField] = useState({});
  const [schoolFilterData, setSchoolFilterData] = useState([]);
  const [schUdise, setSchUdise] = useState("");
  const [updId, setUpdId] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(undefined);
  const [allDelTeachers, setAllDelTeachers] = useState([]);
  const [filteredDelTeachers, setFilteredDelTeachers] = useState([]);
  const [delSearch, setDelSearch] = useState("");
  const [showDelTeachers, setShowDelTeachers] = useState(false);
  const [src, setSrc] = useState(null);
  const [file, setFile] = useState({});
  const [user, setUser] = useState({
    tname: "",
    school: "",
    pan: "",
    empid: "",
  });
  const [progress, setProgress] = useState(0);
  const [showPercent, setShowPercent] = useState(false);

  const userData = async () => {
    setLoader(true);
    let newDatas = teachersState.sort(
      (a, b) => a.school.localeCompare(b.school) && b.rank > a.rank
    );
    setData(newDatas);
    setLoader(false);
    setShowTable(true);
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Teachers Database";
    userData();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // console.log(data);
    const result = data.filter((el) => {
      return el.tname.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
    setSchoolFilterData(data.filter((el) => el.udise.match(schUdise)));
    // eslint-disable-next-line
  }, [search, inputField, data, updId, schUdise, selectedTeacher]);
  useEffect(() => {
    // console.log(data);
    const delResult = allDelTeachers.filter((el) => {
      return el.tname.toLowerCase().match(delSearch.toLowerCase());
    });
    setFilteredDelTeachers(delResult);

    // eslint-disable-next-line
  }, [delSearch]);

  const getDeletedTeachers = async () => {
    setLoader(true);
    const q = query(collection(firestore, "deletedTeachers"));
    const querySnapshot = await getDocs(q);
    const datas = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    let newDatas = datas.sort(function (a, b) {
      var nameA = a.tname.toLowerCase(),
        nameB = b.tname.toLowerCase();
      if (nameA < nameB)
        //sort string ascending
        return -1;
      if (nameA > nameB) return 1;
      return 0; //default return value (no sorting)
    });
    setAllDelTeachers(newDatas);
    setFilteredDelTeachers(newDatas);
    setLoader(false);
  };

  const columns = [
    {
      name: "Sl",
      selector: (row, ind) => ind + 1,
      width: "2",
      center: +true,
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
      name: "View Details",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-sm btn-success"
          onClick={() => {
            setStateObject(row);
            router.push("/ViewDetails");
          }}
        >
          View Details
        </button>
      ),
    },

    {
      name: "Update Details",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={(e) => {
            setinputField({
              id: row.id,
              school: row.school,
              udise: row.udise,
              tname: row.tname,
              tsname: row.tsname,
              disability: row.disability,
              desig: row.desig,
              hoi: row.hoi,
              fname: row.fname,
              circle: row.circle,
              question: row.question,
              gp: row.gp,
              association: row.association,
              phone: row.phone,
              email: row.email,
              dob: row.dob,
              doj: row.doj,
              dojnow: row.dojnow,
              dor: row.dor,
              bank: row.bank,
              account: row.account,
              ifsc: row.ifsc,
              empid: row.empid,
              training: row.training,
              pan: row.pan,
              sis: row.sis,

              address: row.address,
              basic: row.basic,
              mbasic: row.mbasic,
              addl: row.addl,
              da: row.da,
              mda: row.mda,
              hra: row.hra,
              mhra: row.mhra,
              ma: row.ma,
              gross: row.gross,
              mgross: row.mgross,
              gpf: row.gpf,
              gpfprev: row.gpfprev,
              ptax: row.ptax,
              gsli: row.gsli,
              netpay: row.netpay,
              mnetpay: row.mnetpay,
              arrear: row.arrear,
              bonus: row.bonus,
            });

            setUpdId(row.id);
            setSelectedTeacher(row);
            setSchUdise(row.udise);
            if (typeof window !== "undefined") {
              // browser code
              document.getElementById(
                "staticBackdropLabel"
              ).innerHTML = `DETAILED DATA OF ${row.tname}`;
              if (row.ifsc) {
                fetch(`https://ifsc.razorpay.com/${row.ifsc}`)
                  .then((res) => res.json())
                  .then((data) => {
                    document.getElementById("bankdiv").innerHTML =
                      "<p>Bank Details<br>Bank Name: " +
                      data.BANK +
                      "<br/>" +
                      "Branch: " +
                      data.BRANCH +
                      "<br/>" +
                      "Address: " +
                      data.ADDRESS +
                      "<br/>" +
                      "IFSC: " +
                      data.IFSC +
                      "<br/>" +
                      "MICR: " +
                      data.MICR +
                      "<br/></p>";
                  });
              }
            }
          }}
        >
          Update Details
        </button>
      ),
    },

    {
      name: "Payslip WBTPTA",
      cell: (row) => (
        <Link
          className="btn btn-sm btn-info"
          href={`/payslipwbtpta`}
          onClick={() => setStateObject(row)}
        >
          Payslip WBTPTA
        </Link>
      ),
    },

    {
      name: "Generate Form 16",
      cell: (row) => (
        <Link
          className="btn btn-sm btn-success"
          href={`/Form16`}
          onClick={() => setStateObject(row)}
        >
          Generate Form 16
        </Link>
      ),
    },
    {
      name: "Generate Form 16 Previous Year",
      cell: (row) => (
        <Link
          className="btn btn-sm btn-info"
          href={`/Form16Prev`}
          onClick={() => setStateObject(row)}
        >
          Generate Form 16 Previous Year
        </Link>
      ),
    },
    // {
    //   name: "Payslip OSMS",
    //   cell: (row) => (
    //     <Link
    //       className="btn btn-sm btn-success"
    //       href={`/techpaysliposms?details=${JSON.stringify(row)}`}
    //     >
    //       Payslip OSMS
    //     </Link>
    //   ),
    // },
    {
      name: "Payslip OSMS",
      cell: (row) => (
        <Link
          className="btn btn-sm btn-primary"
          // href={`/techpaysliposmsNew?details=${JSON.stringify(row)}`}
          href={`/techpaysliposmsNew`}
          onClick={() => setStateObject(row)}
        >
          Payslip OSMS New
        </Link>
      ),
    },
    {
      name: "Delete Teacher",
      cell: (row) => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() => {
            // eslint-disable-next-line
            let conf = confirm(
              `Are you sure you want to Delete Teacher ${row.tname}?`
            );
            if (conf) {
              deleteTeacher(row);
            } else {
              toast.success("Teacher Not Deleted!!!");
            }
          }}
        >
          Delete Teacher
        </button>
      ),
    },
    {
      name: "Register Teacher",
      cell: (row) =>
        !row.registered ? (
          <button
            className="btn btn-sm btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#regTeacher"
            onClick={() => {
              setUser(row);
            }}
          >
            Register Teacher
          </button>
        ) : (
          <h6 className="text-success">Teacher Registered</h6>
        ),
    },
  ];
  const delColumns = [
    {
      name: "Sl",
      selector: (row, ind) => ind + 1,
      width: "2",
    },
    {
      name: "Teacher Name",
      selector: (row) => row.tname,
      sortable: true,
      wrap: true,
    },
    {
      name: "School Name",
      selector: (row) => row.school,
      sortable: true,
      wrap: true,
    },
    {
      name: "View Details",
      cell: (row) => (
        <Link
          className="btn btn-sm btn-primary"
          href={`/ViewDetails`}
          onClick={() => setStateObject(row)}
        >
          View Details
        </Link>
      ),
    },

    {
      name: "Restore Teacher",
      cell: (row) => (
        <button
          className="btn btn-sm btn-success"
          onClick={() => {
            // eslint-disable-next-line
            let conf = confirm(
              `Are you sure you want to Restore Teacher ${row.tname}?`
            );
            if (conf) {
              restoreTeacher(row);
            } else {
              toast.success("Teacher Not Restored!!!");
            }
          }}
        >
          Restore Teacher
        </button>
      ),
    },
  ];
  const updateData = async () => {
    setLoader(true);
    try {
      const docRef = doc(firestore, "teachers", updId);
      await updateDoc(docRef, inputField);
      let x = teachersState.filter((el) => el.id !== updId);
      x = [...x, inputField];
      const newData = x.sort(
        (a, b) => a.school.localeCompare(b.school) && b.rank > a.rank
      );
      setTeachersState(newData);
      setTeacherUpdateTime(Date.now());
      setData(newData);
      const collectionRefUser = collection(firestore, "userteachers");
      const qq = query(collectionRefUser, where("teachersID", "==", updId));
      try {
        const qSnap = await getDocs(qq);

        const docRefuser = doc(
          firestore,
          "userteachers",
          qSnap.docs[0].data().id
        );

        try {
          await updateDoc(docRefuser, {
            tname: inputField.tname,
            tsname: inputField.tsname,
            school: inputField.school,
            desig: inputField.desig,
            pan: inputField.pan,
            udise: inputField.udise,
            sis: inputField.sis,
            circle: inputField.circle,
            empid: inputField.empid,
            question: inputField.question,
            email: inputField.email,
            phone: inputField.phone,
          });
        } catch (e) {
          console.log(e);
          toast.error("UserTeachers Database Not Updated!!!", {
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
        toast.error("Teacher Not Registered Yet!!!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setLoader(false);
      userData();
      toast.success("Congrats! Teacher Details Updated Successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      setLoader(false);
      toast.error("Unable To Send Query!!!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(e);
      // console.log(inputField);
    }
  };
  const deleteTeacher = async (el) => {
    const docRef = doc(firestore, "teachers", el.id);
    await deleteDoc(docRef)
      .then(async () => {
        let x = teachersState.filter((elem) => elem.id !== el.id);
        const newData = x.sort(function (a, b) {
          let nameA = a.school.toLowerCase(),
            nameB = b.school.toLowerCase();
          if (nameA < nameB)
            //sort string ascending
            return -1;
          if (nameA > nameB) return 1;
          return 0; //default return value (no sorting)
        });
        setTeachersState(newData);
        setTeacherUpdateTime(Date.now());
        setFilteredData(newData);
        setData(newData);
        await setDoc(doc(firestore, "deletedTeachers", el.id), el)
          .then(async () => {
            toast.success("Congrats! Teacher Deleted Successfully!", {
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
          .catch((err) => {
            console.log(err);
            toast.error("Unable To Send Query!!!", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,

              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable To Send Query!!!", {
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
  const restoreTeacher = async (el) => {
    const docRef = doc(firestore, "deletedTeachers", el.id);
    await deleteDoc(docRef)
      .then(async () => {
        await setDoc(doc(firestore, "teachers", el.id), el)
          .then(async () => {
            let x = teachersState;
            x = [...x, el];
            const newData = x.sort(
              (a, b) => a.school.localeCompare(b.school) && b.rank > a.rank
            );
            setTeachersState(newData);
            setTeacherUpdateTime(Date.now());
            setFilteredData(newData);
            toast.success("Congrats! Teacher Restored Successfully!", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,

              draggable: true,
              progress: undefined,
              theme: "light",
            });
            // userData();
            getDeletedTeachers();
          })
          .catch((err) => {
            console.log(err);
            toast.error("Unable To Send Query!!!", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,

              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable To Send Query!!!", {
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

  const registerUser = async () => {
    setLoader(true);
    const filestorageRef = ref(
      storage,
      `/profileImage/${user.id + "-" + file.name}`
    );
    const uploadTask = uploadBytesResumable(filestorageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setShowPercent(true);
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // // update progress
        setProgress(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then(async (photourl) => {
          // console.log(url);
          const techerData = {
            teachersID: user.id,
            tname: user.tname,
            tsname: user.tsname,
            school: user.school,
            desig: user.desig,
            pan: user.pan,
            udise: user.udise,
            sis: user.sis,
            circle: user.circle,
            showAccount: user.showAccount,
            empid: user.empid,
            question: user.question,
            email: user.email,
            phone: user.phone,
            id: user.id,
            dpscst: "District Primary School Council, Howrah",
            dpsc: "Howrah District Primary School Council",
            dpsc1: "",
            dpsc2: "CHAIRMAN, DPSC, HOWRAH",
            dpsc3: "18, N.D. MUKHERJEE ROAD",
            dpsc4: "HOWRAH- 1",
            tan: "CALD02032C",
            username: user.empid.toLowerCase(),
            password: bcrypt.hashSync(user.pan.toLowerCase(), 10),
            createdAt: Date.now(),
            url: photourl,
            photoName: user.id + "-" + file.name,
          };
          const backendUrl = `https://awwbtpta.vercel.app/api/signup`;
          try {
            await axios
              .post(backendUrl, techerData)
              .then(async () => {
                await setDoc(doc(firestore, "userteachers", techerData.id), {
                  teachersID: techerData.teachersID,
                  tname: techerData.tname,
                  tsname: techerData.tsname,
                  school: techerData.school,
                  desig: techerData.desig,
                  pan: techerData.pan,
                  udise: techerData.udise,
                  sis: techerData.sis,
                  circle: techerData.circle,
                  showAccount: techerData.showAccount,
                  empid: techerData.empid,
                  question: techerData.question,
                  email: techerData.email,
                  phone: techerData.phone,
                  id: techerData.id,
                  dpscst: techerData.dpscst,
                  dpsc: techerData.dpsc,
                  dpsc1: techerData.dpsc1,
                  dpsc2: techerData.dpsc2,
                  dpsc3: techerData.dpsc3,
                  dpsc4: techerData.dpsc4,
                  tan: techerData.tan,
                  username: techerData.username,
                  password: techerData.password,
                  createdAt: techerData.createdAt,
                  url: techerData.url,
                  photoName: techerData.photoName,
                });
                await setDoc(doc(firestore, "profileImage", techerData.id), {
                  title: techerData.tname,
                  description: techerData.school,
                  url: techerData.url,
                  fileName: techerData.photoName,
                  id: techerData.id,
                })
                  .then(async () => {
                    await updateDoc(doc(firestore, "teachers", techerData.id), {
                      registered: true,
                    });
                    let x = teachersState.filter(
                      (el) => el.id === techerData.id
                    )[0];
                    x.registered = true;
                    let y = teachersState.filter(
                      (el) => el.id !== techerData.id
                    );
                    y = [...y, x];
                    const newData = y.sort(function (a, b) {
                      let nameA = a.school.toLowerCase(),
                        nameB = b.school.toLowerCase();
                      if (nameA < nameB)
                        //sort string ascending
                        return -1;
                      if (nameA > nameB) return 1;
                      return 0; //default return value (no sorting)
                    });
                    setTeachersState(newData);
                    setTeacherUpdateTime(Date.now());
                    setData(newData);
                    let title = `${techerData.tname} is Registered To App Via Website`;
                    let body = `${
                      techerData.tname
                    } Has Just Registered By Admin ${
                      teacherdetails.tname
                    }. WBTPTA Amta West Welcome ${
                      techerData.gender === "male" ? "Him" : "Her"
                    }.`;
                    await notifyAll(title, body).then(async () => {
                      setLoader(false);
                      toast.success(
                        `Congratulation ${techerData.tname} Is Successfully Registered!`
                      );
                      setFile({});
                      setSrc(null);
                      setShowPercent(false);
                      setProgress(0);
                      userData();
                    });
                  })
                  .catch((e) => {
                    setLoader(false);
                    toast.error("Some Error Happened!");
                    console.log(e);
                  });
              })
              .catch((e) => {
                setLoader(false);
                toast.error("Some Error Happened!");
                console.log(e);
              });
          } catch (e) {
            setLoader(false);
            toast.error("Some Error Happened!");
            console.log(e.response.data.data);
          }
        });
      }
    );
  };

  useEffect(() => {}, [user, teachersState]);

  return (
    <div className="container text-center my-3">
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
      {showTable && !showDelTeachers ? (
        <>
          <h3 className="text-center text-primary">Displaying Teachers Data</h3>

          <button
            type="button"
            className="btn btn-sm btn-info m-3"
            onClick={() => {
              router.push("/JulySalary");
              setStateArray(data);
            }}
          >
            July Salary Data
          </button>
          <Link className="btn btn-sm btn-success m-3" href="/AddTeacher">
            Add Teacher
          </Link>
          {/* <!-- Button trigger modal --> */}

          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <div>
                    <h1
                      className="modal-title text-center fs-5"
                      id="staticBackdropLabel"
                    >
                      sgfasdg
                    </h1>
                  </div>

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <div className="container">
                    <div className="row align-items-end">
                      <div className="mb-3 col-md-3">
                        <label className="form-label">School Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="school"
                          name="school"
                          placeholder="School Name"
                          value={inputField.school}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              school: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">UDISE</label>
                        <input
                          type="text"
                          className="form-control"
                          id="udise"
                          name="udise"
                          placeholder="DISE CODE"
                          value={inputField.udise}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              udise: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="tname"
                          name="tname"
                          placeholder="Full Name"
                          value={inputField.tname}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              tname: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-0 col-md-3">
                        <label className="form-label">
                          Teacher's Search Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="tsname"
                          name=""
                          placeholder="Full Name"
                          value={inputField.tsname}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              tsname: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">Father's Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fname"
                          name="fname"
                          placeholder="Father's Name"
                          value={inputField.fname}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              fname: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-0 col-md-3">
                        <label className="form-label">
                          All Teacher's Of the School
                        </label>
                        <br />
                        <select
                          className="form-select form-select-sm mb-3"
                          aria-label=".form-select-lg example"
                        >
                          {schoolFilterData.map((el, ind) => (
                            <option key={ind} defaultValue={el.tname}>
                              {el.tname}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-0 col-md-3">
                        <label className="form-label">
                          Is Physically Chalanged ?
                        </label>
                        <br />
                        <select
                          className="form-select form-select-sm mb-3"
                          aria-label=".form-select-lg example"
                          name="disability"
                          id="disability"
                          value={inputField.disability}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              disability: e.target.value,
                            });
                          }}
                        >
                          <option value="YES">YES</option>
                          <option value="NO">NO</option>
                        </select>
                      </div>
                      <div className="mb-0 col-md-3">
                        <label className="form-label">Designation</label>
                        <br />
                        <select
                          className="form-select form-select-sm mb-3"
                          aria-label=".form-select-lg example"
                          name="desig"
                          id="desig"
                          value={inputField.desig}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              desig: e.target.value,
                            });
                          }}
                        >
                          <option value="HT">HT</option>
                          <option value="AT">AT</option>
                        </select>
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">Is HOI?</label>
                        <select
                          className="form-select form-select-sm"
                          name="hoi"
                          id="hoi"
                          aria-label=".form-select-sm example"
                          value={inputField.hoi}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              hoi: e.target.value,
                            });
                          }}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>

                      <div className="mb-0 col-md-3">
                        <label className="form-label">User state Type</label>
                        <br />
                        <select
                          className="form-select form-select-sm mb-3"
                          aria-label=".form-select-lg example"
                          name="circle"
                          id="circle"
                          value={inputField.circle}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              circle: e.target.value,
                            });
                          }}
                        >
                          <option value="taw">taw</option>
                          <option value="admin">admin</option>
                        </select>
                      </div>
                      <div className="mb-0 col-md-3">
                        <label className="form-label">
                          Question state Type
                        </label>
                        <br />
                        <select
                          className="form-select form-select-sm mb-3"
                          aria-label=".form-select-lg example"
                          name="question"
                          id="question"
                          value={inputField.question}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              question: e.target.value,
                            });
                          }}
                        >
                          <option value="taw">taw</option>
                          <option value="admin">admin</option>
                        </select>
                      </div>
                      <div className="mb-0 col-md-3">
                        <label className="form-label">GRAM PANCHAYET</label>
                        <br />
                        <select
                          className="form-select form-select-sm mb-3"
                          aria-label=".form-select-lg example"
                          name="gp"
                          id="gp"
                          value={inputField.gp}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              gp: e.target.value,
                            });
                          }}
                        >
                          <option value="AMORAGORI">AMORAGORI</option>
                          <option value="BKBATI">BKBATI</option>
                          <option value="GAZIPUR">GAZIPUR</option>
                          <option value="JHAMTIA">JHAMTIA</option>
                          <option value="JHIKIRA">JHIKIRA</option>
                          <option value="JOYPUR">JOYPUR</option>
                          <option value="NOWPARA">NOWPARA</option>
                          <option value="THALIA">THALIA</option>
                        </select>
                      </div>

                      <div className="mb-3 col-md-3">
                        <label className="form-label">Association</label>

                        <select
                          className="form-select form-select-sm mb-3"
                          aria-label=".form-select-sm example"
                          name="association"
                          id="association"
                          placeholder="Association"
                          value={inputField.association}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              association: e.target.value,
                            });
                          }}
                        >
                          <option value="">Select Association</option>
                          <option value="WBTPTA">WBTPTA</option>
                          <option value="NOT WBTPTA">NOT WBTPTA</option>
                          <option value="ABPTA">ABPTA</option>
                          <option value="WBPTA">WBPTA</option>
                          <option value="BJP">BJP</option>
                        </select>
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">Mobile No.</label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="Mobile No."
                          value={inputField.phone}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              phone: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="mb-3 col-md-3">
                        <label className="form-label">Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          id="Email"
                          name="email"
                          placeholder="Email"
                          value={inputField.email}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              email: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">Date Of Birth:</label>

                        <input
                          type="date"
                          className="form-control"
                          id="dob"
                          name="dob"
                          value={getCurrentDateInput(inputField.dob)}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              dob: getSubmitDateInput(e.target.value),
                            });
                          }}
                          required
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">Date Of Joining:</label>

                        <input
                          type="date"
                          className="form-control"
                          id="doj"
                          name="doj"
                          value={getCurrentDateInput(inputField.doj)}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              doj: getSubmitDateInput(e.target.value),
                            });
                          }}
                          required
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">
                          Date Of Joining in Current School:
                        </label>

                        <input
                          type="date"
                          className="form-control"
                          id="dojnow"
                          name="dojnow"
                          value={getCurrentDateInput(inputField.dojnow)}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              dojnow: getSubmitDateInput(e.target.value),
                            });
                          }}
                          required
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">
                          Date Of Retirement:
                        </label>

                        <input
                          type="date"
                          className="form-control"
                          id="dor"
                          name="dor"
                          value={getCurrentDateInput(inputField.dor)}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              dor: getSubmitDateInput(e.target.value),
                            });
                          }}
                          required
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">Bank Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="bank"
                          name="bank"
                          placeholder="Bank"
                          value={inputField.bank}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              bank: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">Salary Account No.</label>
                        <input
                          type="text"
                          className="form-control"
                          id="account"
                          name="account"
                          placeholder="Salary Account No."
                          value={inputField.account}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              account: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">IFSC CODE</label>
                        <input
                          type="text"
                          className="form-control"
                          id="ifsc_inp"
                          name="ifsc"
                          placeholder="IFSC CODE"
                          value={inputField.ifsc}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              ifsc: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div
                        className="mb-3 col-md-3 text-primary text-center"
                        id="bankdiv"
                        style={{ fontSize: "13px" }}
                      ></div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">Employee ID</label>
                        <input
                          type="text"
                          className="form-control"
                          id="empid"
                          name="empid"
                          placeholder="Employee ID"
                          value={inputField.empid}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              empid: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-0 col-md-3">
                        <label className="form-label">Training</label>
                        <br />
                        <select
                          className="form-select form-select-sm mb-3"
                          aria-label=".form-select-lg example"
                          name="training"
                          id="training"
                          value={inputField.training}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              training: e.target.value,
                            });
                          }}
                        >
                          <option value="D. EL. ED.">D. EL. ED.</option>
                          <option value="ONGOING D. EL. ED.">
                            ONGOING D. EL. ED.
                          </option>
                          <option value="B. ED.">B. ED.</option>
                          <option value="NON TRAINED">NON TRAINED</option>
                        </select>
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">PAN No.</label>
                        <input
                          type="text"
                          className="form-control"
                          id="pan"
                          name="pan"
                          placeholder="PAN No."
                          value={inputField.pan}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              pan: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="mb-3 col-md-3">
                        <label className="form-label">Address:</label>
                        <textarea
                          name="address"
                          id="address"
                          cols="5"
                          rows="3"
                          className="form-control"
                          placeholder="Address"
                          style={{ resize: "none" }}
                          value={inputField.address}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              address: e.target.value,
                            });
                          }}
                        ></textarea>
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">July Basic</label>
                        <input
                          type="text"
                          className="form-control"
                          id="basic"
                          name="basic"
                          placeholder="July Basic"
                          value={inputField.basic}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              basic: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">March Basic</label>
                        <input
                          type="text"
                          className="form-control"
                          id="mbasic"
                          name="mbasic"
                          placeholder="March Basic"
                          value={inputField.mbasic}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              mbasic: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">HT Allowance</label>
                        <input
                          type="text"
                          className="form-control"
                          id="addl"
                          name="addl"
                          placeholder="HT Allowance"
                          value={inputField.addl}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              addl: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">July DA</label>
                        <input
                          type="text"
                          className="form-control"
                          id="da"
                          name="da"
                          placeholder="July DA"
                          value={inputField.da}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              da: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">March DA</label>
                        <input
                          type="text"
                          className="form-control"
                          id="mda"
                          name="mda"
                          placeholder="March DA"
                          value={inputField.mda}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              mda: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">July HRA</label>
                        <input
                          type="text"
                          className="form-control"
                          id="hra"
                          name="hra"
                          placeholder="July HRA"
                          value={inputField.hra}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              hra: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">March HRA</label>
                        <input
                          type="text"
                          className="form-control"
                          id="mhra"
                          name="mhra"
                          placeholder="March HRA"
                          value={inputField.mhra}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              mhra: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">Medical Allowance</label>
                        <input
                          type="text"
                          className="form-control"
                          id="ma"
                          name="ma"
                          placeholder="Medical Allowance"
                          value={inputField.ma}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              ma: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">July Gross</label>
                        <input
                          type="text"
                          className="form-control"
                          id="gross"
                          name="gross"
                          placeholder="July Gross"
                          value={inputField.gross}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              gross: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">March Gross</label>
                        <input
                          type="text"
                          className="form-control"
                          id="mgross"
                          name="mgross"
                          placeholder="March Gross"
                          value={inputField.mgross}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              mgross: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">GPF</label>
                        <input
                          type="text"
                          className="form-control"
                          id="gpf"
                          name="gpf"
                          placeholder="GPF"
                          value={inputField.gpf}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              gpf: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">Previous Year GPF</label>
                        <input
                          type="text"
                          className="form-control"
                          id="gpfprev"
                          name="gpfprev"
                          placeholder="GPF"
                          value={inputField.gpfprev}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              gpfprev: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">PTax</label>
                        <input
                          type="text"
                          className="form-control"
                          id="ptax"
                          name="ptax"
                          placeholder="ptax"
                          value={inputField.ptax}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              ptax: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">GSLI</label>
                        <input
                          type="text"
                          className="form-control"
                          id="gsli"
                          name="gsli"
                          placeholder="GSLI"
                          value={inputField.gsli}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              gsli: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">July Netpay</label>
                        <input
                          type="text"
                          className="form-control"
                          id="netpay"
                          name="netpay"
                          placeholder="July Netpay"
                          value={inputField.netpay}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              netpay: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">March Netpay</label>
                        <input
                          type="text"
                          className="form-control"
                          id="mnetpay"
                          name="mnetpay"
                          placeholder="March Netpay"
                          value={inputField.mnetpay}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              mnetpay: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>

                      <div className="mb-3 col-md-3">
                        <label className="form-label">
                          Total Arrear Received
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="arrear"
                          name="arrear"
                          placeholder="Total Arrear Received"
                          value={inputField.arrear}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              arrear: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3 col-md-3">
                        <label className="form-label">Bonus Recived</label>
                        <input
                          type="number"
                          className="form-control"
                          id="bonus"
                          name="bonus"
                          placeholder="Bonus Recived"
                          value={inputField.bonus}
                          onChange={(e) => {
                            setinputField({
                              ...inputField,
                              bonus: parseInt(e.target.value),
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={updateData}
                    data-bs-dismiss="modal"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>

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
      ) : null}

      {loader && <Loader />}

      <button
        type="button"
        className={`btn btn-${showDelTeachers ? "warning" : "success"} my-3`}
        onClick={() => {
          if (!showDelTeachers) {
            getDeletedTeachers();
            setShowDelTeachers(true);
          } else {
            setShowDelTeachers(false);
          }
        }}
      >
        {showDelTeachers ? "Hide Deleted Teachers" : "Show Deleted Teachers"}
      </button>

      <div
        className="modal fade"
        id="regTeacher"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="regTeacherLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="regTeacherLabel">
                Upload User Image
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="my-3">
                <h6 className="text-primary">Teacher Name: {user.tname}</h6>
                <h6 className="text-primary">School Name: {user.school}</h6>
                <h6 className="text-primary">{`Username will be EMPID in Lower Case i.e.\n\n${user.empid.toLowerCase()}`}</h6>
                <h6 className="text-primary">{`Password will be PAN in Lower Case i.e.\n\n${user.pan.toLowerCase()}`}</h6>
              </div>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setSrc(URL.createObjectURL(e.target.files[0]));
                }}
              />
              {src !== null && (
                <img
                  src={src}
                  className="img-fluid my-3 rounded-2"
                  style={{ width: "200px", height: "200px" }}
                  alt="..."
                />
              )}
              {showPercent && (
                <div
                  className="progress-bar my-2"
                  style={{
                    width: progress + "%",
                    height: "15px",
                    backgroundColor: "purple",
                    borderRadius: "10px",
                    transformOrigin: "start",
                  }}
                ></div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => registerUser(user)}
              >
                Register
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  setSrc(null);
                  setFile({});
                  if (typeof window !== "undefined") {
                    // browser code
                    document.getElementById("image").value = "";
                  }
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {showDelTeachers && (
        <DataTable
          columns={delColumns}
          data={filteredDelTeachers}
          pagination
          highlightOnHover
          fixedHeader
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search"
              className="w-25 form-control"
              value={delSearch}
              onChange={(e) => setDelSearch(e.target.value)}
            />
          }
          subHeaderAlign="right"
        />
      )}
    </div>
  );
};

export default TeacherDatabase;
