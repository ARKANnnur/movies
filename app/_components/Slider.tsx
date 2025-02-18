"use client";

import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Genre from "@/_components/Genre";
import textLimit from "@/_utils/textLimit";
import Loading from "@/loading";
import Link from "next/link";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

type Movie = {
  id: number;
  title: string;
  overview: string;
  genre: number;
  rating: number;
  releaseDate: string;
  poster: string;
};

function Slider() {
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [countData, setCountData] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const dataLength = moviesData.length - 1;

  const increase = () =>
    setCountData((prev) => (prev !== dataLength ? prev + 1 : 0));
  const decrease = () =>
    setCountData((prev) => (prev !== 0 ? prev - 1 : dataLength));
  const middleCrease = () => {
    const middle = Math.round(dataLength / 2);
    if (countData < middle) increase();
    else if (countData > middle) decrease();
  };

  // swipe function
  const handlers = useSwipeable({
    onSwipedLeft: increase,
    onSwipedRight: decrease,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:3000/api/movies");
        const data = await res.json();
        setMoviesData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div
      {...handlers}
      key={moviesData[countData]?.id}
      className="max-w-[100%] h-dvh sm:h-[30rem] relative overflow-hidden"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Link href={`/movie/${moviesData[countData]?.id}`}>
            <AnimatePresence>
              <motion.div
                key={moviesData[countData]?.poster}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {moviesData.map((movie: any, index) => (
                  <Image
                    key={movie.title}
                    src={`https://image.tmdb.org/t/p/w1280${movie?.poster}`}
                    alt={movie?.title}
                    fill
                    draggable="false"
                    className={`bg-slider object-cover absolute top-full ${
                      index === countData ? "z-10" : "z-0 opacity-0"
                    }`}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            <motion.div
              key={countData}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-0 px-5 pl-10 py-2 md:w-1/2 lg:w-1/3 space-y-2 text-base z-20"
            >
              <h1 className={`${playfairDisplay.className} text-4xl`}>
                {moviesData[countData]?.title}
              </h1>
              <div className="flex gap-2 text-sm font-medium">
                <p className="flex gap-1 items-center">
                  {moviesData[countData]?.rating}
                  <span>
                    <FaStar className="h-3 w-3 text-yellow-400" />
                  </span>
                </p>
                <span>|</span>
                <p>{moviesData[countData].releaseDate}</p>
              </div>
              <Genre genreId={moviesData[countData].genre} />
              <p className="text-sm">
                {textLimit(moviesData[countData]?.overview)}
              </p>
            </motion.div>
          </Link>
          <div className="absolute bottom-1/3 sm:bottom-0 w-full h-10 flex justify-center items-center gap-5 z-20">
            <Button key="button-decrease" onClick={decrease} />
            <Button key="button-middleCrease" onClick={middleCrease} />
            <Button key="button-increase" onClick={increase} />
          </div>
        </>
      )}
    </div>
  );
}

function Button({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.1, opacity: 1 }}
      whileTap={{ scale: 0.9 }}
      className="h-1 w-12 md:w-20 bg-light-50 opacity-50 hover:opacity-100 rounded-full cursor-pointer transition-all"
    />
  );
}

export default Slider;
