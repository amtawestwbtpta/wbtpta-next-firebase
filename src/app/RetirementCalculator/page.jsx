"use client";
import React, { useState } from "react";
import { getMonthDays } from "../../modules/calculatefunctions";

function RetirementCalculator() {
  const [joiningDate, setJoiningDate] = useState("");
  const [retirementDate, setRetirementDate] = useState("");

  const calculateRetirementDate = () => {
    if (joiningDate) {
      const joinedYear = parseInt(joiningDate.substring(0, 4), 10);
      const joinedMonth = parseInt(joiningDate.substring(5, 7), 10);
      const currentYear = new Date().getFullYear();
      const retirementYear = joinedYear + 60;

      let retirementMonth = joinedMonth;
      let retirementDay = new Date(
        retirementYear,
        retirementMonth,
        0
      ).getDate();

      if (currentYear >= retirementYear) {
        retirementMonth = 12;
        retirementDay = new Date(retirementYear, retirementMonth, 0).getDate();
      }

      if (new Date(joiningDate).getDate() === 1 && retirementMonth === 1) {
        setRetirementDate(
          `${retirementDay.toString().padStart(2, "0")}-12-${
            retirementYear - 1
          }`
        );
      } else if (
        new Date(joiningDate).getDate() === 1 &&
        retirementMonth === 2
      ) {
        setRetirementDate(`31-01-${retirementYear}`);
      } else if (
        new Date(joiningDate).getDate() === 1 &&
        retirementMonth === 3 &&
        (retirementYear / 4) % 1 === 0
      ) {
        setRetirementDate(`29-02-${retirementYear}`);
      } else if (
        new Date(joiningDate).getDate() === 1 &&
        retirementMonth === 12
      ) {
        setRetirementDate(`30-11-${retirementYear}`);
      } else if (
        new Date(joiningDate).getDate() === 1 &&
        retirementMonth === 3
      ) {
        setRetirementDate(`28-02-${retirementYear}`);
      } else if (new Date(joiningDate).getDate() === 1) {
        setRetirementDate(
          `${getMonthDays[retirementMonth]}-${(retirementMonth - 1)
            .toString()
            .padStart(2, "0")}-${retirementYear}`
        );
      } else {
        setRetirementDate(
          `${retirementDay.toString().padStart(2, "0")}-${retirementMonth
            .toString()
            .padStart(2, "0")}-${retirementYear}`
        );
      }
    } else {
      alert("Please enter a valid joining date.");
      return;
    }
  };

  return (
    <div className="container">
      <h3 className="my-3 text-center text-primary">
        Retirement Date Calculator
      </h3>
      <h5 className="mb-3 text-center text-primary" htmlFor="joiningDate">
        Set Date Of Birth:
      </h5>
      <input
        type="date"
        className="form-control mb-3"
        id="joiningDate"
        value={joiningDate}
        onChange={(e) => setJoiningDate(e.target.value)}
      />
      <button
        className="btn btn-sm btn-primary mb-3"
        onClick={calculateRetirementDate}
      >
        Calculate
      </button>
      <br />

      {retirementDate && (
        <h5 className="mb-3 text-center text-primary">
          Your retirement date will be: {retirementDate}
        </h5>
      )}
    </div>
  );
}

export default RetirementCalculator;
