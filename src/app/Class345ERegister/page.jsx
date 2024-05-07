"use client";
import React, { useEffect, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { decryptObjData } from "../../modules/encryption";
import { percentTotal, round2dec } from "../../modules/calculatefunctions";
const Class345ERegister = () => {
  const { access, redirectData } = useGlobalContext();
  const router = useRouter();
  // const [allTeacher, setAllTeacher] = useState([])

  let studentdata = JSON.parse(redirectData.split("details=")[1]);
  let userdetails = decryptObjData("tid");
  let school = userdetails.school;

  useEffect(() => {
    if (!access) {
      router.push("/logout");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="text-black container-fluid ben">
      <div className="mx-auto col-md-6">
        <div className="noprint my-3">
          <button
            type="button"
            className="btn btn-primary text-white font-weight-bold p-2 rounded"
            onClick={window.print}
          >
            Print Register
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
      <div>
        <h2 className="text-center timesFont">
          DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
        </h2>
        <h5 className="text-center timesFont">
          EVALUATION REGISTER FOR STUDENTS
        </h5>
      </div>
      <div className="mt-3 d-flex flex-row justify-content-between timesFont">
        <h6>Name of School: &nbsp;</h6>
        <h6 style={{ borderBottom: "1px dotted #000", textDecoration: "none" }}>
          {school}
        </h6>
        <h6>&nbsp;Section: &nbsp;</h6>
        <h6 style={{ borderBottom: "1px dotted #000", textDecoration: "none" }}>
          (A)
        </h6>
        <h6>&nbsp;Class: &nbsp;</h6>
        <h6 style={{ borderBottom: "1px dotted #000", textDecoration: "none" }}>
          {studentdata[0].class}
        </h6>
        <h6>&nbsp;Academic Year: &nbsp;</h6>
        <h6 style={{ borderBottom: "1px dotted #000", textDecoration: "none" }}>
          {new Date().getFullYear()}
        </h6>
      </div>
      <div className="my-1">
        <table className="text-center">
          <thead>
            <tr style={{ height: 30 }}>
              <th className="text-center " rowSpan={2}>
                Roll No.
              </th>
              <th className="text-center " rowSpan={2}>
                Name of the Student
              </th>
              <th className="text-center " rowSpan={2}>
                Date of Birth
              </th>
              <th className="text-center " rowSpan={2}>
                <p className="m-0 p-0 ">Name of the Indicator</p>
                <p className="m-0 p-0 ">সূচকের নাম</p>
              </th>
              <th className="text-center " colSpan={3}>
                FORMATIVE / প্রস্তুতিকালীন
              </th>
              <th className="text-center " colSpan={6}>
                SUMMATIVE / পর্যায়ক্রমিক
              </th>
            </tr>
            <tr>
              <th className="text-center ">
                <p className="m-0 p-0">1</p>
                <p className="m-0 p-0">(10)</p>
              </th>
              <th className="text-center ">
                <p className="m-0 p-0">2</p>
                <p className="m-0 p-0">(20)</p>
              </th>
              <th className="text-center ">
                <p className="m-0 p-0">3</p>
                <p className="m-0 p-0">(20)</p>
              </th>
              <th className="text-center ">Name of the Subject</th>
              <th className="text-center ">
                <p className="m-0 p-0">1</p>
                <p className="m-0 p-0">(10)</p>
              </th>
              <th className="text-center ">
                <p className="m-0 p-0">2</p>
                <p className="m-0 p-0">(10)</p>
              </th>
              <th className="text-center ">
                <p className="m-0 p-0">3</p>
                <p className="m-0 p-0">(30)</p>
              </th>
              <th className="text-center ">
                <p className="m-0 p-0">TOTAL</p>
                <p className="m-0 p-0">(50)</p>
              </th>
              <th className="text-center ">
                <p className="m-0 p-0">GRADE</p>
              </th>
            </tr>
          </thead>
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

            let helthSum_totalmarks =
              parseInt(el.phys_p1) +
              parseInt(el.phys_p2) +
              parseInt(el.phys_p3_th) +
              parseInt(el.phys_p3_pr) +
              parseInt(el.work_p1) +
              parseInt(el.work_p2) +
              parseInt(el.work_p3_th) +
              parseInt(el.work_p3_pr);
            let helthSum_totalmarks_per = parseInt(
              round2dec((helthSum_totalmarks * 80) / 100)
            );
            let helthSum_totalmarks_percent = percentTotal(
              helthSum_totalmarks_per
            );
            return (
              <>
                <tr key={ind}>
                  <th className="text-center" rowSpan={5}>
                    {el.roll_no}
                  </th>
                  <th className="text-center" rowSpan={5}>
                    {el.student_name}
                  </th>
                  <th className="text-center" rowSpan={5}>
                    {el.birthdate}
                  </th>
                  <th>Participation / অংশগ্রহণ</th>

                  <th className="text-center">
                    {el.formative_1_p === 0 ? "" : el.formative_1_p}
                  </th>
                  <th className="text-center">
                    {el.formative_2_p === 0 ? "" : el.formative_2_p}
                  </th>
                  <th className="text-center">
                    {el.formative_3_p === 0 ? "" : el.formative_3_p}
                  </th>
                  <th>FIRST LANGUAGE</th>
                  <th className="text-center">
                    {el.lang_1_p1 === 0 ? "" : el.lang_1_p1}
                  </th>
                  <th className="text-center">
                    {el.lang_1_p2 === 0 ? "" : el.lang_1_p2}
                  </th>
                  <th className="text-center">
                    {el.lang_1_p3 === 0 ? "" : el.lang_1_p3}
                  </th>
                  <th className="text-center">
                    {el.lang_1_p3 !== 0 ? lang1_summ_totalmarks : ""}
                  </th>
                  <th className="text-center">
                    {el.lang_1_p3 !== 0 ? lang1_summ_totalmarks_percent : ""}
                  </th>
                </tr>
                <tr>
                  <th>Questioning and Experimentation</th>
                  <th className="text-center">
                    {el.formative_1_qe !== 0 ? el.formative_1_qe : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_2_qe !== 0 ? el.formative_2_qe : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_3_qe !== 0 ? el.formative_3_qe : ""}
                  </th>
                  <th>SECOND LANGUAGE</th>
                  <th className="text-center">
                    {el.lang_2_p1 === 0 ? "" : el.lang_2_p1}
                  </th>
                  <th className="text-center">
                    {el.lang_2_p2 === 0 ? "" : el.lang_2_p2}
                  </th>
                  <th className="text-center">
                    {el.lang_2_p3 === 0 ? "" : el.lang_2_p3}
                  </th>
                  <th className="text-center">
                    {el.lang_2_p3 !== 0 ? lang2_summ_totalmarks : ""}
                  </th>
                  <th className="text-center">
                    {el.lang_2_p3 !== 0 ? lang2_summ_totalmarks_percent : ""}
                  </th>
                </tr>
                <tr>
                  <th>Interpretation and Application</th>
                  <th className="text-center">
                    {el.formative_1_ia !== 0 ? el.formative_1_ia : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_2_ia !== 0 ? el.formative_2_ia : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_3_ia !== 0 ? el.formative_3_ia : ""}
                  </th>
                  <th>MATHEMATICS</th>
                  <th className="text-center">
                    {el.math_p1 === 0 ? "" : el.math_p1}
                  </th>
                  <th className="text-center">
                    {el.math_p2 === 0 ? "" : el.math_p2}
                  </th>
                  <th className="text-center">
                    {el.math_p3 === 0 ? "" : el.math_p3}
                  </th>
                  <th className="text-center">
                    {el.math_p3 !== 0 ? math_summ_totalmarks : ""}
                  </th>
                  <th className="text-center">
                    {el.math_p3 !== 0 ? math_summ_totalmarks_percent : ""}
                  </th>
                </tr>
                <tr>
                  <th>Empathy and Co-operation</th>
                  <th className="text-center">
                    {el.formative_1_ec !== 0 ? el.formative_1_ec : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_2_ec !== 0 ? el.formative_2_ec : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_3_ec !== 0 ? el.formative_3_ec : ""}
                  </th>
                  <th>OUR ENVIRONMENT</th>
                  <th className="text-center">
                    {el.envs_p1 === 0 ? "" : el.envs_p1}
                  </th>
                  <th className="text-center">
                    {el.envs_p2 === 0 ? "" : el.envs_p2}
                  </th>
                  <th className="text-center">
                    {el.envs_p3 === 0 ? "" : el.envs_p3}
                  </th>
                  <th className="text-center">
                    {el.envs_p3 !== 0 ? envs_summ_totalmarks : ""}
                  </th>
                  <th className="text-center">
                    {el.envs_p3 !== 0 ? envs_summ_totalmarks_percent : ""}
                  </th>
                </tr>
                <tr>
                  <th>Aesthetic and Creative Expression</th>
                  <th className="text-center">
                    {el.formative_1_ace !== 0 ? el.formative_1_ace : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_2_ace !== 0 ? el.formative_2_ace : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_3_ace !== 0 ? el.formative_3_ace : ""}
                  </th>
                  <th>HEALTH & PHYSICAL EDUCATION</th>
                  <th className="text-center">
                    {el.phys_p1 === 0 ? "" : el.phys_p1 + el.work_p1}
                  </th>
                  <th className="text-center">
                    {el.phys_p2 === 0 ? "" : el.phys_p2 + el.work_p2}
                  </th>
                  <th className="text-center">
                    {el.phys_p3_th === 0 ? "" : el.phys_p3_th + el.phys_p3_pr}
                  </th>
                  <th className="text-center">
                    {el.phys_p3_th !== 0 ? helthSum_totalmarks : ""}
                  </th>
                  <th className="text-center">
                    {el.phys_p3_th !== 0 ? helthSum_totalmarks_percent : ""}
                  </th>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Class345ERegister;
