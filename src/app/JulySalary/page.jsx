"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";

const JulySalary = () => {
  const { access, stateArray } = useGlobalContext();
  const router = useRouter();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    setDetails(stateArray);
    if (!access) {
      router.push("/login");
    }
    document.title = "WBTPTA AMTA WEST:All Teacher July Salary Data";
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <button
          type="button"
          className="btn btn-success btn-sm noprint m-3"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.print();
            }
          }}
        >
          Print
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm noprint m-3"
          onClick={() => router.back()}
        >
          Go Back
        </button>
        <h3 className="text-center text-primary mb-3">
          All Teacher July Salary Data
        </h3>
        <table className="table table-responsive table-bordered table-striped text-center text-black">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Teacher Name</th>
              <th>School Name</th>
              <th>Designation</th>
              <th>Basic Pay</th>
              <th>Da</th>
              <th>HRA</th>
              <th>Addl.</th>
              <th>MA</th>
              <th>Gross Pay</th>
              <th>GPF</th>
              <th>GSLI</th>
              <th>PTAX</th>
              <th>NET PAY</th>
            </tr>
          </thead>
          <tbody>
            {details.map((el, ind) => (
              <tr key={ind}>
                <td>{ind + 1}</td>
                <td>{el.tname}</td>
                <td>{el.school}</td>
                <td>{el.desig}</td>
                <td>{el.basic}</td>
                <td>{el.da}</td>
                <td>{el.hra}</td>
                <td>{el.addl}</td>
                <td>{el.ma}</td>
                <td>{el.gross}</td>
                <td>{el.gpf}</td>
                <td>{el.gsli}</td>
                <td>{el.ptax}</td>
                <td>{el.netpay}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-success btn-sm noprint m-3"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.print();
            }
          }}
        >
          Print
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm noprint m-3"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default JulySalary;
