"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import { IndianFormat, INR, printDate } from "../modules/calculatefunctions";
const width = 2480;
const height = 3508;

export default function IncomeTax({ data }) {
  const {
    id,
    tname,
    school,
    pan,
    phone,
    disability,
    desig,
    thisYear,
    nextYear,
    prevYear,
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
    AllGross,
    GrossTotalIncome,
    deductionVIA,
    limitVIA,
    TotalIncome,
    TotalRoundOffIncome,
    CalculatedIT,
    isUnderRebate,
    eduCess,
    AddedEduCess,
  } = data;
  return (
    <PDFViewer style={{ height, width }}>
      <Document style={{ margin: 5, padding: 5 }} title={`IT Statement`}>
        <Page size="A4" orientation="portrait" style={styles.page}>
          <View style={styles.pageMainView}>
            <View style={styles.mainBorderView}>
              <View
                style={[
                  styles.tableStartBorderView,
                  { flexDirection: "column" },
                ]}
              >
                <Text style={styles.titleMain}>
                  HOWRAH DISTRICT PRIMARY SCHOOL COUNCIL
                </Text>
                <Text style={styles.text2}>DECLARATION OF INCOME TAX</Text>
                <Text style={styles.text3}>
                  FOR THE FINANCIAL YEAR {`${prevYear} - ${thisYear}`} RELATION
                  TO ASSESMENT YEAR {finYear}
                </Text>
              </View>
              <View style={[styles.tableStartBorderView, { height: 5 }]}></View>
              <View
                style={[
                  styles.tableStartBorderView,
                  { flexDirection: "column" },
                ]}
              >
                <View
                  style={[
                    styles.rowStartBorderView,
                    {
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      borderBottomWidth: 0,
                    },
                  ]}
                >
                  <Text style={styles.text}>Name of the Teacher: </Text>
                  <Text style={[styles.textBold, { marginLeft: 5 }]}>
                    {tname}
                  </Text>
                </View>
                <View
                  style={[
                    styles.rowStartBorderView,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderBottomWidth: 0,
                      width: "100%",
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      borderBottomWidth: 0,
                      width: "20%",
                    }}
                  >
                    <Text style={styles.text}>Designation: </Text>
                    <Text style={[styles.textBold, { marginLeft: 5 }]}>
                      {desig}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      borderBottomWidth: 0,
                      width: "30%",
                    }}
                  >
                    <Text style={styles.text}>Circle: </Text>
                    <Text style={[styles.textBold, { marginLeft: 5 }]}>
                      AMTA WEST CIRCLE
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.rowStartBorderView,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderBottomWidth: 0,
                      width: "100%",
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      borderBottomWidth: 0,
                      width: "60%",
                    }}
                  >
                    <Text style={styles.text}>School: </Text>
                    <Text style={[styles.textBold, { marginLeft: 5 }]}>
                      {school}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      borderBottomWidth: 0,
                      width: "30%",
                    }}
                  >
                    <Text style={styles.text}>Mobile No: </Text>
                    <Text style={[styles.textBold, { marginLeft: 5 }]}>
                      {phone}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 0,
                }}
              >
                <View
                  style={[
                    styles.rowStartBorderView,
                    {
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      borderBottomWidth: 1,
                      borderRightWidth: 1,
                      width: "60%",
                    },
                  ]}
                >
                  <View style={{ borderRightWidth: 1 }}>
                    <Text
                      style={[styles.text, { padding: 2, paddingRight: 30 }]}
                    >
                      PAN:{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 2 },
                      ]}
                    >
                      {pan?.slice(0, 1)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 2 },
                      ]}
                    >
                      {pan?.slice(1, 2)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 2 },
                      ]}
                    >
                      {pan?.slice(2, 3)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 2 },
                      ]}
                    >
                      {pan?.slice(3, 4)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 2 },
                      ]}
                    >
                      {pan?.slice(4, 5)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 2 },
                      ]}
                    >
                      {pan?.slice(5, 6)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 2 },
                      ]}
                    >
                      {pan?.slice(6, 7)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 2 },
                      ]}
                    >
                      {pan?.slice(7, 8)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 2 },
                      ]}
                    >
                      {pan?.slice(8, 9)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textBold,
                        { marginHorizontal: 5, padding: 2 },
                      ]}
                    >
                      {pan?.slice(9, 10)}
                    </Text>
                  </View>
                </View>
                <View style={{ borderRightWidth: 1,borderBottomWidth: 1, width: "20%" }}></View>
                <View style={{ width: "20%" }}></View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 0,padding:1,
                }}
              >
                <View style={{ borderRightWidth: 1,borderBottomWidth: 1, width: "60%" }}>
                  <Text style={[styles.text,{textAlign:"left"}]}>
                    1. GROSS SLARY INCOME (Salary +Arrear Salary +Bonus)
                  </Text>
                </View>
                <View style={{ borderRightWidth: 1,borderBottomWidth: 1, width: "20%" }}>
                  <Text style={styles.textBold}>Rs. {IndianFormat(AllGross)}</Text>
                </View>
                <View style={{ width: "20%" }}></View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  padding:1,
                }}
              >
                <View style={{ borderRightWidth: 1,borderBottomWidth: 1, width: "60%" }}>
                  <Text style={[styles.text,{textAlign:"left"}]}>
                  2. Less: Exemption of HRA under Sec 10(13A) the least of the
                  following
                  </Text>
                </View>
                <View style={{ borderRightWidth: 1,borderBottomWidth: 1, width: "20%" }}>
                  <Text style={styles.textBold}></Text>
                </View>
                <View style={{ width: "20%" }}></View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  padding:1,
                }}
              >
                <View style={{ borderRightWidth: 1,borderBottomWidth: 1, width: "60%" }}>
                  <Text style={[styles.text,{textAlign:"left"}]}>
                  a) Actual HRA Received
                  </Text>
                </View>
                <View style={{ borderRightWidth: 1,borderBottomWidth: 1, width: "20%" }}>
                  <Text style={styles.textBold}></Text>
                </View>
                <View style={{ width: "20%" }}></View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  padding:1,
                }}
              >
                <View style={{ borderRightWidth: 1,borderBottomWidth: 1, width: "60%" }}>
                  <Text style={[styles.text,{textAlign:"left"}]}>
                  b) Rent Paid in excess of 10% of Salary (Basic + DA)
                  </Text>
                </View>
                <View style={{ borderRightWidth: 1,borderBottomWidth: 1, width: "20%" }}>
                  <Text style={styles.textBold}></Text>
                </View>
                <View style={{ width: "20%" }}></View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  padding:1,
                }}
              >
                <View style={{ borderRightWidth: 1,borderBottomWidth: 1, width: "60%" }}>
                  <Text style={[styles.text,{textAlign:"left"}]}>
                  c) 40% of Salary (Basic + DA)
                  </Text>
                </View>
                <View style={{ borderRightWidth: 1,borderBottomWidth: 1, width: "20%" }}>
                  <Text style={styles.textBold}></Text>
                </View>
                <View style={{ width: "20%" }}></View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 1,padding:1,
                }}
              >
                <View style={{ borderRightWidth: 1, width: "60%" }}>
                  <Text style={[styles.text,{textAlign:"left"}]}>
                  
                  </Text>
                </View>
                <View style={{ borderRightWidth: 1, width: "20%" }}>
                  <Text style={styles.textBold}>Rs. {IndianFormat(AllGross)}</Text>
                </View>
                <View style={{ width: "20%" }}></View>
              </View>
            </View>
          </View>
        </Page>
        {/* <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.pageMainView}>
            <View style={styles.mainBorderView}>
              <View style={styles.tableStartBorderView}>
                <Text style={styles.title}>
                  DISTRICT PRIMARY SCHOOL COUNCIL, HOWRAH
                </Text>
              </View>
              <View style={styles.rowStartBorderView}>
                <Text style={styles.title}>NAME: {tname}</Text>
              </View>
              <View style={styles.rowStartBorderView}>
                <Text style={styles.title}>PAN NO.: {pan}</Text>
              </View>

              <View style={styles.rowStartBorderView}>
                <View style={styles.view16}>
                  <Text style={styles.text}>{finYear}</Text>
                </View>
                <View style={styles.view10}>
                  <Text style={styles.text}>% D.A</Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>Basic{"\n"}Pay</Text>
                </View>
                <View style={styles.view10}>
                  <Text style={[styles.text, { fontSize: 8 }]}>
                    HT{"\n"}Allowance
                  </Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>D.A.</Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>H.R.A.</Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>M.A.</Text>
                </View>
                <View style={styles.view10}>
                  <Text style={[styles.text, { fontSize: 8 }]}>ARREAR</Text>
                </View>
                <View style={styles.view16}>
                  <Text style={[styles.text, { fontSize: 8 }]}>
                    Conveyance{"\n"}Allowance
                  </Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>BONUS</Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>GROSS</Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>GPF</Text>
                </View>
                <View style={styles.view16}>
                  <Text style={styles.text}>GSLI</Text>
                </View>
                <View style={styles.view10}>
                  <Text style={styles.text}>P.TAX</Text>
                </View>
                <View style={[styles.view10, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>TDS</Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>MAR</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>{thisYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0
                      ? `${Math.round(marchSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0 ? marchBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0
                      ? marchAddl !== 0
                        ? marchAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0 ? marchDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0 ? marchHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {marchBasic !== 0 ? (marchMA !== 0 ? marchMA : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0 ? marchGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0
                      ? marchGPF !== 0
                        ? marchGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0
                      ? marchGSLI !== 0
                        ? marchGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {marchBasic !== 0
                      ? marchPTax !== 0
                        ? marchPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {marchBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>APR</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>{thisYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0
                      ? `${Math.round(aprilSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? aprilBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0
                      ? aprilAddl !== 0
                        ? aprilAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? aprilDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? aprilHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {aprilBasic !== 0 ? (aprilMA !== 0 ? aprilMA : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? aprilGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0
                      ? aprilGPF !== 0
                        ? aprilGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0
                      ? aprilGSLI !== 0
                        ? aprilGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0
                      ? aprilPTax !== 0
                        ? aprilPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>MAY</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>{thisYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0
                      ? `${Math.round(maySalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? mayBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? (mayAddl !== 0 ? mayAddl : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{mayBasic !== 0 ? mayDA : ""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? mayHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {mayBasic !== 0 ? (mayMA !== 0 ? mayMA : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? mayGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? (mayGPF !== 0 ? mayGPF : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? (mayGSLI !== 0 ? mayGSLI : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {mayBasic !== 0 ? (mayPTax !== 0 ? mayPTax : "NIL") : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>{mayBasic !== 0 ? "NIL" : ""}</Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>JUN</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>{thisYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0
                      ? `${Math.round(juneSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? juneBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? (juneAddl !== 0 ? juneAddl : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? juneDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? juneHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {juneBasic !== 0 ? (juneMA !== 0 ? juneMA : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? juneGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? (juneGPF !== 0 ? juneGPF : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? (juneGSLI !== 0 ? juneGSLI : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? (junePTax !== 0 ? junePTax : "NIL") : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {juneBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>JUL</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>{thisYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0
                      ? `${Math.round(julySalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? julyBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? (julyAddl !== 0 ? julyAddl : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? julyDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? julyHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {julyBasic !== 0 ? (julyMA !== 0 ? julyMA : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? aprilIR : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? julyGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? (julyGPF !== 0 ? julyGPF : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? (julyGSLI !== 0 ? julyGSLI : "NIL") : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? (julyPTax !== 0 ? julyPTax : "NIL") : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {julyBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>AUG</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>{thisYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0
                      ? `${Math.round(augustSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0 ? augustBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0
                      ? augustAddl !== 0
                        ? augustAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0 ? augustDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0 ? augustHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {augustBasic !== 0
                      ? augustMA !== 0
                        ? augustMA
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0 ? augustGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0
                      ? augustGPF !== 0
                        ? augustGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0
                      ? augustGSLI !== 0
                        ? augustGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {augustBasic !== 0
                      ? augustPTax !== 0
                        ? augustPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {augustBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>SEP</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>{thisYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0
                      ? `${Math.round(septemberSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0 ? septemberBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0
                      ? septemberAddl !== 0
                        ? septemberAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0 ? septemberDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0 ? septemberHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {septemberBasic !== 0
                      ? septemberMA !== 0
                        ? septemberMA
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0 ? septemberGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0
                      ? septemberGPF !== 0
                        ? septemberGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0
                      ? septemberGSLI !== 0
                        ? septemberGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0
                      ? septemberPTax !== 0
                        ? septemberPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {septemberBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>OCT</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>{thisYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0
                      ? `${Math.round(octoberSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0 ? octoberBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0
                      ? octoberAddl !== 0
                        ? octoberAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0 ? octoberDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0 ? octoberHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {octoberBasic !== 0
                      ? octoberMA !== 0
                        ? octoberMA
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0 ? octoberGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0
                      ? octoberGPF !== 0
                        ? octoberGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0
                      ? octoberGSLI !== 0
                        ? octoberGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0
                      ? octoberPTax !== 0
                        ? octoberPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {octoberBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>NOV</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>{thisYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0
                      ? `${Math.round(novemberSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0 ? novemberBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0
                      ? novemberAddl !== 0
                        ? novemberAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0 ? novemberDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0 ? novemberHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {novemberBasic !== 0
                      ? novemberMA !== 0
                        ? novemberMA
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0 ? novemberGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0
                      ? novemberGPF !== 0
                        ? novemberGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0
                      ? novemberGSLI !== 0
                        ? novemberGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0
                      ? novemberPTax !== 0
                        ? novemberPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {novemberBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>DEC</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>{thisYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0
                      ? `${Math.round(decemberSalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0 ? decemberBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0
                      ? decemberAddl !== 0
                        ? decemberAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0 ? decemberDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0 ? decemberHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {decemberBasic !== 0
                      ? decemberMA !== 0
                        ? decemberMA
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0 ? decemberGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0
                      ? decemberGPF !== 0
                        ? decemberGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0
                      ? decemberGSLI !== 0
                        ? decemberGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0
                      ? decemberPTax !== 0
                        ? decemberPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {decemberBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>JAN</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>{nextYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0
                      ? `${Math.round(januarySalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0 ? januaryBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0
                      ? januaryAddl !== 0
                        ? januaryAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0 ? januaryDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0 ? januaryHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {januaryBasic !== 0
                      ? januaryMA !== 0
                        ? januaryMA
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0 ? januaryGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0
                      ? januaryGPF !== 0
                        ? januaryGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0
                      ? januaryGSLI !== 0
                        ? januaryGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0
                      ? januaryPTax !== 0
                        ? januaryPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {januaryBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStartBorderView}>
                <View style={[styles.rowFlexView, { width: "16%" }]}>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>FEB</Text>
                  </View>
                  <View style={styles.view50Center}>
                    <Text style={styles.text2}>{nextYear}</Text>
                  </View>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0
                      ? `${Math.round(februarySalary?.daPercent * 100)}%`
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0 ? februaryBasic : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0
                      ? februaryAddl !== 0
                        ? februaryAddl
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0 ? februaryDA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0 ? februaryHRA : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {" "}
                    {februaryBasic !== 0
                      ? februaryMA !== 0
                        ? februaryMA
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{""}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0 ? februaryGross : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0
                      ? februaryGPF !== 0
                        ? februaryGPF
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0
                      ? februaryGSLI !== 0
                        ? februaryGSLI
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0
                      ? februaryPTax !== 0
                        ? februaryPTax
                        : "NIL"
                      : ""}
                  </Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>
                    {februaryBasic !== 0 ? "NIL" : ""}
                  </Text>
                </View>
              </View>
              <View
                style={[styles.rowStartBorderView, { borderBottomWidth: 0 }]}
              >
                <View style={styles.view16H0}>
                  <Text style={styles.text}>TOTAL</Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}> </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{grossBasic}</Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {grossAddl !== 0 ? grossAddl : "NIL"}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{grossDA}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{grossHRA}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {grossMA !== 0 ? grossMA : "NIL"}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>
                    {aprilBasic !== 0 ? aprilIR : ""}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>NIL</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{bonus !== 0 ? bonus : "NIL"}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>{GrossPAY}</Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {grossGPF !== 0 ? grossGPF : "NIL"}
                  </Text>
                </View>
                <View style={styles.view16H0}>
                  <Text style={styles.text}>
                    {grossGSLI !== 0 ? grossGSLI : "NIL"}
                  </Text>
                </View>
                <View style={styles.view10H0}>
                  <Text style={styles.text}>{grossPTax}</Text>
                </View>
                <View style={[styles.view10H0, { borderRightWidth: 0 }]}>
                  <Text style={styles.text}>NIL</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 60,
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Text style={styles.text}>SIGNATURE OF THE INCUMBENT</Text>
            </View>
          </View>
        </Page> */}
      </Document>
    </PDFViewer>
  );
}
const styles = StyleSheet.create({
  page: {
    paddingRight: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: width,
    height: height,
  },
  pageMainView: {
    paddingRight: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: "100%",
    height: "98%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  textBold: {
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  titleMain: {
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Algerian",
    textAlign: "center",
  },
  text: {
    fontSize: 11,
    fontFamily: "Times",
    textAlign: "center",
  },
  text2: {
    fontSize: 14,
    fontFamily: "Algerian",
    textAlign: "center",
    padding: 2,
  },
  text3: {
    fontSize: 12,
    fontFamily: "Algerian",
    textAlign: "center",
    padding: 2,
  },
  text2i: {
    fontSize: 8,
    fontFamily: "Times",
    textAlign: "center",
    padding: 2,
  },

  text4: {
    fontSize: 8,
    fontFamily: "Times",
    textAlign: "center",
  },
  text5: {
    fontSize: 9,
    fontFamily: "Times",
    textAlign: "center",
  },
  headingView: {
    // border: "1px solid",
    borderWidth: 1,
    width: "100%",
    height: "auto",
  },
  salaryView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
  },
  tableStartView: {
    borderTopWidth: 0,
    borderLeftWidth: 0.5,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  tableStartBorderView: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  mainBorderView: {
    borderWidth: 1,
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  view88H20: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "8.78%",
    height: 20,
  },
  view16: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "16%",
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  view16H0: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "16%",
    height: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  view10: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "10%",
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  view10H0: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "10%",
    height: 14,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  SecondView10: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "10%",
    height: 15,
  },
  view5: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "5%",
    height: 73,
    justifyContent: "center",
    alignItems: "center",
  },
  view25: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  view50: {
    width: "50%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  view50Center: {
    width: "50%",
    height: 14,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRightWidth: 1,
  },

  rowStartView: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  rowStartBorderView: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "center",
    padding: 2,
  },
  rowWrapView: {
    paddingRight: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  rowFlexView: {
    paddingRight: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  columnFlexView: {
    paddingRight: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  rowFlexViewEvenly: {
    paddingRight: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
  },
  break: {
    borderBottomWidth: 1,
    width: "100%",
    height: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  secondRowView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 5,
  },
});
Font.register({
  family: "Algerian",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/Algerian.ttf",
});
Font.register({
  family: "Times",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/times.ttf",
});
Font.register({
  family: "TimesBold",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBold.ttf",
});
