import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { FaStar, FaRegCalendarAlt } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import Stars from "@/_components/StarRating";
import BookmarkButton from "@/_components/BookmarkButton";
import Genre from "@/_components/Genre";
import textLimit from "@/_utils/textLimit";
import Link from "next/link";

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

type Movie = {
  id: number;
  title: string;
  rating: number;
  releaseDate: string;
  runtime: string;
  director: number;
  cast: Cast[];
  genre: any[];
  overview: string;
  poster: string;
  recommendations: any[];
};

async function page({ params }: { params: { movieId: string } }) {
  const res = await fetch(`${API_URL}/movies/${params.movieId}`, {
    cache: "no-store",
  });

  if (!res.ok) return console.log("error");

  const movie: Movie = await res.json();

  return (
    <div className="w-dvw">
      <div className="w-full lg:w-[80%] right-0 absolute min-h-dvh bg-page">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movie?.poster}`}
          alt={movie?.title}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          fill
          className="object-cover"
        />
      </div>
      <div className="gap-5 flex flex-col p-5 min-h-dvh pt-12">
        <div className="border glases border-white/10 w-full lg:w-1/3 p-2 lg:p-5 rounded-xl z-10 min-h-64 text-light-50 space-y-3 mt-12">
          <h1 className={`${playfairDisplay.className} text-2xl`}>
            {movie?.title}
          </h1>
          <div className="rating genre space-y-2">
            <div className="flex gap-2 text-xs font-medium">
              <p className="flex gap-1 items-center">
                {movie?.rating}
                <span>
                  <FaStar className="h-3 w-3 text-yellow-400 -translate-y-[2px]" />
                </span>
              </p>
              <span>|</span>
              <p className="flex gap-1 items-center">
                {movie?.releaseDate}
                <span>
                  <FaRegCalendarAlt className="h-3 w-3 text-light-50 -translate-y-[2px]" />
                </span>
              </p>
              <span>|</span>
              <p className="flex gap-1 items-center">
                {movie?.runtime} Minute
                <span>
                  <IoIosTimer className="h-3 w-3 text-light-50 -translate-y-[2px]" />
                </span>
              </p>
            </div>
            <Genre genreId={movie?.genre} textSize="text-xs" gap={2} />
          </div>
          <div className="director-actor text-xs  ">
            <p className="font-medium">
              <span className="text-dark-200">Director : </span>
              {movie?.director}
            </p>
            <p className="font-medium">
              <span className="text-dark-200">Actors : </span>
              {movie?.cast.map(({ id, name }, index) => (
                <span key={id}>
                  {name} {index !== movie?.cast.length - 1 && ","}
                </span>
              ))}
            </p>
          </div>
          <div className="deskripsion text-base">
            <p className="text-xs">
              <span className="text-dark-200">Overview : </span>
              {textLimit(movie?.overview)}
            </p>
          </div>
        </div>
        <div className="border glases border-white/10 w-full lg:w-1/3 rounded-lg z-10 h-14 flex justify-center items-center gap-2">
          <BookmarkButton />
          <Stars />
        </div>
        <div className="flex gap-5 flex-col lg:flex-row">
          {movie?.cast.length  && <Cast cast={movie?.cast} />}
          {movie?.recommendations.length > 0 && <Recomendations recomendations={movie?.recommendations} />}
        </div>
      </div>
    </div>
  );
}

function Cast({ cast }: { cast: Cast[] }) {
  return (
    <div className="border glases rounded-lg  border-white/10 w-full lg:w-1/3 p-5">
      <h3 className="cursor-pointer hover:text-white hover:underline text-white underline decoration-2 underline-offset-8 text-lg">
        cast
      </h3>
      <div className="flex gap-5 mt-5 overflow-x-scroll scrollbar-thin scrollbar-thumb-[#B3B3B3] scrollbar-track-[#1C1B1D]">
        {cast?.map((cast) => (
          <div
            key={cast?.id}
            className="text-center flex flex-col items-center"
          >
            <div className="w-20 h-20 relative rounded-full overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/w300${cast?.image}`}
                alt={cast?.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm">{cast?.name}</p>
            <p className="text-xs text-slate-300">{cast?.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Recomendations({ recomendations }: { recomendations: any }) {
  return (
    <div className="border glases rounded-lg  border-white/10 w-full lg:w-2/3 p-5">
      <h3 className="cursor-pointer hover:text-white hover:underline text-white underline decoration-2 underline-offset-8 text-lg">
        Recomendations
      </h3>
      <div className="flex gap-5 mt-5 overflow-x-scroll scrollbar-thin scrollbar-thumb-[#B3B3B3] scrollbar-track-[#1C1B1D]">
        {recomendations?.map((rec: any) => (
          <Link
            href={`/movie/${rec?.id}`}
            key={rec?.id}
            className="text-center  flex flex-col items-center"
          >
            <div className="w-24 h-28 relative overflow-hidden rounded-md">
              <Image
                src={`https://image.tmdb.org/t/p/w300${rec?.poster}`}
                alt={rec?.title}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm">{textLimit(rec?.title, 20)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default page;
