"use client";
import { useState } from "react";
import { IoMdHome, IoMdFilm } from "react-icons/io";
import { MdMovie } from "react-icons/md";
import { PiFilmScript } from "react-icons/pi";
import Highlight from "./Highlight";
import Episode from "./Episode";
import Recommendations from "./Recommendations";
import Similiar from "./Similiar";

type Props = {};

function SubBar({}: Props) {
  const [bar, setBar] = useState("highlight");

  return (
    <div className="grid grid-flow-col auto-cols-max lg:pt-24 grow z-10 gap-5">
      <div className="border glases border-white/10 rounded-xl p-2 flex flex-col gap-2">
        <p
          onClick={() => setBar("highlight")}
          className="border glases border-white/10 rounded-xl p-2 cursor-pointer"
        >
          <IoMdHome className="size-4" />
        </p>
        <p
          onClick={() => setBar("episode")}
          className="border glases border-white/10 rounded-xl p-2 cursor-pointer"
        >
          <MdMovie className="size-4" />
        </p>
        <p
          onClick={() => setBar("recommendations")}
          className="border glases border-white/10 rounded-xl p-2 cursor-pointer"
        >
          <IoMdFilm className="size-4" />
        </p>
        <p
          onClick={() => setBar("similiar")}
          className="border glases border-white/10 rounded-xl p-2 cursor-pointer"
        >
          <PiFilmScript className="size-4" />
        </p>
      </div>
      {bar === "highlight" && <Highlight />}
      {(bar === "episode" || bar === "highlight") && <Episode />}
      {bar === "recommendations" && <Recommendations />}
      {bar === "similiar" && <Similiar />}
    </div>
  );
}

export default SubBar;
