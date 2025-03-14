"use client";
import { useState } from "react";
import { IoMdHome, IoMdFilm } from "react-icons/io";
import { MdMovie } from "react-icons/md";
import { PiFilmScript } from "react-icons/pi";
import Highlight from "./Highlight";
import Episode from "./Episode";
import Recommendations from "./Recommendations";
import Similiar from "./Similiar";

type Props = { id: number; season: number };

function SubBar({ id, season }: Props) {
  const [bar, setBar] = useState("episode");

  return (
    <div className="lg:pt-24 flex-1 z-10">
      <div className="border glases border-white/10 rounded-xl p-2 flex gap-2 h-fit w-fit mb-2">
        <div
          onClick={() => setBar("episode")}
          className="border glases border-white/10 rounded-xl p-2 cursor-pointer flex items-center gap-x-2"
        >
          <MdMovie className="size-4" />
          <p>Episode</p>
        </div>
        <div
          onClick={() => setBar("recommendations")}
          className="border glases border-white/10 rounded-xl p-2 cursor-pointer flex items-center gap-x-2"
        >
          <IoMdFilm className="size-4" />
          <p>Recommendations</p>
        </div>
        <div
          onClick={() => setBar("similiar")}
          className="border glases border-white/10 rounded-xl p-2 cursor-pointer flex items-center gap-x-2"
        >
          <PiFilmScript className="size-4" />
          <p>Similiar</p>
        </div>
      </div>
      {bar === "episode" && <Episode id={id} seasonCount={season} />}
      {bar === "recommendations" && <Recommendations />}
      {bar === "similiar" && <Similiar />}
    </div>
  );
}

export default SubBar;
