"use client";

import { Playfair_Display } from "next/font/google";
import TypeCard from "@/_components/TypeCard";
import Filter from "@/_components/Filter";
import { useEffect, useState } from "react";
import Loading from "@/loading";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const filter = [
  {
    code: "day",
    name: "Today",
  },
  {
    code: "week",
    name: "Wekk",
  },
];

type filterCode = {
  code?: string;
  name?: string;
};

type Props = {
  title?: string;
  size?: string;
  filterName?: filterCode[];
};

type Movie = {
  id: number;
  title: string;
  overview: string;
  genre: number;
  rating: number;
  releaseDate: string;
  poster: string;
};

function Type({ title, size, filterName = filter }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [dataTrending, setDataTrending] = useState<Movie[]>([]);
  const [filterPick, setFilterPick] = useState(filterName[0]?.code);

  useEffect(() => {
    async function getMovies() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/trending?by=${filterPick}`
        );
        const data = await res.json();
        setDataTrending(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getMovies();
  }, [filterPick]);
  console.log(dataTrending);

  return (
    <div className="text-light-50 py-5 pl-10 w-auto bg-scroller">
      <div
        className={`${playfairDisplay.className} flex gap-5 items-center text-2xl w-full overflow-y-scroll sm:overflow-y-clip`}
      >
        {title && <h2>{title}</h2>}
        <Filter
          filterName={filterName}
          activeFilter={filterPick}
          setActiveFilter={setFilterPick}
        />
      </div>
      <div className="flex gap-y-16 flex-nowrap gap-5 mt-5 w-auto overflow-hidden overflow-x-scroll scrollbar-thin  scrollbar-thumb-[#B3B3B3] scrollbar-track-[#1C1B1D]">
        {isLoading ? (
          <Loading />
        ) : (
          dataTrending?.map((data) => (
            <TypeCard key={data?.id} data={data} size={size} />
          ))
        )}
      </div>
    </div>
  );
}

export default Type;
