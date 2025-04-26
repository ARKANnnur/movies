"use client";
import React from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import Genre from "./Genre";
import textLimit from "@/_utils/textLimit";
import Image from "next/image";

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

function CsrCard({
  item,
  parentSize = "h-[24rem]",
  size = "h-[20rem]",
}: {
  item: Item;
  parentSize?: string;
  size?: string;
}) {
  return (
    <Link
      key={item.id}
      className={`group transition-all duration-500 delay-300 ${parentSize}`}
      href={`/${Boolean(item.title) ? "movie" : "series"}/${item?.id}`}
    >
      <div className={`${size} glases rounded-md overflow-hidden`}>
        <div className="card-gradient size-full absolute bottom-0">
          <div className="w-full h-1/3 p-2 absolute bottom-0 transition-all delay-300 space-y-2 z-50 lg:z-10">
            <div className="rating genre space-y-2">
              <div className="flex gap-2 text-xs font-medium">
                <p className="flex gap-1 items-center">
                  {item?.rating}
                  <span>
                    <FaStar className="h-3 w-3 text-yellow-400" />
                  </span>
                </p>
                <span>|</span>
                <p>{item?.releaseDate}</p>
              </div>
              <Genre
                genreId={item?.genre?.slice(0, 3)}
                textSize="text-xs"
                gap={2}
              />
            </div>
            <p className="text-xs">{textLimit(item?.overview, 100)}</p>
          </div>
        </div>
        <div className="group-hover:h-2/3 relative h-2/3 lg:size-full transition-all z-10">
          <Image
            src={`https://image.tmdb.org/t/p/w300${item?.poster}`}
            alt={item.title || item.name || "Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="bg-center bg-cover"
          />
        </div>
      </div>
      <p className="font-playfair mt-2 text-base font-medium transition-all">
        {item.title || item.name}
      </p>
    </Link>
  );
}

export default CsrCard;
