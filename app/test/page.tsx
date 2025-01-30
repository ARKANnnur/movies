"use client";
import React, { Suspense, useEffect, useState } from "react";
import Slider from "@/_components/Slider";
import Image from "next/image";

type Props = {
  searchParams: any;
};

type Movie = {
  id: number;
  title: string;
  poster: string;
};

function Page({}: Props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/api/movies");
      const result = await response.json();
      setData(result);
    }
    fetchData();
    setIsLoading(false);
  }, []);
  console.log(data);

  return (
    <div className="">
      <Slider />
      {!isLoading &&
        data.map((movie) => (
          <div key={movie.id}>
            <Image
              src={`https://image.tmdb.org/t/p/w1280${movie.poster}`}
              alt={movie.title}
              width={500}
              height={500}
            />
          </div>
        ))}
    </div>
  );
}

export default Page;
