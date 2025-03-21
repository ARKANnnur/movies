"use client";

import Card from "@/_components/Card";

type Recomend = {
  id: number;
  name: string;
  overview: string;
  poster: string;
  releaseDate: string;
  rating: number;
  genre: number[];
};

type Props = { isLoading: boolean; recomend: Recomend[] };

const Recommendations = ({ isLoading, recomend }: Props) => {
  return (
    <div className="min-w-dvw grow">
      {isLoading ? (
        <div className="w-full flex justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:pr-5 mb-5 overflow-y-auto max-h-[100dvh] scroll-thin">
          {recomend?.map((series) => (
            <Card
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

export default Recommendations;
