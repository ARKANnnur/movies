import React from "react";

type Props = {};

function Loading({}: Props) {
  return (
    <div className="size-full z-50 flex absolute justify-center items-center">
      <div className="loader"></div>
    </div>
  );
}

export default Loading;
