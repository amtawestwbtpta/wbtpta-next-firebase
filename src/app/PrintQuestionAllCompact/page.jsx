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
    <div className="container-fluid">
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
      <table className="table table-resposive table-bordered border-dark border-1">
        <tbody>
          {allData.map((el, ind) => {
            let total_rate = Math.round(
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
                className="timesFont"
              >
                <td style={{ textAlign: "center" }}>Sl: {ind + 1}</td>
                {/* <td style={{ textAlign: "center" }}>
                  Scan Here:
                  <img
                    src={`https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=${
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
                    )}, Total Amount ${total_rate}.&chs=60x60`}
                    alt="QRCode"
                  />
                </td> */}

                <td colSpan={2} style={{ textAlign: "center" }}>
                  <h6>{el.school.toUpperCase()}</h6>
                </td>

                <td style={{ textAlign: "center" }}>GP: {el.gp}</td>
                <td style={{ textAlign: "center" }}>PP: {el.cl_pp_student}</td>
                <td style={{ textAlign: "center" }}>
                  CLASS I: {el.cl_1_student}
                </td>
                <td style={{ textAlign: "center" }}>
                  CLASS II: {el.cl_2_student}
                </td>
                <td style={{ textAlign: "center" }}>
                  CLASS III: {el.cl_3_student}
                </td>
                <td style={{ textAlign: "center" }}>
                  CLASS IV: {el.cl_4_student}
                </td>
                {parseInt(el.cl_5_student) !== 0 ? (
                  <td style={{ textAlign: "center" }}>
                    CLASS V: {el.cl_5_student}
                  </td>
                ) : null}

                <td style={{ textAlign: "center" }}>
                  Total Students: {el.total_student}
                </td>
                {parseInt(el.cl_5_student) !== 0 ? (
                  <td style={{ textAlign: "center" }}>
                    Total Amount: <i className="bi bi-currency-rupee"></i>
                    {total_rate}
                    <br /> (Rupees {NumInWords(total_rate)} Only)
                  </td>
                ) : (
                  <td colSpan={2} style={{ textAlign: "center" }}>
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
