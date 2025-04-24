"use client";
import Image from "next/image";
import { useState } from "react";
import { FaInfoCircle, FaPlus, FaStar } from "react-icons/fa";

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

export default function EpisodeCard({ episode }: { episode: Episode }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <>
      {episode.runtime && (
        <div
          className="relative h-[180px] cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ perspective: "1000px" }}
        >
          <div
            className={`relative w-full h-full transition-transform duration-500`}
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "",
            }}
          >
            {/* Front */}
            <div
              className="absolute w-full h-full grid grid-cols-3 border border-gray-700 rounded-lg overflow-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="col-span-1 overflow-hidden relative">
                <Image
                  src={`https://image.tmdb.org/t/p/w300${episode?.poster}`}
                  alt={episode.name}
                  fill
                  className="bg-center bg-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
              </div>
              <div className="col-span-2 p-4 flex flex-col justify-between bg-gradient-to-r from-zinc-900 to-zinc-800/30 text-white overflow-y-auto scroll-thin overflow-x-hidden gap-y-2">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold font-playfair">{episode.name}</h3>
                    <span className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded text-nowrap">
                      Ep {episode.episodeNumber}
                    </span>
                  </div>
                  <p className="text-xs text-white/70 mt-1">
                    Runtime:{" "}
                    <span className="text-light-50">
                      {episode.runtime} minutes
                    </span>
                  </p>
                  <p className="text-xs text-white/70">
                    Date:{" "}
                    <span className="text-light-50">{episode.releaseDate}</span>
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`h-3 w-3 ${
                          index < Math.floor(episode.rating / 2)
                            ? "text-yellow-400"
                            : "text-yellow-400/10"
                        }`}
                      />
                    ))}
                    <span className="text-xs ml-1">
                      {Math.floor(episode.rating / 2)}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2">
                    <button className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 text-white flex items-center rounded">
                      <FaPlus className="size-3" />
                      <span className="p-1 translate-y-[1px]">Watchlist</span>
                    </button>

                    <button className="text-xs px-2 bg-blue-500 hover:bg-blue-600 text-white flex items-center rounded">
                      <FaInfoCircle className="size-3" />{" "}
                      <span className="p-1 translate-y-[1px]">Details</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute w-full h-full rounded-lg shadow-lg bg-white dark:bg-gray-800 p-4 overflow-y-auto scroll-thin-2"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <h3 className="font-bold text-xl">{episode.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Directed by: {episode.director}
              </p>
              <p className="text-sm mt-2">{episode.overview}</p>
              <h4 className="font-semibold mt-4">Cast:</h4>
              <ul className="text-sm space-y-1">
                {episode?.cast &&
                  (episode?.cast as Actor[]).map((actor) => (
                    <li key={actor.id} className="flex items-center gap-2">
                      {actor.image && (
                        <div className="size-6 rounded-full overflow-hidden relative">
                          <Image
                            src={`https://image.tmdb.org/t/p/w300${actor.image}`}
                            alt={actor.name}
                            fill
                            className="rounded-full"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                          />
                        </div>
                      )}
                      <span>
                        {actor.name}{" "}
                        {actor.character && `as ${actor.character}`}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {!episode?.runtime && (
        <div className="border border-gray-700 rounded-lg h-[180px] bg-gradient-to-r from-zinc-900 to-zinc-800/10 flex justify-center items-center">
          <p className="text-light-100 text-xl font-semibold">Data not found</p>
        </div>
      )}
    </>
  );
}
