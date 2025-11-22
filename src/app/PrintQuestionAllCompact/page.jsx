"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { NumInWords, round5 } from "../../modules/calculatefunctions";
const PrintQuestionAll = () => {
  const { state, stateObject, questionRateState, questionState } =
    useGlobalContext();
  const router = useRouter();

  const pp_rate = questionRateState.pp_rate;
  const i_rate = questionRateState.i_rate;
  const ii_rate = questionRateState.ii_rate;
  const iii_rate = questionRateState.iii_rate;
  const iv_rate = questionRateState.iv_rate;
  const v_rate = questionRateState.v_rate;
  const term = questionRateState.term;
  const year = questionRateState.year;

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Print All Question Invoice";
    if (!state) {
      router.push("/login");
    }
  }, []);
  return (
    <Suspense>
      <div className="container-fluid">
        <div className="mx-auto my-5 noprint">
          <button
            type="button"
            className="btn btn-primary text-white font-weight-bold p-2 m-5 rounded"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print();
              }
            }}
          >
            Print Invoice
          </button>

          <button
            type="button"
            className="btn btn-info text-white font-weight-bold p-2 m-5 rounded"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
        <table className="table table-resposive table-bordered border-dark border-1 text-center">
          <tbody>
            {questionState.map((el, ind) => {
              let total_rate = round5(
                el.cl_pp_student * pp_rate +
                  el.cl_1_student * i_rate +
                  el.cl_2_student * ii_rate +
                  el.cl_3_student * iii_rate +
                  el.cl_4_student * iv_rate +
                  el.cl_5_student * v_rate
              );

              return (
                <tr
                  key={ind}
                  style={{ verticalAlign: "middle", height: "100px" }}
                  className="timesFont bordered"
                >
                  <td style={{ textAlign: "center" }}>Sl: {ind + 1}</td>
                  <td style={{ textAlign: "center" }}>
                    Scan Here: <br />
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?data=Amta West Circle, School: ${
                        el.school
                      },GP: ${el.gp}, PP Students ${parseInt(
                        el.cl_pp_student
                      )}, Class I Students ${parseInt(
                        el.cl_1_student
                      )}, Class II Students ${parseInt(
                        el.cl_2_student
                      )}, Class III Students ${parseInt(
                        el.cl_3_student
                      )}, Class IV Students ${parseInt(
                        el.cl_4_student
                      )}, Class V Students ${parseInt(
                        el.cl_5_student
                      )}, Total Amount ${total_rate}.&amp;size=60x60`}
                      alt="QRCode"
                      style={{ width: 60, height: 60 }}
                    />
                  </td>

                  <td colSpan={2} style={{ textAlign: "center" }}>
                    <h6>{el.school.toUpperCase()}</h6>
                  </td>

                  <td style={{ textAlign: "center" }}>GP: {el.gp}</td>
                  <td style={{ textAlign: "center", border: 0 }}>
                    PP: {el.cl_pp_student}
                  </td>
                  <td style={{ textAlign: "center", border: 0 }}>
                    CLASS I: {el.cl_1_student}
                  </td>
                  <td style={{ textAlign: "center", border: 0 }}>
                    CLASS II: {el.cl_2_student}
                  </td>
                  <td style={{ textAlign: "center", border: 0 }}>
                    CLASS III: {el.cl_3_student}
                  </td>
                  <td style={{ textAlign: "center", border: 0 }}>
                    CLASS IV: {el.cl_4_student}
                  </td>
                  {parseInt(el.cl_5_student) !== 0 ? (
                    <td style={{ textAlign: "center", border: 0 }}>
                      CLASS V: {el.cl_5_student}
                    </td>
                  ) : null}

                  <td style={{ textAlign: "center", border: 0 }}>
                    Total Students: {el.total_student}
                  </td>
                  {parseInt(el.cl_5_student) !== 0 ? (
                    <td
                      style={{
                        textAlign: "center",
                        border: 0,
                      }}
                    >
                      Total Amount: <i className="bi bi-currency-rupee"></i>
                      {total_rate}
                      <br /> (Rupees {NumInWords(total_rate)} Only)
                    </td>
                  ) : (
                    <td
                      colSpan={2}
                      style={{
                        textAlign: "center",
                        border: 0,
                      }}
                    >
                      Total Amount: <i className="bi bi-currency-rupee"></i>
                      {total_rate}
                      <br /> ( Rupees {NumInWords(total_rate)} Only )
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mx-auto my-5 noprint">
          <button
            type="button"
            className="btn btn-primary text-white font-weight-bold p-2 m-5 rounded"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print();
              }
            }}
          >
            Print Invoice
          </button>

          <button
            type="button"
            className="btn btn-info text-white font-weight-bold p-2 m-5 rounded"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default PrintQuestionAll;
