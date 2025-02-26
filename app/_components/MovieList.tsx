"use client";

import { Playfair_Display } from "next/font/google";
import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import Filter from "@/_components/Filter";
import Loading from "@/loading";
import Image from "next/image";
import Link from "next/link";
import Genre from "./Genre";
import { FaStar } from "react-icons/fa";
import textLimit from "@/_utils/textLimit";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL);

type Movie = {
  id: number;
  title: string;
  name: string;
  overview: string;
  genre: number[];
  rating: number;
  releaseDate: string;
  poster: string;
};

type FilterType = {
  code: string;
  name: string;
};

type MovieListContextType = {
  dataTrending: Movie[];
  isLoading: boolean;
  title?: string;
  filterName?: FilterType[];
  filterPick: string;
  setFilterPick: (code: string) => void;
};

const MovieListContext = createContext<MovieListContextType | null>(null);

type MovieListProps = {
  title?: string;
  filterName?: FilterType[];
  children: ReactNode;
};

// 1️⃣ **MovieList (Main Component)**
function MovieList({ title, filterName = [], children }: MovieListProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataTrending, setDataTrending] = useState<Movie[]>([]);
  const [filterPick, setFilterPick] = useState<string>(
    filterName[0]?.code ?? "day"
  );

  // Number 3 for Movie
  // Number 5 for Series(TV)
  const convertTitle = title?.match(/[a-zA-Z]+/g)?.join(" ") || ""; // get letter
  const number = Number(title?.match(/\d+/)?.[0]) || 0; // get number
  const converType = number == 3 ? "movie" : "tv";

  let types: any;
  if (!convertTitle) types = `${API_URL}/homeFilter?by=${filterPick}`;
  else if (convertTitle === "Movie")
    types = `${API_URL}/trendingMovie?by=${filterPick}`;
  else if (convertTitle === "Series")
    types = `${API_URL}/trendingTv?by=${filterPick}`;
  else types = `${API_URL}/byGenre?by=${convertTitle}&type=${converType}`;

  useEffect(
    function () {
      async function getMovies() {
        if (dataTrending.length > 0 && !filterName) return;
        setIsLoading(true);
        try {
          const res = await fetch(types);
          const data = await res.json();
          setDataTrending(data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
      getMovies();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterPick, types]
  );

  return (
    <MovieListContext.Provider
      value={{
        dataTrending,
        isLoading,
        title: convertTitle,
        filterName,
        filterPick,
        setFilterPick,
      }}
    >
      <div className="text-light-50 py-5 pl-10 w-auto h-full bg-scroller">
        {children}
      </div>
    </MovieListContext.Provider>
  );
}

// 2️⃣ **MovieList.Filter**
MovieList.Filter = function MovieListFilter() {
  const context = useContext(MovieListContext);
  if (!context) throw new Error("MovieList.Filter must us in MovieList!");

  return (
    <div
      className={`${playfairDisplay.className} flex gap-5 items-center text-2xl w-full overflow-y-scroll sm:overflow-y-clip`}
    >
      {context.title && <h2>{context.title}</h2>}
      {!!context.filterName?.length && (
        <Filter
          filterName={context.filterName}
          activeFilter={context.filterPick}
          setActiveFilter={context.setFilterPick}
        />
      )}
    </div>
  );
};

// 3️⃣ **MovieList.List**
MovieList.List = function MovieListList({ children }: { children: ReactNode }) {
  const context = useContext(MovieListContext);
  if (!context) throw new Error("MovieList.Filter must us in MovieList!");

  return (
    <div
      className={`flex flex-nowrap gap-5 mt-5 w-auto relative min-h-full ${
        !context.isLoading &&
        "overflow-x-scroll scrollbar-thin scrollbar-thumb-[#B3B3B3] scrollbar-track-[#1C1B1D]"
      }`}
    >
      {context.isLoading ? <Loading /> : children}
    </div>
  );
};

// 4️⃣ **MovieList.Card**
MovieList.Card = function MovieListCard({
  size = "w-56 h-80",
}: {
  size?: string;
}) {
  const context = useContext(MovieListContext);
  if (!context) throw new Error("MovieList.Card must us in MovieList!");

  return (
    <>
      {context?.dataTrending?.map((movie) => {
        return (
          <Link
            key={movie.id}
            className="group transition-all duration-500 delay-300 h-96 w-56"
            href={`/${movie.title ? "movie" : "series"}/${movie?.id}`}
          >
            <div className={`${size} glases rounded-md overflow-hidden`}>
              <div className="card-gradient size-full absolute bottom-0">
                <div className="w-full h-1/3 p-2 absolute bottom-0 transition-all delay-300 space-y-2 z-50 lg:z-10">
                  <div className="rating genre space-y-2">
                    <div className="flex gap-2 text-xs font-medium">
                      <p className="flex gap-1 items-center">
                        {movie?.rating}
                        <span>
                          <FaStar className="h-3 w-3 text-yellow-400" />
                        </span>
                      </p>
                      <span>|</span>
                      <p>{movie?.releaseDate}</p>
                    </div>
                    <Genre
                      genreId={movie?.genre?.slice(0, 3)}
                      textSize="text-xs"
                      gap={2}
                    />
                  </div>
                  <p className="text-xs">{textLimit(movie?.overview, 100)}</p>
                </div>
              </div>
              <div className="group-hover:h-2/3 relative h-2/3 lg:size-full transition-all z-10">
                <Image
                  src={`https://image.tmdb.org/t/p/w300${movie?.poster}`}
                  alt={movie.title || movie.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  className="bg-center bg-cover"
                />
              </div>
            </div>
            <p
              className={`${playfairDisplay.className} mt-2 text-base font-medium transition-all`}
            >
              {movie.title || movie.name}
            </p>
          </Link>
        );
      })}
    </>
  );
};

export default MovieList;
