"use client";
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
import {
  IndianFormat,
  round5,
  sliceArrayIntoChunks,
} from "../modules/calculatefunctions";
const width = 2480;
const height = 3508;
import { useGlobalContext } from "../context/Store";

export default function QuestionList({ title }) {
  const { questionState, questionRateState } = useGlobalContext();
  const list = questionState.sort((a, b) => {
    // Compare by 'gp'
    if (a.gp < b.gp) {
      return questionRateState.isAlphabatically ? -1 : 1; // a comes first
    }
    if (a.gp > b.gp) {
      return questionRateState.isAlphabatically ? 1 : -1; // b comes first
    }

    // If 'gp' is the same, compare by 'school'
    if (a.school < b.school) {
      return -1; // a comes first
    }
    if (a.school > b.school) {
      return 1; // b comes first
    }

    return 0; // They are equal
  });
  const pages = sliceArrayIntoChunks(list, 40);
  return (
    // <PDFViewer
    //   style={{
    //     width: width / 3,
    //     height: height / 3,
    //   }}
    // >
    <Document style={{ margin: 2, padding: 2 }} title={title}>
      {pages.map((page, index) => (
        <Page size="A4" orientation="portrait" style={styles.page} key={index}>
          <View style={styles.pageMainView}>
            <Text style={[styles.title, { marginBottom: 3 }]}>{title}</Text>
            <View style={styles.tableStartBorderView}>
              <View style={styles.rowStartBorderView}>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "5%",
                    height: 20,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.text}>Sl</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "40%",
                    height: 20,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.text}>SCHOOL</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "15%",
                    height: 20,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.text}>GP</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "5%",
                    height: 20,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.text}>I</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "5%",
                    height: 20,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.text}>II</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "5%",
                    height: 20,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.text}>III</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "5%",
                    height: 20,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.text}>IV</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "5%",
                    height: 20,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.text}>V</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: "5%",
                    height: 20,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.text}>Total</Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 0,
                    width: "10%",
                    height: 20,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.text}>Amount</Text>
                </View>
              </View>
              {page?.map((question, ind) => {
                const {
                  school,
                  gp,
                  cl_1_student,
                  cl_2_student,
                  cl_3_student,
                  cl_4_student,
                  cl_5_student,
                  total_student,

                  id,
                } = question;
                const total_rate = round5(
                  cl_1_student * questionRateState.i_rate +
                    cl_2_student * questionRateState.ii_rate +
                    cl_3_student * questionRateState.iii_rate +
                    cl_4_student * questionRateState.iv_rate +
                    cl_5_student * questionRateState.v_rate
                );
                return (
                  <View
                    style={[
                      styles.rowStartView,
                      {
                        padding: 0,
                        borderBottomWidth: ind === page?.length - 1 ? 0 : 1,
                      },
                    ]}
                    key={ind}
                  >
                    <View
                      style={{
                        borderRightWidth: 1,
                        width: "5%",
                        height: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        {list.findIndex((i) => i.id === id) + 1}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        width: "40%",
                        height: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={[
                          styles.text,
                          { fontSize: school.length >= 19 ? 8 : 11 },
                        ]}
                      >
                        {school}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        width: "15%",
                        height: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.text}>{gp}</Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        width: "5%",
                        height: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.text}>{cl_1_student}</Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        width: "5%",
                        height: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.text}>{cl_2_student}</Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        width: "5%",
                        height: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.text}>{cl_3_student}</Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        width: "5%",
                        height: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.text}>{cl_4_student}</Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        width: "5%",
                        height: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.text}>{cl_5_student}</Text>
                    </View>

                    <View
                      style={{
                        borderRightWidth: 1,
                        width: "5%",
                        height: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.text}>{total_student}</Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 0,
                        width: "10%",
                        height: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.text}>
                        ₹ {IndianFormat(total_rate)}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
            {index !== pages.length - 1 ? (
              <Text style={[styles.text, { marginVertical: 2 }]}>
                Generated on:{" "}
                {new Date()
                  .toISOString()
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("-")}{" "}
                at {new Date().toLocaleTimeString()}, Page {index + 1} of{" "}
                {pages.length}
              </Text>
            ) : (
              <Text
                style={[
                  styles.text,
                  {
                    marginVertical: 2,
                    position: "absolute",
                    left: "20%",
                    right: "20%",
                    bottom: 0,
                  },
                ]}
              >
                Generated on:{" "}
                {new Date()
                  .toISOString()
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("-")}{" "}
                at {new Date().toLocaleTimeString()}, Page {index + 1} of{" "}
                {pages.length}
              </Text>
            )}
          </View>
        </Page>
      ))}
    </Document>
    // </PDFViewer>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: width,
    height: height,
  },
  pageMainView: {
    padding: 10,
    margin: 5,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: "98%",
    height: "98%",
  },
  title: {
    fontSize: 16,
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  text: {
    fontSize: 11,
    fontFamily: "Times",
    textAlign: "center",
  },
  smallText: {
    fontSize: 8,
    fontFamily: "Times",
    textAlign: "center",
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
  rowStartView: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,
    width: "100%",
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  rowStartBorderView: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,
    width: "100%",
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "center",
  },
  underLineText: {
    marginTop: 5,
    textDecoration: "underline",
    textDecorationStyle: "dotted",
    fontSize: 16,
    fontFamily: "Times",
    textAlign: "left",
    lineHeight: 1.5,
  },
  checkImage: {
    width: 10,
    height: 10,
    position: "absolute",
    marginTop: -7,
  },
});
Font.register({
  family: "Times",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/times.ttf",
});

Font.register({
  family: "TimesBold",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBold.ttf",
});
