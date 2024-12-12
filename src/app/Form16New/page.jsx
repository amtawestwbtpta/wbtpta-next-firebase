"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter, useSearchParams } from "next/navigation";
import {
  IndianFormat,
  ptaxCalc,
  randBetween,
  roundSo,
  CalculateIncomeTax,
} from "../../modules/calculatefunctions";
import dynamic from "next/dynamic";
import { firestore } from "../../context/FirbaseContext";
import Loader from "../../components/Loader";
import axios from "axios";
import { collection, getDocs, query } from "firebase/firestore";
import Form16New from "../../components/Form16New";
export default function Page() {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Please Wait...</p>,
    }
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get("data"));
  const [loader, setLoader] = useState(false);
  const { deductionState, setDeductionState } = useGlobalContext();
  const { id, tname, school, pan, disability, desig, fname } = data;
  const date = new Date();
  const month = date.getMonth() + 1;
  let thisYear, nextYear, prevYear;
  if (month < 4) {
    thisYear = date.getFullYear();
    nextYear = date.getFullYear() + 1;
    prevYear = date.getFullYear() - 1;
  } else {
    thisYear = date.getFullYear();
    nextYear = date.getFullYear() + 1;
    prevYear = date.getFullYear();
  }
  const [march, setMarch] = useState([]);
  const [april, setApril] = useState([]);
  const [may, setMay] = useState([]);
  const [june, setJune] = useState([]);
  const [july, setJuly] = useState([]);
  const [august, setAugust] = useState([]);
  const [september, setSeptember] = useState([]);
  const [october, setOctober] = useState([]);
  const [november, setNovember] = useState([]);
  const [december, setDecember] = useState([]);
  const [january, setJanuary] = useState([]);
  const [february, setFebruary] = useState([]);
  const finYear = `${thisYear}-${nextYear}`;
  const marchSalary = march.filter((el) => el.id === id)[0];
  const marchArrear = marchSalary?.arrear;
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
  const aprilArrear = aprilSalary?.arrear;
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
  const mayArrear = maySalary?.arrear;
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
  const juneArrear = juneSalary?.arrear;
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
  const julyArrear = julySalary?.arrear;
  const julyBasic = julySalary?.basic;
  const julyAddl = julySalary?.addl;
  const julyDA = Math.round(julySalary?.basic * julySalary?.daPercent);
  const aprilIR = Math.round(aprilSalary?.basic * 0.04);
  const julyHRA = Math.round(julySalary?.basic * julySalary?.hraPercent);
  const julyMA = julySalary?.ma;
  const julyGross = julyBasic + julyDA + julyHRA + julyAddl + julyMA + aprilIR;
  const julyGPF = julySalary?.gpf;
  const julyGSLI = julySalary?.gsli;
  const julyPTax = disability === "YES" ? 0 : ptaxCalc(julyGross);
  const augustSalary = august.filter((el) => el.id === id)[0];
  const augustArrear = augustSalary?.arrear;
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
  const septemberArrear = septemberSalary?.arrear;
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
  const octoberArrear = octoberSalary?.arrear;
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
  const novemberArrear = novemberSalary?.arrear;
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
  const decemberArrear = decemberSalary?.arrear;
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
  const januaryArrear = januarySalary?.arrear;
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
  const februaryArrear = februarySalary?.arrear;
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
    februaryGross +
    bonus;
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
  const teacherDeduction = deductionState?.filter((el) => el.id === id)[0];
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
  const AllGross =
    GrossPAY +
    marchArrear +
    aprilArrear +
    mayArrear +
    juneArrear +
    julyArrear +
    augustArrear +
    septemberArrear +
    octoberArrear +
    novemberArrear +
    decemberArrear +
    januaryArrear +
    februaryArrear +
    otherIncome;
  const GrossTotalIncome =
    AllGross - grossPTax - 50000 + BankInterest - hbLoanInterest;
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
    grossGSLI +
    nscInterest;
  const limitVIA = deductionVIA >= 150000 ? 150000 : deductionVIA;
  const OtherVIA =
    BankInterest +
    mediclaim +
    disabilityDeduction +
    terminalDisease +
    educationLoan +
    charity +
    handicapTreatment;
  const TotalIncome = GrossTotalIncome - limitVIA - OtherVIA;
  const TotalRoundOffIncome = roundSo(TotalIncome, 10);
  const CalculatedIT = CalculateIncomeTax(TotalRoundOffIncome);
  const isUnderRebate = CalculatedIT >= 12500 ? false : true;
  const eduCess = CalculatedIT * 0.04;
  const AddedEduCess = CalculatedIT + CalculatedIT * 0.04;
  const getDeduction = async () => {
    if (deductionState.length === 0) {
      setLoader(true);
      const q = query(collection(firestore, "deduction"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }));
      setDeductionState(data);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const getSalary = async () => {
    setLoader(true);
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
    setMarch(q1.data);
    setApril(q2.data);
    setMay(q3.data);
    setJune(q4.data);
    setJuly(q5.data);
    setAugust(q6.data);
    setSeptember(q7.data);
    setOctober(q8.data);
    setNovember(q9.data);
    setDecember(q10.data);
    setJanuary(q11.data);
    setFebruary(q12.data);
    setLoader(false);
  };

  useEffect(() => {
    getDeduction();
    getSalary();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
  }, [
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
  return (
    <div className="container-fluid my-3">
      {loader ? (
        <Loader />
      ) : (
        <div>
            <h3 className="my-3">Download Form 16</h3>
          {/* <Form16New
            data={{
              tname,
              school,
              pan,
              desig,
              fname,
              thisYear,
              nextYear,
              finYear,
              grossGPF,
              grossGSLI,
              grossPTax,
              AllGross,
              limitVIA,
              TotalIncome,
              TotalRoundOffIncome,
              CalculatedIT,
              isUnderRebate,
              eduCess,
              AddedEduCess,
              BankInterest,
              lic,
              ppf,
              nsc,
              mediclaim,
              disabilityDeduction,
              tds,
            }}
          /> */}
          <PDFDownloadLink
            document={
              <Form16New
                data={{
                  tname,
                  school,
                  pan,
                  desig,
                  fname,
                  thisYear,
                  nextYear,
                  finYear,
                  grossGPF,
                  grossGSLI,
                  grossPTax,
                  AllGross,
                  limitVIA,
                  TotalIncome,
                  TotalRoundOffIncome,
                  CalculatedIT,
                  isUnderRebate,
                  eduCess,
                  AddedEduCess,
                  BankInterest,
                  lic,
                  ppf,
                  nsc,
                  mediclaim,
                  disabilityDeduction,
                  tds,
                }}
              />
            }
            fileName={`Form 16 of ${tname} of ${school}.pdf`}
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
              loading ? "Please Wait..." : "Download Form 16"
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}
