"use client";
import React, { useEffect, useState } from "react";

import { useGlobalContext } from "../../context/Store";
import { firbaseAuth } from "../../context/FirbaseContext";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { deleteAllCookies } from "../../modules/encryption";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();
  // eslint-disable-next-line
  const { state, setState } = useGlobalContext();
  // eslint-disable-next-line
  const [user, setUser] = useState(null);
  const signOutFirebase = () => {
    signOut(firbaseAuth);
    onAuthStateChanged(firbaseAuth, (user) => {
      if (user) {
        // Yes, You Are Looged In
        // console.log("Yes, You Are Looged In");
        setUser(user);
      } else {
        // User is Logged out
        // console.log("You are Logged Out");
        setUser(null);
      }
    });
  };
  useEffect(() => {
    signOutFirebase();
    setState(null);
    deleteAllCookies();
    router.push("/login");

    // eslint-disable-next-line
  }, []);
  return <div className="container"></div>;
};

export default LogOut;
