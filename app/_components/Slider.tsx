import Image from "next/image";
import React from "react";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

type Props = {};

function Slider({}: Props) {
  return (
    <div className="max-w-[100%] h-dvh sm:h-96 relative ">
      <Image
        src="https://plus.unsplash.com/premium_photo-1666700698920-d2d2bba589f8?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="slide show image"
        fill
        className="object-cover bg-slider"
      />
      <div className="absolute bottom-0 left-0 px-5 pl-10 py-2 sm:w-1/3 space-y-2 text-base">
        <h1 className={`${playfairDisplay.className} text-2xl`}>Bangok</h1>
        <p>
          The history abaout the city with the beatiful view and culture of
          bangkok, Rakpam and durban history live with they struggling building
          company with hardly and so fucking amazing they hard for this and they
          doing the best for they company but what.
        </p>
        <ul className="flex gap-5 text-sm text-light-100">
          <li>Action</li>
          <li>Action</li>
          <li>Action</li>
        </ul>
      </div>
      <div className="absolute bottom-1/3 sm:bottom-0 w-full h-10  justify-center items-center flex gap-5">
        <div className="h-1 w-12 md:w-20 bg-light-50 opacity-50 hover:opacity-100 rounded-full cursor-pointer"></div>
        <div className="h-1 w-12 md:w-20 bg-light-50 opacity-50 hover:opacity-100 rounded-full cursor-pointer"></div>
        <div className="h-1 w-12 md:w-20 bg-light-50 opacity-50 hover:opacity-100 rounded-full cursor-pointer"></div>
      </div>
    </div>
  );
}

export default Slider;
