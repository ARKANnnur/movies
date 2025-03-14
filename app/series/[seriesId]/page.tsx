import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { FaStar, FaRegCalendarAlt } from "react-icons/fa";
import { FaClapperboard } from "react-icons/fa6";
import Stars from "@/_components/StarRating";
import BookmarkButton from "@/_components/BookmarkButton";
import Genre from "@/_components/Genre";
import SubBar from "@/_components/series/SubBar";
import { IoIosTimer } from "react-icons/io";
import Highlight from "@/_components/series/Highlight";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Cast = {
  id: number;
  name: string;
  image: string;
  character: string;
};

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

type Series = {
  id: number;
  name: string;
  rating: number;
  releaseFirstDate: string;
  releaseLastDate: string;
  totalEpisode: string;
  totalSeason: number;
  created: string;
  director: number;
  cast: Cast[];
  genre: any[];
  overview: string;
  poster: string;
  recommendations: any[];
  lastEps: LastEpisode;
};

async function page({ params }: { params: { seriesId: string } }) {
  const res = await fetch(`${API_URL}/series/${params.seriesId}`, {
    cache: "no-store",
  });

  if (!res.ok) return console.log("error");

  const series: Series = await res.json();

  return (
    <div className="w-dvw">
      <div className="w-full lg:w-[80%] right-0 absolute min-h-dvh bg-page">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${series?.poster}`}
          alt={series?.name}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex items-start justify-between">
        <div className="gap-5 flex flex-col p-5 min-h-dvh pt-12 w-full lg:w-1/3">
          <div className="border glases border-white/10 w-full p-2 lg:p-5 rounded-xl z-10 h-auto text-light-50 space-y-3 mt-12">
            <h1 className={`${playfairDisplay.className} text-2xl`}>
              {series?.name}
            </h1>
            <div className="rating genre space-y-2">
              <div className="flex gap-2 text-xs font-medium items-center">
                <p className="flex gap-1 items-center">
                  {series?.rating}
                  <span>
                    <FaStar className="h-3 w-3 text-yellow-400 -translate-y-[2px]" />
                  </span>
                </p>
                <span>|</span>
                <div className="flex gap-x-1 items-center">
                  <p>{series?.releaseFirstDate}</p>
                  <span>
                    <FaRegCalendarAlt className="h-3 w-3 text-light-50 -translate-y-[2px]" />
                  </span>
                  <span>-</span>
                  <p>{series?.releaseLastDate}</p>
                  <span>
                    <FaRegCalendarAlt className="h-3 w-3 text-light-50 -translate-y-[2px]" />
                  </span>
                </div>
                <span>|</span>
                {series?.totalEpisode ? (
                  <p className="flex gap-1 items-center">
                    {series?.totalEpisode} Episode
                    <span>
                      <FaClapperboard className="h-3 w-3 text-light-50 -translate-y-[2px]" />
                    </span>
                  </p>
                ) : (
                  <p className="flex gap-1 items-center">
                    {series?.totalSeason} Season
                    <span>
                      <FaClapperboard className="h-3 w-3 text-light-50 -translate-y-[2px]" />
                    </span>
                  </p>
                )}
              </div>
              <Genre genreId={series?.genre} textSize="text-xs" gap={2} />
            </div>

            <div className="deskripsion text-base">
              <p className="text-xs">
                <span className="text-dark-200">Overview : </span>
                {series?.overview}
              </p>
            </div>
          </div>
          <div className="border glases border-white/10 w-full rounded-lg z-10 h-14 flex justify-center items-center gap-2">
            <BookmarkButton />
            <Stars />
          </div>
          <Highlight highlight={series?.lastEps} />
        </div>
        <SubBar id={series?.id} season={series?.totalSeason} />
      </div>
    </div>
  );
}

export default page;
