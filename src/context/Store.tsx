"use client";

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

import { FirebaseProvider } from "./FirbaseContext";

interface ContextProps {
  access: String;
  setAccess: Dispatch<SetStateAction<String>>;
  redirectData: String;
  setRedirectData: Dispatch<SetStateAction<String>>;
}

const GlobalContext = createContext<ContextProps>({
  access: "",
  setAccess: (): string => "",
  redirectData: "",
  setRedirectData: (): string => "",
});

export const GlobalContextProvider = ({ children }) => {
  const [access, setAccess] = useState<string>("");
  const [redirectData, setRedirectData] = useState<string>("");

  return (
    <GlobalContext.Provider
      value={{ access, setAccess, redirectData, setRedirectData }}
    >
      <FirebaseProvider>{children}</FirebaseProvider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
