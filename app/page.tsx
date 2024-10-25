import React, { Suspense } from "react";
import Slider from "@/app/_components/Slider";
import Type from "./_components/Type";
import Loading from "@/app/loading";

type Props = {
  searchParams: any;
};

function page({}: Props) {
  return (
    <div className="">
      <Slider />
      <Suspense fallback={<Loading />}>
        <Type title="Trending" />
        <Type title="Popular" />
      </Suspense>
    </div>
  );
}

export default page;
