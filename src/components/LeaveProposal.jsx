"use client";
import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import { IndianFormat, INR, titleCase } from "../modules/calculatefunctions";
const width = 2480;
const height = 3508;

export default function LeaveProposal({ data }) {
  const {
    tname,
    school,
    desig,
    doj,
    phone,
    leaveReason,
    leaveNature,
    leaveDays,
    startingDate,
    endingDate,
    childBirthDate,
  } = data;
  useEffect(() => {
    // console.log(data);
    //eslint-disable-next-line
  }, []);
  return (
    <PDFViewer style={{ width, height }}>
      <Document
        style={{ margin: 5, padding: 5 }}
        title={`Leave Proposal Form of ${tname} of ${school}`}
      >
        <Page size="A4" orientation="portrait" style={styles.page}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              width: "98%",
            }}
          >
            <View style={styles.pageMainView}>
              <Text style={styles.title}>OFFICE OF THE</Text>
              <View
                style={{
                  width: 200,
                  height: 30,
                  backgroundColor: "black",
                  position: "absolute",
                  borderRadius: 5,
                  right: 4,
                  marginTop: 3,
                  top: -5,
                }}
              ></View>
              <View
                style={{
                  width: 200,
                  height: 30,
                  borderWidth: 2,
                  borderBottomWidth: 0,
                  backgroundColor: "white",
                  position: "absolute",
                  borderRadius: 5,
                  right: 6,
                  top: -5,
                }}
              >
                <Text style={[styles.textBold, { marginTop: 5 }]}>
                  To be submitted in triplicate
                </Text>
              </View>

              <Text style={[styles.title, { marginTop: 10 }]}>
                HOWRAH DISTRICT PRIMARY SCHOOL COUNCIL
              </Text>
              <View
                style={{ height: 2, backgroundColor: "black", width: "100%" }}
              ></View>
              <View
                style={{
                  width: 200,
                  height: 30,
                  borderWidth: 2,
                  backgroundColor: "white",
                  borderRadius: 5,
                  marginTop: 5,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={[
                    styles.titleMain,
                    { marginTop: 5, textDecoration: "underline" },
                  ]}
                >
                  LEAVE PROPOSAL
                </Text>
              </View>

              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                }}
              >
                <Text style={styles.text}></Text>

                <View style={{ width: "30%" }}>
                  <Text style={styles.text}>1. NAME OF THE TEACHER: </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "70%",
                  }}
                >
                  <Text style={styles.text}>{tname}</Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 2,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                }}
              >
                <Text style={styles.text}></Text>

                <View style={{ width: "20%" }}>
                  <Text style={styles.text}>2. DESIGNATION </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "25%",
                  }}
                >
                  <Text style={styles.text}>
                    {desig === "AT" ? "ASSISTANT TEACHER" : "HEAD TEACHER"}
                  </Text>
                </View>
                <View style={{ width: "30%" }}>
                  <Text style={styles.text}>DATE OF APPOINTMENT </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "25%",
                  }}
                >
                  <Text style={styles.text}>{doj}</Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                }}
              >
                <View style={{ width: "30%" }}>
                  <Text style={styles.text}>3. NAME OF THE SCHOOL: </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "60%",
                  }}
                >
                  <Text style={styles.text}>{school}</Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                }}
              >
                <View style={{ width: "15%" }}>
                  <Text style={styles.text}>4. CIRCLE </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "30%",
                  }}
                >
                  <Text style={styles.text}>AMTA WEST</Text>
                </View>
                <View style={{ width: "30%" }}>
                  <Text style={styles.text}>CONTACT NO </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "30%",
                  }}
                >
                  <Text style={styles.text}>{phone}</Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                }}
              >
                <View style={{ width: "30%" }}>
                  <Text style={styles.text}>5. REASON OF LEAVE: </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "60%",
                  }}
                >
                  <Text style={styles.text}>{leaveReason}</Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                }}
              >
                <View style={{ width: "100%" }}>
                  <Text style={styles.text}>
                    6(a). NATURE OF LEAVE PRAYED FOR: HPL/ COMMUTED/ MATERNITY/
                    MEDICAL/ LWP/ CCL/{" "}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                }}
              >
                <View style={{ width: "30%" }}>
                  <Text style={styles.text}>PATERNITY ETC</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "60%",
                  }}
                >
                  <Text style={styles.text}>{leaveNature}</Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text style={styles.text}>
                    (b). PERIOD OF LEAVE PRAYED FOR FROM
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "10%",
                  }}
                >
                  <Text style={styles.text}>{startingDate}</Text>
                </View>
                <View
                  style={{
                    width: "5%",
                  }}
                >
                  <Text style={styles.text}>To</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "10%",
                  }}
                >
                  <Text style={styles.text}>{endingDate}</Text>
                </View>
                <View
                  style={{
                    width: "5%",
                  }}
                >
                  <Text style={styles.text}>=</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "10%",
                  }}
                >
                  <Text style={styles.text}>{leaveDays}</Text>
                </View>
                <View
                  style={{
                    width: "10%",
                  }}
                >
                  <Text style={styles.text}>Days</Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                }}
              >
                <View style={{ width: "80%" }}>
                  <Text style={[styles.text, { fontSize: 12 }]}>
                    7. DATE OF CHILD’S BIRTH AS PER B.C. (IN CASE OF MATERNITY
                    LEAVE ONLY)
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "20%",
                  }}
                >
                  <Text style={[styles.text, { fontSize: 12 }]}>
                    {leaveNature === "MATERNITY"
                      ? childBirthDate
                      : "NOT APPLICABLE"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                }}
              >
                <View style={{ width: "100%" }}>
                  <Text style={styles.text}>
                    8. ENCLOSURES: TREATMENT CERTIFICATE/ MEDICAL CERTIFICATE OF
                    FITNESS/ JOINING REPORT
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                }}
              >
                <View style={{ width: "60%" }}>
                  <Text style={styles.text}>
                    DUELY CERTIFIED BY THE HEAD TEACHER & S.I.S. OF
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dotted",
                    width: "20%",
                  }}
                >
                  <Text style={styles.text}>AMTA WEST</Text>
                </View>
                <View
                  style={{
                    width: "20%",
                  }}
                >
                  <Text style={styles.text}>CIRCLE, HOWRAH</Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 40,
                  marginBottom: 10,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                }}
              >
                <View style={{ width: "60%" }}>
                  <Text style={styles.textBold}>
                    RECOMMENDATION AND SIGNATURE OF THE H.T/ T.I.C
                  </Text>
                </View>
                <View style={{ width: "40%" }}>
                  <Text style={styles.textBold}>SIGNATURE OF TEACHER</Text>
                </View>
              </View>
              <View
                style={{ height: 2, backgroundColor: "black", width: "100%" }}
              ></View>
              <View
                style={{
                  width: 220,
                  height: 25,
                  borderWidth: 2,
                  backgroundColor: "white",
                  borderRadius: 5,
                  marginTop: 3,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={[styles.titleMain, { textDecoration: "underline" }]}
                >
                  TO BE FILLED BY THE S.I/S
                </Text>
              </View>
              <View style={styles.tableStartBorderView}>
                <View style={styles.rowStartView}>
                  <Text style={styles.text}>
                    Leave Account to be furnished by the S.I./S
                  </Text>
                </View>
                <View style={styles.rowStartView}>
                  <View
                    style={{
                      borderRightWidth: 1,
                      width: "10%",
                      height: 100,
                    }}
                  >
                    <Text style={styles.text}>Year</Text>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      width: "10%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>
                      Leave{"\n"}earned &{"\n"}nature of{"\n"}Leave
                    </Text>
                    <Text style={styles.text}>_______</Text>
                    <Text style={styles.text}>_______</Text>
                  </View>

                  <View
                    style={{
                      width: "30%",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomWidth: 1,
                        height: 20,
                      }}
                    >
                      <Text style={styles.text}>Leave Enjoyed</Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        height: 80,
                      }}
                    >
                      <View
                        style={{
                          borderRightWidth: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          height: 80,
                        }}
                      >
                        <Text style={styles.text}>Leave{"\n"}from</Text>
                      </View>
                      <View
                        style={{
                          borderRightWidth: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          height: 80,
                        }}
                      >
                        <Text style={styles.text}>Leave{"\n"}To</Text>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          height: 80,
                        }}
                      >
                        <Text style={styles.text}>
                          No. of{"\n"}
                          Days
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRightWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomWidth: 1,
                        height: 20,
                      }}
                    >
                      <Text style={styles.text}>Nature of Leave</Text>
                    </View>

                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "baseline",
                        flexDirection: "row",
                        height: 80,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          height: 80,
                        }}
                      >
                        <Text style={styles.text}>HPL</Text>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          height: 80,
                          borderLeftWidth: 1,
                        }}
                      >
                        <Text style={styles.text}>
                          Commuted/{"\n"}
                          Maternity/{"\n"}
                          Medical/{"\n"}
                          LWP/ CCL/{"\n"}
                          Paternity etc.
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderRightWidth: 1,
                      width: "10%",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 100,
                    }}
                  >
                    <Text style={styles.text}>
                      Balance{"\n"}
                      of Leave
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 100,
                    }}
                  >
                    <Text style={styles.text}>
                      Previous{"\n"}Leave{"\n"}sanctioned by{"\n"}D.P.S.C with
                      {"\n"}Memo No. &{"\n"}Date
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Page>
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
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  textBold: {
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
    paddingVertical: 1,
  },
  titleMain: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  text: {
    fontSize: 12.5,
    padding: 1,
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
    fontFamily: "TimesItalic",
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
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    width: "100%",
    height: "auto",
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
    padding: 2,
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
  family: "TimesItalic",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBoldItalic.ttf",
});
Font.register({
  family: "TimesBold",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBold.ttf",
});
