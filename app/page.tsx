import React, { Suspense } from "react";
import Slider from "@/_components/Slider";
const Type = React.lazy(() => import("@/_components/Type"));
import Loading from "@/loading";

type Props = {
  searchParams: any;
};

async function Page({}: Props) {
  const res = await fetch("http://localhost:3000/api/movies", {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <Slider moviesData={data} />
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
