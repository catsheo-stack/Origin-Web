import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/origin/Navbar";
import Footer from "@/components/origin/Footer";

export default function PageLayout() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}