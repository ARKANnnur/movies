"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
};

function Carausel({ children }: Props) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<number>(0);
  const [currentTranslate, setCurrentTranslate] = useState<number>(0);
  const [previousTranslate, setPreviousTranslate] = useState<number>(0);
  const [maxTranslate, setMaxTranslate] = useState<number>(0);

  // Calculate the maximum translate value (limit)
  useEffect(() => {
    if (containerRef.current && sliderRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const sliderWidth = sliderRef.current.scrollWidth;
      const maxTranslateValue = containerWidth - sliderWidth;
      setMaxTranslate(maxTranslateValue > 0 ? 0 : maxTranslateValue);
    }
  }, []);

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    setStartPosition(e.clientX);
    if (sliderRef.current) {
      sliderRef.current.style.transition = "none"; // Disable transition during drag
    }
  };

  const handleMouseMove = (e: any) => {
    if (isDragging) {
      const currentPosition = e.clientX;
      const distanceMoved = currentPosition - startPosition;
      let translateValue = previousTranslate + distanceMoved;

      // Limit translate to prevent sliding beyond the parent container
      if (translateValue > 0) {
        translateValue = 0; // Limit to the left
      } else if (translateValue < maxTranslate) {
        translateValue = maxTranslate; // Limit to the right
      }

      setCurrentTranslate(translateValue);
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${translateValue}px)`;
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setPreviousTranslate(currentTranslate);
    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 0.3s ease"; // Enable smooth transition after drag
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-auto "
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        ref={sliderRef}
        className="flex cursor-pointer transition-transform ease-out duration-300 h-full gap-y-16 flex-nowrap gap-5 mt-5 w-auto overflow-hidden overflow-x-scroll scrollbar-thin  scrollbar-thumb-[#B3B3B3] scrollbar-track-[#1C1B1D]"
        style={{ transform: `translateX(${currentTranslate}px)` }}
      >
        {children}
      </div>
    </div>
  );
}

export default Carausel;
