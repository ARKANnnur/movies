"use client";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

import React from "react";

export default function StarRating() {
  const [currStar, setCurrStar] = useState(0);
  let lengStar = 10;
  lengStar = 10 - currStar;

  function getCurrStart(index: number, currStar: boolean) {
    if (currStar) {
      setCurrStar((start) => (start === index ? 0 : start + index));
    } else {
      setCurrStar((start) => (start === index ? 0 : index));
    }
  }

  return (
    <>
      {Array.from({ length: currStar }, (_, index) => (
        <FaStar
          fill="#FFDAB9"
          key={index}
          onClick={() => getCurrStart(index + 1, false)}
          className="md:w-5 md:h-5"
        />
      ))}
      {Array.from({ length: lengStar }, (_, index) => (
        <FaRegStar
          fill="#FFDAB9"
          key={index}
          onClick={() => getCurrStart(index + 1, true)}
          className="md:w-5 md:h-5"
        />
      ))}
      {!!currStar && currStar}
    </>
  );
}
