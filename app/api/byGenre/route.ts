import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiKey = process.env.MOVIE_KEY;
  const baseUrl = process.env.MOVIE_BASE_URL;

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("by") || "";

  try {
    let genreId = search; // Default pakai search langsung
    const isNumber = /^\d+$/.test(search); // Cek apakah angka (lebih optimal)

    if (!isNumber) {
      const genreRes = await fetch("http://localhost:3000/api/genre");
      if (!genreRes.ok) throw new Error("Failed to fetch genres");

      const { genres } = await genreRes.json();
      const genre = genres.find(
        (g: { name: string }) => g.name.toLowerCase() === search.toLowerCase()
      );

      if (genre) {
        genreId = genre.id;
      } else {
        return NextResponse.json(
          { error: "Genre not found", search },
          { status: 404 }
        );
      }
    }

    const res = await fetch(
      `${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}&vote_average.gte=7`,
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
        name: string;
        overview: string;
        poster_path: string;
        release_date: string;
        vote_average: number;
        genre_ids: number[];
      }) => ({
        id: movie.id,
        title: movie.title ? movie.title : movie.name,
        overview: movie.overview,
        poster: movie.poster_path,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
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
