"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { firestore, useFirebase } from "../context/FirbaseContext";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../context/FirbaseContext";
import bcrypt from "bcryptjs";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
const Registration = ({ data, setSignUpTrue }) => {
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Register Now";
  }, []);
  const firbase = useFirebase();
  const router = useRouter();
  const docId = data.id;
  const [displayLoader, setDisplayLoader] = useState(false);
  const [file, setFile] = useState({});
  const [progress, setProgress] = useState(0);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [uploadablePhoto, setUploadablePhoto] = useState(null);
  const [photoCropped, setPhotoCropped] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [imgCroped, setImgCroped] = useState(false);

  // const passwordPattern =
  //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$/;
  const [inputField, setInputField] = useState({
    teachersID: data.id,
    id: docId,
    username: "",
    email: data.email,
    tname: data.tname,
    school: data.school,
    udise: data.udise,
    desig: data.desig,
    circle: data.circle,
    empid: data.empid,
    pan: data.pan,
    loggedin: Date.now(),
    question: data.question,
    phone: data.phone,
    password: "",
    cpassword: "",
  });
  const [errField, setErrField] = useState({
    usernameErr: "",
    emailErr: "",
    phoneErr: "",
    passwordErr: "",
    cpasswordErr: "",
    profilePhotoErr: "",
  });

  const inputHandler = (e) => {
    // console.log(e.target.name, "==", e.target.value);
    setInputField({
      ...inputField,
      [e.target.name]: removeSpaces(e.target.value),
    });
    // console.log(inputField);
  };
  const submitBtn = async (e) => {
    // e.preventDefault();
    // console.log(inputField);
    if (validForm()) {
      try {
        const username = inputField.username.replace(/\s/g, "").toLowerCase();
        setDisplayLoader(true);
        const collectionRef = collection(firestore, "userteachers");
        const q = query(collectionRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot.docs[0].data().pan);
        if (querySnapshot.docs.length > 0) {
          toast.error(
            `Dear ${inputField.tname}, User ID Already Taken,Choose Another One.`
          );
          setTimeout(() => {
            setInputField({ ...inputField, username: "" });
          }, 2000);
        } else {
          const url = `/api/signup`;

          try {
            let response = await axios.post(url, {
              ...inputField,
              username,
              password: bcrypt.hashSync(inputField.password, 10),
            });
            if (response.status === 200) {
              const filestorageRef = ref(
                storage,
                `/profileImage/${inputField.teachersID}-${file.name}`
              );
              const uploadTask = uploadBytesResumable(
                filestorageRef,
                uploadablePhoto
              );
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
                  getDownloadURL(uploadTask.snapshot.ref).then(
                    async (photourl) => {
                      // console.log(photourl);

                      try {
                        await setDoc(doc(firestore, "userteachers", docId), {
                          ...inputField,
                          photoName: inputField.teachersID + "-" + file.name,
                          url: photourl,
                          username: username,
                          password: bcrypt.hashSync(inputField.password, 10),
                          disabled: false,
                        });
                        await setDoc(doc(firestore, "profileImage", docId), {
                          title: inputField.tname,
                          description: inputField.school,
                          fileName: inputField.teachersID + "-" + file.name,
                          url: photourl,
                          id: docId,
                        });
                        const docRef = doc(
                          firestore,
                          "teachers",
                          inputField.teachersID
                        );
                        await updateDoc(docRef, {
                          registered: true,
                        });
                        try {
                          firbase.signupUserWithEmailAndPass(
                            inputField.email,
                            inputField.password
                          );
                        } catch (e) {
                          console.log(e);
                        }
                        setDisplayLoader(false);
                        toast.success(
                          `Congratulation ${inputField.tname} You are Successfully Registered!`,
                          {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,

                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          }
                        );
                        localStorage.clear();
                        setTimeout(() => {
                          router.push("/login");
                        }, 1500);
                        if (typeof window !== "undefined") {
                          // browser code
                          document.getElementById("file-upload").value = "";
                        }
                      } catch (e) {
                        toast.error("File Upload Failed!", {
                          position: "top-right",
                          autoClose: 1500,
                          hideProgressBar: false,
                          closeOnClick: true,

                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                        console.log(e);
                      }
                    }
                  );
                }
              );
            } else {
              setDisplayLoader(false);
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
            console.log(e);
            setDisplayLoader(false);
            toast.error(e.response.data.message, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,

              draggable: true,
              progress: undefined,
              theme: "light",
            });
            // localStorage.clear();
            // setTimeout(() => {
            //   router.push("/login");
            // }, 1500);
          }
        }
      } catch (e) {
        console.log(e);
        setDisplayLoader(false);
        toast.error("Registration Failed", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // localStorage.clear();
        // setTimeout(() => {
        //   router.push("/login");
        // }, 1500);
      }
    } else {
      toast.error("Form Is Invalid", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const validForm = () => {
    let formIsValid = true;
    setErrField({
      usernameErr: "",
      emailErr: "",
      phoneErr: "",
      passwordErr: "",
      cpasswordErr: "",
      profilePhotoErr: "",
    });
    if (inputField.username === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        usernameErr: "Please Enter Username",
      }));
    }
    if (inputField.email === "" || !ValidateEmail(inputField.email)) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        emailErr: "Please Enter Valid email",
      }));
    }
    if (inputField.phone === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        phoneErr: "Please Enter Phone No.",
      }));
    }
    if (inputField.password === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        passwordErr: "Please Enter Password",
      }));
    }

    if (inputField.password.length <= 5) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        passwordErr: "Password length must be minimum 6",
      }));
    }

    if (
      inputField.cpassword === "" ||
      inputField.password !== inputField.cpassword
    ) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        cpasswordErr: "Password and Confirm Password Are Not Same",
      }));
    }
    if (!file.name) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        profilePhotoErr: "Please Upload Profile Picture",
      }));
    }
    if (!uploadablePhoto) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        profilePhotoErr:
          "Please Properly Select & Crop Profile Picture As Shown In the Picture",
      }));
    }
    return formIsValid;
  };
  function ValidateEmail(mail) {
    //eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail)) {
      return true;
    }
    // alert("You have entered an invalid email address!");
    return false;
  }

  function removeSpaces(inputString) {
    // Use a regular expression to match all spaces (whitespace characters) and replace them with an empty string
    return inputString.replace(/\s/g, "");
  }

  const handleChange = (e) => {
    if (e.target.files[0].type.startsWith("image/")) {
      setSrc(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
      setPhotoCropped(true);
      setImgCroped(false);
    } else {
      setSrc(null);
      toast.error("Please select an image file.");
      setPhotoCropped(false);
      setImgCroped(false);
    }
  };

  function getCroppedImg() {
    setPhotoCropped(false);
    setDisabled(false);
    let canvas;
    if (typeof window !== "undefined") {
      // browser code
      canvas = document.createElement("canvas");
    }
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
    // console.log(base64Image);
    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');
    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          try {
            blob.name = inputField.teachersID + "-" + file.name;
            resolve(blob);
            setUploadablePhoto(blob);
            setImgCroped(true);
          } catch (e) {
            setResult(null);
            toast.error("Select Crop Area First, Plese Reselect Photo", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,

              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        },
        file.type,
        1
      );
    });
  }

  return (
    <div className="container my-5">
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
      <div className="row login text-black m-auto col-md-6 p-2">
        <h3 className="text-primary">
          HELLO {data.tname}, PLEASE COMPLETE YOUR REGISTRATION
        </h3>
        <br />

        {displayLoader ? <Loader /> : null}
        <form autoComplete="off" method="post">
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              User Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              className="form-control"
              value={inputField.username}
              onChange={(e) =>
                setInputField({
                  ...inputField,
                  username: e.target.value.replace(/[^\w\s]/g, ""),
                })
              }
            />
            {errField.usernameErr.length > 0 && (
              <span className="error">{errField.usernameErr}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              value={inputField.email}
              onChange={inputHandler}
            />
            {errField.emailErr.length > 0 && (
              <span className="error">{errField.emailErr}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter Mobile Number"
              className="form-control"
              value={inputField.phone}
              onChange={inputHandler}
            />
            {errField.phoneErr.length > 0 && (
              <span className="error">{errField.phoneErr}</span>
            )}
          </div>
          <div className="mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={inputField.password}
              onChange={(e) =>
                setInputField({ ...inputField, password: e.target.value })
              }
            />
            <button
              type="button"
              className="btn btn-warning btn-sm mt-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
            <br />

            {errField.passwordErr.length > 0 && (
              <span className="error">{errField.passwordErr}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="cpassword"
              id="cpassword"
              placeholder="Confirm Password"
              value={inputField.cpassword}
              onChange={(e) =>
                setInputField({
                  ...inputField,
                  cpassword: e.target.value,
                })
              }
            />
            {errField.cpasswordErr.length > 0 && (
              <span className="error">{errField.cpasswordErr}</span>
            )}
          </div>
          <div className="mb-3">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="" className="form-label">
                  Press Choose File, Select Your Image File And Select Crop Area
                  before pressing crop on Image As Shown in Picture
                </label>
                <img
                  src="https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/Crop.gif"
                  alt="select"
                  width={"100vw"}
                  className="mb-3 mx-auto"
                />
                <input
                  type="file"
                  id="file-upload"
                  className="form-control"
                  placeholder="Upload Document"
                  accept="image/*"
                  onChange={handleChange}
                />
                {errField.profilePhotoErr.length > 0 && (
                  <span className="error">{errField.profilePhotoErr}</span>
                )}
              </div>

              <div className="col-md-6 mt-3">
                {src && photoCropped && (
                  <div
                    className="col-md-6 mx-auto"
                    style={{ width: "70%", height: "70%" }}
                  >
                    <ReactCrop
                      src={src}
                      onImageLoaded={setImage}
                      crop={crop}
                      onChange={setCrop}
                      aspect={1 / 1}
                    />
                    <div>
                      <button
                        type="button"
                        className="btn btn-success my-2"
                        onClick={getCroppedImg}
                      >
                        Crop
                      </button>
                    </div>
                  </div>
                )}
                {result && (
                  <div className="col-md-6">
                    <img
                      src={result}
                      alt="profilePhoto"
                      className="img-fluid"
                    />
                  </div>
                )}
              </div>
            </div>
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
          <div>
            {imgCroped && (
              <button
                type="button"
                className="btn btn-primary m-1"
                onClick={submitBtn}
                disabled={disabled}
              >
                Register <i className="bi bi-box-arrow-in-right"></i>
              </button>
            )}

            <button
              className="btn btn-danger m-1 px-4"
              onClick={() => setSignUpTrue()}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
