"use client";

import Loading from "@/loading";
import Image from "next/image";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Genre from "./Genre";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState(3); // Pagination: 3 items per load
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown at outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce
  useEffect(() => {
    if (search.length === 0) {
      setSearchData([]);
      setFilteredData([]);
    }

    const timeoutId = setTimeout(() => {
      if (search.length >= 3) fetchSearchData();
    }, 500); // Delay 500ms

    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Function Get data
  const fetchSearchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/search?search=${search}`
      );
      const data = await res.json();
      setSearchData(data);
      setFilteredData(data.slice(0, 3)); // just get 3 data for first time
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  // Load More: adding more 3 data
  const handleLoadMore = () => {
    const newCount = visibleCount + 3;
    setFilteredData(searchData.slice(0, newCount));
    setVisibleCount(newCount);
  };

  return (
    <div ref={searchRef} className="w-full h-auto sm:w-1/2 relative">
      <input
        type="text"
        className="w-full bg-transparent border-b border-light-50 border-opacity-45 focus:border-opacity-100 focus:outline-none text-left z-50"
        placeholder="Search movie"
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
        value={search}
      />

      {isOpen && (
        <div className="w-full absolute shadow-xl bg-dark-100 rounded-b-sm">
          <ul className="relative overflow-y-scroll max-h-[400px]">
            {isLoading ? (
              <Loading />
            ) : filteredData.length > 0 ? (
              filteredData.map((movie) => (
                <li
                  className="h-20 w-full flex items-center mb-2 shadow-lg"
                  key={movie?.id}
                >
                  <Link
                    className="h-20 w-full flex items-center"
                    href={`/movie/${movie?.id}`}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <div className="w-1/6 relative bg-slate-200 h-full">
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${movie?.poster}`}
                        alt={movie?.title}
                        fill
                        className="bg-center bg-cover"
                      />
                    </div>
                    <div className="w-2/3 p-2">
                      <h4 className="font-semibold">{movie?.title}</h4>
                      <div className="flex gap-1 items-center text-sm">
                        <p>{movie?.rating}</p>
                        <FaStar className="h-3 w-3 text-yellow-400" />
                        <span>|</span>
                        <p>{movie?.releaseDate}</p>
                      </div>
                      <Genre
                        genreId={movie?.genre?.slice(0, 3)}
                        textSize="text-xs"
                        gap={2}
                      />
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              search.length > 3 && (
                <p className="text-center py-5 text-gray-400">
                  Movie not found
                </p>
              )
            )}
          </ul>

          {/* Tombol Load More */}
          {filteredData.length < searchData.length && search && (
            <button
              className="w-full py-2 text-center bg-gray-800 text-white hover:bg-gray-700"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}
