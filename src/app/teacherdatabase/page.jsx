"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firestore } from "../../context/FirebaseContext";
import { storage } from "../../context/FirebaseContext";
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
import { createDownloadLink } from "../../modules/calculatefunctions";
import bcrypt from "bcryptjs";
import { notifyAll } from "../../modules/notification";
import axios from "axios";
import { keysData } from "@/modules/constants";
import TeacherList from "@/pdfs/TeacherList";
import dynamic from "next/dynamic";
const TeacherDatabase = () => {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Please Wait...</p>,
    },
  );
  const {
    state,
    teachersState,
    schoolState,
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
  const [schSearch, setSchSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [allDelTeachers, setAllDelTeachers] = useState([]);
  const [filteredDelTeachers, setFilteredDelTeachers] = useState([]);
  const [delSearch, setDelSearch] = useState("");
  const [showDelTeachers, setShowDelTeachers] = useState(false);
  const [src, setSrc] = useState(null);
  const [file, setFile] = useState({});
  const [user, setUser] = useState({
    tname: "",
    tsname: "",
    school: "",
    pan: "",
    empid: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showPercent, setShowPercent] = useState(false);
  const [isclicked, setIsclicked] = useState(false);
  const [isAmtaTeacher, setIsAmtaTeacher] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(["phone"]);
  const userData = async () => {
    setLoader(true);
    let newDatas = teachersState.sort(
      (a, b) => a.school.localeCompare(b.school) && b.rank > a.rank,
    );
    setData(newDatas);
    setFilteredData(newDatas);
    setLoader(false);
    setShowTable(true);
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Teachers Database";
    userData();
    // eslint-disable-next-line
  }, []);

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
      wrap: +true,
      center: +true,
    },
    {
      name: "School Name",
      selector: (row) => row.school,
      sortable: true,
      wrap: +true,
      center: +true,
    },
    {
      name: "View",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setStateObject(row);
            router.push("/ViewDetails");
          }}
        >
          View
        </button>
      ),
      wrap: +true,
      center: +true,
    },

    {
      name: "Delete Teacher",
      cell: (row) => (
        <button
          className="btn btn-danger"
          onClick={() => {
            // eslint-disable-next-line
            let conf = confirm(
              `Are you sure you want to Delete Teacher ${row.tname}?`,
            );
            if (conf) {
              deleteTeacher(row);
            } else {
              toast.success("Teacher Not Deleted!!!");
            }
          }}
        >
          Delete
        </button>
      ),
      wrap: +true,
      center: +true,
    },
    {
      name: "Register Teacher",
      cell: (row) =>
        !row.registered ? (
          <button
            className="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#regTeacher"
            onClick={() => {
              setUser(row);
            }}
          >
            Register
          </button>
        ) : (
          <h6 className="text-success">Teacher Registered</h6>
        ),
      wrap: +true,
      center: +true,
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
      wrap: +true,
    },
    {
      name: "School Name",
      selector: (row) => row.school,
      sortable: true,
      wrap: +true,
    },
    {
      name: "View Details",
      cell: (row) => (
        <Link
          className="btn btn-primary"
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
          className="btn btn-success"
          onClick={() => {
            // eslint-disable-next-line
            let conf = confirm(
              `Are you sure you want to Restore Teacher ${row.tname}?`,
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

  const deleteTeacher = async (el) => {
    const url = `/api/delteacher`;
    let response = await axios.post(url, el);
    let record = response.data;
    if (record.success) {
      const docRef = doc(firestore, "teachers", el.id);
      await deleteDoc(docRef)
        .then(async () => {
          let x = teachersState.filter((elem) => elem.id !== el.id);
          const newData = x.sort((a, b) => {
            // First, compare the "school" keys
            if (a.school < b.school) {
              return -1;
            }
            if (a.school > b.school) {
              return 1;
            }
            // If "school" keys are equal, compare the "rank" keys
            return a.rank - b.rank;
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
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            })
            .catch((err) => {
              console.log(err);
              toast.error("Unable To Send Query!!!", {
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
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unable To Send Query!!!", {
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
    } else {
      toast.error("Unable To Send Query!!!", {
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
  const restoreTeacher = async (el) => {
    const docRef = doc(firestore, "deletedTeachers", el.id);
    await deleteDoc(docRef)
      .then(async () => {
        const url = `/api/addTeacher`;
        let response = await axios.post(url, el);
        let record = response.data;
        if (record.success) {
          await setDoc(doc(firestore, "teachers", el.id), el)
            .then(async () => {
              let x = teachersState;
              x = [...x, el];
              const newData = x.sort((a, b) => {
                // First, compare the "school" keys
                if (a.school < b.school) {
                  return -1;
                }
                if (a.school > b.school) {
                  return 1;
                }
                // If "school" keys are equal, compare the "rank" keys
                return a.rank - b.rank;
              });
              setTeachersState(newData);
              setTeacherUpdateTime(Date.now());
              setFilteredData(newData);
              toast.success("Congrats! Teacher Restored Successfully!", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
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
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            });
        } else {
          toast.error("Unable To Send Query!!!", {
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
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable To Send Query!!!", {
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

  const registerUser = async () => {
    setLoader(true);
    const filestorageRef = ref(
      storage,
      `/profileImage/${user.id + "-" + file.name}`,
    );
    const uploadTask = uploadBytesResumable(filestorageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setShowPercent(true);
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
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
            school: user.school,
            desig: user.desig,
            gender: user.gender,
            pan: user.pan,
            udise: user.udise,
            circle: user.circle,
            showAccount: user.showAccount,
            empid: user.empid,
            question: user.question,
            email: user.email,
            phone: user.phone,
            id: user.id,
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
                await setDoc(
                  doc(firestore, "userteachers", techerData.id),
                  techerData,
                );
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
                      (el) => el.id === techerData.id,
                    )[0];
                    x.registered = true;
                    let y = teachersState.filter(
                      (el) => el.id !== techerData.id,
                    );
                    y = [...y, x];
                    const newData = y.sort((a, b) => {
                      // First, compare the "school" keys
                      if (a.school < b.school) {
                        return -1;
                      }
                      if (a.school > b.school) {
                        return 1;
                      }
                      // If "school" keys are equal, compare the "rank" keys
                      return a.rank - b.rank;
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
                        `Congratulation ${techerData.tname} Is Successfully Registered!`,
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
      },
    );
  };

  useEffect(() => {
    //eslint-disable-next-line
  }, [
    user,
    teachersState,
    filteredData,
    data,
    filteredDelTeachers,
    allDelTeachers,
  ]);

  return (
    <div className="container-fluid text-center my-3">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
      {showTable && !showDelTeachers ? (
        <>
          <h3 className="text-center text-primary">
            All {isclicked && "WBTPTA"} Teacher's Data
          </h3>
          <div className="mx-auto m-2">
            <p className="text-info m-0 p-0">
              Total Teachers: {teachersState.length}
            </p>
            <p className="text-primary m-0 p-0">
              Total WBTPTA Teachers:{" "}
              {teachersState.filter((el) => el.association === "WBTPTA").length}
              {", "}
              {(
                (teachersState.filter((el) => el.association === "WBTPTA")
                  .length /
                  teachersState.length) *
                100
              ).toFixed(2)}
              %
            </p>
            <p className="text-danger m-0 p-0">
              Total OTHER Teachers:{" "}
              {teachersState.filter((el) => el.association !== "WBTPTA").length}
              {", "}
              {(
                (teachersState.filter((el) => el.association !== "WBTPTA")
                  .length /
                  teachersState.length) *
                100
              ).toFixed(2)}
              %
            </p>
          </div>
          <button
            type="button"
            className="btn btn-info m-3"
            onClick={() => {
              router.push("/JulySalary");
              setStateArray(data);
            }}
          >
            July Salary Data
          </button>
          <Link className="btn btn-success m-3" href="/AddTeacher">
            Add Teacher
          </Link>
          <button
            type="button"
            className="btn m-3 btn-warning"
            onClick={() => {
              createDownloadLink(teachersState, "teachers");
            }}
          >
            Download Teacher Data
          </button>
          <button
            type="button"
            className="btn m-3 btn-info"
            onClick={() => {
              createDownloadLink(schoolState, "schools");
            }}
          >
            Download School Data
          </button>
          <div>
            {!isclicked ? (
              <button
                type="button"
                className="btn btn-success text-white font-weight-bold p-2 m-2 noprint rounded"
                onClick={() => {
                  setFilteredData(
                    isAmtaTeacher
                      ? filteredData.filter((el) => el.association === "WBTPTA")
                      : teachersState.filter(
                          (el) => el.association === "WBTPTA",
                        ),
                  );
                  setIsclicked(true);
                }}
              >
                Only WBTPTA Teachers
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-info text-white font-weight-bold p-2 m-2 noprint rounded"
                onClick={() => {
                  setFilteredData(teachersState);
                  setIsclicked(false);
                }}
              >
                All Teachers
              </button>
            )}
          </div>
          <div>
            {!isAmtaTeacher ? (
              <button
                type="button"
                className="btn btn-success text-white font-weight-bold p-2 m-2 noprint rounded"
                onClick={() => {
                  setFilteredData(
                    isclicked
                      ? filteredData.filter((el) => el.isAmtaTeacher)
                      : teachersState.filter((el) => el.isAmtaTeacher),
                  );
                  setIsAmtaTeacher(true);
                }}
              >
                Only Amta Teachers
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-dark text-white font-weight-bold p-2 m-2 noprint rounded"
                onClick={() => {
                  setFilteredData(teachersState);
                  setIsAmtaTeacher(false);
                }}
              >
                All Teachers
              </button>
            )}
          </div>

          <button
            type="button"
            className="btn btn-success text-white font-weight-bold p-2 m-2 noprint rounded"
            onClick={() => setShowDownload(!showDownload)}
          >
            {showDownload ? "Hide Download PDF List" : "Show Download PDF List"}
          </button>
          {showDownload && (
            <div className="my-3">
              <div className="row mx-auto my-3 noprint">
                <h5 className="text-center my-2">Select Keys for Download</h5>
                {keysData.map((el, ind) => (
                  <div
                    className="col-md-3 form-check form-switch"
                    key={ind}
                    style={{ textAlign: "left" }}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`flexSwitchCheckDefault${ind}`}
                      value={el.keyName}
                      checked={selectedKeys.includes(el.keyName)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedKeys([...selectedKeys, e.target.value]);
                        } else {
                          setSelectedKeys(
                            selectedKeys.filter((el) => el !== e.target.value),
                          );
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`flexSwitchCheckDefault${ind}`}
                    >
                      {el.displayName}
                    </label>
                  </div>
                ))}
              </div>
              <PDFDownloadLink
                document={
                  <TeacherList
                    data={filteredData}
                    title={`All ${isclicked ? (isAmtaTeacher ? "WBTPTA Amta" : "WBTPTA") : ""} Teacher's Data`}
                    keys={selectedKeys}
                  />
                }
                fileName={`All ${isclicked ? (isAmtaTeacher ? "WBTPTA Amta" : "WBTPTA") : ""} Teacher's Data.pdf`}
                style={{
                  textDecoration: "none",
                  padding: 11,
                  color: "#fff",
                  backgroundColor: "purple",
                  border: "1px solid #4a4a4a",
                  width: "40%",
                  borderRadius: 10,
                  margin: 20,
                }}
                onClick={() =>
                  setTimeout(() => {
                    setShowDownload(false);
                  }, 0)
                }
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Please Wait..." : "Download Teacher List"
                }
              </PDFDownloadLink>
            </div>
          )}
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={30}
            highlightOnHover
            fixedHeader
            subHeader
            subHeaderComponent={
              <div>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Search by Teacher"
                    className="form-control"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setFilteredData(
                        teachersState.filter((el) =>
                          el.tname
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase()),
                        ),
                      );
                    }}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Search by School"
                    className="form-control"
                    value={schSearch}
                    onChange={(e) => {
                      setSchSearch(e.target.value);
                      setFilteredData(
                        teachersState.filter((el) =>
                          el.school
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase()),
                        ),
                      );
                    }}
                  />
                </div>
              </div>
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
                accept=".jpg,.jpeg,.png"
                onChange={(e) => {
                  if (e.target.files[0].type.startsWith("image/")) {
                    setFile(e.target.files[0]);
                    setSrc(URL.createObjectURL(e.target.files[0]));
                    setBtnDisabled(false);
                  } else {
                    setBtnDisabled(true);
                    setSrc(null);
                    toast.error("Please select an image file.");
                  }
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
                disabled={btnDisabled}
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
                  if (typeof window !== undefined) {
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
