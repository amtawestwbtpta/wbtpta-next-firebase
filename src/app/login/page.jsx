"use client";
import React, { useState, useContext, useEffect } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

import { firestore, firbaseAuth } from "../../context/FirbaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcryptjs";
import Loader from "../../components/Loader";
import { encryptObjData, getCookie, setCookie } from "../../modules/encryption";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const { access, setAccess } = useGlobalContext();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputField, setInputField] = useState({
    username: "",
    password: "",
  });
  const [errField, setErrField] = useState({
    usernameErr: "",
    passwordErr: "",
  });
  const inputHandler = (e) => {
    // console.log(e.target.name, "==", e.target.value);
    setInputField({ ...inputField, [e.target.name]: e.target.value });
    // console.log(inputField);
  };
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Login Page";
    let t = getCookie("t");
    if (t) {
      router.push("/dashboard");
    }

    // eslint-disable-next-line
  }, []);

  const validForm = () => {
    let formIsValid = true;
    setErrField({
      usernameErr: "",
      passwordErr: "",
    });
    if (inputField.username === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        usernameErr: "Please Enter Valid username",
      }));
    }
    if (inputField.password === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        passwordErr: "Please Enter Password",
      }));
    }

    return formIsValid;
  };
  const compare = (userPassword, serverPassword) => {
    let match = bcrypt.compareSync(userPassword, serverPassword);

    return match;
  };
  const signInUser = (email, password) => {
    signInWithEmailAndPassword(firbaseAuth, email, password)
      .then((res) => console.log("Log In Successfull"))
      .catch((e) => console.log(e));
  };
  const submitBtn = async (e) => {
    e.preventDefault();
    // console.log(inputField);
    if (validForm()) {
      setLoader(true);
      const collectionRef = collection(firestore, "userteachers");
      const q = query(
        collectionRef,
        where("username", "==", inputField.username.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot.docs[0].data().pan);
      if (querySnapshot.docs.length > 0) {
        let fdata = querySnapshot.docs[0].data();

        // if (fdata.password === inputField.password) {
        if (compare(inputField.password, fdata.password)) {
          if (!fdata.disabled) {
            setLoader(false);
            toast.success("Congrats! You are Logined Successfully!", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            signInUser(fdata.email, inputField.password);
            const collectionRef2 = collection(firestore, "teachers");
            const q2 = query(collectionRef2, where("pan", "==", fdata.pan));
            const querySnapshot2 = await getDocs(q2);
            // console.log(querySnapshot.docs[0].data().pan);

            let fdata2 = querySnapshot2.docs[0].data();

            setAccess(fdata2.circle);
            encryptObjData("uid", fdata, 10080);
            encryptObjData("tid", fdata2, 10080);
            setCookie("t", fdata2.tname, 10080);
            setCookie("loggedAt", Date.now(), 10080);
            router.push("/dashboard");
          } else {
            setLoader(false);
            toast.error("Your Account is Disabled!", {
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
        } else {
          setLoader(false);
          toast.error("Wrong Password!", {
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
      } else {
        setLoader(false);
        toast.error("Invalid Username!", {
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
    } else {
      toast.error("Form Is Invalid", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const addUser = () => {
    router.push("/signup");
  };
  function removeSpaces(inputString) {
    // Use a regular expression to match all spaces (whitespace characters) and replace them with an empty string
    return inputString.replace(/\s/g, "");
  }

  return (
    <div className="container text-black p-2 ">
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

      {loader ? <Loader /> : null}
      <div className="row mx-auto col-md-6 login p-2">
        <h3 className="heading text-center">User Login</h3>
        <br />

        <form
          autoComplete="off"
          method="post"
          className="mx-auto text-center"
          onSubmit={submitBtn}
        >
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              username
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
                  username: removeSpaces(e.target.value),
                })
              }
            />
            {errField.usernameErr.length > 0 && (
              <span className="error">{errField.usernameErr}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              id="password"
              value={inputField.password}
              onChange={inputHandler}
            />
            {errField.passwordErr.length > 0 && (
              <span className="error">{errField.passwordErr}</span>
            )}
            <button
              type="button"
              className="btn btn-warning btn-sm mt-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>
          <div className="mb-3">
            <Link style={{ textDecoration: "none" }} href={"/forgotPassword"}>
              Forgot Password?
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary m-1"
              onClick={submitBtn}
            >
              Login <i className="bi bi-box-arrow-in-left"></i>
            </button>
            <button
              type="button"
              id="addUserBtn"
              className="btn btn-success m-1"
              onClick={addUser}
            >
              Register Now <i className="bi bi-person-add"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
