"use client";

import React, { createContext, useContext, useState } from "react";

import { FirebaseProvider } from "./FirbaseContext";

const GlobalContext = createContext({
  state: null,
  setState: () => null,
  stateArray: [],
  setStateArray: () => [],
  stateObject: {},
  setStateObject: () => {},
  teachersState: [],
  setTeachersState: () => [],
  schoolState: [],
  setSchoolState: () => [],
  slideState: [],
  setSlideState: () => [],
  userState: [],
  setUserState: () => [],
  noticeState: [],
  setNoticeState: () => [],
  memoState: [],
  setMemoState: () => [],
  teacherUpdateTime: "",
  setTeacherUpdateTime: () => "",
  schoolUpdateTime: "",
  setSchoolUpdateTime: () => "",
  slideUpdateTime: "",
  setSlideUpdateTime: () => "",
  noticeUpdateTime: "",
  setNoticeUpdateTime: () => "",
  memoUpdateTime: "",
  setMemoUpdateTime: () => "",
  questionState: [],
  setQuestionState: () => [],
  questionUpdateTime: "",
  setQuestionUpdateTime: () => "",
  questionRateState: {},
  setQuestionRateState: () => {},
});

export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState("");

  const [stateArray, setStateArray] = useState([]);
  const [stateObject, setStateObject] = useState({});
  const [teachersState, setTeachersState] = useState([]);
  const [userState, setUserState] = useState([]);
  const [schoolState, setSchoolState] = useState([]);
  const [slideState, setSlideState] = useState([]);
  const [noticeState, setNoticeState] = useState([]);
  const [memoState, setMemoState] = useState([]);
  const [teacherUpdateTime, setTeacherUpdateTime] = useState(Date.now() - 1000);
  const [schoolUpdateTime, setSchoolUpdateTime] = useState(Date.now() - 1000);
  const [slideUpdateTime, setSlideUpdateTime] = useState(Date.now() - 1000);
  const [noticeUpdateTime, setNoticeUpdateTime] = useState(Date.now() - 1000);
  const [memoUpdateTime, setMemoUpdateTime] = useState(Date.now() - 1000);
  const [questionState, setQuestionState] = useState([]);
  const [questionUpdateTime, setQuestionUpdateTime] = useState(
    Date.now() - 1000
  );
  const [questionRateState, setQuestionRateState] = useState({
    id: "",
    question_pp_rate: "",
    question_1_rate: "",
    question_2_rate: "",
    question_3_rate: "",
    question_4_rate: "",
    question_5_rate: "",
    term: "1st",
    year: new Date().getFullYear(),
  });

  return (
    <GlobalContext.Provider
      value={{
        state,
        setState,
        stateArray,
        setStateArray,
        stateObject,
        setStateObject,
        teachersState,
        setTeachersState,
        userState,
        setUserState,
        schoolState,
        setSchoolState,
        slideState,
        setSlideState,
        noticeState,
        setNoticeState,
        memoState,
        setMemoState,
        teacherUpdateTime,
        setTeacherUpdateTime,
        schoolUpdateTime,
        setSchoolUpdateTime,
        slideUpdateTime,
        setSlideUpdateTime,
        noticeUpdateTime,
        setNoticeUpdateTime,
        memoUpdateTime,
        setMemoUpdateTime,
        questionState,
        setQuestionState,
        questionUpdateTime,
        setQuestionUpdateTime,
        questionRateState,
        setQuestionRateState,
      }}
    >
      <FirebaseProvider>{children}</FirebaseProvider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
