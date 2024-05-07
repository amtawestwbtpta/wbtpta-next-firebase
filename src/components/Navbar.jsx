"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { decryptObjData, getCookie } from "../modules/encryption";
import { firestore } from "../context/FirbaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/Store";
const Navbar = () => {
  const { access, setAccess } = useGlobalContext();
  const router = useRouter();
  // let navbarSupportedContent = document.querySelector(
  //   "#navbarSupportedContent"
  // );
  let teacherdetails, userdetails, loggedAt;
  let details = getCookie("tid");
  if (details) {
    teacherdetails = decryptObjData("tid");
    userdetails = decryptObjData("uid");
    loggedAt = getCookie("loggedAt");
  }

  const handleNavCollapse = () => {
    if (
      document
        .querySelector("#navbarSupportedContent")
        .classList.contains("show")
    ) {
      document
        .querySelector("#navbarSupportedContent")
        .classList.remove("show");
    }
  };

  let url, question;
  if (details) {
    url = userdetails.url;
    question = userdetails.question;
  }

  const checkLogin = async () => {
    const collectionRef = collection(firestore, "userteachers");
    const q = query(
      collectionRef,
      where("username", "==", userdetails.username)
    );
    const querySnapshot = await getDocs(q);
    let fdata = querySnapshot.docs[0].data();
    if (!fdata.disabled) {
      setAccess(teacherdetails.circle);
    } else {
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
      localStorage.clear();
      router.push("/logout");
    }
  };
  useEffect(() => {
    if (details) {
      if ((Date.now() - loggedAt) / 1000 / 60 / 15 < 1) {
        setAccess(teacherdetails.circle);
      } else {
        checkLogin();
      }
    }

    // eslint-disable-next-line
  }, []);

  const RenderMenu = () => {
    if (access === "admin") {
      return (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              href="/"
              onClick={handleNavCollapse}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              href="/dashboard"
              onClick={handleNavCollapse}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/Notification"
              onClick={handleNavCollapse}
            >
              Notifications
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/MemoSection"
              onClick={handleNavCollapse}
            >
              Memo Section
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              href="/findteacher"
              onClick={handleNavCollapse}
            >
              Search Teacher
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link
              className="nav-link"
              href="/StudentTeacherRatio"
              onClick={handleNavCollapse}
            >
              Student Teacher Ratio
            </Link>
          </li> */}
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/schoolteacherdata"
              onClick={handleNavCollapse}
            >
              School Teacher Data
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/techsalary"
              onClick={handleNavCollapse}
            >
              All Teacher's Salary Data
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/payslipwbtpta"
              onClick={handleNavCollapse}
            >
              Generate Payslip
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/Form16Prev"
              onClick={handleNavCollapse}
            >
              Generate Own Form 16
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              href="/teacherAddress"
              onClick={handleNavCollapse}
            >
              Teacher Address
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/gpwiseschool"
              onClick={handleNavCollapse}
            >
              GP Wise School Data
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/GPWiseTeacher"
              onClick={handleNavCollapse}
            >
              GP Wise Teacher Data
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/teacherdatabase"
              onClick={handleNavCollapse}
            >
              All Teacher's Data of AW Circle
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/displaydatabase"
              onClick={handleNavCollapse}
            >
              Display Registered Users Data
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/questionsec"
              onClick={handleNavCollapse}
            >
              Question Section
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/result"
              onClick={handleNavCollapse}
            >
              Result Section
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              href="/AddTeacher"
              onClick={handleNavCollapse}
            >
              Add Teacher
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/admindashboard"
              onClick={handleNavCollapse}
            >
              Admin Panel Section
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/displaycomplain"
              onClick={handleNavCollapse}
            >
              Display Requests
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/UniformComplainsDisplay"
              onClick={handleNavCollapse}
            >
              Display Uniform Complain
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/update_self"
              onClick={handleNavCollapse}
            >
              Update Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/updateunp"
              onClick={handleNavCollapse}
            >
              Update Username And Password
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              href="/downloads"
              onClick={handleNavCollapse}
            >
              Downloads
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link
              className="nav-link"
              href="/FlexibleComp"
              onClick={handleNavCollapse}
            >
              Flexible Component
            </Link>
          </li> */}

          <li className="nav-item">
            <Link
              className="nav-link"
              href="/taxcalculator"
              onClick={handleNavCollapse}
            >
              Tax Calculator
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/agecalculator"
              onClick={handleNavCollapse}
            >
              Amazing Age Calculator
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/RetirementCalculator"
              onClick={handleNavCollapse}
            >
              Retirement Date Calculator
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/amtawestwbtpta"
            >
              <i className="bi bi-facebook"></i> Facebook Page
            </a>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/complain"
              onClick={handleNavCollapse}
            >
              Complain or Suggest Us
            </Link>
          </li>
          <div className="row">
            <li className="nav-item">
              <img
                src={url}
                alt="profile"
                className="navprofileImage"
                onClick={() => {
                  router.push("/ChangePhoto");
                  handleNavCollapse();
                }}
              />
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                href="/logout"
                onClick={handleNavCollapse}
              >
                Logout
              </Link>
            </li>
          </div>
        </>
      );
    } else if (access === "taw") {
      return (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              href="/"
              onClick={handleNavCollapse}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              href="/dashboard"
              onClick={handleNavCollapse}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/Notification"
              onClick={handleNavCollapse}
            >
              Notifications
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/MemoSection"
              onClick={handleNavCollapse}
            >
              Memo Section
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              href="/findteacher"
              onClick={handleNavCollapse}
            >
              Search Teacher
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link
              className="nav-link"
              href="/StudentTeacherRatio"
              onClick={handleNavCollapse}
            >
              Student Teacher Ratio
            </Link>
          </li> */}

          <li className="nav-item">
            <Link
              className="nav-link"
              href="/techsalary"
              onClick={handleNavCollapse}
            >
              All Teacher's Salary Data
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/payslipwbtpta"
              onClick={handleNavCollapse}
            >
              Generate Payslip
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/Form16Prev"
              onClick={handleNavCollapse}
            >
              Generate Form 16
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              href="/schoolteacherdata"
              onClick={handleNavCollapse}
            >
              School Teacher Data
            </Link>
          </li>

          {question === "admin" ? (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/gpwiseschool"
                  onClick={handleNavCollapse}
                >
                  GP Wise School Data
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/GPWiseTeacher"
                  onClick={handleNavCollapse}
                >
                  GP Wise Teacher Data
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/questionsec"
                  onClick={handleNavCollapse}
                >
                  Question Section
                </Link>
              </li>
            </>
          ) : null}
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/result"
              onClick={handleNavCollapse}
            >
              Result Section
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/update_self"
              onClick={handleNavCollapse}
            >
              Update Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/updateunp"
              onClick={handleNavCollapse}
            >
              Update Username And Password
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/downloads"
              onClick={handleNavCollapse}
            >
              Downloads
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              href="/taxcalculator"
              onClick={handleNavCollapse}
            >
              Tax Calculator
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/agecalculator"
              onClick={handleNavCollapse}
            >
              Amazing Age Calculator
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/RetirementCalculator"
              onClick={handleNavCollapse}
            >
              Retirement Date Calculator
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/amtawestwbtpta"
            >
              <i className="bi bi-facebook"></i> Facebook Page
            </a>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/complain"
              onClick={handleNavCollapse}
            >
              Complain or Suggest Us
            </Link>
          </li>
          <div className="row">
            <li className="nav-item">
              <img
                src={url}
                alt="profile"
                className="navprofileImage"
                onClick={() => router.push("/ChangePhoto")}
              />
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                href="/logout"
                onClick={handleNavCollapse}
              >
                Logout
              </Link>
            </li>
          </div>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              href="/"
              onClick={handleNavCollapse}
            >
              Home
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link
              className="nav-link"
              href="/FlexibleComp"
              onClick={handleNavCollapse}
            >
              Flexible Component
            </Link>
          </li> */}
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/Notification"
              onClick={handleNavCollapse}
            >
              Notifications
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/MemoSection"
              onClick={handleNavCollapse}
            >
              Memo Section
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/SchoolTeacherDataUnlog"
              onClick={handleNavCollapse}
            >
              Student Teacher Data
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/TeacherDatabaseUnlog"
              onClick={handleNavCollapse}
            >
              Teacher Database
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/downloads"
              onClick={handleNavCollapse}
            >
              Downloads
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              href="/taxcalculator"
              onClick={handleNavCollapse}
            >
              Tax Calculator
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/agecalculator"
              onClick={handleNavCollapse}
            >
              Amazing Age Calculator
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/RetirementCalculator"
              onClick={handleNavCollapse}
            >
              Retirement Date Calculator
            </Link>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/amtawestwbtpta"
              onClick={handleNavCollapse}
            >
              <i className="bi bi-facebook"></i> Facebook Page
            </a>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              href="/complain"
              onClick={handleNavCollapse}
            >
              Complain or Suggest Us
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              href="/login"
              onClick={handleNavCollapse}
            >
              Login
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar align-items-end navbar-expand-lg bg-white px-lg-3 py-lg-2 shadow-sm sticky-top p-2 overflow-auto bg-body-tertiary noprint">
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
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <img
            src="https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/logo.png"
            alt="LOGO"
            width={"70vw"}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <RenderMenu />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
