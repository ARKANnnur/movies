"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FaClapperboard } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { Playfair_Display } from "next/font/google";
import textLimit from "@/_utils/textLimit";
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

type LastEpisode = {
  id: number;
  name: string;
  overview: string;
  rating: number;
  releaseDate: string;
  episodeNumber: number;
  runtime: number;
  seasonNumber: number;
  poster: string;
};

function Highlight({ highlight }: { highlight: LastEpisode }) {
  return (
    <div
      className="relative border flex glases border-white/10 w-full overflow-hidden rounded-xl z-10 min-h-64 text-light-50 space-y-3"
      key={highlight?.id}
    >
      <div className="relative w-full lg:w-2/3 overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${highlight?.poster}`}
          alt={highlight?.name}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          fill
          className="object-cover mask-hig"
        />
      </div>
      <div className="absolute z-10 size-full flex justify-end">
        <div className="flex self-start p-2 absolute top-0 left-0 items-center">
          <p className="mr-2">{highlight?.releaseDate}</p>
          <p>Last Episode {highlight?.episodeNumber}</p>
          <p>/{highlight?.seasonNumber}</p>
          <FaClapperboard className="ml-2 h-3 w-3 text-light-50 -translate-y-[1px]" />
        </div>
        <div className="w-2/3 text-end self-end p-2 lg:p-5">
          <h2 className="font-playfair text-2xl">{highlight?.name}</h2>
          <div className="flex gap-x-2 justify-end text-sm">
            <p className="flex gap-1 items-center">
              {highlight?.rating}
              <span>
                <FaStar className="h-3 w-3 text-yellow-400 " />
              </span>
            </p>
            <p className="flex gap-1 items-center">
              {highlight?.runtime} Minute
              <span>
                <IoIosTimer className="h-3 w-3 text-light-50" />
              </span>
            </p>
          </div>
          <p className="text-sm mt-2">{textLimit(highlight?.overview, 100)}</p>
        </div>
      </div>
    </div>
  );
}

export default Highlight;
