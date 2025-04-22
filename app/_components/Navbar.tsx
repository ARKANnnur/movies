"use client";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Search from "@/_components//Search";


function Navbar() {
  const [navBackground, setNavBackground] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`font-playfair ${
        navBackground
          ? "bg-slate-900/40 border-b-[1px] border-light-50/10 bg-blend-saturation backdrop-blur-md"
          : ""
      } w-dvw px-5 py-5 sm:px-10 fixed z-50`}
    >
      <ul className="relative flex justify-between items-center">
        <li className="hidden sm:block text-4xl">
          <Link href={"/"}>Movies</Link>
        </li>
        <li className="sm:grow justify-start sm:justify-center flex items-center">
          <Search />
        </li>
        <li className="">
          <ul className="sm:flex gap-5 text-lg ">
            <li>
              {isOpen ? (
                <IoMdClose
                  onClick={() => setIsOpen((open) => !open)}
                  className="sm:hidden"
                />
              ) : (
                <CiMenuFries
                  onClick={() => setIsOpen((open) => !open)}
                  className="sm:hidden"
                />
              )}
            </li>
            <div
              className={`${
                isOpen ? "block" : "hidden"
              } absolute right-0 sm:flex sm:relative sm:gap-5 bg-slate-900/40 border-b-[1px] border-light-50/10 bg-blend-saturation backdrop-blur-md p-2 rounded-lg sm:rounded-none sm:border-none sm:bg-transparent sm:backdrop-blur-none sm:bg-blend-normal`}
            >
              <li className="">
                <Link href={"/recomendation?type=movie"}>Recomendation</Link>
              </li>
              <li className="">
                <Link href={"/bookmark"}>Bookmark</Link>
              </li>
            </div>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
