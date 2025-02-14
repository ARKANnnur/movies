"use client";

import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import Types from "./Types";

type Props = {};

const dataPaginations = [
  {
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
  { title: "Movie" },
  { title: "Series" },
  { title: "Science Fiction" },
  { title: "Fantasy" },
  { title: "Horror" },
  { title: "Thriller" },
];

const ITEMS_PER_PAGE = 2;

export default function Pagination({}: Props) {
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

  return (
    <>
      {currentData?.map((data) =>
        data.filterBy ? (
          <Types key={data.filterBy[0].name} filterName={data.filterBy} />
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
