"use client";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function StarRating({
  rating,
  toggleRating,
}: {
  rating: number;
  toggleRating: (rating: number) => void;
}) {
  const handleRating = (index: number) => {
    const rat = index === rating ? 0 : index;
    toggleRating(rat);
  };

  return (
    <>
      <div className="flex items-center gap-1">
        {Array.from({ length: 10 }, (_, index) => {
          const starIndex = index + 1;
          return starIndex <= rating ? (
            <FaStar
              key={index}
              fill="#FFDAB9"
              className="md:w-5 md:h-5 cursor-pointer"
              onClick={() => handleRating(starIndex)}
            />
          ) : (
            <FaRegStar
              key={index}
              fill="#FFDAB9"
              className="md:w-5 md:h-5 cursor-pointer"
              onClick={() => handleRating(starIndex)}
            />
          );
        })}
      </div>
    </>
  );
}
