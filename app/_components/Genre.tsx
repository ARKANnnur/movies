"use client";
import { useEffect, useState } from "react";

function Genre({ genreId, textSize = "text-base", gap = "5" }: any) {
  const [genreName, setGenreName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getGenre() {
      try {
        setIsLoading(true);
        const cachedGenres = localStorage.getItem("genres");

        if (cachedGenres) {
          setGenreName(JSON.parse(cachedGenres));
          setIsLoading(false);
          return;
        }

        const res = await fetch(`http://localhost:3000/api/genre`);

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
  }, []);
  const genreIdSet = new Set(genreId);

  const convertGenre = genreName
    .filter((genre: any) => genreIdSet.has(genre.id))
    .map((genre: any) => ({ id: genre.id, name: genre.name }));

  return (
    <>
      {!isLoading && (
        <ul className={`flex gap-${gap} text-sm text-light-100`}>
          {convertGenre?.map((genre: any) => (
            <li
              key={genre.id}
              className={`${textSize} bg-light-400/20 shadow-md rounded-sm px-1 text-light-50`}
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
