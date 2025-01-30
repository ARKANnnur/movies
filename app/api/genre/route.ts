import { NextResponse } from "next/server";

let cachedGenres: Record<number, string> | null = null;

export async function GET() {
  const apiKey = process.env.MOVIE_KEY;
  const baseUrl = process.env.MOVIE_BASE_URL;

  if (!cachedGenres) {
    const res = await fetch(`${baseUrl}/genre/movie/list?language=en`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const data = await res.json();
    cachedGenres = data.genres.reduce((acc: Record<number, string>, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
  }

  return NextResponse.json(cachedGenres, {
    headers: {
      "Cache-Control": "s-maxage=86400, stale-while-revalidate", // Cache di server selama 24 jam
    },
  });
}
