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
import axios from "axios";

export default function Page() {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Please Wait...</p>,
    }
  );
  const thisYear = new Date().getFullYear();
  const nextYear = thisYear + 1;
  const prevYear = thisYear - 1;
  const dataExist = true;
  let PAYSLIPMONTHS;
  if (dataExist) {
    PAYSLIPMONTHS = [
      `January-${thisYear}`,
      `February-${thisYear}`,
      `March-${thisYear}`,
      `April-${thisYear}`,
      `May-${thisYear}`,
      `June-${thisYear}`,
      `July-${thisYear}`,
      `August-${thisYear}`,
      `September-${thisYear}`,
      `October-${thisYear}`,
      `November-${thisYear}`,
      `December-${thisYear}`,
      `January-${nextYear}`,
      `February-${nextYear}`,
      `March-${nextYear}`,
    ];
  } else {
    PAYSLIPMONTHS = [`January-${prevYear}`, `February-${prevYear}`];
  }
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
  let ir = Math.round(mbasic * 0.04);
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
  const [loader, setLoader] = useState(false);
  const [index, setIndex] = useState(today.getMonth() - 1);
  const [month, setMonth] = useState(GetMonthName(today.getMonth() - 1));
  const [year, setYear] = useState(today.getFullYear());
  const [prevJanuary, setPrevJanuary] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [prevFebruary, setPrevFebruary] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [march, setMarch] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [april, setApril] = useState([]);
  const [may, setMay] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [june, setJune] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [july, setJuly] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [august, setAugust] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [september, setSeptember] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [october, setOctober] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [november, setNovember] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [december, setDecember] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [january, setJanuary] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });
  const [february, setFebruary] = useState({
    basic: 29800,
    daPercent: 0.14,
    gpf: 2000,
    ma: 500,
  });

  if (index === 0) {
    basicpay = january?.basic;
    da = Math.round(basicpay * january?.daPercent);
    pfund = january?.gpf;
    ma = january?.ma;
  } else if (index === 1) {
    basicpay = february?.basic;
    da = Math.round(basicpay * february?.daPercent);
    pfund = february?.gpf;
    ma = february?.ma;
  } else if (index === 2) {
    basicpay = march?.basic;
    da = Math.round(basicpay * march?.daPercent);
    pfund = march?.gpf;
    ma = march?.ma;
  } else if (index === 3) {
    basicpay = april?.basic;
    da = Math.round(basicpay * april?.daPercent);
    pfund = april?.gpf;
    ma = april?.ma;
  } else if (index === 4) {
    basicpay = may?.basic;
    da = Math.round(basicpay * may?.daPercent);
    pfund = may?.gpf;
    ma = may?.ma;
  } else if (index === 5) {
    basicpay = june?.basic;
    da = Math.round(basicpay * june?.daPercent);
    pfund = june?.gpf;
    ma = june?.ma;
  } else if (index === 6) {
    basicpay = july?.basic;
    da = Math.round(basicpay * july?.daPercent);
    pfund = july?.gpf;
    ma = july?.ma;
  } else if (index === 7) {
    basicpay = august?.basic;
    da = Math.round(basicpay * august?.daPercent);
    pfund = august?.gpf;
    ma = august?.ma;
  } else if (index === 8) {
    basicpay = september?.basic;
    da = Math.round(basicpay * september?.daPercent);
    pfund = september?.gpf;
    ma = september?.ma;
  } else if (index === 9) {
    basicpay = october?.basic;
    da = Math.round(basicpay * october?.daPercent);
    pfund = october?.gpf;
    ma = october?.ma;
  } else if (index === 10) {
    basicpay = november?.basic;
    da = Math.round(basicpay * november?.daPercent);
    pfund = november?.gpf;
    ma = november?.ma;
  } else if (index === 11) {
    basicpay = december?.basic;
    da = Math.round(basicpay * december?.daPercent);
    pfund = december?.gpf;
    ma = december?.ma;
  } else if (index === 12) {
    basicpay = january?.basic;
    da = Math.round(basicpay * january?.daPercent);
    pfund = january?.gpf;
    ma = january?.ma;
  } else if (index === 13) {
    basicpay = february?.basic;
    da = Math.round(basicpay * february?.daPercent);
    pfund = february?.gpf;
    ma = february?.ma;
  }
  let level = ropa(basicpay).lv;
  let cell = ropa(basicpay).ce;

  hra = Math.round(basicpay * HRA);

  if (dataYear === 2024 && index === 7) {
    gross = basicpay + da + ir + hra + addl + ma;
  } else {
    gross = basicpay + da + hra + addl + ma;
  }

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
  const getSalary = async () => {
    setLoader(true);
    const qA = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/prevJanuary.json"
    );
    const qB = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/prevFebruary.json"
    );
    const q1 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/march.json"
    );
    const q2 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/april.json"
    );
    const q3 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/may.json"
    );
    const q4 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/june.json"
    );
    const q5 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/july.json"
    );
    const q6 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/august.json"
    );
    const q7 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/september.json"
    );
    const q8 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/october.json"
    );
    const q9 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/november.json"
    );
    const q10 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/december.json"
    );
    const q11 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/january.json"
    );
    const q12 = await axios.get(
      "https://raw.githubusercontent.com/amtawestwbtpta/salary/main/february.json"
    );
    setPrevJanuary(qA.data?.filter((el) => el.id === data?.id)[0]);
    setPrevFebruary(qB.data?.filter((el) => el.id === data?.id)[0]);
    setMarch(q1.data?.filter((el) => el.id === data?.id)[0]);
    setApril(q2.data?.filter((el) => el.id === data?.id)[0]);
    setMay(q3.data?.filter((el) => el.id === data?.id)[0]);
    setJune(q4.data?.filter((el) => el.id === data?.id)[0]);
    setJuly(q5.data?.filter((el) => el.id === data?.id)[0]);
    setAugust(q6.data?.filter((el) => el.id === data?.id)[0]);
    setSeptember(q7.data?.filter((el) => el.id === data?.id)[0]);
    setOctober(q8.data?.filter((el) => el.id === data?.id)[0]);
    setNovember(q9.data?.filter((el) => el.id === data?.id)[0]);
    setDecember(q10.data?.filter((el) => el.id === data?.id)[0]);
    setJanuary(q11.data?.filter((el) => el.id === data?.id)[0]);
    setFebruary(q12.data?.filter((el) => el.id === data?.id)[0]);
    setLoader(false);
  };

  useEffect(() => {}, [
    month,
    index,
    prevJanuary,
    prevFebruary,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
    january,
    february,
  ]);
  useEffect(() => {
    document.title = `PAYSLIP OF ${tname?.toUpperCase()} OF ${school?.toUpperCase()} FOR THE MONTH OF ${lastmonth.toUpperCase()}`;
    if (key !== serverKey) {
      router.push("/login");
    }
    getSalary();
    // eslint-disable-next-line
  }, []);

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
            defaultValue={month + "-" + year + "-" + index}
            onChange={(e) => {
              if (e.target.value !== "") {
                setMonth(e.target.value.split("-")[0]);
                setYear(e.target.value.split("-")[1]);
                setIndex(parseInt(e.target.value.split("-")[2]));
              } else {
                toast.error("Please select a valid month");
              }
            }}
          >
            <option value="">Select Month </option>
            {PAYSLIPMONTHS.map((el, ind) => {
              return (
                <option value={el + "-" + ind} key={ind}>
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
                empid,
                pan,
                addl,
                da,
                hra,
                ma,
                gross,
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
                dataYear,
                index,
                ir,
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
