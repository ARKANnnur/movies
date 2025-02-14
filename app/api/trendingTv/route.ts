import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiKey = process.env.MOVIE_KEY;
  const baseUrl = process.env.MOVIE_BASE_URL;

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("by") || "day";

  try {
    const res = await fetch(`${baseUrl}/trending/tv/${search}?language=en-US`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    const filterData = data.results.map(
      (movie: {
        id: number;
        name: string;
        overview: string;
        poster_path: string;
        first_air_date: string;
        vote_average: number;
        genre_ids: number[];
      }) => ({
        id: movie.id,
        name: movie.name,
        overview: movie.overview,
        poster: movie.poster_path,
        releaseDate: movie.first_air_date,
        rating: Math.round(movie.vote_average),
        genre: movie.genre_ids,
      })
    );

    return NextResponse.json(filterData);
  } catch (error) {
    console.error("Error fetching API:", error);
    return NextResponse.json(
      { error: "Failed to fetch data", search },
      { status: 500 }
    );
  }
}
