"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import { firestore } from "../../context/FirbaseContext";
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  collection,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../context/FirbaseContext";

import AdminNavBar from "../../components/AdminNavBar";
import { v4 as uuid } from "uuid";
import Loader from "../../components/Loader";
const AdminUploadImage = () => {
  const { state, slideState, setSlideState, setSlideUpdateTime } =
    useGlobalContext();
  const router = useRouter();
  const docId = uuid();
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState({});
  const [progress, setProgress] = useState(0);
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    url: "",
  });
  const [errInputField, setErrInputField] = useState({
    errTitle: "",
    errDescription: "",
  });

  const [data, setData] = useState(false);
  const [datas, setDatas] = useState([]);
  const [folder, setFolder] = useState("galaryimages");
  const getData = async () => {
    setLoader(true);
    setData(true);
    const q = query(collection(firestore, folder));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setDatas(data);
    setLoader(false);
  };
  const validForm = () => {
    setErrInputField({
      errTitle: "",
      errDescription: "",
    });
    let isvalid = true;
    if (inputField.title === "") {
      setErrInputField((prev) => ({
        prev,
        errTitle: "Please Enter Valid Title",
      }));
      isvalid = false;
    }
    if (inputField.description === "") {
      setErrInputField({
        ...errInputField,
        errDescription: "Please Enter Valid Description",
      });
      isvalid = false;
    }
    return isvalid;
  };
  const uploadFiles = () => {
    if (validForm()) {
      if (file == null) {
        toast.error("Upload File First!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      } else {
        setLoader(true);
        const filestorageRef = ref(storage, `/${folder}/${file.name}`);
        const uploadTask = uploadBytesResumable(filestorageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            // // update progress
            setProgress(percent);
          },
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
              // console.log(url);

              try {
                await setDoc(doc(firestore, folder, docId), {
                  title: inputField.title,
                  description: inputField.description,
                  url: url,
                  id: docId,
                  fileName: file.name,
                });
                if (folder === "slides") {
                  setSlideState([
                    ...slideState,
                    {
                      title: inputField.title,
                      description: inputField.description,
                      url: url,
                      id: docId,
                      fileName: file.name,
                    },
                  ]);
                  setSlideUpdateTime(Date.now());
                }
                toast.success("Congrats! File Uploaded Successfully!", {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,

                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });

                setLoader(false);

                setInputField({
                  title: "",
                  description: "",
                  url: "",
                });
                setData(false);
                getData();
                if (typeof window !== "undefined") {
                  // browser code
                  document.getElementById("file-upload").value = "";
                }
              } catch (e) {
                toast.success("File Upload Failed!", {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,

                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                setLoader(false);
              }
            });
          }
        );
      }
    }
  };

  const deleteFile = (name, id) => {
    setLoader(true);
    const desertRef = ref(storage, `${folder}/${name}`);
    deleteObject(desertRef)
      .then(async () => {
        await deleteDoc(doc(firestore, folder, id));
        if (folder === "slides") {
          setSlideState(slideState.filter((item) => item.id !== id));
          setSlideUpdateTime(Date.now());
        }
        // File deleted successfully
        toast.success("Congrats! File Deleted Successfully!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoader(false);
        getData();
      })
      .catch((error) => {
        setLoader(false);
        // Uh-oh, an error occurred!
        toast.error("Something Went Wrong!", {
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
    document.title = "WBTPTA AMTA WEST:Admin Upload Image";
    if (state !== "admin") {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
  }, [inputField, progress, folder]);

  return (
    <>
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
      <AdminNavBar />
      <h3 className="text-center text-primary my-3">Admin Upload Images</h3>
      <div className="container my-3">
        <div className="col-md-6 mx-auto">
          {loader ? <Loader /> : null}

          <div className="mb-3">
            <h5 className="text-center text-primary mb-3">
              Select Folder Name
            </h5>
            <div className="col-md-6 mx-auto mb-3">
              <select
                className="form-select"
                defaultValue={folder}
                onChange={(e) => {
                  setFolder(e.target.value);
                }}
                aria-label="Default select example"
              >
                <option value="">Select Folder Name</option>
                <option value="galaryimages">Galary Images</option>
                <option value="slides">Homepage Slides</option>
                <option value="profileImage">Profile Images</option>
                <option value="images">Images</option>
                <option value="otherimages">Other Images</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Title"
                value={inputField.title}
                onChange={(e) =>
                  setInputField({ ...inputField, title: e.target.value })
                }
              />
              {errInputField.errTitle.length > 0 && (
                <span className="error">{errInputField.errTitle}</span>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Description"
                value={inputField.description}
                onChange={(e) =>
                  setInputField({ ...inputField, description: e.target.value })
                }
              />
              {errInputField.errDescription.length > 0 && (
                <span className="error">{errInputField.errDescription}</span>
              )}
            </div>
            <h5 className="text-center text-primary mb-3">Select Image</h5>
            <input
              type="file"
              id="file-upload"
              className="form-control"
              placeholder="Upload Document"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div
            className="progress-bar"
            style={{
              width: progress + "%",
              height: "15px",
              backgroundColor: "purple",
              borderRadius: "10px",
              transformOrigin: "start",
            }}
          ></div>
          <div className="my-3">
            <button
              type="button"
              className="btn btn-success my-3"
              onClick={uploadFiles}
            >
              Upload Image
            </button>
          </div>
          <div className="container-fluid">
            {!data ? (
              <button
                type="button"
                className="btn btn-success mb-3"
                onClick={getData}
              >
                Get Uploaded Images
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success mb-3"
                onClick={() => setData(false)}
              >
                Hide Uploaded Files
              </button>
            )}
            {data ? (
              <div className="container overflow-auto  d-flex">
                <table className="table table-responsive table-hover table-striped table-success  px-lg-3 py-lg-2 ">
                  <thead>
                    <tr>
                      <th>Sl</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Thumbnail</th>
                      <th>Download</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.map((el, ind) => {
                      return (
                        <>
                          <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>{el.title}</td>
                            <td>{el.description}</td>
                            <td>
                              <img
                                src={el.url}
                                alt="thumbnail"
                                style={{ width: "50px", height: "50px" }}
                              />
                            </td>
                            <td>
                              <a
                                href={el.url}
                                className="btn btn-success rounded text-decoration-none"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Download
                              </a>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger mb-3"
                                onClick={() => {
                                  deleteFile(el.fileName, el.id);
                                }}
                              >
                                Delete Uploaded Files
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUploadImage;
