"use client";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import Genre from "./Genre";
import textLimit from "@/_utils/textLimit";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

type Item = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  genre: number[];
  rating: number;
  releaseDate: string;
  poster: string;
};

function Card({
  item,
  parentSize = "h-[24rem]",
  deleteBookmark,
}: {
  item: Item;
  parentSize?: string;
  deleteBookmark: any;
}) {
  const [hovered, setHovered] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setMobile(true);
      setHovered(true);
    }
  }, []);

  return (
    <div
      key={item.id}
      className={`relative ${parentSize}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Info card animation controlled via state */}
      <motion.div
        className={`absolute right-0 top-0 h-full w-2/3 bg-glass p-4 rounded-md z-0 backdrop-blur-lg shadow-md`}
        animate={{
          opacity: hovered ? 1 : 0,
          x: hovered ? 0 : -50,
          scale: hovered ? 1 : 0.8,
          rotateY: hovered ? 0 : -15,
          zIndex: hovered ? 10 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="text-light-50 space-y-3 text-sm">
          <div className="flex items-center gap-2 text-xs font-medium relative">
            <p className="flex gap-1 items-center">
              {item?.rating}
              <FaStar className="h-3 w-3 text-yellow-400" />
            </p>
            <span>|</span>
            <p>{item?.releaseDate}</p>
            <div className="absolute right-0 z-40 cursor-pointer">
              <IoClose
                className="size-5  z-40"
                onClick={() =>
                  deleteBookmark({ id: item.id, title: item.title })
                }
              />
            </div>
          </div>
          <Genre
            genreId={item?.genre?.slice(0, 3)}
            textSize="text-xs"
            gap={2}
          />
          <p className="text-xs">{textLimit(item?.overview, 400)}</p>
        </div>
      </motion.div>

      {/* Main image card */}
      <Link href={`/${Boolean(item.title) ? "movie" : "series"}/${item?.id}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`relative h-full glases rounded-md z-0 overflow-hidden`}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w300${item?.poster}`}
            alt={item.title || item.name || "Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="bg-center bg-cover object-cover"
          />
        </motion.div>
      </Link>

      {/* Title */}
      <motion.p
        className="font-playfair mt-2 text-base font-medium"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {item.title || item.name}
      </motion.p>
    </div>
  );
}

export default Card;
