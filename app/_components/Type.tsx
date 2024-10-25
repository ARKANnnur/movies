import React from "react";
import { Playfair_Display } from "next/font/google";
import TypeCard from "./TypeCard";
import Filter from "./Filter";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

type Props = {
  title?: string;
  size?: string;
};

function Type({ title, size }: Props) {
  return (
    <div className="text-light-50 py-5 pl-10 w-auto bg-scroller">
      <div
        className={`${playfairDisplay.className} flex gap-5 items-center text-2xl`}
      >
        {title && <h2>{title}</h2>}
        <Filter />
      </div>
      <div className="flex gap-y-16 flex-nowrap gap-5 mt-5 w-auto overflow-hidden overflow-x-scroll scrollbar-thin  scrollbar-thumb-[#B3B3B3] scrollbar-track-[#1C1B1D]">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <TypeCard key={num} movieId={num} size={size} />
        ))}
      </div>
    </div>
  );
}

export default Type;
