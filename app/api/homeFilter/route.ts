import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiKey = process.env.MOVIE_KEY;
  const baseUrl = process.env.MOVIE_BASE_URL;

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("by") || "KR";
  let filter = "";
  if (search === "KR")
    filter = `${baseUrl}/discover/movie?certification.lte=PG-13&vote_average.gte=7&R&without_genres=10749&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=KR`;
  if (search === "CN")
    filter = `${baseUrl}/discover/movie?certification.lte=PG-13&vote_average.gte=7&R&without_genres=10749&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=CN`;
  if (search === "JP")
    filter = `${baseUrl}/discover/movie?certification.lte=PG-13&vote_average.gte=7&R&without_genres=10749&language=en-US&page=1&sort_by=popularity.desc&with_genres=16&with_origin_country=JP`;
  if (search === "CR")
    filter = `${baseUrl}/discover/movie?certification.lte=PG-13&vote_average.gte=7&R&without_genres=10749&language=en-US&page=1&sort_by=popularity.desc&with_genres=16`;

  try {
    const res = await fetch(filter, {
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
        title: string;
        overview: string;
        poster_path: string;
        release_date: string;
        vote_average: number;
        genre_ids: number[];
      }) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
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
