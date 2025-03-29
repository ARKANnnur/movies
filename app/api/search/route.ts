import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiKey = process.env.MOVIE_KEY;
  const baseUrl = process.env.MOVIE_BASE_URL;

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";

  try {
    const res = await fetch(
      `${baseUrl}/search/multi?query=${search}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    const filterData = data.results.map(
      (movie: {
        id: number;
        title: string;
        poster_path: string;
        release_date: string;
        vote_average: number;
        genre_ids: number[];
      }) => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        releaseDate: movie.release_date,
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
