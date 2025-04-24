import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiKey = process.env.MOVIE_KEY;
  const baseUrl = process.env.MOVIE_BASE_URL;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "movie";
  const region = searchParams.get("region");
  const sortBy = searchParams.get("sortBy");
  const genres = searchParams.get("genres");
  const releaseDate = searchParams.get("releaseDate") || "2025";
  const rating = searchParams.get("rating");
  const studio = searchParams.get("studio");
  const page = searchParams.get("page") || "1";

  let query = `${baseUrl}/discover/${type}?language=en-US&page=${page}&certification.lte=PG-13&without_genres=10749`;

  if (rating) query += `&vote_average.gte=${rating}`;
  if (sortBy) query += `&sort_by=${sortBy}`;
  if (region) query += `&with_origin_country=${region}`;
  if (genres) query += `&with_genres=${genres}`;
  if (releaseDate)
    query +=
      type === "movie"
        ? `&primary_release_year=${releaseDate}`
        : `&first_air_date_year=${releaseDate}`;
  if (studio) query += `&with_companies=${studio}`;

  try {
    const res = await fetch(query, {
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
        name: string;
        overview: string;
        poster_path: string;
        release_date: string;
        vote_average: number;
        genre_ids: number[];
      }) => ({
        id: movie.id,
        title: movie.title,
        name: movie.name,
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
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
