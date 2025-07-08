"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { readCSVFile } from "../../modules/calculatefunctions";
import dynamic from "next/dynamic";
import HRADeclaration from "../../pdfs/HRADeclaration";

export default function HRA() {
  const PDFDownloadLink = dynamic(
    async () =>
      await import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Please Wait...</p>,
    }
  );
  const { state, stateObject } = useGlobalContext();
  const router = useRouter();
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const salaryMonth = month < 5 ? "january" : "july";
  const { tname, school, id } = stateObject;
  const [loader, setLoader] = useState(false);

  const [salary, setSalary] = useState({
    tname,
    school,
    basic: 0,
    hra: 0,
    salaryMonth,
    year,
  });
  const getSalary = async () => {
    setLoader(true);
    const q1 = await readCSVFile(`${salaryMonth}-${year}`);
    const monthSalary = q1?.filter((el) => el.id === id)[0];
    const basicpay = monthSalary?.basic;
    const hra =
      monthSalary?.hraPercent > 10
        ? monthSalary?.hraPercent
        : Math.round(basicpay * monthSalary?.hraPercent);

    setSalary({
      ...salary,
      basic: basicpay,
      hra,
    });
    setLoader(false);
  };
  useEffect(() => {
    getSalary();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <h3 className="text-primary">HRA Declaration of {tname}</h3>
      <div className="my-3">
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
      {salary.tname && (
        <PDFDownloadLink
          document={<HRADeclaration data={salary} />}
          fileName={`HRA Declaration OF ${salary.tname}.pdf`}
          style={{
            textDecoration: "none",
            padding: 11,
            color: "#fff",
            backgroundColor: "darkgreen",
            border: "1px solid #4a4a4a",
            width: "40%",
            borderRadius: 10,
            margin: 20,
          }}
          id="hraForm"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Please Wait..." : `Download HRA Declaration`
          }
        </PDFDownloadLink>
      )}
    </div>
  );
}
