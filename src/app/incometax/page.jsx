"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { DA, HRA } from "../../modules/constants";
import march from "./march.json";
import april from "./april.json";
import may from "./may.json";
import june from "./june.json";
import july from "./july.json";
import august from "./august.json";
import september from "./september.json";
import october from "./october.json";
import november from "./november.json";
import december from "./december.json";
import january from "./january.json";
import february from "./february.json";
import deduction from "./deduction.json";
import {
  IndianFormat,
  ptaxCalc,
  randBetween,
  roundSo,
  CalculateIncomeTax,
} from "../../modules/calculatefunctions";
import IncomeTax from "../../components/IncomeTax";
export default function IncomeTaxSection() {
  const router = useRouter();
  const { state, teachersState, stateObject } = useGlobalContext();
  const { id, tname, school, pan, phone, disability, desig } = stateObject;
  const thisYear = new Date().getFullYear();
  const nextYear = new Date().getFullYear() + 1;
  const finYear = `${thisYear}-${nextYear}`;
  const marchSalary = march.filter((el) => el.id === id)[0];
  const marchBasic = marchSalary?.basic;
  const marchAddl = marchSalary?.addl;
  const marchDA = Math.round(marchSalary?.basic * marchSalary?.daPercent);
  const marchHRA = Math.round(marchSalary?.basic * marchSalary?.hraPercent);
  const marchMA = marchSalary?.ma;
  const marchGross = marchBasic + marchDA + marchHRA + marchAddl + marchMA;
  const marchGPF = marchSalary?.gpf;
  const marchGSLI = marchSalary?.gsli;
  const bonus = marchSalary?.bonus;
  const marchPTax = disability === "YES" ? 0 : ptaxCalc(marchGross);
  const aprilSalary = april.filter((el) => el.id === id)[0];
  const aprilBasic = aprilSalary?.basic;
  const aprilAddl = aprilSalary?.addl;
  const aprilDA = Math.round(aprilSalary?.basic * aprilSalary?.daPercent);
  const aprilHRA = Math.round(aprilSalary?.basic * aprilSalary?.hraPercent);
  const aprilMA = aprilSalary?.ma;
  const aprilGross = aprilBasic + aprilDA + aprilHRA + aprilAddl + aprilMA;
  const aprilGPF = aprilSalary?.gpf;
  const aprilGSLI = aprilSalary?.gsli;
  const aprilPTax = disability === "YES" ? 0 : ptaxCalc(aprilGross);
  const maySalary = may.filter((el) => el.id === id)[0];
  const mayBasic = maySalary?.basic;
  const mayAddl = maySalary?.addl;
  const mayDA = Math.round(maySalary?.basic * maySalary?.daPercent);
  const mayHRA = Math.round(maySalary?.basic * maySalary?.hraPercent);
  const mayMA = maySalary?.ma;
  const mayGross = mayBasic + mayDA + mayHRA + mayAddl + mayMA;
  const mayGPF = maySalary?.gpf;
  const mayGSLI = maySalary?.gsli;
  const mayPTax = disability === "YES" ? 0 : ptaxCalc(mayGross);
  const juneSalary = june.filter((el) => el.id === id)[0];
  const juneBasic = juneSalary?.basic;
  const juneAddl = juneSalary?.addl;
  const juneDA = Math.round(juneSalary?.basic * juneSalary?.daPercent);
  const juneHRA = Math.round(juneSalary?.basic * juneSalary?.hraPercent);
  const juneMA = juneSalary?.ma;
  const juneGross = juneBasic + juneDA + juneHRA + juneAddl + juneMA;
  const juneGPF = juneSalary?.gpf;
  const juneGSLI = juneSalary?.gsli;
  const junePTax = disability === "YES" ? 0 : ptaxCalc(juneGross);
  const julySalary = july.filter((el) => el.id === id)[0];
  const julyBasic = julySalary?.basic;
  const julyAddl = julySalary?.addl;
  const julyDA = Math.round(julySalary?.basic * julySalary?.daPercent);
  const aprilIR = Math.round(aprilSalary?.basic * 0.04);
  const julyHRA = Math.round(julySalary?.basic * julySalary?.hraPercent);
  const julyMA = julySalary?.ma;
  const julyGross = julyBasic + julyDA + julyHRA + julyAddl + julyMA;
  const julyGPF = julySalary?.gpf;
  const julyGSLI = julySalary?.gsli;
  const julyPTax = disability === "YES" ? 0 : ptaxCalc(julyGross);
  const augustSalary = august.filter((el) => el.id === id)[0];
  const augustBasic = augustSalary?.basic;
  const augustAddl = augustSalary?.addl;
  const augustDA = Math.round(augustSalary?.basic * augustSalary?.daPercent);
  const augustHRA = Math.round(augustSalary?.basic * augustSalary?.hraPercent);
  const augustMA = augustSalary?.ma;
  const augustGross =
    augustBasic + augustDA + augustHRA + augustAddl + augustMA;
  const augustGPF = augustSalary?.gpf;
  const augustGSLI = augustSalary?.gsli;
  const augustPTax = disability === "YES" ? 0 : ptaxCalc(augustGross);
  const septemberSalary = september.filter((el) => el.id === id)[0];
  const septemberBasic = septemberSalary?.basic;
  const septemberAddl = septemberSalary?.addl;
  const septemberDA = Math.round(
    septemberSalary?.basic * septemberSalary?.daPercent
  );
  const septemberHRA = Math.round(
    septemberSalary?.basic * septemberSalary?.hraPercent
  );
  const septemberMA = septemberSalary?.ma;
  const septemberGross =
    septemberBasic + septemberDA + septemberHRA + septemberAddl + septemberMA;
  const septemberGPF = septemberSalary?.gpf;
  const septemberGSLI = septemberSalary?.gsli;
  const septemberPTax = disability === "YES" ? 0 : ptaxCalc(septemberGross);
  const octoberSalary = october.filter((el) => el.id === id)[0];
  const octoberBasic = octoberSalary?.basic;
  const octoberAddl = octoberSalary?.addl;
  const octoberDA = Math.round(octoberSalary?.basic * octoberSalary?.daPercent);
  const octoberHRA = Math.round(
    octoberSalary?.basic * octoberSalary?.hraPercent
  );
  const octoberMA = octoberSalary?.ma;
  const octoberGross =
    octoberBasic + octoberDA + octoberHRA + octoberAddl + octoberMA;
  const octoberGPF = octoberSalary?.gpf;
  const octoberGSLI = octoberSalary?.gsli;
  const octoberPTax = disability === "YES" ? 0 : ptaxCalc(octoberGross);
  const novemberSalary = november.filter((el) => el.id === id)[0];
  const novemberBasic = novemberSalary?.basic;
  const novemberAddl = novemberSalary?.addl;
  const novemberDA = Math.round(
    novemberSalary?.basic * novemberSalary?.daPercent
  );
  const novemberHRA = Math.round(
    novemberSalary?.basic * novemberSalary?.hraPercent
  );
  const novemberMA = novemberSalary?.ma;
  const novemberGross =
    novemberBasic + novemberDA + novemberHRA + novemberAddl + novemberMA;
  const novemberGPF = novemberSalary?.gpf;
  const novemberGSLI = novemberSalary?.gsli;
  const novemberPTax = disability === "YES" ? 0 : ptaxCalc(novemberGross);
  const decemberSalary = december.filter((el) => el.id === id)[0];
  const decemberBasic = decemberSalary?.basic;
  const decemberAddl = decemberSalary?.addl;
  const decemberDA = Math.round(
    decemberSalary?.basic * decemberSalary?.daPercent
  );
  const decemberHRA = Math.round(
    decemberSalary?.basic * decemberSalary?.hraPercent
  );
  const decemberMA = decemberSalary?.ma;
  const decemberGross =
    decemberBasic + decemberDA + decemberHRA + decemberAddl + decemberMA;
  const decemberGPF = decemberSalary?.gpf;
  const decemberGSLI = decemberSalary?.gsli;
  const decemberPTax = disability === "YES" ? 0 : ptaxCalc(decemberGross);
  const januarySalary = january.filter((el) => el.id === id)[0];
  const januaryBasic = januarySalary?.basic;
  const januaryAddl = januarySalary?.addl;
  const januaryDA = Math.round(januarySalary?.basic * januarySalary?.daPercent);
  const januaryHRA = Math.round(
    januarySalary?.basic * januarySalary?.hraPercent
  );
  const januaryMA = januarySalary?.ma;
  const januaryGross =
    januaryBasic + januaryDA + januaryHRA + januaryAddl + januaryMA;
  const januaryGPF = januarySalary?.gpf;
  const januaryGSLI = januarySalary?.gsli;
  const januaryPTax = disability === "YES" ? 0 : ptaxCalc(januaryGross);
  const februarySalary = february.filter((el) => el.id === id)[0];
  const februaryBasic = februarySalary?.basic;
  const februaryAddl = februarySalary?.addl;
  const februaryDA = Math.round(
    februarySalary?.basic * februarySalary?.daPercent
  );
  const februaryHRA = Math.round(
    februarySalary?.basic * februarySalary?.hraPercent
  );
  const februaryMA = februarySalary?.ma;
  const februaryGross =
    februaryBasic + februaryDA + februaryHRA + februaryAddl + februaryMA;
  const februaryGPF = februarySalary?.gpf;
  const februaryGSLI = februarySalary?.gsli;
  const februaryPTax = disability === "YES" ? 0 : ptaxCalc(februaryGross);
  const grossBasic =
    marchBasic +
    aprilBasic +
    mayBasic +
    juneBasic +
    julyBasic +
    augustBasic +
    septemberBasic +
    octoberBasic +
    novemberBasic +
    decemberBasic +
    januaryBasic +
    februaryBasic;
  const grossAddl =
    marchAddl +
    aprilAddl +
    mayAddl +
    juneAddl +
    julyAddl +
    augustAddl +
    septemberAddl +
    octoberAddl +
    novemberAddl +
    decemberAddl +
    januaryAddl +
    februaryAddl;
  const grossDA =
    marchDA +
    aprilDA +
    mayDA +
    juneDA +
    julyDA +
    augustDA +
    septemberDA +
    octoberDA +
    novemberDA +
    decemberDA +
    januaryDA +
    februaryDA;
  const grossHRA =
    marchHRA +
    aprilHRA +
    mayHRA +
    juneHRA +
    julyHRA +
    augustHRA +
    septemberHRA +
    octoberHRA +
    novemberHRA +
    decemberHRA +
    januaryHRA +
    februaryHRA;
  const grossMA =
    marchMA +
    aprilMA +
    mayMA +
    juneMA +
    julyMA +
    augustMA +
    septemberMA +
    octoberMA +
    novemberMA +
    decemberMA +
    januaryMA +
    februaryMA;
  const GrossPAY =
    marchGross +
    aprilGross +
    mayGross +
    juneGross +
    julyGross +
    augustGross +
    septemberGross +
    octoberGross +
    novemberGross +
    decemberGross +
    januaryGross +
    februaryGross;
  const grossGPF =
    marchGPF +
    aprilGPF +
    mayGPF +
    juneGPF +
    julyGPF +
    augustGPF +
    septemberGPF +
    octoberGPF +
    novemberGPF +
    decemberGPF +
    januaryGPF +
    februaryGPF;
  const grossGSLI =
    marchGSLI +
    aprilGSLI +
    mayGSLI +
    juneGSLI +
    julyGSLI +
    augustGSLI +
    septemberGSLI +
    octoberGSLI +
    novemberGSLI +
    decemberGSLI +
    januaryGSLI +
    februaryGSLI;
  const grossPTax =
    marchPTax +
    aprilPTax +
    mayPTax +
    junePTax +
    julyPTax +
    augustPTax +
    septemberPTax +
    octoberPTax +
    novemberPTax +
    decemberPTax +
    januaryPTax +
    februaryPTax;
  const BankInterest = randBetween(500, 2000);
  const teacherDeduction = deduction?.filter((el) => el.id === id)[0];
  const hbLoanPrincipal = teacherDeduction?.hbLoanPrincipal;
  const hbLoanInterest = teacherDeduction?.hbLoanInterest;
  const lic = teacherDeduction?.lic;
  const ulip = teacherDeduction?.ulip;
  const ppf = teacherDeduction?.ppf;
  const nsc = teacherDeduction?.nsc;
  const nscInterest = teacherDeduction?.nscInterest;
  const tutionFee = teacherDeduction?.tutionFee;
  const sukanya = teacherDeduction?.sukanya;
  const stampDuty = teacherDeduction?.stampDuty;
  const mediclaim = teacherDeduction?.mediclaim;
  const terminalDisease = teacherDeduction?.terminalDisease;
  const handicapTreatment = teacherDeduction?.handicapTreatment;
  const educationLoan = teacherDeduction?.educationLoan;
  const charity = teacherDeduction?.charity;
  const disabilityDeduction = teacherDeduction?.disability;
  const rgSaving = teacherDeduction?.rgSaving;
  const otherIncome = teacherDeduction?.otherIncome;
  const fd = teacherDeduction?.fd;
  const tds = teacherDeduction?.tds;
  const GrossTotalIncome =
    GrossPAY - grossPTax - 50000 + BankInterest - hbLoanInterest;
  const deductionVIA =
    grossGPF +
    sukanya +
    nsc +
    ulip +
    hbLoanPrincipal +
    nsc +
    ppf +
    lic +
    tutionFee +
    fd +
    grossGSLI;
  const limitVIA = deductionVIA >= 150000 ? 150000 : deductionVIA;
  const OtherVIA =
    BankInterest +
    mediclaim +
    disabilityDeduction +
    terminalDisease +
    educationLoan +
    charity;
  const TotalIncome = GrossTotalIncome - limitVIA - OtherVIA;
  const TotalRoundOffIncome = roundSo(TotalIncome, 10);
  const CalculatedIT = CalculateIncomeTax(TotalRoundOffIncome);
  return (
    <div className="container-fluid timesFont">
      <table
        className="nobreak"
        style={{ border: "2px solid", width: "100%", padding: 5 }}
      >
        <thead>
          <tr>
            <th
              colSpan={3}
              suppressHydrationWarning
              style={{ width: "100%", padding: 2 }}
            >
              <h4 className="algerian">
                HOWRAH DISTRICT PRIMARY SCHOOL COUNCIL
              </h4>
            </th>
          </tr>
          <tr>
            <th
              colSpan={3}
              suppressHydrationWarning
              style={{ width: "100%", padding: 2 }}
            >
              <h5 className="algerian">DECLARATION OF INCOME TAX</h5>
            </th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th
              colSpan={3}
              suppressHydrationWarning
              style={{ width: "100%", padding: 2 }}
            >
              <h5 className="algerian">
                FOR THE FINANCIAL YEAR 2023 - 2024 RELATION TO ASSESMENT YEAR{" "}
                {finYear}
              </h5>
            </th>
          </tr>
          <tr>
            <th
              colSpan={3}
              suppressHydrationWarning
              style={{ width: "100%", padding: 2 }}
            >
              <h5
                className="timesfont"
                style={{ textAlign: "left", padding: 2 }}
              >
                Name of the Teacher: <b>{tname}</b>
              </h5>
            </th>
          </tr>
          <tr>
            <th
              colSpan={3}
              suppressHydrationWarning
              style={{ width: "100%", padding: 2 }}
            >
              <div
                className="d-flex flex-row p-2"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <h5
                  className="timesfont"
                  style={{ textAlign: "left", padding: 2 }}
                >
                  Designation: <b>{desig}</b>
                </h5>

                <h5
                  className="timesfont"
                  style={{ textAlign: "left", padding: 2 }}
                >
                  Circle: <b>AMTA WEST CIRCLE</b>
                </h5>
              </div>
            </th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th
              colSpan={3}
              suppressHydrationWarning
              style={{ width: "100%", padding: 2 }}
            >
              <div
                className="d-flex flex-row p-2"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <h5
                  className="timesfont"
                  style={{ textAlign: "left", padding: 2 }}
                >
                  School:
                </h5>
                <h5
                  className="timesfont"
                  style={{ textAlign: "left", padding: 2 }}
                >
                  <b>{school}</b>
                </h5>

                <h5
                  className="timesfont"
                  style={{ textAlign: "left", padding: 2 }}
                >
                  Mobile No: <b>{phone}</b>
                </h5>
              </div>
            </th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th
              suppressHydrationWarning
              style={{ width: "70%", padding: 0, borderRightWidth: 2 }}
            >
              <div className="d-flex flex-row justify-content-end ">
                <table style={{ borderWidth: 0, width: "70%", padding: 5 }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          width: "30%",
                          textAlign: "left",
                          padding: 2,
                        }}
                        suppressHydrationWarning
                      >
                        PAN
                      </th>
                      <th style={{ borderLeftWidth: 2, borderRightWidth: 2 }}>
                        {pan?.slice(0, 1)}
                      </th>
                      <th style={{ borderRightWidth: 2 }}>
                        {pan?.slice(1, 2)}
                      </th>
                      <th style={{ borderRightWidth: 2 }}>
                        {pan?.slice(2, 3)}
                      </th>
                      <th style={{ borderRightWidth: 2 }}>
                        {pan?.slice(3, 4)}
                      </th>
                      <th style={{ borderRightWidth: 2 }}>
                        {pan?.slice(4, 5)}
                      </th>
                      <th style={{ borderRightWidth: 2 }}>
                        {pan?.slice(5, 6)}
                      </th>
                      <th style={{ borderRightWidth: 2 }}>
                        {pan?.slice(6, 7)}
                      </th>
                      <th style={{ borderRightWidth: 2 }}>
                        {pan?.slice(7, 8)}
                      </th>
                      <th style={{ borderRightWidth: 2 }}>
                        {pan?.slice(8, 9)}
                      </th>
                      <th style={{ borderRightWidth: 0 }}>
                        {pan?.slice(9, 10)}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th></th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </th>
            <th style={{ borderRightWidth: 2 }}></th>
            <th rowSpan={5} style={{ borderRightWidth: 0, width: "20%" }}></th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}>
              1. GROSS SLARY INCOME (Salary +Arrear Salary +Bonus)
            </th>
            <th style={{ borderRightWidth: 2 }}>
              Rs. {IndianFormat(GrossPAY)}
            </th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}>
              2. Less: Exemption of HRA under Sec 10(13A) the least of the
              following
            </th>
            <th style={{ borderRightWidth: 2 }}></th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}>
              a) Actual HRA Received
            </th>
            <th style={{ borderRightWidth: 2 }}></th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}>
              b) Rent Paid in excess of 10% of Salary (Basic + DA)
            </th>
            <th style={{ borderRightWidth: 2 }}></th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}>
              c) 40% of Salary (Basic + DA)
            </th>
            <th style={{ borderRightWidth: 2 }}></th>
            <th style={{ borderRightWidth: 2 }}>
              Rs. {IndianFormat(GrossPAY)}
            </th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th
              colSpan={2}
              style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}
            >
              3. Less: P. Tax under section 16(ii/i)
            </th>
            <th>Rs. {IndianFormat(grossPTax)}</th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th
              colSpan={2}
              style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}
            >
              4. Less: Standard Deduction for Salaried & Pensioner (Rs.50,000)
            </th>
            <th>Rs. {IndianFormat(50000)}</th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th
              colSpan={2}
              style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}
            >
              5. Income chargeable under the head Salaries (1-2-3-4)
            </th>
            <th>Rs. {IndianFormat(GrossPAY - grossPTax - 50000)}</th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th
              colSpan={2}
              style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}
            >
              6. Income under any head other than salaries (From Schedule OS)
            </th>
            <th>Rs. {IndianFormat(BankInterest)}</th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th
              colSpan={2}
              style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}
            >
              7. Interest on House Building Loan
            </th>
            <th>
              {hbLoanInterest !== 0
                ? `Rs. ${IndianFormat(hbLoanInterest)}`
                : "NIL"}
            </th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th
              colSpan={2}
              style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}
            >
              8. Gross Total Income [(5+6)-7)
            </th>
            <th>Rs. {IndianFormat(GrossTotalIncome)}</th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th
              colSpan={2}
              style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}
            >
              9. Deduction under Chapter VIA (From Schedule-VIA) Aggregate
              amount of deductions admissible U /S 80C, 80CCC and 80CCD(I)
              (Limited to Rs.1,50,000/-)
            </th>
            <th>Rs. {IndianFormat(limitVIA)}</th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th
              colSpan={2}
              style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}
            >
              10. Amount deduction under section 80CCD(B)
            </th>
            <th>NIL</th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th
              colSpan={2}
              style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}
            >
              11. Amount deduction under any other provision(s) Chapter VI-A
              (From Schedule- Other VIA)
            </th>
            <th>{IndianFormat(OtherVIA)}</th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th
              colSpan={2}
              style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}
            >
              12. Total Income (8-9-10-11)
            </th>
            <th>Rs. {IndianFormat(TotalIncome)}</th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th
              colSpan={2}
              style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}
            >
              13. Rounding Off of Total Income U/S288A (SI No 12) (If the last
              figure of Total Income is five of more, the amount shall be
              increased to the next higher amount which is a multiple of ten)
            </th>
            <th>Rs. {IndianFormat(TotalRoundOffIncome)}</th>
          </tr>
          <tr style={{ borderBottomWidth: 2 }}>
            <th
              colSpan={2}
              style={{ borderRightWidth: 2, textAlign: "left", padding: 2 }}
            >
              14. Income Tax on Total Income
            </th>
            <th>
              {CalculatedIT !== 0 ? `Rs. ${IndianFormat(CalculatedIT)}` : "NIL"}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th></th>
          </tr>
        </tbody>
      </table>
      <div className="my-5">
        <table
          className="nobreak"
          style={{ border: "1px solid", width: "100%", padding: 5 }}
        >
          <thead>
            <tr>
              <th
                colSpan={16}
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h5 className="fw-bold">
                  DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
                </h5>
              </th>
            </tr>
            <tr>
              <th
                colSpan={16}
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h5 className="fw-bold">NAME: {tname}</h5>
              </th>
            </tr>
            <tr>
              <th
                colSpan={16}
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h5 className="fw-bold">PAN NO.: {pan}</h5>
              </th>
            </tr>
            <tr>
              <th
                colSpan={2}
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold" style={{ fontSize: 16 }}>
                  {finYear}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "10%", padding: 5 }}
              >
                <h6 className="fw-bold">% D.A</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">Basic Pay</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">HT Allowance</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">D.A.</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">H.R.A.</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">M.A.</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">ARREAR</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">Conveyance Allowance</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">BONUS</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h5 className="fw-bold">GROSS</h5>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">GPF</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">GSLI</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">P.TAX</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">TDS</h6>
              </th>
            </tr>
            <tr>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">MAR</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">{thisYear}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "10%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {marchBasic !== 0
                    ? `${Math.round(marchSalary?.daPercent * 100)}%`
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {marchBasic !== 0 ? marchBasic : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {marchBasic !== 0
                    ? marchAddl !== 0
                      ? marchAddl
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{marchBasic !== 0 ? marchDA : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{marchBasic !== 0 ? marchHRA : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {marchBasic !== 0 ? (marchMA !== 0 ? marchMA : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {marchBasic !== 0 ? marchGross : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {marchBasic !== 0 ? (marchGPF !== 0 ? marchGPF : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {marchBasic !== 0
                    ? marchGSLI !== 0
                      ? marchGSLI
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {marchBasic !== 0
                    ? marchPTax !== 0
                      ? marchPTax
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{marchBasic !== 0 ? "NIL" : ""}</h6>
              </th>
            </tr>
            <tr>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">APR</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">{thisYear}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "10%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {aprilBasic !== 0
                    ? `${Math.round(aprilSalary?.daPercent * 100)}%`
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {aprilBasic !== 0 ? aprilBasic : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {aprilBasic !== 0
                    ? aprilAddl !== 0
                      ? aprilAddl
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{aprilBasic !== 0 ? aprilDA : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{aprilBasic !== 0 ? aprilHRA : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {aprilBasic !== 0 ? (aprilMA !== 0 ? aprilMA : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {aprilBasic !== 0 ? aprilGross : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {aprilBasic !== 0 ? (aprilGPF !== 0 ? aprilGPF : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {aprilBasic !== 0
                    ? aprilGSLI !== 0
                      ? aprilGSLI
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {aprilBasic !== 0
                    ? aprilPTax !== 0
                      ? aprilPTax
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{aprilBasic !== 0 ? "NIL" : ""}</h6>
              </th>
            </tr>
            <tr>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">MAY</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">{thisYear}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "10%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {mayBasic !== 0
                    ? `${Math.round(maySalary?.daPercent * 100)}%`
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{mayBasic !== 0 ? mayBasic : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {mayBasic !== 0 ? (mayAddl !== 0 ? mayAddl : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{mayBasic !== 0 ? mayDA : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{mayBasic !== 0 ? mayHRA : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {mayBasic !== 0 ? (mayMA !== 0 ? mayMA : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{mayBasic !== 0 ? mayGross : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {mayBasic !== 0 ? (mayGPF !== 0 ? mayGPF : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {mayBasic !== 0 ? (mayGSLI !== 0 ? mayGSLI : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {mayBasic !== 0 ? (mayPTax !== 0 ? mayPTax : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{mayBasic !== 0 ? "NIL" : ""}</h6>
              </th>
            </tr>
            <tr>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">JUN</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">{thisYear}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "10%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {juneBasic !== 0
                    ? `${Math.round(juneSalary?.daPercent * 100)}%`
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{juneBasic !== 0 ? juneBasic : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {juneBasic !== 0 ? (juneAddl !== 0 ? juneAddl : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{juneBasic !== 0 ? juneDA : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{juneBasic !== 0 ? juneHRA : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {juneBasic !== 0 ? (juneMA !== 0 ? juneMA : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{juneBasic !== 0 ? juneGross : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {juneBasic !== 0 ? (juneGPF !== 0 ? juneGPF : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {juneBasic !== 0 ? (juneGSLI !== 0 ? juneGSLI : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {juneBasic !== 0 ? (junePTax !== 0 ? junePTax : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{juneBasic !== 0 ? "NIL" : ""}</h6>
              </th>
            </tr>
            <tr>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">JUL</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">{thisYear}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "10%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {julyBasic !== 0
                    ? `${Math.round(julySalary?.daPercent * 100)}%`
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{julyBasic !== 0 ? julyBasic : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {julyBasic !== 0 ? (julyAddl !== 0 ? julyAddl : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{julyBasic !== 0 ? julyDA : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{julyBasic !== 0 ? julyHRA : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {julyBasic !== 0 ? (julyMA !== 0 ? julyMA : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{aprilBasic !== 0 ? aprilIR : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{julyBasic !== 0 ? julyGross : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {julyBasic !== 0 ? (julyGPF !== 0 ? julyGPF : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {julyBasic !== 0 ? (julyGSLI !== 0 ? julyGSLI : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {julyBasic !== 0 ? (julyPTax !== 0 ? julyPTax : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{julyBasic !== 0 ? "NIL" : ""}</h6>
              </th>
            </tr>
            <tr>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">AUG</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">{thisYear}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "10%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {augustBasic !== 0
                    ? `${Math.round(augustSalary?.daPercent * 100)}%`
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {augustBasic !== 0 ? augustBasic : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {augustBasic !== 0
                    ? augustAddl !== 0
                      ? augustAddl
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{augustBasic !== 0 ? augustDA : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {augustBasic !== 0 ? augustHRA : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {augustBasic !== 0 ? (augustMA !== 0 ? augustMA : "NIL") : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {augustBasic !== 0 ? augustGross : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {augustBasic !== 0
                    ? augustGPF !== 0
                      ? augustGPF
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {augustBasic !== 0
                    ? augustGSLI !== 0
                      ? augustGSLI
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {augustBasic !== 0
                    ? augustPTax !== 0
                      ? augustPTax
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{augustBasic !== 0 ? "NIL" : ""}</h6>
              </th>
            </tr>
            <tr>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">SEP</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">{thisYear}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "10%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {septemberBasic !== 0
                    ? `${Math.round(septemberSalary?.daPercent * 100)}%`
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {septemberBasic !== 0 ? septemberBasic : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {septemberBasic !== 0
                    ? septemberAddl !== 0
                      ? septemberAddl
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {septemberBasic !== 0 ? septemberDA : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {septemberBasic !== 0 ? septemberHRA : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {septemberBasic !== 0
                    ? septemberMA !== 0
                      ? septemberMA
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {septemberBasic !== 0 ? septemberGross : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {septemberBasic !== 0
                    ? septemberGPF !== 0
                      ? septemberGPF
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {septemberBasic !== 0
                    ? septemberGSLI !== 0
                      ? septemberGSLI
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {septemberBasic !== 0
                    ? septemberPTax !== 0
                      ? septemberPTax
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{septemberBasic !== 0 ? "NIL" : ""}</h6>
              </th>
            </tr>
            <tr>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">OCT</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">{thisYear}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "10%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {octoberBasic !== 0
                    ? `${Math.round(octoberSalary?.daPercent * 100)}%`
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {octoberBasic !== 0 ? octoberBasic : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {octoberBasic !== 0
                    ? octoberAddl !== 0
                      ? octoberAddl
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {octoberBasic !== 0 ? octoberDA : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {octoberBasic !== 0 ? octoberHRA : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {octoberBasic !== 0
                    ? octoberMA !== 0
                      ? octoberMA
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {octoberBasic !== 0 ? octoberGross : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {octoberBasic !== 0
                    ? octoberGPF !== 0
                      ? octoberGPF
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {octoberBasic !== 0
                    ? octoberGSLI !== 0
                      ? octoberGSLI
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {octoberBasic !== 0
                    ? octoberPTax !== 0
                      ? octoberPTax
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{octoberBasic !== 0 ? "NIL" : ""}</h6>
              </th>
            </tr>
            <tr>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">NOV</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">{thisYear}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "10%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {novemberBasic !== 0
                    ? `${Math.round(novemberSalary?.daPercent * 100)}%`
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {novemberBasic !== 0 ? novemberBasic : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {novemberBasic !== 0
                    ? novemberAddl !== 0
                      ? novemberAddl
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {novemberBasic !== 0 ? novemberDA : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {novemberBasic !== 0 ? novemberHRA : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {novemberBasic !== 0
                    ? novemberMA !== 0
                      ? novemberMA
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {novemberBasic !== 0 ? novemberGross : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {novemberBasic !== 0
                    ? novemberGPF !== 0
                      ? novemberGPF
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {novemberBasic !== 0
                    ? novemberGSLI !== 0
                      ? novemberGSLI
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {novemberBasic !== 0
                    ? novemberPTax !== 0
                      ? novemberPTax
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{novemberBasic !== 0 ? "NIL" : ""}</h6>
              </th>
            </tr>
            <tr>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">DEC</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">{thisYear}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "10%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {decemberBasic !== 0
                    ? `${Math.round(decemberSalary?.daPercent * 100)}%`
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {decemberBasic !== 0 ? decemberBasic : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {decemberBasic !== 0
                    ? decemberAddl !== 0
                      ? decemberAddl
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {decemberBasic !== 0 ? decemberDA : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {decemberBasic !== 0 ? decemberHRA : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {decemberBasic !== 0
                    ? decemberMA !== 0
                      ? decemberMA
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {decemberBasic !== 0 ? decemberGross : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {decemberBasic !== 0
                    ? decemberGPF !== 0
                      ? decemberGPF
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {decemberBasic !== 0
                    ? decemberGSLI !== 0
                      ? decemberGSLI
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {decemberBasic !== 0
                    ? decemberPTax !== 0
                      ? decemberPTax
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{decemberBasic !== 0 ? "NIL" : ""}</h6>
              </th>
            </tr>
            <tr>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">JAN</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">{nextYear}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "10%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {januaryBasic !== 0
                    ? `${Math.round(januarySalary?.daPercent * 100)}%`
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {januaryBasic !== 0 ? januaryBasic : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {januaryBasic !== 0
                    ? januaryAddl !== 0
                      ? januaryAddl
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {januaryBasic !== 0 ? januaryDA : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {januaryBasic !== 0 ? januaryHRA : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {januaryBasic !== 0
                    ? januaryMA !== 0
                      ? januaryMA
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {januaryBasic !== 0 ? januaryGross : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {januaryBasic !== 0
                    ? januaryGPF !== 0
                      ? januaryGPF
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {januaryBasic !== 0
                    ? januaryGSLI !== 0
                      ? januaryGSLI
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {januaryBasic !== 0
                    ? januaryPTax !== 0
                      ? januaryPTax
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{januaryBasic !== 0 ? "NIL" : ""}</h6>
              </th>
            </tr>
            <tr>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">FEB</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "20%", padding: 5 }}
              >
                <h6 className="fw-bold">{nextYear}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "10%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {februaryBasic !== 0
                    ? `${Math.round(februarySalary?.daPercent * 100)}%`
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {februaryBasic !== 0 ? februaryBasic : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {februaryBasic !== 0
                    ? februaryAddl !== 0
                      ? februaryAddl
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {februaryBasic !== 0 ? februaryDA : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {februaryBasic !== 0 ? februaryHRA : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {februaryBasic !== 0
                    ? februaryMA !== 0
                      ? februaryMA
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {februaryBasic !== 0 ? februaryGross : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {februaryBasic !== 0
                    ? februaryGPF !== 0
                      ? februaryGPF
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {februaryBasic !== 0
                    ? februaryGSLI !== 0
                      ? februaryGSLI
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">
                  {februaryBasic !== 0
                    ? februaryPTax !== 0
                      ? februaryPTax
                      : "NIL"
                    : ""}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{ border: "1px solid", width: "100%", padding: 5 }}
              >
                <h6 className="fw-bold">{februaryBasic !== 0 ? "NIL" : ""}</h6>
              </th>
            </tr>
            <tr>
              <th
                colSpan={2}
                suppressHydrationWarning
                style={{
                  border: "1px solid",
                  borderBottom: 0,
                  width: "100%",
                  padding: 5,
                }}
              >
                <h5 className="fw-bold">TOTAL</h5>
              </th>
              <th
                suppressHydrationWarning
                style={{
                  border: "1px solid",
                  borderBottom: 0,
                  width: "10%",
                  padding: 5,
                }}
              >
                <h6 className="fw-bold"></h6>
              </th>
              <th
                suppressHydrationWarning
                style={{
                  border: "1px solid",
                  borderBottom: 0,
                  width: "100%",
                  padding: 5,
                }}
              >
                <h6 className="fw-bold">{grossBasic}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{
                  border: "1px solid",
                  borderBottom: 0,
                  width: "100%",
                  padding: 5,
                }}
              >
                <h6 className="fw-bold">
                  {grossAddl !== 0 ? grossAddl : "NIL"}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{
                  border: "1px solid",
                  borderBottom: 0,
                  width: "100%",
                  padding: 5,
                }}
              >
                <h6 className="fw-bold">{grossDA}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{
                  border: "1px solid",
                  borderBottom: 0,
                  width: "100%",
                  padding: 5,
                }}
              >
                <h6 className="fw-bold">{grossHRA}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{
                  border: "1px solid",
                  borderBottom: 0,
                  width: "100%",
                  padding: 5,
                }}
              >
                <h6 className="fw-bold">{grossMA !== 0 ? grossMA : "NIL"}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{
                  border: "1px solid",
                  borderBottom: 0,
                  width: "100%",
                  padding: 5,
                }}
              >
                <h6 className="fw-bold">{aprilBasic !== 0 ? aprilIR : ""}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{
                  border: "1px solid",
                  borderBottom: 0,
                  width: "100%",
                  padding: 5,
                }}
              >
                <h6 className="fw-bold">NIL</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{
                  border: "1px solid",
                  borderBottom: 0,
                  width: "100%",
                  padding: 5,
                }}
              >
                <h6 className="fw-bold">{bonus !== 0 ? bonus : "NIL"}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{
                  border: "1px solid",
                  borderBottom: 0,
                  width: "100%",
                  padding: 5,
                }}
              >
                <h6 className="fw-bold">{GrossPAY}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{
                  border: "1px solid",
                  borderBottom: 0,
                  width: "100%",
                  padding: 5,
                }}
              >
                <h6 className="fw-bold">{grossGPF !== 0 ? grossGPF : "NIL"}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{
                  border: "1px solid",
                  borderBottom: 0,
                  width: "100%",
                  padding: 5,
                }}
              >
                <h6 className="fw-bold">
                  {grossGSLI !== 0 ? grossGSLI : "NIL"}
                </h6>
              </th>
              <th
                suppressHydrationWarning
                style={{
                  border: "1px solid",
                  borderBottom: 0,
                  width: "100%",
                  padding: 5,
                }}
              >
                <h6 className="fw-bold">{grossPTax}</h6>
              </th>
              <th
                suppressHydrationWarning
                style={{
                  border: "1px solid",
                  borderBottom: 0,
                  width: "100%",
                  padding: 5,
                }}
              >
                <h6 className="fw-bold">NIL</h6>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        className="my-5"
        style={{
          marginTop: 60,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          paddingRight: 20,
        }}
      >
        <h5>SIGNATURE OF THE INCUMBENT</h5>
      </div>
      <div className="mx-auto my-3 noprint">
        <button
          type="button"
          className="btn btn-primary text-white font-weight-bold p-2 rounded"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.print();
            }
          }}
        >
          Print Statement
        </button>
      </div>

      <div className="mx-auto noprint mb-5">
        <button
          type="button"
          className="btn btn-info text-white font-weight-bold m-2 p-2 rounded"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
      {/* <div className="mx-auto noprint mb-5">
        <IncomeTax
          data={{
            id,
            tname,
            school,
            pan,
            phone,
            disability,
            thisYear,
            nextYear,
            finYear,
            marchSalary,
            marchBasic,
            marchAddl,
            marchDA,
            marchHRA,
            marchMA,
            marchGross,
            marchGPF,
            marchGSLI,
            bonus,
            marchPTax,
            aprilSalary,
            aprilBasic,
            aprilAddl,
            aprilDA,
            aprilHRA,
            aprilMA,
            aprilGross,
            aprilGPF,
            aprilGSLI,
            aprilPTax,
            maySalary,
            mayBasic,
            mayAddl,
            mayDA,
            mayHRA,
            mayMA,
            mayGross,
            mayGPF,
            mayGSLI,
            mayPTax,
            juneSalary,
            juneBasic,
            juneAddl,
            juneDA,
            juneHRA,
            juneMA,
            juneGross,
            juneGPF,
            juneGSLI,
            junePTax,
            julySalary,
            julyBasic,
            julyAddl,
            julyDA,
            aprilIR,
            julyHRA,
            julyMA,
            julyGross,
            julyGPF,
            julyGSLI,
            julyPTax,
            augustSalary,
            augustBasic,
            augustAddl,
            augustDA,
            augustHRA,
            augustMA,
            augustGross,
            augustGPF,
            augustGSLI,
            augustPTax,
            septemberSalary,
            septemberBasic,
            septemberAddl,
            septemberDA,
            septemberHRA,
            septemberMA,
            septemberGross,
            septemberGPF,
            septemberGSLI,
            septemberPTax,
            octoberSalary,
            octoberBasic,
            octoberAddl,
            octoberDA,
            octoberHRA,
            octoberMA,
            octoberGross,
            octoberGPF,
            octoberGSLI,
            octoberPTax,
            novemberSalary,
            novemberBasic,
            novemberAddl,
            novemberDA,
            novemberHRA,
            novemberMA,
            novemberGross,
            novemberGPF,
            novemberGSLI,
            novemberPTax,
            decemberSalary,
            decemberBasic,
            decemberAddl,
            decemberDA,
            decemberHRA,
            decemberMA,
            decemberGross,
            decemberGPF,
            decemberGSLI,
            decemberPTax,
            januarySalary,
            januaryBasic,
            januaryAddl,
            januaryDA,
            januaryHRA,
            januaryMA,
            januaryGross,
            januaryGPF,
            januaryGSLI,
            januaryPTax,
            februarySalary,
            februaryBasic,
            februaryAddl,
            februaryDA,
            februaryHRA,
            februaryMA,
            februaryGross,
            februaryGPF,
            februaryGSLI,
            februaryPTax,
            grossBasic,
            grossAddl,
            grossDA,
            grossHRA,
            grossMA,
            GrossPAY,
            grossGPF,
            grossGSLI,
            grossPTax,
          }}
        />
      </div> */}
    </div>
  );
}
