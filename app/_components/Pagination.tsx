"use client";

import { useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import Types from "./Types";
import { useMounted } from "@/_utils/useMounted";

type Props = {};

// Number 3 for Movie
// Number 5 for Series(TV)

const dataPaginations = [
  {
    id: "1",
    filterBy: [
      {
        code: "KR",
        name: "K-drama",
      },
      {
        code: "CN",
        name: "C-drama",
      },
      {
        code: "JP",
        name: "Anime",
      },
      {
        code: "CR",
        name: "Cartoon",
      },
    ],
  },
  {
    id: "2",
    title: "Movie",
    filterBy: [
      { code: "day", name: "Today" },
      { code: "week", name: "Week" },
    ],
  },
  { title: "Science Fiction 3" },
  { title: "Fantasy 3" },
  { title: "Horror 3" },
  { title: "Thriller 3" },
  {
    id: "3",
    title: "Series",
    filterBy: [
      { code: "day", name: "Today" },
      { code: "week", name: "Week" },
    ],
  },
  { title: "Comedy 5" },
  { title: "Documentary 5" },
  { title: "Mystery 5" },
];

const ITEMS_PER_PAGE = 2;

export default function Pagination({}: Props) {
    const mounted = useMounted();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState(
    dataPaginations.slice(0, ITEMS_PER_PAGE)
  );

  function loadMore() {
    const nextPage = currentPage + 1;
    const newData = dataPaginations.slice(0, nextPage * ITEMS_PER_PAGE);
    setCurrentData(newData);
    setCurrentPage(nextPage);
  }

  if (!mounted) {
    console.log("Pagination");
    return null;
  }

  return (
    <>
      {currentData?.map((data) =>
        data.filterBy && data.title ? (
          <Types
            key={`${data.id}-${data.filterBy[0].name}`}
            filterName={data.filterBy}
            title={data.title}
            id={data.id}
          />
        ) : data.filterBy ? (
          <Types
            key={`${data.id}-${data.filterBy[0].name}`}
            filterName={data.filterBy}
            id={data.id}
          />
        ) : (
          <Types key={data.title} title={data.title} />
        )
      )}
      {currentData.length < dataPaginations.length && (
        <div className="w-dvw flex justify-center items-center py-5">
          <FaArrowDown
            className="w-5 h-5 text-white cursor-pointer"
            onClick={() => loadMore()}
          />
        </div>
      )}
    </>
  );
}
