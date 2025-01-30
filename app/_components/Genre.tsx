"use client";
import React, { useEffect, useState } from "react";

function Genre({ genreId }: any) {
  const [genreName, setGenreName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();

    async function calculate() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:3000/api/genre`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        setGenreName(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    calculate();
    return () => controller.abort();
  }, []);

  return (
    <>
      {!isLoading && (
        <ul className="flex gap-5 text-sm text-light-100">
          {genreId?.genre?.map((genre) => (
            <li key={genre}>{genreName[genre]}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Genre;
