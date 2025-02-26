"use client";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function Genre({ genreId, textSize = "text-base", gap = "5" }: any) {
  const [genreName, setGenreName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isArrayOfObjects = (arr: any) =>
    Array.isArray(arr) &&
    arr.every((item) => typeof item === "object" && item !== null);

  const isGenre = isArrayOfObjects(genreId); //check this is Array of object or not

  useEffect(() => {
    if (isGenre) return;
    async function getGenre() {
      try {
        setIsLoading(true);
        const cachedGenres = localStorage.getItem("genres");

        if (cachedGenres) {
          setGenreName(JSON.parse(cachedGenres));
          setIsLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/genre`);

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        setGenreName(data.genres);
        localStorage.setItem("genres", JSON.stringify(data.genres));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getGenre();
  }, [isGenre]);

  const genreIdSet = new Set(genreId);

  const convertGenre = genreName
    .filter((genre: any) => genreIdSet.has(genre.id))
    .map((genre: any) => ({ id: genre.id, name: genre.name }));

  let pickGenre;
  if (isGenre) pickGenre = genreId;
  else pickGenre = convertGenre;

  return (
    <>
      {!isLoading && (
        <ul className={`flex gap-${gap} text-sm text-light-100`}>
          {pickGenre?.map((genre: any) => (
            <li
              key={genre.id}
              className={`${textSize} bg-light-400/20 shadow-sm rounded-sm px-1 text-light-50`}
            >
              {genre.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Genre;
