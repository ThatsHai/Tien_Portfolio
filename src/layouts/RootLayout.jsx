import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className="bg-black px-4">
        <Outlet /> {/* child routes will render here */}
      </main>
    </>
  );
};

export default RootLayout;
