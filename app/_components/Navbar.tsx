"use client";
import React, { useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

type Props = {};

function Navbar({}: Props) {
  const [navBackground, setNavBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
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
      className={`${playfairDisplay.className} ${
        navBackground
          ? "bg-slate-900/40 border-b-[1px] border-light-50/10 bg-blend-saturation backdrop-blur-md"
          : ""
      } w-dvw px-2 py-5 sm:px-10 fixed z-50`}
    >
      <ul className="flex justify-between items-center">
        <li className="text-4xl">
          <Link href={"/"}>Movies</Link>
        </li>
        <li className="grow justify-center flex items-center">
          <input
            type="text"
            className="w-1/2 bg-transparent border-b border-b-light-50 border-opacity-45 focus:border-opacity-100 focus:outline-none text-left"
            placeholder="Search movie"
          />
        </li>
        <li>
          <ul className="sm:flex gap-5 text-lg hidden">
            <li>
              <Link href={"/recomendation"}>Recomendation</Link>
            </li>
            <li>
              <Link href={"/bookmark"}>Bookmark</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
