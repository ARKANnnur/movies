import React from "react";

type Props = {};

function Loading({}: Props) {
  return (
    <div className="w-dvw h-dvh z-50 flex absolute justify-center items-center">
      <div className="loader"></div>
    </div>
  );
}

export default Loading;
