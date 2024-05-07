"use client";
import React, { useEffect, useContext, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { decryptObjData, getCookie } from "../../modules/encryption";
import { firestore } from "../../context/FirbaseContext";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Loader from "../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { validateEmptyValues } from "../../modules/calculatefunctions";
const Result = () => {
  let details = getCookie("tid");
  const { access, setRedirectData } = useGlobalContext();
  const router = useRouter();

  const [showWelcomeText, setShowWelcomeText] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [studentsList, setStudentsList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hideListView, setHideListView] = useState(true);
  const [hideMarksSection, setHideMarksSection] = useState(false);
  const [classNo, setclassNo] = useState(null);
  const [showAllClassResult, setShowAllClassResult] = useState(false);
  const [showERegister, setShowERegister] = useState(false);

  const [inputField, setInputField] = useState({
    id: "",
    student_name: "",
    mother_name: "",
    father_name: "",
    guardians_name: "",
    student_id: "",
    mobile: "",
    birthdate: "",
    class: "",
    nclass: "",
    roll_no: "",
    formative_1_p: 0,
    formative_1_qe: 0,
    formative_1_ia: 0,
    formative_1_ec: 0,
    formative_1_ace: 0,
    formative_2_p: 0,
    formative_2_qe: 0,
    formative_2_ia: 0,
    formative_2_ec: 0,
    formative_2_ace: 0,
    formative_3_p: 0,
    formative_3_qe: 0,
    formative_3_ia: 0,
    formative_3_ec: 0,
    formative_3_ace: 0,
    summative_1_beng: 10,
    summative_1_eng: 10,
    summative_1_math: 10,
    summative_2_beng: 0,
    summative_2_eng: 0,
    summative_2_math: 0,
    summative_3_beng: 0,
    summative_3_eng: 0,
    summative_3_math: 0,
    summative_1_comm: 0,
    summative_1_corr: 0,
    summative_1_Prob: 0,
    summative_1_ment_phy: 0,
    summative_2_comm: 0,
    summative_2_corr: 0,
    summative_2_Prob: 0,
    summative_2_ment_phy: 0,
    summative_3_comm: 0,
    summative_3_corr: 0,
    summative_3_Prob: 0,
    summative_3_ment_phy: 0,
    lang_1_p1: 0,
    lang_2_p1: 0,
    math_p1: 0,
    envs_p1: 0,
    phys_p1: 0,
    work_p1: 0,
    lang_1_p2: 0,
    lang_2_p2: 0,
    math_p2: 0,
    envs_p2: 0,
    phys_p2: 0,
    work_p2: 0,
    lang_1_p3: 0,
    lang_2_p3: 0,
    math_p3: 0,
    envs_p3: 0,
    phys_p3_th: 0,
    phys_p3_pr: 0,
    work_p3_th: 0,
    work_p3_pr: 0,
  });
  const [newInputField, setNewInputField] = useState({
    id: "",
    student_name: "",
    mother_name: "",
    father_name: "",
    guardians_name: "",
    student_id: "",
    mobile: "",
    birthdate: "01-01-2012",
    class: "",
    nclass: "",
    roll_no: "",
    formative_1_p: 0,
    formative_1_qe: 0,
    formative_1_ia: 0,
    formative_1_ec: 0,
    formative_1_ace: 0,
    formative_2_p: 0,
    formative_2_qe: 0,
    formative_2_ia: 0,
    formative_2_ec: 0,
    formative_2_ace: 0,
    formative_3_p: 0,
    formative_3_qe: 0,
    formative_3_ia: 0,
    formative_3_ec: 0,
    formative_3_ace: 0,
    summative_1_beng: 0,
    summative_1_eng: 0,
    summative_1_math: 0,
    summative_2_beng: 0,
    summative_2_eng: 0,
    summative_2_math: 0,
    summative_3_beng: 0,
    summative_3_eng: 0,
    summative_3_math: 0,
    summative_1_comm: 0,
    summative_1_corr: 0,
    summative_1_Prob: 0,
    summative_1_ment_phy: 0,
    summative_2_comm: 0,
    summative_2_corr: 0,
    summative_2_Prob: 0,
    summative_2_ment_phy: 0,
    summative_3_comm: 0,
    summative_3_corr: 0,
    summative_3_Prob: 0,
    summative_3_ment_phy: 0,
    lang_1_p1: 0,
    lang_2_p1: 0,
    math_p1: 0,
    envs_p1: 0,
    phys_p1: 0,
    work_p1: 0,
    lang_1_p2: 0,
    lang_2_p2: 0,
    math_p2: 0,
    envs_p2: 0,
    phys_p2: 0,
    work_p2: 0,
    lang_1_p3: 0,
    lang_2_p3: 0,
    math_p3: 0,
    envs_p3: 0,
    phys_p3_th: 0,
    phys_p3_pr: 0,
    work_p3_th: 0,
    work_p3_pr: 0,
  });

  let teacherdetails, school, tableName;

  teacherdetails = decryptObjData("tid");
  school = teacherdetails.school;
  tableName = teacherdetails.school.toLowerCase().split(" ").join("");

  let welcomeText = `This is the Result section of ${school}`;
  let newText = `To Upload Bulk Data of Students Download STUDENT DATA ENTRY FORM from Downloads Section. After Filling e-mail Us the Filled Form. We will Upload it To Our Server.`;

  const createTable = async () => {
    try {
      const collectionRef = collection(firestore, tableName);
      const q = query(collectionRef);
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length > 0) {
        setShowLoader(true);
        setShowWelcomeText(true);
        const data = querySnapshot.docs.map((doc) => ({
          // doc.data() is never undefined for query doc snapshots
          ...doc.data(),
          id: doc.id,
        }));
        let newData = data.sort((a, b) => a.nclass - b.nclass);
        setStudentsList(newData);
      } else {
        await setDoc(doc(firestore, tableName, "student100"), {
          id: "student100",
          student_name: "TEST PP",
          mother_name: "TEST PP",
          father_name: "TEST PP",
          guardians_name: "TEST PP",
          student_id: "TEST PP",
          mobile: "9999999999",
          birthdate: "01-01-2017",
          class: "CLASS PP (A)",
          nclass: 0,
          roll_no: 1,
          formative_1_p: 0,
          formative_1_qe: 0,
          formative_1_ia: 0,
          formative_1_ec: 0,
          formative_1_ace: 0,
          formative_2_p: 0,
          formative_2_qe: 0,
          formative_2_ia: 0,
          formative_2_ec: 0,
          formative_2_ace: 0,
          formative_3_p: 0,
          formative_3_qe: 0,
          formative_3_ia: 0,
          formative_3_ec: 0,
          formative_3_ace: 0,
          summative_1_beng: 0,
          summative_1_eng: 0,
          summative_1_math: 0,
          summative_2_beng: 0,
          summative_2_eng: 0,
          summative_2_math: 0,
          summative_3_beng: 0,
          summative_3_eng: 0,
          summative_3_math: 0,
          summative_1_comm: 0,
          summative_1_corr: 0,
          summative_1_Prob: 0,
          summative_1_ment_phy: 0,
          summative_2_comm: 0,
          summative_2_corr: 0,
          summative_2_Prob: 0,
          summative_2_ment_phy: 0,
          summative_3_comm: 0,
          summative_3_corr: 0,
          summative_3_Prob: 0,
          summative_3_ment_phy: 0,
          lang_1_p1: 0,
          lang_2_p1: 0,
          math_p1: 0,
          envs_p1: 0,
          phys_p1: 0,
          work_p1: 0,
          lang_1_p2: 0,
          lang_2_p2: 0,
          math_p2: 0,
          envs_p2: 0,
          phys_p2: 0,
          work_p2: 0,
          lang_1_p3: 0,
          lang_2_p3: 0,
          math_p3: 0,
          envs_p3: 0,
          phys_p3_th: 0,
          phys_p3_pr: 0,
          work_p3_th: 0,
          work_p3_pr: 0,
        });
        await setDoc(doc(firestore, tableName, "student101"), {
          id: "student101",
          student_name: "TEST ONE",
          mother_name: "TEST ONE",
          father_name: "TEST ONE",
          guardians_name: "TEST ONE",
          student_id: "TEST ONE",
          mobile: "9999999999",
          birthdate: "01-01-2018",
          class: "CLASS I (A)",
          nclass: 1,
          roll_no: 1,
          formative_1_p: 0,
          formative_1_qe: 0,
          formative_1_ia: 0,
          formative_1_ec: 0,
          formative_1_ace: 0,
          formative_2_p: 0,
          formative_2_qe: 0,
          formative_2_ia: 0,
          formative_2_ec: 0,
          formative_2_ace: 0,
          formative_3_p: 0,
          formative_3_qe: 0,
          formative_3_ia: 0,
          formative_3_ec: 0,
          formative_3_ace: 0,
          summative_1_beng: 0,
          summative_1_eng: 0,
          summative_1_math: 0,
          summative_2_beng: 0,
          summative_2_eng: 0,
          summative_2_math: 0,
          summative_3_beng: 0,
          summative_3_eng: 0,
          summative_3_math: 0,
          summative_1_comm: 0,
          summative_1_corr: 0,
          summative_1_Prob: 0,
          summative_1_ment_phy: 0,
          summative_2_comm: 0,
          summative_2_corr: 0,
          summative_2_Prob: 0,
          summative_2_ment_phy: 0,
          summative_3_comm: 0,
          summative_3_corr: 0,
          summative_3_Prob: 0,
          summative_3_ment_phy: 0,
          lang_1_p1: 0,
          lang_2_p1: 0,
          math_p1: 0,
          envs_p1: 0,
          phys_p1: 0,
          work_p1: 0,
          lang_1_p2: 0,
          lang_2_p2: 0,
          math_p2: 0,
          envs_p2: 0,
          phys_p2: 0,
          work_p2: 0,
          lang_1_p3: 0,
          lang_2_p3: 0,
          math_p3: 0,
          envs_p3: 0,
          phys_p3_th: 0,
          phys_p3_pr: 0,
          work_p3_th: 0,
          work_p3_pr: 0,
        });
        await setDoc(doc(firestore, tableName, "student102"), {
          id: "student102",
          student_name: "TEST TWO",
          mother_name: "TEST TWO",
          father_name: "TEST TWO",
          guardians_name: "TEST TWO",
          student_id: "TEST TWO",
          mobile: "9999999999",
          birthdate: "01-01-2019",
          class: "CLASS II (A)",
          nclass: 2,
          roll_no: 1,
          formative_1_p: 0,
          formative_1_qe: 0,
          formative_1_ia: 0,
          formative_1_ec: 0,
          formative_1_ace: 0,
          formative_2_p: 0,
          formative_2_qe: 0,
          formative_2_ia: 0,
          formative_2_ec: 0,
          formative_2_ace: 0,
          formative_3_p: 0,
          formative_3_qe: 0,
          formative_3_ia: 0,
          formative_3_ec: 0,
          formative_3_ace: 0,
          summative_1_beng: 0,
          summative_1_eng: 0,
          summative_1_math: 0,
          summative_2_beng: 0,
          summative_2_eng: 0,
          summative_2_math: 0,
          summative_3_beng: 0,
          summative_3_eng: 0,
          summative_3_math: 0,
          summative_1_comm: 0,
          summative_1_corr: 0,
          summative_1_Prob: 0,
          summative_1_ment_phy: 0,
          summative_2_comm: 0,
          summative_2_corr: 0,
          summative_2_Prob: 0,
          summative_2_ment_phy: 0,
          summative_3_comm: 0,
          summative_3_corr: 0,
          summative_3_Prob: 0,
          summative_3_ment_phy: 0,
          lang_1_p1: 0,
          lang_2_p1: 0,
          math_p1: 0,
          envs_p1: 0,
          phys_p1: 0,
          work_p1: 0,
          lang_1_p2: 0,
          lang_2_p2: 0,
          math_p2: 0,
          envs_p2: 0,
          phys_p2: 0,
          work_p2: 0,
          lang_1_p3: 0,
          lang_2_p3: 0,
          math_p3: 0,
          envs_p3: 0,
          phys_p3_th: 0,
          phys_p3_pr: 0,
          work_p3_th: 0,
          work_p3_pr: 0,
        });
        await setDoc(doc(firestore, tableName, "student103"), {
          id: "student103",
          student_name: "TEST THREE",
          mother_name: "TEST THREE",
          father_name: "TEST THREE",
          guardians_name: "TEST THREE",
          student_id: "TEST THREE",
          mobile: "9999999999",
          birthdate: "01-01-2020",
          class: "CLASS III (A)",
          nclass: 3,
          roll_no: 1,
          formative_1_p: 0,
          formative_1_qe: 0,
          formative_1_ia: 0,
          formative_1_ec: 0,
          formative_1_ace: 0,
          formative_2_p: 0,
          formative_2_qe: 0,
          formative_2_ia: 0,
          formative_2_ec: 0,
          formative_2_ace: 0,
          formative_3_p: 0,
          formative_3_qe: 0,
          formative_3_ia: 0,
          formative_3_ec: 0,
          formative_3_ace: 0,
          summative_1_beng: 0,
          summative_1_eng: 0,
          summative_1_math: 0,
          summative_2_beng: 0,
          summative_2_eng: 0,
          summative_2_math: 0,
          summative_3_beng: 0,
          summative_3_eng: 0,
          summative_3_math: 0,
          summative_1_comm: 0,
          summative_1_corr: 0,
          summative_1_Prob: 0,
          summative_1_ment_phy: 0,
          summative_2_comm: 0,
          summative_2_corr: 0,
          summative_2_Prob: 0,
          summative_2_ment_phy: 0,
          summative_3_comm: 0,
          summative_3_corr: 0,
          summative_3_Prob: 0,
          summative_3_ment_phy: 0,
          lang_1_p1: 0,
          lang_2_p1: 0,
          math_p1: 0,
          envs_p1: 0,
          phys_p1: 0,
          work_p1: 0,
          lang_1_p2: 0,
          lang_2_p2: 0,
          math_p2: 0,
          envs_p2: 0,
          phys_p2: 0,
          work_p2: 0,
          lang_1_p3: 0,
          lang_2_p3: 0,
          math_p3: 0,
          envs_p3: 0,
          phys_p3_th: 0,
          phys_p3_pr: 0,
          work_p3_th: 0,
          work_p3_pr: 0,
        });
        await setDoc(doc(firestore, tableName, "student104"), {
          id: "student104",
          student_name: "TEST FOUR",
          mother_name: "TEST FOUR",
          father_name: "TEST FOUR",
          guardians_name: "TEST FOUR",
          student_id: "TEST FOUR",
          mobile: "9999999999",
          birthdate: "01-01-2020",
          class: "CLASS IV (A)",
          nclass: 4,
          roll_no: 1,
          formative_1_p: 0,
          formative_1_qe: 0,
          formative_1_ia: 0,
          formative_1_ec: 0,
          formative_1_ace: 0,
          formative_2_p: 0,
          formative_2_qe: 0,
          formative_2_ia: 0,
          formative_2_ec: 0,
          formative_2_ace: 0,
          formative_3_p: 0,
          formative_3_qe: 0,
          formative_3_ia: 0,
          formative_3_ec: 0,
          formative_3_ace: 0,
          summative_1_beng: 0,
          summative_1_eng: 0,
          summative_1_math: 0,
          summative_2_beng: 0,
          summative_2_eng: 0,
          summative_2_math: 0,
          summative_3_beng: 0,
          summative_3_eng: 0,
          summative_3_math: 0,
          summative_1_comm: 0,
          summative_1_corr: 0,
          summative_1_Prob: 0,
          summative_1_ment_phy: 0,
          summative_2_comm: 0,
          summative_2_corr: 0,
          summative_2_Prob: 0,
          summative_2_ment_phy: 0,
          summative_3_comm: 0,
          summative_3_corr: 0,
          summative_3_Prob: 0,
          summative_3_ment_phy: 0,
          lang_1_p1: 0,
          lang_2_p1: 0,
          math_p1: 0,
          envs_p1: 0,
          phys_p1: 0,
          work_p1: 0,
          lang_1_p2: 0,
          lang_2_p2: 0,
          math_p2: 0,
          envs_p2: 0,
          phys_p2: 0,
          work_p2: 0,
          lang_1_p3: 0,
          lang_2_p3: 0,
          math_p3: 0,
          envs_p3: 0,
          phys_p3_th: 0,
          phys_p3_pr: 0,
          work_p3_th: 0,
          work_p3_pr: 0,
        });
        await setDoc(doc(firestore, tableName, "student105"), {
          id: "student105",
          student_name: "TEST FIVE",
          mother_name: "TEST FIVE",
          father_name: "TEST FIVE",
          guardians_name: "TEST FIVE",
          student_id: "TEST FIVE",
          mobile: "9999999999",
          birthdate: "01-01-2020",
          class: "CLASS V (A)",
          nclass: 5,
          roll_no: 1,
          formative_1_p: 0,
          formative_1_qe: 0,
          formative_1_ia: 0,
          formative_1_ec: 0,
          formative_1_ace: 0,
          formative_2_p: 0,
          formative_2_qe: 0,
          formative_2_ia: 0,
          formative_2_ec: 0,
          formative_2_ace: 0,
          formative_3_p: 0,
          formative_3_qe: 0,
          formative_3_ia: 0,
          formative_3_ec: 0,
          formative_3_ace: 0,
          summative_1_beng: 0,
          summative_1_eng: 0,
          summative_1_math: 0,
          summative_2_beng: 0,
          summative_2_eng: 0,
          summative_2_math: 0,
          summative_3_beng: 0,
          summative_3_eng: 0,
          summative_3_math: 0,
          summative_1_comm: 0,
          summative_1_corr: 0,
          summative_1_Prob: 0,
          summative_1_ment_phy: 0,
          summative_2_comm: 0,
          summative_2_corr: 0,
          summative_2_Prob: 0,
          summative_2_ment_phy: 0,
          summative_3_comm: 0,
          summative_3_corr: 0,
          summative_3_Prob: 0,
          summative_3_ment_phy: 0,
          lang_1_p1: 0,
          lang_2_p1: 0,
          math_p1: 0,
          envs_p1: 0,
          phys_p1: 0,
          work_p1: 0,
          lang_1_p2: 0,
          lang_2_p2: 0,
          math_p2: 0,
          envs_p2: 0,
          phys_p2: 0,
          work_p2: 0,
          lang_1_p3: 0,
          lang_2_p3: 0,
          math_p3: 0,
          envs_p3: 0,
          phys_p3_th: 0,
          phys_p3_pr: 0,
          work_p3_th: 0,
          work_p3_pr: 0,
        });
        toast.success(`Congratulation Table Successfully Created!`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        const newquerySnapshot = await getDocs(q);

        setShowLoader(true);
        setShowWelcomeText(true);
        const data = newquerySnapshot.docs.map((doc) => ({
          // doc.data() is never undefined for query doc snapshots
          ...doc.data(),
          id: doc.id,
        }));
        let newData = data.sort((a, b) => a.nclass - b.nclass);
        setStudentsList(newData);
        toast.success(newText, {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      toast.error(e, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(e);
    }
  };
  const columns = [
    {
      name: "Sl",
      selector: (row, ind) => ind + 1,
      width: "2",
    },
    {
      name: "Students Name",
      selector: (row) => row.student_name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Students ID",
      selector: (row) => row.student_id,
      sortable: true,
      wrap: true,
    },
    {
      name: "Class",
      selector: (row) => row.class,
      sortable: true,
      wrap: true,
    },
    {
      name: "Roll",
      selector: (row) => row.roll_no,
      sortable: true,
      wrap: true,
    },
    {
      name: "Mobile",
      selector: (row) => (
        <a
          href={`tel: +91${row.mobile}`}
          className="d-inline-block mb-2 text-decoration-none text-dark"
        >
          <i className="bi bi-telephone-fill"></i>
          {"  "}
          +91{row.mobile}
        </a>
      ),
      sortable: true,
      wrap: true,
    },
    {
      name: "View/Update Details",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={(e) => {
            if (typeof window !== "undefined") {
              document.getElementById(
                "staticBackdropLabel"
              ).innerHTML = `DETAILED DATA OF ${row.student_name}`;
            }
            setclassNo(row.nclass);
            setInputField({
              id: row.id,
              student_name: row.student_name,
              mother_name: row.mother_name,
              father_name: row.father_name,
              guardians_name: row.guardians_name,
              student_id: row.student_id,
              mobile: row.mobile,
              birthdate: row.birthdate,
              class: row.class,
              nclass: row.nclass,
              roll_no: row.roll_no,
              formative_1_p: row.formative_1_p,
              formative_1_qe: row.formative_1_qe,
              formative_1_ia: row.formative_1_ia,
              formative_1_ec: row.formative_1_ec,
              formative_1_ace: row.formative_1_ace,
              formative_2_p: row.formative_2_p,
              formative_2_qe: row.formative_2_qe,
              formative_2_ia: row.formative_2_ia,
              formative_2_ec: row.formative_2_ec,
              formative_2_ace: row.formative_2_ace,
              formative_3_p: row.formative_3_p,
              formative_3_qe: row.formative_3_qe,
              formative_3_ia: row.formative_3_ia,
              formative_3_ec: row.formative_3_ec,
              formative_3_ace: row.formative_3_ace,
              summative_1_beng: row.summative_1_beng,
              summative_1_eng: row.summative_1_eng,
              summative_1_math: row.summative_1_math,
              summative_2_beng: row.summative_2_beng,
              summative_2_eng: row.summative_2_eng,
              summative_2_math: row.summative_2_math,
              summative_3_beng: row.summative_3_beng,
              summative_3_eng: row.summative_3_eng,
              summative_3_math: row.summative_3_math,
              summative_1_comm: row.summative_1_comm,
              summative_1_corr: row.summative_1_corr,
              summative_1_Prob: row.summative_1_Prob,
              summative_1_ment_phy: row.summative_1_ment_phy,
              summative_2_comm: row.summative_2_comm,
              summative_2_corr: row.summative_2_corr,
              summative_2_Prob: row.summative_2_Prob,
              summative_2_ment_phy: row.summative_2_ment_phy,
              summative_3_comm: row.summative_3_comm,
              summative_3_corr: row.summative_3_corr,
              summative_3_Prob: row.summative_3_Prob,
              summative_3_ment_phy: row.summative_3_ment_phy,
              lang_1_p1: row.lang_1_p1,
              lang_2_p1: row.lang_2_p1,
              math_p1: row.math_p1,
              envs_p1: row.envs_p1,
              phys_p1: row.phys_p1,
              work_p1: row.work_p1,
              lang_1_p2: row.lang_1_p2,
              lang_2_p2: row.lang_2_p2,
              math_p2: row.math_p2,
              envs_p2: row.envs_p2,
              phys_p2: row.phys_p2,
              work_p2: row.work_p2,
              lang_1_p3: row.lang_1_p3,
              lang_2_p3: row.lang_2_p3,
              math_p3: row.math_p3,
              envs_p3: row.envs_p3,
              phys_p3_th: row.phys_p3_th,
              phys_p3_pr: row.phys_p3_pr,
              work_p3_th: row.work_p3_th,
              work_p3_pr: row.work_p3_pr,
            });
          }}
        >
          Update Data
        </button>
      ),
      sortable: true,
    },
    {
      name: "View Result",
      cell: (row) => (
        <Link
          className="btn btn-success"
          href={`/${
            row.nclass === 0
              ? "ClassPPResult"
              : row.nclass === 1 || row.nclass === 2
              ? "Class12Result"
              : "Class345Result"
          }?details=${JSON.stringify(row)}`}
        >
          View Result
        </Link>
      ),
    },
    {
      name: "Delete Student",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            let message = confirm(`Are You Sure To Delete ${row.student_name}`); //eslint-disable-line
            message
              ? deleteStudent(row)
              : toast.error("Student Not Deleted", {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
          }}
        >
          Delete
        </button>
      ),
    },
  ];
  const updateData = async () => {
    try {
      const docRef = doc(firestore, tableName, inputField.id);
      await updateDoc(docRef, inputField);
      createTable();
      toast.success("Congrats! Student Details Updated Successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
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
      console.log(e);
      // console.log(inputField);
    }
  };
  const deleteStudent = async (student) => {
    try {
      await deleteDoc(doc(firestore, tableName, student.id));
      createTable();
      toast.success("Student Deleted Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      toast.error(e, {
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
  const showMarkSection = () => setHideMarksSection(!hideMarksSection);
  const PPMarks = (e) => {
    if (e.target.value > 5) {
      alert("Maximum PP(5) Marks Can be Given.");
      setInputField({ ...inputField, [e.target.name]: 0 });
      setNewInputField({ ...newInputField, [e.target.name]: 0 });
    } else {
      setInputField({
        ...inputField,
        [e.target.name]: e.target.value,
      });
      setNewInputField({
        ...newInputField,
        [e.target.name]: e.target.value,
      });
    }
  };
  const tenMarks = (e) => {
    if (e.target.value > 10) {
      alert("Maximum Ten(10) Marks Can be Given.");
      setInputField({ ...inputField, [e.target.name]: 0 });
      setNewInputField({ ...newInputField, [e.target.name]: 0 });
    } else {
      setInputField({
        ...inputField,
        [e.target.name]: e.target.value,
      });
      setNewInputField({
        ...newInputField,
        [e.target.name]: e.target.value,
      });
    }
  };
  const fifteenMarks = (e) => {
    if (e.target.value > 15) {
      alert("Maximum Fifteen(15) Marks Can be Given.");
      setInputField({ ...inputField, [e.target.name]: 0 });
      setNewInputField({ ...newInputField, [e.target.name]: 0 });
    } else {
      setInputField({
        ...inputField,
        [e.target.name]: e.target.value,
      });
      setNewInputField({
        ...newInputField,
        [e.target.name]: e.target.value,
      });
    }
  };
  const twentyMarks = (e) => {
    if (e.target.value > 20) {
      alert("Maximum Twenty(20) Marks Can be Given.");
      setInputField({ ...inputField, [e.target.name]: 0 });
      setNewInputField({ ...newInputField, [e.target.name]: 0 });
    } else {
      setInputField({
        ...inputField,
        [e.target.name]: e.target.value,
      });
      setNewInputField({
        ...newInputField,
        [e.target.name]: e.target.value,
      });
    }
  };
  const thirtyMarks = (e) => {
    if (e.target.value > 30) {
      alert("Maximum Thirty(30) Marks Can be Given.");
      setInputField({ ...inputField, [e.target.name]: 0 });
      setNewInputField({ ...newInputField, [e.target.name]: 0 });
    } else {
      setInputField({
        ...inputField,
        [e.target.name]: e.target.value,
      });
      setNewInputField({
        ...newInputField,
        [e.target.name]: e.target.value,
      });
    }
  };
  const fiftyMarks = (e) => {
    if (e.target.value > 50) {
      alert("Maximum Fifty(50) Marks Can be Given.");
      setInputField({ ...inputField, [e.target.name]: 0 });
      setNewInputField({ ...newInputField, [e.target.name]: 0 });
    } else {
      setInputField({
        ...inputField,
        [e.target.name]: e.target.value,
      });
      setNewInputField({
        ...newInputField,
        [e.target.name]: e.target.value,
      });
    }
  };
  const hideList = () => {
    setHideListView(!hideListView);
  };
  const changeNewClass = (e) => {
    setNewInputField({
      ...newInputField,
      class: e.target.value,
      nclass:
        e.target.value === "CLASS PP (A)"
          ? 0
          : e.target.value === "CLASS I (A)"
          ? 1
          : e.target.value === "CLASS II (A)"
          ? 2
          : e.target.value === "CLASS III (A)"
          ? 3
          : e.target.value === "CLASS IV (A)"
          ? 4
          : 5,
      id: studentsList.length + 101,
    });
    setclassNo(
      e.target.value === "CLASS PP (A)"
        ? 0
        : e.target.value === "CLASS I (A)"
        ? 1
        : e.target.value === "CLASS II (A)"
        ? 2
        : e.target.value === "CLASS III (A)"
        ? 3
        : e.target.value === "CLASS IV (A)"
        ? 4
        : 5
    );
    console.log(newInputField.class, newInputField.nclass);
  };
  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const emptyValues = validateEmptyValues(newInputField);
      console.log(emptyValues);
      if (Object.keys(emptyValues).length > 0) {
        const emptyFields = Object.keys(emptyValues).join(", ");
        // alert(`The following fields are empty: ${emptyFields}`);
        toast.error(`The following fields are empty: ${emptyFields}`, {
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
        setShowLoader(false);
        await setDoc(
          doc(
            firestore,
            tableName,
            `student${
              parseInt(
                studentsList[studentsList.length - 1].id.split("student")[1]
              ) + 1
            }`
          ),
          newInputField
        );

        setShowLoader(true);
        toast.success(`Student Successfully Added!`, {
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
    } catch (e) {
      toast.error(e, {
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

  useEffect(() => {
    if (!access) {
      router.push("/login");
    }
    createTable();
    // eslint-disable-next-line
  }, []);
  let getCurrentDateInput = (date) => {
    let data = date.split("-");
    let day = data[0];
    let month = data[1];
    let year = data[2];
    return `${year}-${month}-${day}`;
  };
  let getSubmitDateInput = (date) => {
    let data = date.split("-");
    let day = data[2];
    let month = data[1];
    let year = data[0];
    return `${day}-${month}-${year}`;
  };
  const changeData = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
    setNewInputField({ ...newInputField, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const result = studentsList.filter((el) => {
      return el.student_name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search, studentsList, inputField, newInputField]);
  return (
    <div className="container mt-3">
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

      {showLoader ? (
        showWelcomeText ? (
          <div className="container text-black">
            <h3 className="text-primary text-center">{welcomeText}</h3>
            <div className="mt-3">
              <button
                type="button"
                className="btn btn-sm btn-info"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop2"
              >
                Add Student
              </button>
            </div>
            {studentsList.length > 0 && (
              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-sm btn-dark"
                  onClick={() => {
                    router.push(`/StudentsPhotoCorner`);

                    setRedirectData(`details=${JSON.stringify(studentsList)}`);
                  }}
                >
                  Photo Corner
                </button>
              </div>
            )}
            {/* <div className="mt-3">
              <button
                type="button"
                className="btn btn-sm btn-dark"
                onClick={() => router.push(`/Ministry`)}
              >
                Minisry
              </button>
            </div> */}

            <div className="class-section my-3">
              <button
                type="button"
                className={`btn btn-sm ${
                  hideListView ? "btn-warning" : "btn-success"
                }`}
                onClick={hideList}
              >
                {hideListView ? "Hide List" : "Show List"}
              </button>
            </div>
            <div className="allresult-section mb-3">
              <button
                type="button"
                className={`btn btn-sm m-3 ${
                  showAllClassResult ? "btn-info" : "btn-success"
                }`}
                onClick={() => setShowAllClassResult(!showAllClassResult)}
              >
                {showAllClassResult
                  ? "Hide All Class Ressult"
                  : "Show All Class Ressult"}
              </button>
              {showAllClassResult ? (
                <div className="mb-3">
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary m-2 btn-sm"
                      onClick={() => {
                        router.push(`/AllPPResult`);

                        setRedirectData(
                          `details=${JSON.stringify(
                            studentsList.filter((el) => el.nclass === 0)
                          )}`
                        );
                      }}
                    >
                      Class PP
                    </button>
                    <button
                      type="button"
                      className="btn btn-info m-2 btn-sm"
                      onClick={() => {
                        router.push(`/AllClass12Result`);

                        setRedirectData(
                          `details=${JSON.stringify(
                            studentsList.filter((el) => el.nclass === 1)
                          )}`
                        );
                      }}
                    >
                      Class I
                    </button>
                    <button
                      type="button"
                      className="btn btn-success m-2 btn-sm"
                      onClick={() => {
                        router.push(`/AllClass12Result`);

                        setRedirectData(
                          `details=${JSON.stringify(
                            studentsList.filter((el) => el.nclass === 2)
                          )}`
                        );
                      }}
                    >
                      Class II
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark m-2 btn-sm"
                      onClick={() => {
                        router.push(`/AllClass345Result`);

                        setRedirectData(
                          `details=${JSON.stringify(
                            studentsList.filter((el) => el.nclass === 3)
                          )}`
                        );
                      }}
                    >
                      Class III
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning m-2 btn-sm"
                      onClick={() => {
                        router.push(`/AllClass345Result`);

                        setRedirectData(
                          `details=${JSON.stringify(
                            studentsList.filter((el) => el.nclass === 4)
                          )}`
                        );
                      }}
                    >
                      Class IV
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary m-2 btn-sm"
                      onClick={() => {
                        router.push(`/AllClass345Result`);

                        setRedirectData(
                          `details=${JSON.stringify(
                            studentsList.filter((el) => el.nclass === 5)
                          )}`
                        );
                      }}
                    >
                      Class V
                    </button>
                  </div>
                </div>
              ) : null}
              <button
                type="button"
                className={`btn btn-sm ${
                  showERegister ? "btn-info" : "btn-primary"
                }`}
                onClick={() => setShowERegister(!showERegister)}
              >
                {showERegister
                  ? "Hide Evolution Register"
                  : "Show Evolution Register"}
              </button>
              {showERegister ? (
                <div>
                  <button
                    type="button"
                    className="btn btn-info m-2 btn-sm"
                    onClick={() => {
                      router.push(`/ClassPPERegister`);

                      setRedirectData(
                        `details=${JSON.stringify(
                          studentsList.filter((el) => el.nclass === 0)
                        )}`
                      );
                    }}
                  >
                    Class PP Evolution Register
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning m-2 btn-sm"
                    onClick={() => {
                      router.push(`/Class12ERegister`);

                      setRedirectData(
                        `details=${JSON.stringify(
                          studentsList.filter((el) => el.nclass === 1)
                        )}`
                      );
                    }}
                  >
                    Class I Evolution Register
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark m-2 btn-sm"
                    onClick={() => {
                      router.push(`/Class12ERegister`);

                      setRedirectData(
                        `details=${JSON.stringify(
                          studentsList.filter((el) => el.nclass === 2)
                        )}`
                      );
                    }}
                  >
                    Class II Evolution Register
                  </button>
                  <button
                    type="button"
                    className="btn btn-info m-2 btn-sm"
                    onClick={() => {
                      router.push(`/Class345ERegister`);

                      setRedirectData(
                        `details=${JSON.stringify(
                          studentsList.filter((el) => el.nclass === 3)
                        )}`
                      );
                    }}
                  >
                    Class III Evolution Register
                  </button>
                  <button
                    type="button"
                    className="btn btn-success m-2 btn-sm"
                    onClick={() => {
                      router.push(`/Class345ERegister`);

                      setRedirectData(
                        `details=${JSON.stringify(
                          studentsList.filter((el) => el.nclass === 4)
                        )}`
                      );
                    }}
                  >
                    Class IV Evolution Register
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary m-2 btn-sm"
                    onClick={() => {
                      router.push(`/Class345ERegister`);

                      setRedirectData(
                        `details=${JSON.stringify(
                          studentsList.filter((el) => el.nclass === 5)
                        )}`
                      );
                    }}
                  >
                    Class V Evolution Register
                  </button>
                </div>
              ) : null}
            </div>
            {hideListView ? (
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
            ) : null}
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
                        DETAILED DATA
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
                    <div className="container p-2 row align-items-end text-dark text-center">
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">
                          Student Name
                        </label>
                        <input
                          className="form-control"
                          name="student_name"
                          id="student_name"
                          value={inputField.student_name}
                          onChange={changeData}
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">
                          Mother Name
                        </label>
                        <input
                          className="form-control"
                          name="mother_name"
                          id="mother_name"
                          value={inputField.mother_name}
                          onChange={changeData}
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">
                          Father Name
                        </label>
                        <input
                          className="form-control"
                          name="father_name"
                          id="father_name"
                          value={inputField.father_name}
                          onChange={changeData}
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">
                          Gurdian's Name
                        </label>
                        <input
                          className="form-control"
                          name="guardians_name"
                          id="guardians_name"
                          value={inputField.guardians_name}
                          onChange={changeData}
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-4">
                        <label className="form-label fw-bold">Student ID</label>
                        <input
                          type="number"
                          className="form-control"
                          name="student_id"
                          id="student_id"
                          value={inputField.student_id}
                          onChange={changeData}
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-4">
                        <label className="form-label fw-bold">Mobile</label>
                        <input
                          type="number"
                          className="form-control"
                          name="mobile"
                          id="mobile"
                          value={inputField.mobile}
                          onChange={changeData}
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-4">
                        <label className="form-label fw-bold">
                          Student Birthdate
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="birthdate"
                          id="birthdate"
                          value={getCurrentDateInput(inputField.birthdate)}
                          onChange={(e) =>
                            setInputField({
                              ...inputField,
                              birthdate: getSubmitDateInput(e.target.value),
                            })
                          }
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-4">
                        <label className="form-label fw-bold">Roll No.</label>
                        <input
                          type="number"
                          className="form-control"
                          name="roll_no"
                          id="roll_no"
                          value={inputField.roll_no}
                          onChange={changeData}
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-4">
                        <label className="form-label fw-bold">Class</label>
                        <select
                          name="class_name"
                          id="class_name"
                          className="form-select text-center"
                          aria-label="Default select example"
                          value={inputField.class.split(" (A)")[0]}
                          onChange={(e) =>
                            setInputField({
                              ...inputField,
                              class: e.target.value + " (A)",
                            })
                          }
                        >
                          <option value="">Select From Below</option>
                          <option value="CLASS PP">CLASS PP</option>
                          <option value="CLASS I">CLASS I</option>
                          <option value="CLASS II">CLASS II</option>
                          <option value="CLASS III">CLASS III</option>
                          <option value="CLASS IV">CLASS IV</option>
                          <option value="CLASS V">CLASS V</option>
                        </select>
                      </div>

                      <div className="marks-button-section mb-3">
                        <button
                          type="button"
                          className={`btn ${
                            !hideMarksSection ? "btn-success" : "btn-warning"
                          }`}
                          onClick={showMarkSection}
                        >
                          {!hideMarksSection ? "Update Marks" : "Hide Marks"}
                        </button>
                      </div>
                      {hideMarksSection ? (
                        <div id="marks">
                          <div className="container p-2 row align-items-end text-dark text-center">
                            <div className="mb-3 col-lg-12 d-inline-block">
                              <hr />
                              <label className="form-label fw-bold">
                                Formative Marks For{" "}
                                {inputField.class.split(" (A)")[0]}
                              </label>
                              <hr />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 1 Participation (10)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_1_p"
                                value={inputField.formative_1_p}
                                onChange={tenMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 1 Questioning and Experimentation (10)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_1_qe"
                                value={inputField.formative_1_qe}
                                onChange={tenMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 1 Interpretation and Application (10)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_1_ia"
                                value={inputField.formative_1_ia}
                                onChange={tenMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 1 Empathy and Co-operation (10)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_1_ec"
                                value={inputField.formative_1_ec}
                                onChange={tenMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 1 Aesthetic and Creative Expression
                                (10)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_1_ace"
                                value={inputField.formative_1_ace}
                                onChange={tenMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 2 Participation (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_2_p"
                                value={inputField.formative_2_p}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 2 Questioning and Experimentation (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_2_qe"
                                value={inputField.formative_2_qe}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 2 Interpretation and Application (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_2_ia"
                                value={inputField.formative_2_ia}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 2 Empathy and Co-operation (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_2_ec"
                                value={inputField.formative_2_ec}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 2 Aesthetic and Creative Expression
                                (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_2_ace"
                                value={inputField.formative_2_ace}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 3 Participation (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_3_p"
                                value={inputField.formative_3_p}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 3 Questioning and Experimentation (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_3_qe"
                                value={inputField.formative_3_qe}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 3 Interpretation and Application (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_3_ia"
                                value={inputField.formative_3_ia}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 3 Empathy and Co-operation (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_3_ec"
                                value={inputField.formative_3_ec}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 3 Aesthetic and Creative Expression
                                (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_3_ace"
                                value={inputField.formative_3_ace}
                                onChange={twentyMarks}
                              />
                            </div>
                          </div>
                          {classNo === 0 ? (
                            <div
                              className="container p-2 row align-items-end text-dark text-center"
                              id="pp"
                            >
                              <div className="mb-3 col-lg-12">
                                <hr />
                                <label className="form-label fw-bold">
                                  Summative Marks For{" "}
                                  {inputField.class.split(" (A)")[0]}
                                </label>
                                <hr />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 1 BENGALI (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_1_beng"
                                  value={inputField.summative_1_beng}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 1 ENGLISH (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_1_eng"
                                  value={inputField.summative_1_eng}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 1 MATHEMATICS (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_1_math"
                                  value={inputField.summative_1_math}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 2 BENGALI (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_2_beng"
                                  value={inputField.summative_2_beng}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 2 ENGLISH (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_2_eng"
                                  value={inputField.summative_2_eng}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 2 MATHEMATICS (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_2_math"
                                  value={inputField.summative_2_math}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 3 BENGALI (30)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_3_beng"
                                  value={inputField.summative_3_beng}
                                  onChange={thirtyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 3 ENGLISH (30)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_3_eng"
                                  value={inputField.summative_3_eng}
                                  onChange={thirtyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 3 MATHEMATICS (30)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_3_math"
                                  value={inputField.summative_3_math}
                                  onChange={thirtyMarks}
                                />
                              </div>
                            </div>
                          ) : null}
                          {classNo === 1 || classNo === 2 ? (
                            <div
                              className="container p-2 row align-items-end text-dark text-center"
                              id="I_II"
                            >
                              <div className="mb-3 col-lg-12">
                                <hr />
                                <label className="form-label fw-bold">
                                  Summative Marks For{" "}
                                  {inputField.class.split(" (A)")[0]}
                                </label>
                                <hr />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 1 ABILITY TO COMMUNICATE (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_1_comm"
                                  value={inputField.summative_1_comm}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 1 ABILITY TO CORRELATE (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_1_corr"
                                  value={inputField.summative_1_corr}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 1 ABILITY IN PROBLEM SOLVING (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_1_Prob"
                                  value={inputField.summative_1_Prob}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 1 ABILITY IN MENTAL AND PHYSICAL
                                  COORDINATION (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_1_ment_phy"
                                  value={inputField.summative_1_ment_phy}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 2 ABILITY TO COMMUNICATE (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_2_comm"
                                  value={inputField.summative_2_comm}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 2 ABILITY TO CORRELATE (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_2_corr"
                                  value={inputField.summative_2_corr}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 2 ABILITY IN PROBLEM SOLVING (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_2_Prob"
                                  value={inputField.summative_2_Prob}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 2 ABILITY IN MENTAL AND PHYSICAL
                                  COORDINATION (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_2_ment_phy"
                                  value={inputField.summative_2_ment_phy}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 3 ABILITY TO COMMUNICATE (30)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_3_comm"
                                  value={inputField.summative_3_comm}
                                  onChange={thirtyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 3 ABILITY TO CORRELATE (30)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_3_corr"
                                  value={inputField.summative_3_corr}
                                  onChange={thirtyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 3 ABILITY IN PROBLEM SOLVING (30)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_3_Prob"
                                  value={inputField.summative_3_Prob}
                                  onChange={thirtyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 3 ABILITY IN MENTAL AND PHYSICAL
                                  COORDINATION (30)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_3_ment_phy"
                                  value={inputField.summative_3_ment_phy}
                                  onChange={thirtyMarks}
                                />
                              </div>
                            </div>
                          ) : null}
                          {classNo === 3 || classNo === 4 || classNo === 5 ? (
                            <div
                              className="container p-2 row align-items-end text-dark text-center"
                              id="III_IV_V"
                            >
                              <div className="mb-3 col-lg-12">
                                <hr />
                                <label className="form-label fw-bold">
                                  Summative Marks For{" "}
                                  {inputField.class.split(" (A)")[0]}
                                </label>
                                <hr />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  FIRST LANGUAGE_P1 (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="lang_1_p1"
                                  value={inputField.lang_1_p1}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  SECOND LANGUAGE_P1 (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="lang_2_p1"
                                  value={inputField.lang_2_p1}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  MATHEMATICS_P1 (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="math_p1"
                                  value={inputField.math_p1}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  OUR ENVIRONMENT_P1 (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="envs_p1"
                                  value={inputField.envs_p1}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  HEALTH & PHYSICAL EDUCATION_P1 (5)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="phys_p1"
                                  value={inputField.phys_p1}
                                  onChange={PPMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  ART & WORK EDUCATION_P1 (5)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="work_p1"
                                  value={inputField.work_p1}
                                  onChange={PPMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  FIRST LANGUAGE_P2 (20)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="lang_1_p2"
                                  value={inputField.lang_1_p2}
                                  onChange={twentyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  SECOND LANGUAGE_P2 (20)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="lang_2_p2"
                                  value={inputField.lang_2_p2}
                                  onChange={twentyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  MATHEMATICS_P2 (20)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="math_p2"
                                  value={inputField.math_p2}
                                  onChange={twentyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  OUR ENVIRONMENT_P2 (20)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="envs_p2"
                                  value={inputField.envs_p2}
                                  onChange={twentyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  HEALTH & PHYSICAL EDUCATION_P2 (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="phys_p2"
                                  value={inputField.phys_p2}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  ART & WORK EDUCATION_P2 (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="work_p2"
                                  value={inputField.work_p2}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  FIRST LANGUAGE_P3 (50)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="lang_1_p3"
                                  value={inputField.lang_1_p3}
                                  onChange={fiftyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  SECOND LANGUAGE_P3 (50)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="lang_2_p3"
                                  value={inputField.lang_2_p3}
                                  onChange={fiftyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  MATHEMATICS_P3 (50)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="math_p3"
                                  value={inputField.math_p3}
                                  onChange={fiftyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  OUR ENVIRONMENT_P3 (50)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="envs_p3"
                                  value={inputField.envs_p3}
                                  onChange={fiftyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  HEALTH & PHYSICAL EDUCATION_P3_Theory (15)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="phys_p3_th"
                                  value={inputField.phys_p3_th}
                                  onChange={fifteenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  HEALTH & PHYSICAL EDUCATION_P3_Practical (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="phys_p3_pr"
                                  value={inputField.phys_p3_pr}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  ART & WORK EDUCATION_P3_Theory (15)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="work_p3_th"
                                  value={inputField.work_p3_th}
                                  onChange={fifteenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  ART & WORK EDUCATION_P3_Practical (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="work_p3_pr"
                                  value={inputField.work_p3_pr}
                                  onChange={tenMarks}
                                />
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
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
            <div
              className="modal fade"
              id="staticBackdrop2"
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
                        id="staticBackdropLabel2"
                      >
                        Add Student
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
                    <div className="container p-2 row align-items-end text-dark text-center">
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">
                          Student Name
                        </label>
                        <input
                          className="form-control"
                          name="student_name"
                          id="student_name"
                          value={newInputField.student_name}
                          onChange={changeData}
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">
                          Mother Name
                        </label>
                        <input
                          className="form-control"
                          name="mother_name"
                          id="mother_name"
                          value={newInputField.mother_name}
                          onChange={changeData}
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">
                          Father Name
                        </label>
                        <input
                          className="form-control"
                          name="father_name"
                          id="father_name"
                          value={newInputField.father_name}
                          onChange={changeData}
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">
                          Gurdian's Name
                        </label>
                        <input
                          className="form-control"
                          name="guardians_name"
                          id="guardians_name"
                          value={newInputField.guardians_name}
                          onChange={changeData}
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-4">
                        <label className="form-label fw-bold">Student ID</label>
                        <input
                          type="number"
                          className="form-control"
                          name="student_id"
                          id="student_id"
                          value={newInputField.student_id}
                          onChange={changeData}
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-4">
                        <label className="form-label fw-bold">Mobile</label>
                        <input
                          type="number"
                          className="form-control"
                          name="mobile"
                          id="mobile"
                          value={newInputField.mobile}
                          onChange={changeData}
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-4">
                        <label className="form-label fw-bold">
                          Student Birthdate
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="birthdate"
                          id="birthdate"
                          value={getCurrentDateInput(newInputField.birthdate)}
                          onChange={(e) =>
                            setNewInputField({
                              ...newInputField,
                              birthdate: getSubmitDateInput(e.target.value),
                            })
                          }
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-4">
                        <label className="form-label fw-bold">Roll No.</label>
                        <input
                          type="number"
                          className="form-control"
                          name="roll_no"
                          id="roll_no"
                          value={newInputField.roll_no}
                          onChange={changeData}
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-4">
                        <label className="form-label fw-bold">Class</label>
                        <select
                          name="class_name"
                          id="class_name"
                          className="form-select text-center"
                          aria-label="Default select example"
                          value={newInputField.class}
                          onChange={changeNewClass}
                        >
                          <option value="">Select From Below</option>
                          <option value="CLASS PP (A)">CLASS PP</option>
                          <option value="CLASS I (A)">CLASS I</option>
                          <option value="CLASS II (A)">CLASS II</option>
                          <option value="CLASS III (A)">CLASS III</option>
                          <option value="CLASS IV (A)">CLASS IV</option>
                          <option value="CLASS V (A)">CLASS V</option>
                        </select>
                      </div>

                      <div className="marks-button-section mb-3">
                        <button
                          type="button"
                          className={`btn ${
                            !hideMarksSection ? "btn-success" : "btn-warning"
                          }`}
                          onClick={showMarkSection}
                        >
                          {!hideMarksSection ? "Update Marks" : "Hide Marks"}
                        </button>
                      </div>
                      {hideMarksSection ? (
                        <div id="marks">
                          <div className="container p-2 row align-items-end text-dark text-center">
                            <div className="mb-3 col-lg-12 d-inline-block">
                              <hr />
                              <label className="form-label fw-bold">
                                Formative Marks For{" "}
                                {newInputField.class.split(" (A)")[0]}
                              </label>
                              <hr />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 1 Participation (10)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_1_p"
                                value={newInputField.formative_1_p}
                                onChange={tenMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 1 Questioning and Experimentation (10)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_1_qe"
                                value={newInputField.formative_1_qe}
                                onChange={tenMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 1 Interpretation and Application (10)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_1_ia"
                                value={newInputField.formative_1_ia}
                                onChange={tenMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 1 Empathy and Co-operation (10)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_1_ec"
                                value={newInputField.formative_1_ec}
                                onChange={tenMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 1 Aesthetic and Creative Expression
                                (10)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_1_ace"
                                value={newInputField.formative_1_ace}
                                onChange={tenMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 2 Participation (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_2_p"
                                value={newInputField.formative_2_p}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 2 Questioning and Experimentation (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_2_qe"
                                value={newInputField.formative_2_qe}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 2 Interpretation and Application (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_2_ia"
                                value={newInputField.formative_2_ia}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 2 Empathy and Co-operation (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_2_ec"
                                value={newInputField.formative_2_ec}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 2 Aesthetic and Creative Expression
                                (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_2_ace"
                                value={newInputField.formative_2_ace}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 3 Participation (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_3_p"
                                value={newInputField.formative_3_p}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 3 Questioning and Experimentation (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_3_qe"
                                value={newInputField.formative_3_qe}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 3 Interpretation and Application (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_3_ia"
                                value={newInputField.formative_3_ia}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 3 Empathy and Co-operation (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_3_ec"
                                value={newInputField.formative_3_ec}
                                onChange={twentyMarks}
                              />
                            </div>
                            <div className="mb-3 col-lg-3">
                              <label className="form-label fw-bold">
                                Formative 3 Aesthetic and Creative Expression
                                (20)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="formative_3_ace"
                                value={newInputField.formative_3_ace}
                                onChange={twentyMarks}
                              />
                            </div>
                          </div>
                          {classNo === 0 ? (
                            <div
                              className="container p-2 row align-items-end text-dark text-center"
                              id="pp"
                            >
                              <div className="mb-3 col-lg-12">
                                <hr />
                                <label className="form-label fw-bold">
                                  Summative Marks For{" "}
                                  {newInputField.class.split(" (A)")[0]}
                                </label>
                                <hr />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 1 BENGALI (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_1_beng"
                                  value={newInputField.summative_1_beng}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 1 ENGLISH (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_1_eng"
                                  value={newInputField.summative_1_eng}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 1 MATHEMATICS (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_1_math"
                                  value={newInputField.summative_1_math}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 2 BENGALI (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_2_beng"
                                  value={newInputField.summative_2_beng}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 2 ENGLISH (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_2_eng"
                                  value={newInputField.summative_2_eng}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 2 MATHEMATICS (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_2_math"
                                  value={newInputField.summative_2_math}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 3 BENGALI (30)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_3_beng"
                                  value={newInputField.summative_3_beng}
                                  onChange={thirtyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 3 ENGLISH (30)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_3_eng"
                                  value={newInputField.summative_3_eng}
                                  onChange={thirtyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-4">
                                <label className="form-label fw-bold">
                                  Summative 3 MATHEMATICS (30)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_3_math"
                                  value={newInputField.summative_3_math}
                                  onChange={thirtyMarks}
                                />
                              </div>
                            </div>
                          ) : null}
                          {classNo === 1 || classNo === 2 ? (
                            <div
                              className="container p-2 row align-items-end text-dark text-center"
                              id="I_II"
                            >
                              <div className="mb-3 col-lg-12">
                                <hr />
                                <label className="form-label fw-bold">
                                  Summative Marks For{" "}
                                  {newInputField.class.split(" (A)")[0]}
                                </label>
                                <hr />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 1 ABILITY TO COMMUNICATE (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_1_comm"
                                  value={newInputField.summative_1_comm}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 1 ABILITY TO CORRELATE (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_1_corr"
                                  value={newInputField.summative_1_corr}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 1 ABILITY IN PROBLEM SOLVING (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_1_Prob"
                                  value={newInputField.summative_1_Prob}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 1 ABILITY IN MENTAL AND PHYSICAL
                                  COORDINATION (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_1_ment_phy"
                                  value={newInputField.summative_1_ment_phy}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 2 ABILITY TO COMMUNICATE (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_2_comm"
                                  value={newInputField.summative_2_comm}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 2 ABILITY TO CORRELATE (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_2_corr"
                                  value={newInputField.summative_2_corr}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 2 ABILITY IN PROBLEM SOLVING (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_2_Prob"
                                  value={newInputField.summative_2_Prob}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 2 ABILITY IN MENTAL AND PHYSICAL
                                  COORDINATION (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_2_ment_phy"
                                  value={newInputField.summative_2_ment_phy}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 3 ABILITY TO COMMUNICATE (30)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_3_comm"
                                  value={newInputField.summative_3_comm}
                                  onChange={thirtyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 3 ABILITY TO CORRELATE (30)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_3_corr"
                                  value={newInputField.summative_3_corr}
                                  onChange={thirtyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 3 ABILITY IN PROBLEM SOLVING (30)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_3_Prob"
                                  value={newInputField.summative_3_Prob}
                                  onChange={thirtyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  Summative 3 ABILITY IN MENTAL AND PHYSICAL
                                  COORDINATION (30)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="summative_3_ment_phy"
                                  value={newInputField.summative_3_ment_phy}
                                  onChange={thirtyMarks}
                                />
                              </div>
                            </div>
                          ) : null}
                          {classNo === 3 || classNo === 4 || classNo === 5 ? (
                            <div
                              className="container p-2 row align-items-end text-dark text-center"
                              id="III_IV_V"
                            >
                              <div className="mb-3 col-lg-12">
                                <hr />
                                <label className="form-label fw-bold">
                                  Summative Marks For{" "}
                                  {newInputField.class.split(" (A)")[0]}
                                </label>
                                <hr />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  FIRST LANGUAGE_P1 (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="lang_1_p1"
                                  value={newInputField.lang_1_p1}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  SECOND LANGUAGE_P1 (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="lang_2_p1"
                                  value={newInputField.lang_2_p1}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  MATHEMATICS_P1 (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="math_p1"
                                  value={newInputField.math_p1}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  OUR ENVIRONMENT_P1 (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="envs_p1"
                                  value={newInputField.envs_p1}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  HEALTH & PHYSICAL EDUCATION_P1 (5)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="phys_p1"
                                  value={newInputField.phys_p1}
                                  onChange={PPMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  ART & WORK EDUCATION_P1 (5)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="work_p1"
                                  value={newInputField.work_p1}
                                  onChange={PPMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  FIRST LANGUAGE_P2 (20)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="lang_1_p2"
                                  value={newInputField.lang_1_p2}
                                  onChange={twentyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  SECOND LANGUAGE_P2 (20)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="lang_2_p2"
                                  value={newInputField.lang_2_p2}
                                  onChange={twentyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  MATHEMATICS_P2 (20)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="math_p2"
                                  value={newInputField.math_p2}
                                  onChange={twentyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  OUR ENVIRONMENT_P2 (20)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="envs_p2"
                                  value={newInputField.envs_p2}
                                  onChange={twentyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  HEALTH & PHYSICAL EDUCATION_P2 (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="phys_p2"
                                  value={newInputField.phys_p2}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  ART & WORK EDUCATION_P2 (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="work_p2"
                                  value={newInputField.work_p2}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  FIRST LANGUAGE_P3 (50)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="lang_1_p3"
                                  value={newInputField.lang_1_p3}
                                  onChange={fiftyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  SECOND LANGUAGE_P3 (50)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="lang_2_p3"
                                  value={newInputField.lang_2_p3}
                                  onChange={fiftyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  MATHEMATICS_P3 (50)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="math_p3"
                                  value={newInputField.math_p3}
                                  onChange={fiftyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  OUR ENVIRONMENT_P3 (50)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="envs_p3"
                                  value={newInputField.envs_p3}
                                  onChange={fiftyMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  HEALTH & PHYSICAL EDUCATION_P3_Theory (15)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="phys_p3_th"
                                  value={newInputField.phys_p3_th}
                                  onChange={fifteenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  HEALTH & PHYSICAL EDUCATION_P3_Practical (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="phys_p3_pr"
                                  value={newInputField.phys_p3_pr}
                                  onChange={tenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  ART & WORK EDUCATION_P3_Theory (15)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="work_p3_th"
                                  value={newInputField.work_p3_th}
                                  onChange={fifteenMarks}
                                />
                              </div>
                              <div className="mb-3 col-lg-3">
                                <label className="form-label fw-bold">
                                  ART & WORK EDUCATION_P3_Practical (10)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="work_p3_pr"
                                  value={newInputField.work_p3_pr}
                                  onChange={tenMarks}
                                />
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={addStudent}
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Result;
