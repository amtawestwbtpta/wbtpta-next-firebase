"use client";
import React, { useEffect, useContext, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { decryptObjData } from "../../modules/encryption";
import { percentTotal, round2dec } from "../../modules/calculatefunctions";

const AllPPResult = () => {
  const { access, redirectData } = useGlobalContext();
  const router = useRouter();
  // const [allTeacher, setAllTeacher] = useState([])
  const [teacher, setTeacher] = useState([]);

  let studentdata = JSON.parse(redirectData.split("details=")[1]);
  let userdetails = decryptObjData("tid");
  let udise = userdetails.udise;
  const findTeacher = () => {
    fetch(
      "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/allteachers.json"
    )
      .then((res) => res.json())
      .then((data) => {
        let allteacher = data.filter((el) => el.udise.match(udise));
        setTeacher(allteacher.filter((el) => el.hoi === "Yes")[0]);
      });
  };

  useEffect(() => {
    if (!access) {
      router.push("/logout");
    }
    findTeacher();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="mx-auto col-md-6">
        <div className="noprint my-3">
          <button
            type="button"
            className="btn btn-primary text-white font-weight-bold p-2 rounded"
            onClick={window.print}
          >
            Print Result
          </button>
        </div>

        <div className="noprint">
          <button
            type="button"
            className="btn btn-info text-white font-weight-bold p-2 rounded"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
      {studentdata.map((el, ind) => {
        let comm_summ_totalmarks =
          parseInt(el.summative_1_comm) +
          parseInt(el.summative_2_comm) +
          parseInt(el.summative_3_comm);
        let comm_summ_totalmarks_per = parseInt(
          round2dec((comm_summ_totalmarks * 50) / 100)
        );
        let comm_summ_totalmarks_percent = percentTotal(
          comm_summ_totalmarks_per
        );
        let corr_summ_totalmarks =
          parseInt(el.summative_1_corr) +
          parseInt(el.summative_2_corr) +
          parseInt(el.summative_3_corr);
        let corr_summ_totalmarks_per = parseInt(
          round2dec((corr_summ_totalmarks * 50) / 100)
        );
        let corr_summ_totalmarks_percent = percentTotal(
          corr_summ_totalmarks_per
        );
        let prob_summ_totalmarks =
          parseInt(el.summative_1_Prob) +
          parseInt(el.summative_2_Prob) +
          parseInt(el.summative_3_Prob);
        let prob_summ_totalmarks_per = parseInt(
          round2dec((prob_summ_totalmarks * 50) / 100)
        );
        let prob_summ_totalmarks_percent = percentTotal(
          prob_summ_totalmarks_per
        );
        let mp_summ_totalmarks =
          parseInt(el.summative_1_ment_phy) +
          parseInt(el.summative_2_ment_phy) +
          parseInt(el.summative_3_ment_phy);
        let mp_summ_totalmarks_per = parseInt(
          round2dec((mp_summ_totalmarks * 50) / 100)
        );
        let mp_summ_totalmarks_percent = percentTotal(mp_summ_totalmarks_per);
        let grtotal1 =
          parseInt(el.summative_1_comm) +
          parseInt(el.summative_1_corr) +
          parseInt(el.summative_1_Prob) +
          parseInt(el.summative_1_ment_phy);
        let grtotalper1 = parseInt(round2dec((grtotal1 / 40) * 100));
        let grtotal_per_pertotal1 = percentTotal(grtotalper1);
        let grtotal2 =
          parseInt(el.summative_2_comm) +
          parseInt(el.summative_2_corr) +
          parseInt(el.summative_2_Prob) +
          parseInt(el.summative_2_ment_phy);
        let grtotalper2 = parseInt(round2dec((grtotal2 / 40) * 100));
        let grtotal_per_pertotal2 = percentTotal(grtotalper2);
        let grtotal =
          comm_summ_totalmarks +
          corr_summ_totalmarks +
          prob_summ_totalmarks +
          mp_summ_totalmarks;
        let grtotalper = parseInt(round2dec((grtotal / 400) * 100));
        let grtotal_per_pertotal = percentTotal(grtotalper);
        return (
          <div>
            <div className="mx-auto col-md-6">
              <div className="noprint my-3">
                <button
                  type="button"
                  className="btn btn-primary text-white font-weight-bold p-2 rounded"
                  onClick={window.print}
                >
                  Print Result
                </button>
              </div>

              <div className="noprint">
                <button
                  type="button"
                  className="btn btn-info text-white font-weight-bold p-2 rounded"
                  onClick={() => router.back()}
                >
                  Go Back
                </button>
              </div>
            </div>
            {studentdata.map((el, ind) => {
              let lang1_summ_totalmarks =
                parseInt(el.lang_1_p1) +
                parseInt(el.lang_1_p2) +
                parseInt(el.lang_1_p3);
              let lang1_summ_totalmarks_per = parseInt(
                round2dec((lang1_summ_totalmarks * 80) / 100)
              );
              let lang1_summ_totalmarks_percent = percentTotal(
                lang1_summ_totalmarks_per
              );
              let lang2_summ_totalmarks =
                parseInt(el.lang_2_p1) +
                parseInt(el.lang_2_p2) +
                parseInt(el.lang_2_p3);
              let lang2_summ_totalmarks_per = parseInt(
                round2dec((lang2_summ_totalmarks * 80) / 100)
              );
              let lang2_summ_totalmarks_percent = percentTotal(
                lang2_summ_totalmarks_per
              );
              let math_summ_totalmarks =
                parseInt(el.math_p1) +
                parseInt(el.math_p2) +
                parseInt(el.math_p3);
              let math_summ_totalmarks_per = parseInt(
                round2dec((math_summ_totalmarks * 80) / 100)
              );
              let math_summ_totalmarks_percent = percentTotal(
                math_summ_totalmarks_per
              );
              let envs_summ_totalmarks =
                parseInt(el.envs_p1) +
                parseInt(el.envs_p2) +
                parseInt(el.envs_p3);
              let envs_summ_totalmarks_per = parseInt(
                round2dec((envs_summ_totalmarks * 80) / 100)
              );
              let envs_summ_totalmarks_percent = percentTotal(
                envs_summ_totalmarks_per
              );
              let phys_summ_totalmarks =
                parseInt(el.phys_p1) +
                parseInt(el.phys_p2) +
                parseInt(el.phys_p3_th) +
                parseInt(el.phys_p3_pr);
              let phys_summ_totalmarks_per = parseInt(
                round2dec((phys_summ_totalmarks * 80) / 100)
              );
              let phys_summ_totalmarks_percent = percentTotal(
                phys_summ_totalmarks_per
              );
              let work_summ_totalmarks =
                parseInt(el.work_p1) +
                parseInt(el.work_p2) +
                parseInt(el.work_p3_th) +
                parseInt(el.work_p3_pr);
              let work_summ_totalmarks_per = parseInt(
                round2dec((work_summ_totalmarks * 80) / 100)
              );
              let work_summ_totalmarks_percent = percentTotal(
                work_summ_totalmarks_per
              );
              let grtotal1 =
                parseInt(el.lang_1_p1) +
                parseInt(el.lang_2_p1) +
                parseInt(el.math_p1) +
                parseInt(el.envs_p1) +
                parseInt(el.phys_p1) +
                parseInt(el.work_p1);
              let grtotalper1 = parseInt(round2dec((grtotal1 / 50) * 100));
              let grtotal_per_pertotal1 = percentTotal(grtotalper1);
              let grtotal2 =
                parseInt(el.lang_1_p2) +
                parseInt(el.lang_2_p2) +
                parseInt(el.math_p2) +
                parseInt(el.envs_p2) +
                parseInt(el.phys_p2) +
                parseInt(el.work_p2);
              let grtotalper2 = parseInt(round2dec((grtotal2 / 50) * 100));
              let grtotal_per_pertotal2 = percentTotal(grtotalper2);
              let grtotal =
                lang1_summ_totalmarks +
                lang2_summ_totalmarks +
                math_summ_totalmarks +
                envs_summ_totalmarks +
                phys_summ_totalmarks +
                work_summ_totalmarks;
              let grtotalper = parseInt(round2dec((grtotal / 400) * 100));
              let grtotal_per_pertotal = percentTotal(grtotalper);
              return (
                <div key={ind}>
                  <div
                    className="mainContend text-black"
                    style={{ height: "700px" }}
                  >
                    <table className="new">
                      <tr>
                        <td>
                          <div style={{ width: "70px" }}></div>
                        </td>
                        <td>
                          <div
                            style={{ textAlign: "center" }}
                            className="watermark"
                          >
                            <span
                              id="resschool"
                              style={{ fontSize: "24px", fontWeight: "600" }}
                            >
                              {userdetails.school}
                            </span>
                            <br />
                            <span id="udise" style={{ fontSize: "12px" }}>
                              UDISE CODE :{userdetails.udise}
                            </span>
                            <br />
                            <span id="cirdic" style={{ fontSize: "12px" }}>
                              <b>CIRCLE :</b>
                              AMTA WEST CIRCLE, <b> DISTRICT :</b>
                              HOWRAH
                            </span>
                            <br />
                            <span id="phone" style={{ fontSize: "12px" }}>
                              | /{teacher.phone}
                            </span>
                            <h5
                              style={{
                                fontWeight: "400",
                                marginTop: "4px",
                                marginBottom: "4px",
                                fontSize: "15px",
                              }}
                            >
                              Continuous and Comprehensive Evaluation Progress
                              Report Card
                            </h5>
                            <h5
                              id="session"
                              style={{
                                fontWeight: "400",
                                marginTop: "4px",
                                marginBottom: "4px",
                                fontSize: "15px",
                              }}
                            >
                              Academic Session - {new Date().getFullYear()}
                            </h5>
                          </div>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            border: "1px solid #fff",
                          }}
                        >
                          <img
                            src="https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/rslogo.png"
                            alt="Siksha Saathi"
                            className="img-responsive logo"
                            style={{ width: "80px" }}
                          />
                        </td>
                      </tr>
                    </table>
                    <table className="tde">
                      <tr>
                        <td id="student_name" style={{ border: "none" }}>
                          <b>Name of the Student : </b>
                          {el.student_name}
                        </td>
                        <td style={{ border: "none" }}>
                          <b>Medium : </b> BENGALI{" "}
                        </td>
                        <td id="student_class" style={{ border: "none" }}>
                          <b>Class : </b>&nbsp;{el.class}
                        </td>
                        <td id="roll" style={{ border: "none" }}>
                          <b>Roll No. : </b>&nbsp;{el.roll_no}
                        </td>
                        <td id="mother" style={{ border: "none" }}>
                          <b>Mother's Name :</b>&nbsp;{el.mother_name}
                        </td>
                        <td id="father" style={{ border: "none" }}>
                          <b>Father's Name :</b>&nbsp;{el.father_name}
                        </td>
                        <td id="gurdian" style={{ border: "none" }}>
                          <b>Gurdian's Name :</b>&nbsp;{el.guardians_name}
                        </td>
                        <td id="student_id" style={{ border: "none" }}>
                          <b>Student ID : </b>&nbsp;{el.student_id}
                        </td>
                      </tr>
                      <tr></tr>
                    </table>
                    <div style={{ height: "290px", marginTop: "0px" }}>
                      <table style={{ border: "none" }}>
                        <tr>
                          <td style={{ verticalAlign: "top", border: "none" }}>
                            <table
                              width="89%"
                              style={{ border: "1px solid #ddd" }}
                            >
                              <tr style={{ border: "1px solid #ddd" }}>
                                <th
                                  style={{
                                    textAlign: "center",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  Formative Evaluation
                                </th>
                              </tr>
                              <tr>
                                <td
                                  width="100%"
                                  style={{ padding: "0px !important" }}
                                >
                                  <table width="100%" className="borderBlue">
                                    <tr>
                                      <td
                                        rowSpan={2}
                                        width="40%"
                                        style={{
                                          padding: "4px",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        <b>Name of the indicators</b>
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                        colspan="3"
                                      >
                                        <b>Marks</b>
                                      </td>
                                    </tr>
                                    <td
                                      style={{
                                        textAlign: "center",
                                        border: "1px solid #ddd",
                                      }}
                                      width="20%"
                                    >
                                      <b>I</b>
                                      <br />
                                      (10)
                                    </td>
                                    <td
                                      style={{
                                        textAlign: "center",
                                        border: "1px solid #ddd",
                                      }}
                                      width="20%"
                                    >
                                      <b>II</b>
                                      <br />
                                      (20)
                                    </td>
                                    <td
                                      style={{
                                        textAlign: "center",
                                        border: "1px solid #ddd",
                                      }}
                                      width="20%"
                                    >
                                      <b>III</b>
                                      <br />
                                      (20)
                                    </td>
                                    <tr>
                                      <td
                                        style={{
                                          padding: "4px",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        Participation
                                      </td>
                                      <td
                                        id="formative_1_p"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                      >
                                        {el.formative_1_p !== 0
                                          ? el.formative_1_p
                                          : ""}
                                      </td>
                                      <td
                                        id="formative_2_p"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                      >
                                        {el.formative_2_p !== 0
                                          ? el.formative_2_p
                                          : ""}
                                      </td>
                                      <td
                                        id="formative_3_p"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                      >
                                        {el.formative_3_p !== 0
                                          ? el.formative_3_p
                                          : ""}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          padding: "4px",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        Questioning and Experimentation
                                      </td>
                                      <td
                                        id="formative_1_qe"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                      >
                                        {el.formative_1_qe !== 0
                                          ? el.formative_1_qe
                                          : ""}{" "}
                                      </td>
                                      <td
                                        id="formative_2_qe"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                      >
                                        {el.formative_2_qe !== 0
                                          ? el.formative_2_qe
                                          : ""}{" "}
                                      </td>
                                      <td
                                        id="formative_3_qe"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                      >
                                        {el.formative_3_qe !== 0
                                          ? el.formative_3_qe
                                          : ""}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          padding: "4px",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        Interpretation and Application
                                      </td>
                                      <td
                                        id="formative_1_ia"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                      >
                                        {el.formative_1_ia !== 0
                                          ? el.formative_1_ia
                                          : ""}
                                      </td>
                                      <td
                                        id="formative_2_ia"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                      >
                                        {el.formative_2_ia !== 0
                                          ? el.formative_2_ia
                                          : ""}
                                      </td>
                                      <td
                                        id="formative_3_ia"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                      >
                                        {el.formative_3_ia !== 0
                                          ? el.formative_3_ia
                                          : ""}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          padding: "4px",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        Empathy and Co-operation
                                      </td>
                                      <td
                                        id="formative_1_ec"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                      >
                                        {el.formative_1_ec !== 0
                                          ? el.formative_1_ec
                                          : ""}
                                      </td>
                                      <td
                                        id="formative_2_ec"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                      >
                                        {el.formative_2_ec !== 0
                                          ? el.formative_2_ec
                                          : ""}
                                      </td>
                                      <td
                                        id="formative_3_ec"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                      >
                                        {el.formative_3_ec !== 0
                                          ? el.formative_3_ec
                                          : ""}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          padding: "4px",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        Aesthetic and Creative Expression
                                      </td>
                                      <td
                                        id="formative_1_ace"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                      >
                                        {el.formative_1_ace !== 0
                                          ? el.formative_1_ace
                                          : ""}
                                      </td>
                                      <td
                                        id="formative_2_ace"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                      >
                                        {el.formative_2_ace !== 0
                                          ? el.formative_2_ace
                                          : ""}
                                      </td>
                                      <td
                                        id="formative_3_ace"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "middle",
                                          border: "1px solid #ddd",
                                        }}
                                        width="20%"
                                      >
                                        {el.formative_3_ace !== 0
                                          ? el.formative_3_ace
                                          : ""}
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td style={{ verticalAlign: "top", border: "none" }}>
                            <table
                              width="87%"
                              style={{ border: "1px solid #ddd" }}
                            >
                              <tr style={{ border: "1px solid #ddd" }}>
                                <th
                                  style={{
                                    textAlign: "center",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  Summative Evaluation
                                </th>
                              </tr>
                              <tr>
                                <td
                                  width="100%"
                                  style={{ padding: "0px  !important" }}
                                >
                                  <table width="100%" className="borderBlue">
                                    <tr>
                                      <td
                                        width="40%"
                                        style={{
                                          padding: "4px",
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        <b>Name of the indicators</b>
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                        width="10%"
                                      >
                                        <b>I</b>
                                        <br />
                                        (10)
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                        width="10%"
                                      >
                                        <b>II</b>
                                        <br />
                                        (20)
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                        width="10%"
                                      >
                                        <b>III</b>
                                        <br />
                                        (50)
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                        width="10%"
                                      >
                                        <b>Total</b>
                                        <br />
                                        (80)
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                        width="10%"
                                      >
                                        <b>Percentage</b>
                                        <br />
                                        (%)
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                        width="10%"
                                      >
                                        <b>Grade</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>FIRST LANGUAGE</td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.lang_1_p1 !== 0 ? el.lang_1_p1 : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.lang_1_p2 !== 0 ? el.lang_1_p2 : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.lang_1_p3 !== 0 ? el.lang_1_p3 : ``}
                                      </td>
                                      <td
                                        className="total"
                                        style={{
                                          padding: "0px",
                                          textAlign: "center",
                                        }}
                                      >
                                        {el.lang_1_p3 !== 0
                                          ? lang1_summ_totalmarks
                                          : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.lang_1_p3 !== 0
                                          ? `${lang1_summ_totalmarks_per}%`
                                          : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.lang_1_p3 !== 0
                                          ? lang1_summ_totalmarks_percent
                                          : ``}
                                      </td>
                                    </tr>
                                    <tr style={{ border: "1px solid #ddd" }}>
                                      <td style={{ border: "1px solid #ddd" }}>
                                        SECOND LANGUAGE
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.lang_2_p1 !== 0 ? el.lang_2_p1 : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.lang_2_p2 !== 0 ? el.lang_2_p2 : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.lang_2_p3 !== 0 ? el.lang_2_p3 : ``}
                                      </td>
                                      <td
                                        className="total"
                                        style={{
                                          padding: "0px",
                                          textAlign: "center",
                                        }}
                                      >
                                        {el.lang_2_p3 !== 0
                                          ? lang2_summ_totalmarks
                                          : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.lang_2_p3 !== 0
                                          ? `${lang2_summ_totalmarks_per}%`
                                          : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.lang_2_p3 !== 0
                                          ? lang2_summ_totalmarks_percent
                                          : ``}
                                      </td>
                                    </tr>
                                    <tr style={{ border: "1px solid #ddd" }}>
                                      <td style={{ border: "1px solid #ddd" }}>
                                        MATHEMATICS
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.math_p1 !== 0 ? el.math_p1 : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.math_p2 !== 0 ? el.math_p2 : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.math_p3 !== 0 ? el.math_p3 : ``}
                                      </td>
                                      <td
                                        className="total"
                                        style={{
                                          border: "1px solid #ddd",
                                          padding: "0px",
                                          textAlign: "center",
                                        }}
                                      >
                                        {el.math_p3 !== 0
                                          ? math_summ_totalmarks
                                          : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.math_p3 !== 0
                                          ? `${math_summ_totalmarks_per}%`
                                          : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.math_p3 !== 0
                                          ? math_summ_totalmarks_percent
                                          : ``}
                                      </td>
                                    </tr>
                                    <tr style={{ border: "1px solid #ddd" }}>
                                      <td style={{ border: "1px solid #ddd" }}>
                                        OUR ENVIRONMENT
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.envs_p1 !== 0 ? el.envs_p1 : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.envs_p2 !== 0 ? el.envs_p2 : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.envs_p3 !== 0 ? el.envs_p3 : ``}
                                      </td>
                                      <td
                                        className="total"
                                        style={{
                                          padding: "0px",
                                          textAlign: "center",
                                        }}
                                      >
                                        {el.envs_p3 !== 0
                                          ? envs_summ_totalmarks
                                          : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.envs_p3 !== 0
                                          ? `${envs_summ_totalmarks_per}%`
                                          : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.envs_p3 !== 0
                                          ? envs_summ_totalmarks_percent
                                          : ``}
                                      </td>
                                    </tr>
                                    <tr style={{ border: "1px solid #ddd" }}>
                                      <td style={{ border: "1px solid #ddd" }}>
                                        HEALTH & PHYSICAL EDUCATION
                                      </td>

                                      <td style={{ padding: "0px" }}>
                                        <table
                                          width="100%"
                                          style={{ border: "1px solid #ddd" }}
                                        >
                                          <tr
                                            style={{ border: "1px solid #ddd" }}
                                          >
                                            <td
                                              style={{
                                                borderTop: "none !important",
                                                borderRight: "none !important",
                                                borderLeft: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                              colSpan={3}
                                            >
                                              /
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              Pr(5)
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                borderBottom: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              {el.phys_p1 !== 0
                                                ? el.phys_p1
                                                : ``}
                                            </td>
                                          </tr>
                                        </table>
                                      </td>

                                      <td
                                        style={{
                                          padding: "0px",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        <table
                                          width="100%"
                                          style={{ border: "1px solid #ddd" }}
                                        >
                                          <tr
                                            style={{ border: "1px solid #ddd" }}
                                          >
                                            <td
                                              style={{
                                                borderTop: "none !important",
                                                borderRight: "none !important",
                                                borderLeft: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                              colSpan={3}
                                            >
                                              /
                                            </td>
                                          </tr>
                                          <tr
                                            style={{ border: "1px solid #ddd" }}
                                          >
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              Pr(10)
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                borderBottom: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              {el.phys_p2 !== 0
                                                ? el.phys_p2
                                                : ``}
                                            </td>
                                          </tr>
                                        </table>
                                      </td>

                                      <td
                                        style={{
                                          padding: "0px",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        <table
                                          width="100%"
                                          style={{ border: "1px solid #ddd" }}
                                        >
                                          <tr>
                                            <td
                                              style={{
                                                borderTop: "none !important",
                                                borderRight: "none !important",
                                                borderLeft: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                              colSpan={3}
                                            >
                                              /
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              Th(15)
                                            </td>
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              Pr(10)
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                borderBottom: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              {el.phys_p3_th !== 0
                                                ? el.phys_p3_th
                                                : ``}
                                            </td>
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                borderBottom: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              {el.phys_p3_pr !== 0
                                                ? el.phys_p3_pr
                                                : ``}
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                      <td
                                        className="total"
                                        style={{
                                          padding: "0px",
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        <table
                                          width="100%"
                                          height="100%"
                                          border={0}
                                          className="zeroborder"
                                        >
                                          <tr>
                                            <td
                                              style={{
                                                borderBottom:
                                                  "solid 1px #117bc9 !important",
                                                padding: "1px",
                                                textAlign: "center",
                                              }}
                                            >
                                              (40)
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                              height="100%"
                                            >
                                              {el.phys_p3_th !== 0
                                                ? phys_summ_totalmarks
                                                : ``}
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.phys_p3_th !== 0
                                          ? `${phys_summ_totalmarks_per}%`
                                          : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.phys_p3_th !== 0
                                          ? phys_summ_totalmarks_percent
                                          : ``}
                                      </td>
                                    </tr>
                                    <tr style={{ border: "1px solid #ddd" }}>
                                      <td style={{ border: "1px solid #ddd" }}>
                                        ART & WORK EDUCATION
                                      </td>

                                      <td style={{ padding: "0px" }}>
                                        <table width="100%">
                                          <tr>
                                            <td
                                              style={{
                                                borderTop: "none !important",
                                                borderRight: "none !important",
                                                borderLeft: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                              colSpan={3}
                                            >
                                              /
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              Pr(5)
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                borderBottom: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              {el.work_p1 !== 0
                                                ? el.work_p1
                                                : ``}
                                            </td>
                                          </tr>
                                        </table>
                                      </td>

                                      <td
                                        style={{
                                          padding: "0px",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        <table width="100%">
                                          <tr>
                                            <td
                                              style={{
                                                borderTop: "none !important",
                                                borderRight: "none !important",
                                                borderLeft: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                              colSpan={3}
                                            >
                                              /
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              Pr(10)
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                borderBottom: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              {el.work_p2 !== 0
                                                ? el.work_p2
                                                : ``}
                                            </td>
                                          </tr>
                                        </table>
                                      </td>

                                      <td style={{ padding: "0px" }}>
                                        <table
                                          width="100%"
                                          style={{ border: "1px solid #ddd" }}
                                        >
                                          <tr>
                                            <td
                                              style={{
                                                borderTop: "none !important",
                                                borderRight: "none !important",
                                                borderLeft: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                              colSpan={3}
                                            >
                                              /
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              Th(15)
                                            </td>
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              Pr(10)
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                borderBottom: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              {el.work_p3_th !== 0
                                                ? el.work_p3_th
                                                : ``}
                                            </td>
                                            <td
                                              style={{
                                                borderLeft: "none !important",
                                                borderBottom: "none !important",
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              {el.work_p3_pr !== 0
                                                ? el.work_p3_pr
                                                : ``}
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                      <td
                                        className="total"
                                        style={{
                                          padding: "0px",
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        <table
                                          width="100%"
                                          height="100%"
                                          border={0}
                                          className="zeroborder"
                                        >
                                          <tr>
                                            <td
                                              style={{
                                                borderBottom:
                                                  "solid 1px #117bc9 !important",
                                                padding: "1px",
                                                textAlign: "center",
                                              }}
                                            >
                                              (40)
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                textAlign: "center",
                                                border: "1px solid #ddd",
                                              }}
                                              height="100%"
                                            >
                                              {el.work_p3_pr !== 0
                                                ? work_summ_totalmarks
                                                : ``}
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.work_p3_pr !== 0
                                          ? `${work_summ_totalmarks_per}%`
                                          : ``}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        {el.work_p3_pr !== 0
                                          ? work_summ_totalmarks_percent
                                          : ``}
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <table>
                        <tr style={{ background: "#e0e0e0" }}>
                          <td style={{ border: "none" }}>
                            PART-1 RESULT{"==>"}
                          </td>
                          <td style={{ border: "none" }}>
                            PART-1 GRAND TOTAL -{" "}
                            {grtotal1 !== 0 ? grtotal1 : ``}
                          </td>
                          <td style={{ border: "none" }}>
                            PART-1 PERCENTAGE -{" "}
                            {grtotal1 !== 0 ? grtotalper1 : ``}
                          </td>
                          <td style={{ border: "none" }}>
                            PART-1 OVER ALL GRADE -
                            {grtotal1 !== 0 ? grtotal_per_pertotal1 : ``}
                          </td>
                        </tr>

                        {grtotal2 !== 0 ? (
                          <tr style={{ background: "#e0e0e0" }}>
                            <td style={{ border: "none" }}>
                              PART-2 RESULT {"==>"}
                            </td>
                            <td style={{ border: "none" }}>
                              PART-2 GRAND TOTAL -
                              {grtotal2 !== 0 ? grtotal1 : ``}{" "}
                            </td>
                            <td style={{ border: "none" }}>
                              PART-2 PERCENTAGE -
                              {grtotal2 !== 0 ? grtotalper2 : ``}
                            </td>
                            <td style={{ border: "none" }}>
                              PART-2 OVER ALL GRADE -
                              {grtotal2 !== 0 ? grtotal_per_pertotal2 : ``}
                            </td>
                          </tr>
                        ) : (
                          ``
                        )}
                        {el.work_p3_pr !== 0 ? (
                          <tr style={{ background: "#e0e0e0" }}>
                            <td style={{ border: "none" }}>RESULT - PASSED</td>
                            <td style={{ border: "none" }}>
                              GRAND TOTAL - {grtotal !== 0 ? grtotal : ``}
                            </td>
                            <td style={{ border: "none" }}>
                              PERCENTAGE - {grtotal !== 0 ? grtotalper : ``}
                            </td>
                            <td style={{ border: "none" }}>
                              OVER ALL GRADE - $
                              {grtotal !== 0 ? grtotal_per_pertotal : ``}
                            </td>
                          </tr>
                        ) : (
                          ``
                        )}
                      </table>
                    </div>
                    <div>
                      <table className="result_info_tbl">
                        <tr>
                          <td
                            style={{
                              border: "1px solid #ddd",
                              verticalAlign: "textBottom",
                            }}
                          >
                            <div style={{ height: "80px" }}>
                              <p>
                                <span>
                                  <strong>
                                    Qualitative statement about any exceptional
                                    ability of the student (Observation and
                                    comment)
                                  </strong>
                                </span>
                              </p>
                              &nbsp;
                            </div>
                            <div>
                              <p>
                                <span>
                                  <strong>
                                    Class Teacher’s/Subject Teachers’/Guardian’s
                                    comment(s)on the student(if necessary){" "}
                                  </strong>
                                </span>
                              </p>
                              &nbsp;
                            </div>
                          </td>
                          <td
                            style={{
                              border: "1px solid #ddd",
                              verticalAlign: "textBottom",
                            }}
                          >
                            <p style={{ marginTop: "4px" }}>
                              <span>
                                <strong>
                                  RUBRIC INDICATOR NO. 1 : PARTICIPATION
                                </strong>
                              </span>
                            </p>
                            <span>
                              a) Actively Participates and has leadership
                              quality.
                            </span>
                            <br />
                            <span>
                              b) Actively participates and exchanges views.
                            </span>
                            <br />
                            <span>
                              c) Participates but doesn’t show interest in
                              exchanging views.
                            </span>
                            <br />
                            <span>
                              d) Shows little interest in participation.
                            </span>
                            <br />

                            <p style={{ marginTop: "4px" }}>
                              <strong>
                                INDICATOR NO. 2 : QUESTIONING AND
                                EXPERIMENTATION
                              </strong>
                              <br />
                            </p>
                            <span>
                              a) Can ask learning -related questions and is
                              interested in experimentation.
                            </span>
                            <br />
                            <span>
                              b) Can ask learning- related questions, but is not
                              interested in experimentation.
                            </span>
                            <br />
                            <span>
                              c) Asks few learning-related questions and is
                              interested in experimentation.
                            </span>
                            <br />
                            <span>
                              d) Asks very few learning-related questions and
                              least interested in experimentation.
                            </span>
                          </td>
                          <td
                            style={{
                              border: "1px solid #ddd",
                              verticalAlign: "textBottom",
                            }}
                          >
                            <p style={{ marginTop: "4px" }}>
                              <span>
                                <strong>
                                  INDICATOR NO. 3 : INTERPRETATION AND
                                  APPLICATION
                                </strong>
                              </span>
                            </p>
                            <span>
                              a) Able to interpret, give example, and apply.
                            </span>
                            <br />
                            <span>
                              b) Able to interpret, give example, but unable to
                              apply.
                            </span>
                            <br />
                            <span>
                              c) Able to partially interpret, but unable to
                              apply.
                            </span>
                            <br />
                            <span>d) Only memorises. </span>
                            <br />
                            <p style={{ marginTop: "4px" }}>
                              <span>
                                <strong>
                                  INDICATOR NO. 4 : EMPATHY AND COOPERATION
                                </strong>
                              </span>
                            </p>
                            <span>
                              a) Actively empathetic to both known and unknown
                              people.
                            </span>
                            <br />
                            <span>
                              b) Actively empathetic to known people, but for
                              unknown people, only sympathetic.
                            </span>
                            <br />
                            <span>c) Empathetic to the known people</span>
                            <br />
                            <span>d) Shows little empathy.</span>
                          </td>
                          <td
                            style={{
                              border: "1px solid #ddd",
                              verticalAlign: "textBottom",
                            }}
                          >
                            <p style={{ marginTop: "4px" }}>
                              <strong>
                                INDICATOR NO. 5 : AESTHETIC AND CREATIVE
                                EXPRESSION
                              </strong>
                            </p>
                            <span>
                              a) Aesthetic and creative, both inside and outside
                              the classroom.
                            </span>
                            <br />
                            <span>
                              b) Aesthetic and creative, only inside the
                              classroom.
                            </span>
                            <br />
                            <span>
                              c) Aesthetic. Interested in creative activities.
                            </span>
                            <br />
                            <span>
                              d) Aesthetic. Least interested in creative
                              activities.
                            </span>
                            <br />
                            <div className="result_info">
                              <span>
                                Grading scale for formative Evaluation
                              </span>
                              <br />
                              <span>
                                A = 75-100%
                                <br />
                                B = 50-74%
                                <br />
                                C = 25-49%
                                <br />
                                D = 0-24%
                                <br />
                              </span>
                            </div>
                            <div className="result_info">
                              <span>
                                Grading scale for summative Evaluation
                              </span>
                              <br />
                              <span>
                                A+ = 90-100%
                                <br />
                                A &nbsp;&nbsp;= 80-89%
                                <br />
                                B+ = 70-79%
                                <br />
                                B &nbsp;&nbsp;= 60-69%
                                <br />
                                C+ = 45-59%
                                <br />
                                C &nbsp;&nbsp;= 25-44%
                                <br />D &nbsp;&nbsp;= 0-24%
                              </span>
                            </div>
                          </td>
                        </tr>
                      </table>
                      {/* <table style={{ marginTop: "30px" }}>
                  <tr>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ borderTop: "1px dotted" }}>
                        (Guardian's Signature P-1)
                      </span>
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ borderTop: "1px dotted" }}>
                        (Guardian's Signature P-2)
                      </span>
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ borderTop: "1px dotted" }}>
                        (Class Teacher's Signature P-1)
                      </span>
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ borderTop: "1px dotted" }}>
                        (Class Teacher's Signature P-2)
                      </span>
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ borderTop: "1px dotted" }}>
                        (Class Teacher's Signature P-3)
                      </span>
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ borderTop: "1px dotted" }}>
                        (Signature of HoI. P-1)
                      </span>
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ borderTop: "1px dotted" }}>
                        (Signature of HoI. P-2)
                      </span>
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ borderTop: "1px dotted" }}>
                        (Signature of HoI. P-3)
                      </span>
                    </td>
                  </tr>
                </table> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AllPPResult;
