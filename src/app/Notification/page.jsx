"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../context/FirbaseContext";
import { firestore } from "../../context/FirbaseContext";
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  collection,
  updateDoc,
  where,
} from "firebase/firestore";
import Loader from "../../components/Loader";
import { v4 as uuid } from "uuid";
import { decryptObjData, getCookie } from "../../modules/encryption";

import { DateValueToSring } from "../../modules/calculatefunctions";
import { notifyAll } from "../../modules/notification";
import NoticeDetails from "../../components/NoticeDetails";
// const height = window.screen.height;
// const width = window.screen.width;
const Notification = () => {
  // const navigate = useNavigate();
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

  const [data, setData] = useState(false);

  const [allData, setAllData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState({});
  const [showPercent, setShowPercent] = useState(false);
  const [title, setTitle] = useState("");
  const [addImage, setAddImage] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState({
    id: "",
    date: "",
    addedBy: "",
    title: "",
    noticeText: "",
    url: "",
    photoName: "",
    type: "",
  });
  const [showNoticeDetails, setShowNoticeDetails] = useState(false);
  const [noticeText, setNoticeText] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editNoticeText, setEditNoticeText] = useState("");
  const [orgTitle, setOrgTitle] = useState("");
  const [orgNoticeText, setOrgNoticeText] = useState("");
  const [editID, setEditID] = useState("");
  const [src, setSrc] = useState(null);
  const docId = uuid().split("-")[0];
  const [progress, setProgress] = useState(0);

  const getData = async () => {
    const querySnapshot = await getDocs(
      query(collection(firestore, "notices"))
    );
    const datas = querySnapshot.docs
      .map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }))
      .sort((a, b) => b.date - a.date);
    setData(true);
    setAllData(datas);
  };

  const addNotice = async () => {
    setLoader(true);
    if (addImage) {
      const filestorageRef = ref(
        storage,
        `/noticeImages/${docId + "-" + file.name}`
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

            try {
              await setDoc(doc(firestore, "notices", docId), {
                id: docId,
                date: Date.now(),
                addedBy: teacherdetails.tname,
                title: title,
                noticeText: noticeText,
                url: photourl,
                photoName: docId + "-" + file.name,
                type: file.type,
              })
                .then(async () => {
                  // let noticeTitle = `New Notice added By ${teacherdetails.tname}`;
                  // let body = noticeText;
                  // await notifyAll(noticeTitle, body)
                  //   .then(async () => {
                  setNoticeText("");
                  setTitle("");
                  setLoader(false);
                  setAddImage(false);
                  toast.success("Notice Added Successfully!");
                  getData();
                  setFile({});
                  setSrc(null);
                  setShowPercent(false);
                  setProgress(0);
                  // })
                  // .catch((e) => {
                  //   console.log(e);
                  //   setLoader(false);
                  //   toast.error("Error Sending Notification");
                  // });
                })
                .catch((e) => {
                  setLoader(false);
                  setAddImage(false);
                  toast.error("Notice Addition Failed!");
                  console.log(e);
                });
            } catch (e) {
              toast.error("File Upload Failed!", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setLoader(false);
            }
          });
        }
      );
    } else {
      try {
        await setDoc(doc(firestore, "notices", docId), {
          id: docId,
          date: Date.now(),
          addedBy: teacherdetails.tname,
          title: title,
          noticeText: noticeText,
          url: "",
          photoName: "",
          type: "",
        })
          .then(async () => {
            let noticeTitle = `New Notice added By ${teacherdetails.tname}`;
            let body = noticeText;
            await notifyAll(noticeTitle, body)
              .then(async () => {
                setNoticeText("");
                setTitle("");
                setLoader(false);
                setAddImage(false);
                toast.success("Notice Added Successfully!");
                getData();
                setFile({});
                setSrc("");
              })
              .catch((e) => {
                console.log(e);
                setLoader(false);
                toast.error("Error Sending Notification");
              });
          })
          .catch((e) => {
            setLoader(false);
            setAddImage(false);
            toast.error("Notice Addition Failed!");
            console.log(e);
          });
      } catch (e) {
        toast.error("File Upload Failed!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoader(false);
      }
    }
  };

  const updateNotice = async () => {
    setLoader(true);

    await updateDoc(doc(firestore, "notices", editID), {
      title: editTitle,
      noticeText: editNoticeText,
      date: Date.now(),
      addedBy: teacherdetails.tname,
    })
      .then(async () => {
        setLoader(false);
        setEditTitle("");
        setEditNoticeText("");
        setOrgNoticeText("");
        setOrgTitle("");
        toast.success("Details Updated Successfully");
        getData();
      })
      .catch((err) => {
        toast.error("Notice Updation Failed!");
        console.log(err);
      });
  };

  const deleteNotice = async (el) => {
    await deleteDoc(doc(firestore, "notices", el.id))
      .then(async () => {
        try {
          const desertRef = ref(storage, `noticeImages/${el.photoName}`);
          await deleteObject(desertRef);
        } catch (e) {
          console.log(e);
        }
        const querySnapshot = await getDocs(
          query(
            collection(firestore, "noticeReply"),
            where("noticeId", "==", el.id)
          )
        );
        const datas = querySnapshot.docs.map((doc) => ({
          // doc.data() is never undefined for query doc snapshots
          ...doc.data(),
          id: doc.id,
        }));
        let response = datas.map(async (elem, index) => {
          try {
            await deleteDoc(doc(firestore, "noticeReply", elem.id));
          } catch (error) {
            console.log(error);
          }
        });
        await Promise.all(response).then(async () => {
          try {
            const desertRef = ref(storage, `noticeImages/${el.photoName}`);
            await deleteObject(desertRef);
          } catch (error) {
            console.log(error);
          }
          setLoader(false);
          toast.success("Notice Deleted Successfully!");
          getData();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Notifications";
    getData();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {}, [file]);
  return (
    <div className="container my-3">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loader && <Loader />}
      <h3 className="text-primary text-center">Notifications</h3>
      {teacherdetails.circle === "admin" && (
        <div className="my-3 mx-auto">
          <button
            type="button"
            className="btn btn-sm btn-info"
            data-bs-toggle="modal"
            data-bs-target="#addNotice"
          >
            Add Notice
          </button>
        </div>
      )}
      {!showNoticeDetails ? (
        data ? (
          <div className="container row mx-auto justify-content-center">
            {allData.map((el, index) => {
              return (
                <div
                  className="row mx-auto justify-content-center align-items-center col-md-3 "
                  key={index}
                >
                  <div className="card m-2 p-1" style={{ width: "18rem" }}>
                    {el.url !== "" && el.type.split("/")[0] === "image" ? (
                      <img
                        src={
                          el.url !== ""
                            ? el.url
                            : "https://raw.githubusercontent.com/awwbtpta/data/main/notice.png"
                        }
                        style={{ height: 200, cursor: "pointer" }}
                        className="card-img-top rounded-2"
                        alt="..."
                        onClick={() => {
                          setSelectedNotice(el);
                          setShowNoticeDetails(true);
                        }}
                      />
                    ) : (
                      <img
                        src={
                          "https://raw.githubusercontent.com/awwbtpta/data/main/pdf.png"
                        }
                        style={{ height: 200, width: 200, cursor: "pointer" }}
                        className="card-img-top rounded-2 m-0 p-0"
                        alt="..."
                        // onClick={() => {
                        //   navigate(
                        //     `/NotificationDetails?id=${el.id}&title=${el.title}&date=${el.date}&noticeText=${el.noticeText}&addedBy=${el.addedBy}&url=${el.url}&type=${el.type}`
                        //   );
                        //   console.log(el);
                        // }}
                        onClick={() => {
                          setSelectedNotice(el);
                          setShowNoticeDetails(true);
                        }}
                      />
                    )}

                    <div
                      className={`card-body ${
                        !/^[a-zA-Z]+$/.test(el.noticeText.split(" ")[0])
                          ? "ben"
                          : "timesFont"
                      }`}
                    >
                      <h5
                        className="card-title"
                        // onClick={() => {
                        //   navigate(
                        //     `/NotificationDetails?id=${el.id}&title=${el.title}&date=${el.date}&noticeText=${el.noticeText}&addedBy=${el.addedBy}&url=${el.url}&type=${el.type}`
                        //   );
                        // }}
                        onClick={() => {
                          setSelectedNotice(el);
                          setShowNoticeDetails(true);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {el.title}
                      </h5>

                      <p className="card-text text-info timesFont">
                        {DateValueToSring(el.date)}
                      </p>
                      <p
                        className="card-text text-primary"
                        // onClick={() => {
                        //   navigate(
                        //     `/NotificationDetails?id=${el.id}&title=${el.title}&date=${el.date}&noticeText=${el.noticeText}&addedBy=${el.addedBy}&url=${el.url}&type=${el.type}`
                        //   );
                        //   console.log(el);
                        // }}
                        onClick={() => {
                          setSelectedNotice(el);
                          setShowNoticeDetails(true);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {el.noticeText.slice(0, 30)} ... See More
                      </p>
                    </div>
                    {teacherdetails.circle === "admin" && (
                      <div className="my-2">
                        <button
                          type="button"
                          className="btn btn-sm m-1 btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#editNotice"
                          onClick={() => {
                            setEditID(el.id);
                            setEditTitle(el.title);
                            setEditNoticeText(el.noticeText);
                            setOrgTitle(el.title);
                            setOrgNoticeText(el.noticeText);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm m-1 btn-danger"
                          onClick={() => {
                            // eslint-disable-next-line
                            let conf = confirm(
                              "Are you sure you want to Delete this notice?"
                            );
                            if (conf) {
                              deleteNotice(el);
                            } else {
                              toast.success("Notice Not Deleted!!!");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Loader />
        )
      ) : null}

      {showNoticeDetails && (
        <div className="my-5">
          <button
            type="button"
            className="btn btn-sm my-5 btn-danger"
            onClick={() => {
              setShowNoticeDetails(false);
            }}
          >
            Close Notice
          </button>
          <NoticeDetails sata={selectedNotice} />
          <button
            type="button"
            className="btn btn-sm my-5 btn-danger"
            onClick={() => {
              setShowNoticeDetails(false);
            }}
          >
            Close Notice
          </button>
        </div>
      )}

      <div
        className="modal fade"
        id="addNotice"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="addNotice"
        aria-hidden="true"
      >
        <div
          className={`modal-dialog modal-xl timesFont
          }`}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addNoticeLabel">
                Add Notice
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    document.getElementById("checkbox").checked = false;
                    if (document.getElementById("img")) {
                      document.getElementById("img").value = "";
                    }
                  }
                  setNoticeText("");
                  setTitle("");
                  setLoader(false);
                  setAddImage(false);
                  setFile({});
                  setSrc(null);
                  setShowPercent(false);
                  setProgress(0);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3 w-75 mx-auto"
                value={title}
                placeholder="Add Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="form-control mb-3  mx-auto"
                rows={5}
                placeholder="Notice Body"
                value={noticeText}
                onChange={(e) => setNoticeText(e.target.value)}
              />

              <div className="d-flex row mx-auto mb-3 justify-content-center align-items-center form-check form-switch">
                <h4 className="col-md-3 text-primary">Without Image/File</h4>
                <input
                  className="form-check-input mb-3 col-md-3"
                  type="checkbox"
                  id="checkbox"
                  role="switch"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAddImage(e.target.checked);
                    } else {
                      setAddImage(e.target.checked);
                      setFile({});
                      if (typeof window !== "undefined") {
                        document.getElementById("img").value = "";
                      }
                      setSrc(null);
                    }
                  }}
                  style={{ width: 60, height: 30 }}
                />
                <h4 className="col-md-3 text-success">With Image/File</h4>
              </div>
              {addImage && (
                <div className="my-2">
                  <input
                    type="file"
                    id="img"
                    className="form-control mb-3 w-100 mx-auto"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setSrc(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  {src !== null && file.type.split("/")[0] === "image" ? (
                    <div>
                      <img
                        src={src}
                        alt="uploadedImage"
                        width={150}
                        className="rounded-2"
                      />
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => {
                          setSrc(null);
                          setFile({});
                          if (typeof window !== "undefined") {
                            document.getElementById("img").value = "";
                          }
                        }}
                      ></button>
                    </div>
                  ) : src !== null &&
                    file.type.split("/")[0] === "application" ? (
                    <img
                      src={
                        "https://raw.githubusercontent.com/awwbtpta/data/main/pdf.png"
                      }
                      alt="uploadedImage"
                      width={150}
                      className="rounded-2"
                    />
                  ) : null}

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
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => {
                  if (title !== "" && noticeText !== "") {
                    addNotice();
                  } else {
                    toast.error("Please fill all the fields");
                  }
                }}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    document.getElementById("checkbox").checked = false;
                    if (document.getElementById("img")) {
                      document.getElementById("img").value = "";
                    }
                  }

                  setNoticeText("");
                  setTitle("");
                  setLoader(false);
                  setAddImage(false);
                  setFile({});
                  setSrc(null);
                  setShowPercent(false);
                  setProgress(0);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="editNotice"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="editNotice"
        aria-hidden="true"
      >
        <div
          className={`modal-dialog modal-xl timesFont
          }`}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editNoticeLabel">
                Edit Notice
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3 w-50 mx-auto"
                value={editTitle}
                placeholder="Add Title"
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="form-control mb-3 w-50 mx-auto"
                rows={5}
                placeholder="Notice Body"
                value={editNoticeText}
                onChange={(e) => setEditNoticeText(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => {
                  if (editTitle !== "" && editNoticeText !== "") {
                    if (orgTitle !== editTitle) {
                      updateNotice();
                    } else if (orgNoticeText !== editNoticeText) {
                      updateNotice();
                    } else {
                      toast.error("Nothing to Update!!!");
                    }
                  } else {
                    toast.error("Please fill all the fields");
                  }
                }}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
