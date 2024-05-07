"use client";
import React, { useEffect, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { decryptObjData } from "../../modules/encryption";
import { percentTotal, round2dec } from "../../modules/calculatefunctions";
const ClassPPERegister = () => {
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
          <p className="text-center ">&nbsp;{studentdata[0].class}&nbsp;</p>
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
                Roll No
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
            let ben_summ_totalmarks =
              parseInt(el.summative_1_beng) +
              parseInt(el.summative_2_beng) +
              parseInt(el.summative_3_beng);
            let ben_summ_totalmarks_per = parseInt(
              round2dec((ben_summ_totalmarks * 50) / 100)
            );
            let ben_summ_totalmarks_percent = percentTotal(
              ben_summ_totalmarks_per
            );
            let eng_summ_totalmarks =
              parseInt(el.summative_1_eng) +
              parseInt(el.summative_2_eng) +
              parseInt(el.summative_3_eng);
            let eng_summ_totalmarks_per = parseInt(
              round2dec((eng_summ_totalmarks * 50) / 100)
            );
            let eng_summ_totalmarks_percent = percentTotal(
              eng_summ_totalmarks_per
            );
            let math_summ_totalmarks =
              parseInt(el.summative_1_math) +
              parseInt(el.summative_2_math) +
              parseInt(el.summative_3_math);
            let math_summ_totalmarks_per = parseInt(
              round2dec((math_summ_totalmarks * 50) / 100)
            );
            let math_summ_totalmarks_percent = percentTotal(
              math_summ_totalmarks_per
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
                  <th className="">Participation / অংশগ্রহণ</th>

                  <th className="text-center">
                    {el.formative_1_p === 0 ? "" : el.formative_1_p}
                  </th>
                  <th className="text-center">
                    {el.formative_2_p === 0 ? "" : el.formative_2_p}
                  </th>
                  <th className="text-center">
                    {el.formative_3_p === 0 ? "" : el.formative_3_p}
                  </th>
                  <th className="">Bengali/ বাংলা</th>
                  <th className="text-center">
                    {el.summative_1_beng === 0 ? "" : el.summative_1_beng}
                  </th>
                  <th className="text-center">
                    {el.summative_2_beng === 0 ? "" : el.summative_2_beng}
                  </th>
                  <th className="text-center">
                    {el.summative_3_beng === 0 ? "" : el.summative_3_beng}
                  </th>
                  <th className="text-center">
                    {el.summative_3_beng !== 0 ? ben_summ_totalmarks : ""}
                  </th>
                  <th className="text-center">
                    {el.summative_3_beng !== 0
                      ? ben_summ_totalmarks_percent
                      : ""}
                  </th>
                </tr>
                <tr>
                  <th className="">Questioning and Experimentation</th>
                  <th className="text-center">
                    {el.formative_1_qe !== 0 ? el.formative_1_qe : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_2_qe !== 0 ? el.formative_2_qe : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_3_qe !== 0 ? el.formative_3_qe : ""}
                  </th>
                  <th className="">ENGLISH</th>
                  <th className="text-center">
                    {el.summative_1_eng === 0 ? "" : el.summative_1_eng}
                  </th>
                  <th className="text-center">
                    {el.summative_2_eng === 0 ? "" : el.summative_2_eng}
                  </th>
                  <th className="text-center">
                    {el.summative_3_eng === 0 ? "" : el.summative_3_eng}
                  </th>
                  <th className="text-center">
                    {el.summative_3_eng !== 0 ? eng_summ_totalmarks : ""}
                  </th>
                  <th className="text-center">
                    {el.summative_3_beng !== 0
                      ? eng_summ_totalmarks_percent
                      : ""}
                  </th>
                </tr>
                <tr>
                  <th className="">Interpretation and Application</th>
                  <th className="text-center">
                    {el.formative_1_ia !== 0 ? el.formative_1_ia : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_2_ia !== 0 ? el.formative_2_ia : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_3_ia !== 0 ? el.formative_3_ia : ""}
                  </th>
                  <th className=" align-middle" rowSpan={3}>
                    MATHEMATICS
                  </th>
                  <th className="text-center" rowSpan={3}>
                    {el.summative_1_math === 0 ? "" : el.summative_1_math}
                  </th>
                  <th className="text-center" rowSpan={3}>
                    {el.summative_2_math === 0 ? "" : el.summative_2_math}
                  </th>
                  <th className="text-center" rowSpan={3}>
                    {el.summative_3_math === 0 ? "" : el.summative_3_math}
                  </th>
                  <th className="text-center" rowSpan={3}>
                    {el.summative_3_math !== 0 ? eng_summ_totalmarks : ""}
                  </th>
                  <th rowSpan={3} className="text-center">
                    {el.summative_3_math !== 0
                      ? math_summ_totalmarks_percent
                      : ""}
                  </th>
                </tr>
                <tr>
                  <th className="">Empathy and Co-operation</th>
                  <th className="text-center">
                    {el.formative_1_ec !== 0 ? el.formative_1_ec : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_2_ec !== 0 ? el.formative_2_ec : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_3_ec !== 0 ? el.formative_3_ec : ""}
                  </th>
                </tr>
                <tr>
                  <th className="">Aesthetic and Creative Expression</th>
                  <th className="text-center">
                    {el.formative_1_ace !== 0 ? el.formative_1_ace : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_2_ace !== 0 ? el.formative_2_ace : ""}
                  </th>
                  <th className="text-center">
                    {el.formative_3_ace !== 0 ? el.formative_3_ace : ""}
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

export default ClassPPERegister;
