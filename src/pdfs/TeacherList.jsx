"use client";
import React, { useEffect } from "react";
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
import { sliceArrayIntoChunks } from "../modules/calculatefunctions";
const width = 2480;
const height = 3508;

export default function TeacherList({ data, title, keys }) {
  const list = data.sort((a, b) => {
    // if (a.gp < b.gp) {
    //   return -1;
    // }
    // if (a.gp > b.gp) {
    //   return 1;
    // }
    if (a.school < b.school) {
      return -1;
    }
    if (a.school > b.school) {
      return 1;
    }
    // If "school" keys are equal, compare the "rank" keys
    return a.rank - b.rank;
  });
  const pages = sliceArrayIntoChunks(list, 38);
  const columns =
    keys && keys.length > 0
      ? [
          { label: "NAME", key: "tname", width: "35%" },
          { label: "SCHOOL", key: "school", width: "45%" },
          // { label: "GP", key: "gp", width: "20%" },
          ...keys.map((key) =>
            typeof key === "string"
              ? {
                  label: key.toUpperCase(),
                  key: key,
                  width: `${20 / keys.length}%`,
                }
              : key,
          ),
        ]
      : [
          { label: "NAME", key: "tname", width: "35%" },
          { label: "SCHOOL", key: "school", width: "45%" },
          { label: "GP", key: "gp", width: "15%" },
        ];

  return (
    // <PDFViewer
    //   style={{
    //     width: width / 3,
    //     height: height / 3,
    //   }}
    // >
    <Document title={title}>
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
                {columns.map((col, index) => (
                  <View
                    key={index}
                    style={{
                      borderRightWidth: index === columns.length - 1 ? 0 : 1,
                      width: col.width,
                      height: 20,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.text}>{col.label}</Text>
                  </View>
                ))}
              </View>
              {page?.map((teacher, ind) => {
                const { id } = teacher;
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
                    {columns.map((col, index) => (
                      <View
                        key={index}
                        style={{
                          borderRightWidth:
                            index === columns.length - 1 ? 0 : 1,
                          width: col.width,
                          height: 20,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={[
                            styles.text,
                            col.key === "tname"
                              ? {
                                  fontSize:
                                    String(teacher[col.key] ?? "").length >= 22
                                      ? 11
                                      : 13,
                                }
                              : col.key === "school"
                                ? {
                                    fontSize:
                                      String(teacher[col.key] ?? "").length >=
                                      19
                                        ? 10
                                        : 11,
                                  }
                                : {},
                          ]}
                        >
                          {String(teacher[col.key] ?? "")}
                        </Text>
                      </View>
                    ))}
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
    padding: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: "99%",
    height: "99%",
  },
  title: {
    fontSize: 14,
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  text: {
    fontSize: 10,
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
