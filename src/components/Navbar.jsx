import React, { useState } from "react";

const SmallNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-2 fixed top-0 flex items-center justify-between w-full bg-black pt-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col justify-between ml-2 w-7 h-5 focus:outline-none cursor-pointer relative z-50"
      >
        {/* Top bar */}
        <span
          className={`block h-1 w-full bg-white rounded transition-transform duration-300 ease-in-out
        ${open ? "rotate-45 translate-y-2" : ""}`}
        ></span>

        {/* Middle bar */}
        <span
          className={`block h-1 w-full bg-white rounded transition-all duration-500 ease-in-out
        ${open ? "opacity-0 rotate-45 translate-y-1" : "opacity-100"}`}
        ></span>

        {/* Bottom bar */}
        <span
          className={`block h-1 w-full bg-white rounded transition-transform duration-500 ease-in-out
        ${open ? "-rotate-45 -translate-y-2" : ""}`}
        ></span>
      </button>
      <h1 className="text-2xl font-bold px-3 z-50">elliot</h1>
      {/* Filter layer */}
      <div
        className={`fixed top-0 left-0 h-screen w-screen z-40 
              bg-black/50 transition-opacity duration-300
              ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="">
          <ul className="flex flex-col gap-4 items-center justify-center h-screen">
            <li>
              <a href="#">contact</a>
            </li>
            <li>
              <a href="#">animation</a>
            </li>
            <li>
              <a href="#">illust</a>
            </li>
            <li className="pt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const MediumNavbar = () => {
  return (
    <div className="w-full flex p-4 items-end gap-14 bg-black pt-4">
      <a href="#">
        <h1 className="text-6xl font-bold">elliot</h1>
      </a>
      <div className="">
        <ul className="flex gap-8 pb-2 text-2xl">
          <li>
            <a href="#">contact</a>
          </li>
          <li>
            <a href="#">animation</a>
          </li>
          <li>
            <a href="#">illust</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Navbar = () => {
  // const [openSmallNavbar, setOpenSmallNavbar] = useState(false);

  return (
    <div className="text-white font-montserrat">
      <div className="md:block hidden">
        <MediumNavbar></MediumNavbar>
      </div>
      <div className="md:hidden">
        <SmallNavbar></SmallNavbar>
      </div>
    </div>
  );
};

export default Navbar;
