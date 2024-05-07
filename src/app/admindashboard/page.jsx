"use client";
import React, { useEffect, useContext } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
const AdminDashboard = () => {
  const { access, setAccess } = useGlobalContext();
  const router = useRouter();
  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Admin Dashboard";
    if (access !== "admin") {
      router.push("/login");
    }
  }, []);
  return (
    <div className="container-fluid  my-3">
      <AdminNavBar />
      <h1 className="text-center text-primary">Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
