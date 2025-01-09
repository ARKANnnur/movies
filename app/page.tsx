import React, { Suspense } from "react";
import Slider from "@/_components/Slider";
import Type from "./_components/Type";
import Loading from "@/loading";

type Props = {
  searchParams: any;
};

function Page({}: Props) {
  return (
    <div className="">
      <Slider />
      <Suspense fallback={<Loading />}>
        <Type
          filterName={["Movie", "K-drama", "C-drama", "Anime", "Cartoon"]}
          size="w-[30rem] h-72"
        />
        <Type title="Trending" />
        <Type title="Popular" />
      </Suspense>
    </div>
  );
}

export default Page;
