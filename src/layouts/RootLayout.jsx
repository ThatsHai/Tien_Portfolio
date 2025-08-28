import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className="bg-black">
        <Outlet /> {/* child routes will render here */}
      </main>
    </>
  );
};

export default RootLayout;
