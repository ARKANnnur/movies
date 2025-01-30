import React from "react";

type Props = {};

export default function Search({}: Props) {
  return (
    <div className="w-full h-auto sm:w-1/2 bg-red-400 relative">
      <input
        type="text"
        className="w-full bg-transparent border-b border-b-light-50 border-opacity-45 focus:border-opacity-100 focus:outline-none text-left"
        placeholder="Search movie"
      />
      <div className="w-full absolute border"></div>
    </div>
  );
}
