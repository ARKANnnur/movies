"use client";

import EpisodeCard from "./EpisodeCard";

type Actor = {
  id: number;
  image: string | null;
  name: string;
  character: string;
};

type Episode = {
  id: number;
  name: string;
  overview: string;
  episodeNumber: number;
  runtime: number;
  releaseDate: string;
  poster: string;
  rating: number;
  director: string;
  cast: Actor[];
};

type Props = {
  isLoading: boolean;
  seasonCount: number;
  seasonNumber: number;
  setSeasonNumber: React.Dispatch<React.SetStateAction<number>>;
  episodesBySeason: Record<number, Episode[]>;
};

function Episode({
  isLoading,
  seasonCount,
  seasonNumber,
  setSeasonNumber,
  episodesBySeason,
}: Props) {
  return (
    <div className="min-w-dvw grow">
      {seasonCount > 1 ? (
        <div className="flex gap-2 mb-3 overflow-x-auto scroll-thin-y pb-1">
          {[...Array(seasonCount)].map((_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 border glases text-nowrap rounded-lg ${
                seasonNumber === index + 1
                  ? "border-yellow-500/50 text-yellow-500"
                  : "border-white/10"
              }`}
              onClick={() => setSeasonNumber(index + 1)}
            >
              Season {index + 1}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-lg font-semibold mt-2">
          {!isLoading && (
            <>
              <span className="text-white/80">Total Episode: </span>
              {episodesBySeason[1]?.length ?? 0}
            </>
          )}
        </p>
      )}

      {isLoading ? (
        <div className="w-full flex justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:pr-5 mb-5 overflow-y-auto max-h-[80dvh] scroll-thin">
          {episodesBySeason[seasonNumber]?.map((episode) => (
            <EpisodeCard episode={episode} key={episode?.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Episode;
