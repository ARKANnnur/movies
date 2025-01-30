"use client";

import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import React, { useState } from "react";
import { Playfair_Display } from "next/font/google";
import Genre from "@/_components/Genre";
import textLimit from "@/_utils/textLimit"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

function Slider({ moviesData }: any) {
  const [countData, setCountData] = useState(0);
  const dataLength = moviesData.length - 1;
  let pickData = moviesData[countData];

  function increase() {
    setCountData((countData) => (countData != dataLength ? countData + 1 : 0));
  }
  function decrease() {
    setCountData((countData) => (countData != 0 ? countData - 1 : dataLength));
  }
  function middleCrease() {
    const middle = Math.round(dataLength / 2);
    if (countData == middle) {
      return;
    } else if (countData < middle) {
      return increase();
    } else {
      return decrease();
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: increase,
    onSwipedRight: decrease,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const text = textLimit(pickData?.overview)

  return (
    <div {...handlers} className="max-w-[100%] h-dvh sm:h-96 relative ">
      <Image
        src={`https://image.tmdb.org/t/p/w1280${pickData?.poster}`}
        alt={pickData?.title}
        fill
        className="object-cover object-top bg-slider"
      />
      <div className="absolute bottom-0 left-0 px-5 pl-10 py-2 md:w-1/2 lg:w-1/3 space-y-2 text-base">
        <h1 className={`${playfairDisplay.className} text-2xl`}>
          {pickData?.title}
        </h1>
        <p>{text}</p>
        <Genre genreId={pickData} />
      </div>
      <div className="absolute bottom-1/3 sm:bottom-0 w-full h-10  justify-center items-center flex gap-5">
        <div
          onClick={() => decrease()}
          className="h-1 w-12 md:w-20 bg-light-50 opacity-50 hover:opacity-100 rounded-full cursor-pointer"
        ></div>
        <div
          onClick={() => middleCrease()}
          className="h-1 w-12 md:w-20 bg-light-50 opacity-50 hover:opacity-100 rounded-full cursor-pointer"
        ></div>
        <div
          onClick={() => increase()}
          className="h-1 w-12 md:w-20 bg-light-50 opacity-50 hover:opacity-100 rounded-full cursor-pointer"
        ></div>
      </div>
    </div>
  );
}

export default Slider;
