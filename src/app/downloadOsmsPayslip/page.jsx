"use client";
import ropa from "../../modules/ropa";
import React, { Suspense, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GetMonthName,
  months,
  RoundTo,
} from "../../modules/calculatefunctions";
import { DA, HRA, NEXTDA } from "../../modules/constants";
import OSMSPaySLip from "../../components/OSMSPaySLip";
import dynamic from "next/dynamic";

export default function Page() {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Please Wait...</p>,
    }
  );
  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get("data"));
  const key = searchParams.get("key");
  const serverKey = process.env.NEXT_PUBLIC_ANYKEY;
  const { state, stateObject } = useGlobalContext();
  const router = useRouter();
  // const data = stateObject;
  let details = data;
  let tname,
    desig,
    school,
    disability,
    empid,
    pan,
    dataYear,
    basic,
    mbasic,
    addl,
    da,
    hra,
    ma,
    gross,
    prevmbasic,
    gpf,
    gpfprev,
    julyGpf,
    ptax,
    gsli,
    udise,
    bank,
    account,
    ifsc;

  tname = details?.tname;
  desig = details?.desig;
  school = details?.school;
  disability = details?.disability;
  empid = details?.empid;
  pan = details?.pan;
  basic = parseInt(details?.basic);
  mbasic = parseInt(details?.mbasic);
  addl = parseInt(details?.addl);
  ma = parseInt(details?.ma);
  gpf = parseInt(details?.gpf);
  gpfprev = parseInt(details?.gpfprev);
  julyGpf = parseInt(details?.julyGpf);
  gsli = parseInt(details?.gsli);
  udise = details?.udise;
  bank = details?.bank;
  account = details?.account;
  ifsc = details?.ifsc;
  dataYear = details?.dataYear;

  let netpay;

  let basicpay;
  let pfund;
  let date = new Date();
  let today = new Date();
  // let date = new Date();
  const [index, setIndex] = useState(today.getMonth());
  const [month, setMonth] = useState(GetMonthName(today.getMonth() - 1));
  // let junelast = new Date(`${date.getFullYear()}-07-31`);
  if (dataYear === date.getFullYear()) {
    if (index > 6) {
      basicpay = basic;
      da = Math.round(basicpay * DA);
      pfund = julyGpf;
    } else if (index < 7 || index > 3) {
      basicpay = mbasic;
      da = Math.round(basicpay * DA);
      pfund = gpf;
    } else {
      basicpay = mbasic;
      pfund = gpfprev;
      da = Math.round(basicpay * PREVDA);
    }
  } else if (dataYear === date.getFullYear() - 1) {
    basicpay = prevmbasic;
    da = Math.round(basicpay * PREV6DA);
    pfund = gpfprev;
  } else {
    pfund = gpfprev;
    if (index > 6) {
      basicpay = RoundTo(basic + basic * 0.03, 100);
      da = Math.round(basicpay * NEXTDA);
    } else {
      basicpay = basic;
      da = Math.round(basicpay * DA);
    }
  }
  let level = ropa(basicpay).lv;
  let cell = ropa(basicpay).ce;

  hra = Math.round(basicpay * HRA);

  gross = basicpay + da + hra + addl + ma;

  if (gross > 40000) {
    ptax = 200;
  } else if (gross > 25000) {
    ptax = 150;
  } else if (gross > 15000) {
    ptax = 130;
  } else if (gross > 10000) {
    ptax = 110;
  } else {
    ptax = 0;
  }

  if (disability === "YES") {
    ptax = 0;
  }

  let deduction = gsli + pfund + ptax;

  netpay = gross - deduction;

  let lastmonth = GetMonthName(today.getMonth() - 1);
  useEffect(() => {
    document.title = `PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR THE MONTH OF ${lastmonth.toUpperCase()}`;
    if (state !== "admin" || key !== serverKey) {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
  }, [month, index]);

  return (
    <Suspense>
      <div>
        <div className="mx-auto my-3 noprint">
          <button
            type="button"
            className="btn btn-info text-white font-weight-bold p-2 rounded"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
        <div className="mx-auto my-3 col-md-2 noprint">
          <h6 className="text-primary">Select Salary Month:</h6>
          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-sm example"
            name="Month"
            required
            defaultValue={month + "-" + (index + 1)}
            onChange={(e) => {
              setMonth(e.target.value.split("-")[0]);
              setIndex(parseInt(e.target.value.split("-")[1]));
            }}
          >
            <option value="">Select Month </option>
            {months.map((el, ind) => {
              return (
                <option value={el + "-" + (ind + 1)} key={ind}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <PDFDownloadLink
          document={
            <OSMSPaySLip
              data={{
                tname,
                desig,
                school,
                disability,
                empid,
                pan,
                dataYear,
                basic,
                mbasic,
                addl,
                da,
                hra,
                ma,
                gross,
                prevmbasic,
                gpf,
                gpfprev,
                julyGpf,
                ptax,
                gsli,
                udise,
                bank,
                account,
                ifsc,
                lastmonth,
                month,
                netpay,
                basicpay,
                pfund,
                today,
                level,
                cell,
                deduction,
              }}
            />
          }
          fileName={`PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR THE MONTH OF ${lastmonth.toUpperCase()}.pdf`}
          style={{
            textDecoration: "none",
            padding: "10px",
            color: "#fff",
            backgroundColor: "navy",
            border: "1px solid #4a4a4a",
            width: "40%",
            borderRadius: 10,
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Please Wait..." : "Download Payslip"
          }
        </PDFDownloadLink>
        {/* <OSMSPaySLip
          data={{
            tname,
            desig,
            school,
            disability,
            empid,
            pan,
            dataYear,
            basic,
            mbasic,
            addl,
            da,
            hra,
            ma,
            gross,
            prevmbasic,
            gpf,
            gpfprev,
            julyGpf,
            ptax,
            gsli,
            udise,
            bank,
            account,
            ifsc,
            lastmonth,
            month,
            netpay,
            basicpay,
            pfund,
            today,
            level,
            cell,
            deduction,
          }}
        /> */}
      </div>
    </Suspense>
  );
}
