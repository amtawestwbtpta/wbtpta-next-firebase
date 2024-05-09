"use client";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import PasswordForm from "../../components/PasswordForm";
import Loader from "../../components/Loader";
import Link from "next/link";
const OtpForm = () => {
  const [otpform, showform] = useState(true);
  const [loader, setLoader] = useState(false);
  const emailRef = useRef();
  const sendOtp = async () => {
    try {
      setLoader(true);
      let response = await axios.post("/api/forgotpassword", {
        email: emailRef.current.value,
      });
      let record = response.data;
      if (response.status === 200) {
        toast.success(record.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        showform(false);
        setLoader(false);
      } else {
        setLoader(false);
        toast.error(record.message, {
          position: "top-right",
          autoClose: 5000,
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
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Forgot Password";
  }, []);
  return (
    <div className="container mt-5">
      <div className="row mx-auto col-md-8 login p-2">
        <h3 className="text-center text-primary mb-3">Reset Password</h3>
        <div className="col-md-8">
          <ToastContainer
            position="top-right"
            autoClose={5000}
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
          {otpform ? (
            <form autoComplete="off" id="otpForm" method="post">
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  autoComplete="off"
                  ref={emailRef}
                />
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-primary m-1"
                  onClick={sendOtp}
                >
                  Send OTP
                </button>
                <Link href="/login">
                  <button className="btn btn-danger m-1 px-4">Back</button>
                </Link>
              </div>
            </form>
          ) : (
            <PasswordForm email={emailRef.current.value} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
