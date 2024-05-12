"use client";

import React, { createContext, useContext, useState } from "react";

import { FirebaseProvider } from "./FirbaseContext";

const GlobalContext = createContext({
  access: "",
  setAccess: () => "",
  stateArray: [],
  setStateArray: () => [],
  stateObject: {},
  setStateObject: () => {},
});

export const GlobalContextProvider = ({ children }) => {
  const [access, setAccess] = useState("");

  const [stateArray, setStateArray] = useState([]);
  const [stateObject, setStateObject] = useState({});

  return (
    <GlobalContext.Provider
      value={{
        access,
        setAccess,
        stateArray,
        setStateArray,
        stateObject,
        setStateObject,
      }}
    >
      <FirebaseProvider>{children}</FirebaseProvider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
