"use client";
import React, { useState } from "react";
import { excelCeilingRound } from "../../modules/calculatefunctions";
export default function DAArrearCalculation() {
  const DADifference = [
    {
      year: 2008,
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0.1,
      May: 0.1,
      Jun: 0.06,
      Jul: 0.1,
      Aug: 0.1,
      Sep: 0.1,
      Oct: 0.1,
      Nov: 0.07,
      Dec: 0.07,
    },
    {
      year: 2009,
      Jan: 0.13,
      Feb: 0.13,
      Mar: 0.1,
      Apr: 0.06,
      May: 0.06,
      Jun: 0.06,
      Jul: 0.11,
      Aug: 0.11,
      Sep: 0.11,
      Oct: 0.11,
      Nov: 0.11,
      Dec: 0.05,
    },
    {
      year: 2010,
      Jan: 0.13,
      Feb: 0.13,
      Mar: 0.13,
      Apr: 0.08,
      May: 0.08,
      Jun: 0.08,
      Jul: 0.18,
      Aug: 0.18,
      Sep: 0.18,
      Oct: 0.18,
      Nov: 0.18,
      Dec: 0.1,
    },
    {
      year: 2011,
      Jan: 0.16,
      Feb: 0.16,
      Mar: 0.16,
      Apr: 0.16,
      May: 0.16,
      Jun: 0.16,
      Jul: 0.23,
      Aug: 0.23,
      Sep: 0.23,
      Oct: 0.23,
      Nov: 0.23,
      Dec: 0.23,
    },
    {
      year: 2012,
      Jan: 0.2,
      Feb: 0.2,
      Mar: 0.2,
      Apr: 0.2,
      May: 0.2,
      Jun: 0.2,
      Jul: 0.27,
      Aug: 0.27,
      Sep: 0.27,
      Oct: 0.27,
      Nov: 0.27,
      Dec: 0.27,
    },
    {
      year: 2013,
      Jan: 0.28,
      Feb: 0.28,
      Mar: 0.28,
      Apr: 0.28,
      May: 0.28,
      Jun: 0.28,
      Jul: 0.38,
      Aug: 0.38,
      Sep: 0.38,
      Oct: 0.38,
      Nov: 0.38,
      Dec: 0.38,
    },
    {
      year: 2014,
      Jan: 0.42,
      Feb: 0.42,
      Mar: 0.42,
      Apr: 0.42,
      May: 0.42,
      Jun: 0.42,
      Jul: 0.49,
      Aug: 0.49,
      Sep: 0.49,
      Oct: 0.49,
      Nov: 0.49,
      Dec: 0.49,
    },
    {
      year: 2015,
      Jan: 0.48,
      Feb: 0.48,
      Mar: 0.48,
      Apr: 0.48,
      May: 0.48,
      Jun: 0.48,
      Jul: 0.54,
      Aug: 0.54,
      Sep: 0.54,
      Oct: 0.54,
      Nov: 0.54,
      Dec: 0.54,
    },
    {
      year: 2016,
      Jan: 0.5,
      Feb: 0.5,
      Mar: 0.5,
      Apr: 0.5,
      May: 0.5,
      Jun: 0.5,
      Jul: 0.57,
      Aug: 0.57,
      Sep: 0.57,
      Oct: 0.57,
      Nov: 0.57,
      Dec: 0.57,
    },
    {
      year: 2017,
      Jan: 0.51,
      Feb: 0.51,
      Mar: 0.51,
      Apr: 0.51,
      May: 0.51,
      Jun: 0.51,
      Jul: 0.54,
      Aug: 0.54,
      Sep: 0.54,
      Oct: 0.54,
      Nov: 0.54,
      Dec: 0.54,
    },
    {
      year: 2018,
      Jan: 0.42,
      Feb: 0.42,
      Mar: 0.42,
      Apr: 0.42,
      May: 0.42,
      Jun: 0.42,
      Jul: 0.48,
      Aug: 0.48,
      Sep: 0.48,
      Oct: 0.48,
      Nov: 0.48,
      Dec: 0.48,
    },
    {
      year: 2019,
      Jan: 0.29,
      Feb: 0.29,
      Mar: 0.29,
      Apr: 0.29,
      May: 0.29,
      Jun: 0.29,
      Jul: 0.39,
      Aug: 0.39,
      Sep: 0.39,
      Oct: 0.39,
      Nov: 0.39,
      Dec: 0.39,
    },
  ];
  const [joiningPeriod, setJoiningPeriod] = useState("before");
  const [joiningDate, setJoiningDate] = useState("");
  const [basicPay, setBasicPay] = useState("");
  const [hasPromotion, setHasPromotion] = useState(false);
  const [promotionDate, setPromotionDate] = useState("");
  const [promotionAmount, setPromotionAmount] = useState("");
  const [arrears, setArrears] = useState([]);
  const [totalArrear, setTotalArrear] = useState(0);

  const calculateArrears = () => {
    // Validate required inputs
    if (!basicPay || (joiningPeriod === "between" && !joiningDate)) return;
    if (hasPromotion && (!promotionDate || !promotionAmount)) {
      alert("Please fill all promotion details");
      return;
    }

    // Initialize variables
    const startYear = 2008;
    const endYear = 2019;
    let currentBasic = parseFloat(basicPay);
    let results = [];
    let grandTotal = 0;

    // Date handling
    const joinDate = new Date(joiningDate);
    const promoDate = new Date(promotionDate);
    let promotionApplied = false;

    // Validate promotion date
    if (hasPromotion) {
      if (
        promoDate < new Date("2008-04-01") ||
        promoDate > new Date("2019-12-31")
      ) {
        alert("Promotion date must be between 01/04/2008 and 31/12/2019");
        return;
      }
    }

    // Determine start point
    let startFromYear =
      joiningPeriod === "between" ? joinDate.getFullYear() : startYear;
    let startFromMonth =
      joiningPeriod === "between" ? joinDate.getMonth() + 1 : 4;

    // Main calculation loop
    for (let year = startFromYear; year <= endYear; year++) {
      let yearTotal = 0;
      const yearData = DADifference.find((d) => d.year === year);

      for (let month = 1; month <= 12; month++) {
        // Skip months before start period
        if (year === startFromYear && month < startFromMonth) continue;
        if (year === endYear && month > 12) break;

        // Handle promotion
        if (hasPromotion && !promotionApplied) {
          const currentDate = new Date(year, month - 1);
          if (currentDate >= promoDate) {
            currentBasic = parseFloat(promotionAmount);
            promotionApplied = true;
          }
        }

        // Apply annual increment
        if (
          month === 7 &&
          year >
            (joiningPeriod === "between" ? joinDate.getFullYear() : startYear)
        ) {
          // Skip increment in joining year if joined after July
          if (
            !(
              joiningPeriod === "between" &&
              year === joinDate.getFullYear() &&
              joinDate.getMonth() + 1 > 7
            )
          ) {
            currentBasic = excelCeilingRound(currentBasic * 1.03, 10);
          }
        }

        // Get month name and DA rate
        const monthName = new Date(year, month - 1).toLocaleString("default", {
          month: "short",
        });
        const daRate = yearData ? yearData[monthName] : 0;

        // Calculate days in month and effective days
        const daysInMonth = new Date(year, month, 0).getDate();
        let daysCount = daysInMonth;

        // Handle partial month for joining month
        if (
          year === startFromYear &&
          month === startFromMonth &&
          joiningPeriod === "between"
        ) {
          daysCount = daysInMonth - joinDate.getDate() + 1;
        }

        // Calculate monthly arrear
        const monthlyArrear = currentBasic * daRate * (daysCount / daysInMonth);
        yearTotal += monthlyArrear;
        grandTotal += monthlyArrear;

        // Store results
        results.push({
          year,
          month: monthName,
          basicPay: currentBasic,
          daRate: `${(daRate * 100).toFixed(0)}%`,
          arrear: monthlyArrear.toFixed(2),
        });
      }

      // Add year total
      if (results.length > 0 && results[results.length - 1].year === year) {
        results.push({
          year,
          month: "Monthly Total Year-",
          basicPay: "-",
          daRate: "-",
          arrear: yearTotal.toFixed(2),
        });
      }
    }

    // Update state
    setArrears(results);
    setTotalArrear(grandTotal);
  };
  const handleReset = () => {
    // Reset all states
    setJoiningPeriod("before");
    setJoiningDate("");
    setBasicPay("");
    setHasPromotion(false);
    setPromotionDate("");
    setPromotionAmount("");
    setArrears([]);
    setTotalArrear(0);
  };
  return (
    <div className="container my-4">
      <div className="my-3">
        <h2 className="mb-4">DA Arrear Calculator</h2>
        <h5 className="mb-4">
          For West Bengal State Government Employees (April 2008 - December
          2019)
        </h5>
        <img
          src="https://wbpay.in/wp-content/smush-webp/2025/05/Arrear-DA-Calculator-780x470.jpg.webp"
          alt="daimage"
          className="w-50 rounded"
        />
      </div>
      <div className="container mx-auto">
        <div className="card p-3 mb-4 mx-auto">
          <div className="form-group mb-3 mx-auto">
            <label>Joining Period:</label>
            <div className="ml-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={joiningPeriod === "before"}
                  onChange={() => setJoiningPeriod("before")}
                />
                <label className="form-check-label">
                  Joined before 01/04/2008
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={joiningPeriod === "between"}
                  onChange={() => setJoiningPeriod("between")}
                />
                <label className="form-check-label">
                  Joined between 01/04/2008 and 31/12/2019
                </label>
              </div>
            </div>
          </div>

          {joiningPeriod === "between" && (
            <div className="form-group mb-3 col-md-6 mx-auto">
              <label>Actual Joining Date:</label>
              <input
                type="date"
                className="form-control m-3"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                min="2008-04-01"
                max="2019-12-31"
              />
            </div>
          )}

          <div className="form-group mb-3 col-md-6 mx-auto">
            <label>
              {joiningPeriod === "before"
                ? "Basic Pay (incl. Grade Pay) as on 01/04/2008:"
                : "Basic Pay (incl. Grade Pay) as on Actual Joining Date:"}
            </label>
            <input
              type="number"
              className="form-control m-3"
              value={basicPay}
              onChange={(e) => setBasicPay(e.target.value)}
            />
          </div>
          <div className="form-group mb-3 mx-auto">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={hasPromotion}
                onChange={(e) => setHasPromotion(e.target.checked)}
                id="promotionCheck"
              />
              <label className="form-check-label" htmlFor="promotionCheck">
                Had a Promotion / Pay Revision during Apr 2008 - Dec 2019?
              </label>
            </div>
          </div>
          {hasPromotion && (
            <>
              <div className="form-group mb-3 col-md-6 mx-auto">
                <label>Promotion/Revision Date:</label>
                <input
                  type="date"
                  className="form-control"
                  value={promotionDate}
                  onChange={(e) => setPromotionDate(e.target.value)}
                  min="2008-04-01"
                  max="2019-12-31"
                />
              </div>

              <div className="form-group mb-3 col-md-6 mx-auto">
                <label>Revised Basic Pay (incl. Grade Pay):</label>
                <input
                  type="number"
                  className="form-control"
                  value={promotionAmount}
                  onChange={(e) => setPromotionAmount(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="mx-auto my-3 d-flex justify-content-between">
            <div>
              <button
                className="btn btn-primary"
                onClick={calculateArrears}
                disabled={
                  !basicPay || (joiningPeriod === "between" && !joiningDate)
                }
              >
                Calculate
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {arrears.length > 0 && (
        <div className="mt-4">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Month & Year</th>
                  <th>Basic Pay (₹)</th>
                  <th>DA Difference (%)</th>
                  <th>Monthly Arrear (₹)</th>
                </tr>
              </thead>
              <tbody>
                {arrears.map((row, index) => (
                  <tr key={index}>
                    <td>{`${row.month} ${row.year}`}</td>
                    <td>{row.basicPay}</td>
                    <td>{row.daRate}</td>
                    <td>{row.arrear}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="alert alert-success mt-3">
            <h4>Grand Total Arrear: ₹{totalArrear.toFixed(0)}</h4>
            <h5>
              25% of Total Arrear (Indicative): ₹
              {(totalArrear * 0.25).toFixed(0)}
            </h5>
          </div>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
