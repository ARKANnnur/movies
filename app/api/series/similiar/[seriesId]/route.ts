import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params }: { params: { seriesId: string } }
) {
  const { seriesId } = params;
  const apiKey = process.env.MOVIE_KEY;
  const baseUrl = process.env.MOVIE_BASE_URL;

  try {
    const res = await fetch(
      `${baseUrl}/tv/${seriesId}/similar?language=en-US`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const data = await res.json();
    const filterData = data.results.map(
      (series: {
        id: number;
        name: string;
        overview: string;
        poster_path: string;
        first_air_date: string;
        vote_average: number;
        genre_ids: number[];
      }) => ({
        id: series.id,
        name: series.name,
        overview: series.overview,
        poster: series.poster_path,
        releaseDate: series.first_air_date,
        rating: Math.round(series.vote_average),
        genre: series.genre_ids,
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
