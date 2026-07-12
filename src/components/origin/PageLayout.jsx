import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/origin/Navbar";
import Footer from "@/components/origin/Footer";
import BackButton from "@/components/origin/BackButton";
import CookieBanner from "@/components/origin/CookieBanner";

export default function PageLayout() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <main className="pt-[72px]">
        <BackButton />
        <Outlet />
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
