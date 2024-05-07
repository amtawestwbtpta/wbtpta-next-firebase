"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
const PrintQuestionAll = () => {
  const { access, setAccess, redirectData } = useGlobalContext();
  const router = useRouter();

  // const searchParams = useSearchParams();
  let allData = JSON.parse(redirectData.split("===")[0]);
  let qRate = JSON.parse(redirectData.split("===")[1]);

  let pp_rate = qRate.pp_rate;
  let i_rate = qRate.i_rate;
  let ii_rate = qRate.ii_rate;
  let iii_rate = qRate.iii_rate;
  let iv_rate = qRate.iv_rate;
  let v_rate = qRate.v_rate;
  let term = qRate.term;
  let year = qRate.year;

  function round2dec(value) {
    if (value % 1 !== 0) {
      return Number(Math.round(value + "e" + 2) + "e-" + 2).toFixed(2);
    } else {
      return value;
    }
  }

  function NumInWords(number) {
    const first = [
      "",
      "one ",
      "two ",
      "three ",
      "four ",
      "five ",
      "six ",
      "seven ",
      "eight ",
      "nine ",
      "ten ",
      "eleven ",
      "twelve ",
      "thirteen ",
      "fourteen ",
      "fifteen ",
      "sixteen ",
      "seventeen ",
      "eighteen ",
      "nineteen ",
    ];
    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];
    const mad = ["", "thousand", "million", "billion", "trillion"];
    let word = "";

    for (let i = 0; i < mad.length; i++) {
      let tempNumber = number % (100 * Math.pow(1000, i));
      if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
        if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
          word = titleCase(
            first[Math.floor(tempNumber / Math.pow(1000, i))] +
              mad[i] +
              " " +
              word
          );
        } else {
          word = titleCase(
            tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] +
              " " +
              first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] +
              mad[i] +
              " " +
              word
          );
        }
      }

      tempNumber = number % Math.pow(1000, i + 1);
      if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0)
        word = titleCase(
          first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] +
            "hunderd " +
            word
        );
    }
    return word;
  }

  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Print All Question Invoice";
    if (!access) {
      router.push("/login");
    }
  }, []);
  return (
    <div>
      <div className="mx-auto my-5 noprint">
        <button
          type="button"
          className="btn btn-primary text-white font-weight-bold p-2 m-5 rounded"
          onClick={window.print}
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

      {allData.map((el, ind) => {
        let cl_pp_rate = round2dec(el.cl_pp_student * 3 * pp_rate);
        let cl_1_rate = round2dec(el.cl_1_student * 3 * i_rate);
        let cl_2_rate = round2dec(el.cl_2_student * 3 * ii_rate);
        let cl_3_rate = round2dec(el.cl_3_student * 4 * iii_rate);
        let cl_4_rate = round2dec(el.cl_4_student * 4 * iv_rate);
        let cl_5_rate = round2dec(el.cl_5_student * 4 * v_rate);
        let total_rate = Math.round(
          el.cl_pp_student * 3 * pp_rate +
            el.cl_1_student * 3 * i_rate +
            el.cl_2_student * 3 * ii_rate +
            el.cl_3_student * 4 * iii_rate +
            el.cl_4_student * 4 * iv_rate +
            el.cl_5_student * 4 * v_rate
        );

        return (
          <div className="container timesAll text-black my-5">
            <div className="d-flex row justify-content-center align-items-center">
              <img
                src={`https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=${
                  el.school
                }, PP Students ${parseInt(
                  el.cl_pp_student
                )}, Amount Rs. ${cl_pp_rate}, Class I Students ${parseInt(
                  el.cl_1_student
                )}, Amount Rs. ${cl_1_rate}, Class II Students ${parseInt(
                  el.cl_2_student
                )}, Amount Rs. ${cl_2_rate}, Class III Students ${parseInt(
                  el.cl_3_student
                )}, Amount Rs. ${cl_3_rate}, Class IV Students ${parseInt(
                  el.cl_4_student
                )}, Amount Rs. ${cl_4_rate}, Class V Students ${parseInt(
                  el.cl_5_student
                )}, Amount Rs. ${cl_5_rate}, Total Amount ${total_rate}.`}
                className="m-0 p-0"
                style={{ width: "10%", height: "10%" }}
                alt="QRCode"
              />
            </div>
            <div className="h-text">
              <h5 className="m-1 text-center">INVOICE</h5>
              <h4 className="m-1 text-center">AMTA WEST CIRCLE</h4>
              <h6 className="m-1 text-center">
                Joypur Fakirdas, Joypur, Howrah, PIN-711401.
              </h6>
              <h5 className="m-1 text-center">
                INVOICE FOR {term.toUpperCase()} SUMMATIVE EXAMINATION QUESTION
                PAPERS , {year}
              </h5>
            </div>
            <table className="container table table-bordered border-4 border-dark">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>{ind + 1}</th>
                  <th>SCHOOL NAME</th>
                  <th>{el.school.toUpperCase()}</th>
                  <th>GP</th>
                  <th colSpan="2">{el.gp}</th>
                </tr>
                <tr>
                  <th colSpan="7">CLASSWISE NUMBER OF STUDENTS</th>
                </tr>
                <tr>
                  <th>Class PP</th>
                  <th>Class I</th>
                  <th>Class II</th>
                  <th>Class III</th>
                  <th>Class IV</th>
                  {parseInt(el.cl_5_student) !== 0 ? <th>Class V</th> : null}
                  <th>Total Students</th>
                </tr>
                <tr>
                  <th>{parseInt(el.cl_pp_student)}</th>
                  <th>{parseInt(el.cl_1_student)}</th>
                  <th>{parseInt(el.cl_2_student)}</th>
                  <th>{parseInt(el.cl_3_student)}</th>
                  <th>{parseInt(el.cl_4_student)}</th>
                  {parseInt(el.cl_5_student) !== 0 ? (
                    <th>{parseInt(el.cl_5_student)}</th>
                  ) : null}
                  <th>{el.total_student}</th>
                </tr>
                <tr>
                  <th colSpan="7">CLASS WISE COST</th>
                </tr>
                <tr>
                  <th>
                    Class PP @ <i className="bi bi-currency-rupee"></i>
                    {pp_rate}
                  </th>
                  <th>
                    Class I @ <i className="bi bi-currency-rupee"></i>
                    {i_rate}
                  </th>
                  <th>
                    Class II @ <i className="bi bi-currency-rupee"></i>
                    {ii_rate}
                  </th>
                  <th>
                    Class III @ <i className="bi bi-currency-rupee"></i>
                    {iii_rate}
                  </th>
                  <th>
                    Class IV @ <i className="bi bi-currency-rupee"></i>
                    {iv_rate}
                  </th>

                  {parseInt(el.cl_5_student) !== 0 ? (
                    <th>
                      Class V @ <i className="bi bi-currency-rupee"></i>
                      {v_rate}
                    </th>
                  ) : null}
                  <th>Total Cost</th>
                </tr>
                <tr>
                  <th>
                    {parseInt(el.cl_pp_student)} X{" "}
                    <i className="bi bi-currency-rupee"></i>
                    {pp_rate} X 3 = <i className="bi bi-currency-rupee"></i>
                    {cl_pp_rate}
                  </th>
                  <th>
                    {parseInt(el.cl_1_student)} X{" "}
                    <i className="bi bi-currency-rupee"></i>
                    {i_rate} X 3 = <i className="bi bi-currency-rupee"></i>
                    {cl_1_rate}
                  </th>
                  <th>
                    {parseInt(el.cl_2_student)} X{" "}
                    <i className="bi bi-currency-rupee"></i>
                    {ii_rate} X 3 = <i className="bi bi-currency-rupee"></i>
                    {cl_2_rate}
                  </th>
                  <th>
                    {parseInt(el.cl_3_student)} X{" "}
                    <i className="bi bi-currency-rupee"></i>
                    {iii_rate} X 4 = <i className="bi bi-currency-rupee"></i>
                    {cl_3_rate}
                  </th>
                  <th>
                    {parseInt(el.cl_4_student)} X{" "}
                    <i className="bi bi-currency-rupee"></i>
                    {iv_rate} X 4 = <i className="bi bi-currency-rupee"></i>
                    {cl_4_rate}
                  </th>

                  {parseInt(el.cl_5_student) !== 0 ? (
                    <th>
                      {parseInt(el.cl_5_student)} X{" "}
                      <i className="bi bi-currency-rupee"></i>
                      {v_rate} X 4 = <i className="bi bi-currency-rupee"></i>
                      {cl_5_rate}
                    </th>
                  ) : null}
                  <th>
                    <i className="bi bi-currency-rupee"></i>
                    {total_rate}
                  </th>
                </tr>
                <tr>
                  <th colSpan="3">TOTAL IN WORDS</th>
                  <th colSpan="4">[Rupees {NumInWords(total_rate)} Only]</th>
                </tr>
              </thead>
            </table>
            <div className="col-md-4 mt-4" style={{ float: "right" }}>
              <h6 className="for mb-4">For Amta West Circle</h6>
              <br />
              <h6 className="mt-4">
                .......................................................
              </h6>
            </div>
          </div>
        );
      })}
      <div className="mx-auto my-5 noprint">
        <button
          type="button"
          className="btn btn-primary text-white font-weight-bold p-2 m-5 rounded"
          onClick={window.print}
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
  );
};

export default PrintQuestionAll;
