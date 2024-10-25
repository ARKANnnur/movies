import React from "react";

type Props = {};

function Filter({}: Props) {
  return (
    <div className="flex items-center h-full text-base border rounded-full cursor-pointer bg-gradient">
      <div className="border bg-opt-gradient rounded-full h-full py-1 px-5">
        Today
      </div>
      <div className="py-1 px-5">Week</div>
    </div>
  );
}

export default Filter;
