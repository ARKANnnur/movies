"use client";

import React, { useState } from "react";

type Props = {
  filterName?: string[];
};

function Filter({ filterName = ["Today", "Week"] }: Props) {
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <div className="flex items-center h-full border rounded-full cursor-pointer bg-gradient text-sm sm:text-base text-nowrap">
      {filterName?.map((filter, index) => (
        <div
          key={index}
          className={
            activeFilter === index
              ? "border bg-opt-gradient text-nowrap rounded-full h-full text-light-50 scale-105 py-1 px-5"
              : "py-1 px-5 text-light-50/70 hover:text-light-50"
          }
          onClick={() => setActiveFilter(index)}
        >
          {filter}
        </div>
      ))}
    </div>
  );
}

export default Filter;
