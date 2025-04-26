"use client";

import CsrCard from "@/_components/CsrCard";
import { useMounted } from "@/_utils/useMounted";

type Sim = {
  id: number;
  name: string;
  overview: string;
  poster: string;
  releaseDate: string;
  rating: number;
  genre: number[];
};

type Props = { isLoading: boolean; similiar: Sim[] };

const Similiar = ({ isLoading, similiar }: Props) => {
  const mounted = useMounted();
  if (!mounted) {
    console.log("not CSR");
    return null;
  }

  if (!isLoading && similiar.length === 0) {
    return (
      <div className="min-w-dvw grow flex justify-center items-center h-[30vh]">
        <p className="text-lg font-semibold">Movies/Series not found</p>
      </div>
    );
  }

  return (
    <div className="min-w-dvw grow">
      {isLoading ? (
        <div className="w-full flex justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:pr-5 mb-5 overflow-y-auto max-h-[100dvh] scroll-thin">
          {similiar?.map((series) => (
            <CsrCard
              item={series}
              key={series.id}
              parentSize="h-[24rem] md:h-[30rem] lg:h-[24rem]"
              size="h-[20rem] md:h-[28rem] lg:h-[20rem]"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Similiar;
