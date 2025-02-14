"use client";

import { useState } from "react";

function Test({}) {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="w-dvw h-dvh flex justify-center items-center text-xl gap-5">
      <button onClick={() => setCount((count) => count - 1)}>-</button>
      <div className="">{count}</div>
      <button onClick={() => setCount((count) => count + 1)}>+</button>
    </div>
  );
}

export default Test;
