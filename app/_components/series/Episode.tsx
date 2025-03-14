"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  cast: string[];
};

type Props = { id: number; seasonCount: number };

function Episode({ id, seasonCount }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [episodesBySeason, setEpisodesBySeason] = useState<
    Record<number, Episode[]>
  >({});
  const [seasonNumber, setSeasonNumber] = useState<number>(1);

  useEffect(() => {
    async function getEpisode() {
      if (episodesBySeason[seasonNumber]) return;
      setIsLoading(true);

      try {
        const res = await fetch(
          `${API_URL}/series/episode?seriesId=${id}&seasonNumber=${seasonNumber}`
        );
        if (!res.ok) throw new Error("Failed to fetch episodes");

        const data: Episode[] = await res.json();

        setEpisodesBySeason((prev) => ({
          ...prev,
          [seasonNumber]: data,
        }));
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getEpisode();
  }, [id, seasonNumber, episodesBySeason]);

  return (
    <div className="min-w-dvw grow">
      {seasonCount > 1 ? (
        <div className="flex gap-2 mb-4">
          {[...Array(seasonCount)].map((_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 border glases  rounded-xl ${
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
        <p className="text-lg font-semibold">
          Total Episodes: {episodesBySeason[1]?.length ?? 0}
        </p>
      )}

      {isLoading ? (
        <div className="w-full flex justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-5">
          {episodesBySeason[seasonNumber]?.map((episode) => (
            <div
              key={episode.id}
              className="border glases border-white/10 rounded-xl shadow-lg relative h-[20rem] hover:scale-125 hover:z-50 transition-all"
            >
              <div className="absolute lg:size-full transition-all z-0 rounded-xl overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w300${episode?.poster}`}
                  alt={episode.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  className="bg-center bg-cover mask-eps backdrop-blur-xs bg-white/30 backdrop-brightness-50"
                />
              </div>
              <div className="relative z-10 size-full p-4 flex flex-col justify-between">
                <div>
                  <p className="text-xl text-yellow-100">{episode.episodeNumber}</p>
                </div>
                <div className="">
                  <h2 className="text-xl font-bold">{episode.name}</h2>
                  <p className="mt-2 text-sm">
                    Runtime: {episode.runtime} minutes
                  </p>
                  <p className="text-sm">Date: {episode.releaseDate}</p>
                  <p className="text-sm">Rating: ⭐ {episode.rating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Episode;
