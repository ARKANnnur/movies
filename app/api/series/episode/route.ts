import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const apiKey = process.env.MOVIE_KEY;
  const baseUrl = process.env.MOVIE_BASE_URL;
  const { searchParams } = new URL(request.url);
  const seriesId = searchParams.get("seriesId") || "";
  const seasonNumber = searchParams.get("seasonNumber") ?? "1";

  try {
    const res = await fetch(
      `${baseUrl}/tv/${seriesId}/season/${seasonNumber}?language=en-US`,
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

    const filterData = data.episodes.map(
      (series: {
        id: number;
        name: string;
        overview: string;
        episode_number: string;
        air_date: string;
        runtime: number;
        still_path: string;
        vote_average: number;
        genre_ids: number[];
        crew: { job: string; name: string }[];
        guest_stars: {
          id: number;
          name: string;
          profile_path: string;
          character: string;
        }[];
      }) => ({
        id: series.id,
        name: series.name,
        overview: series.overview,
        episodeNumber: series.episode_number,
        runtime: series.runtime,
        releaseDate: series.air_date,
        poster: series.still_path,
        rating: Math.round(series.vote_average),
        genre: series.genre_ids,
        director:
          series.crew.find(({ job }: { job: string }) => job === "Director")
            ?.name || "Unknown",
        cast: !!series.guest_stars.length
          ? series.guest_stars
              .slice(0, 7)
              .map(
                (cast: {
                  id: number;
                  name: string;
                  profile_path: string;
                  character: string;
                }) => ({
                  id: cast.id,
                  name: cast.name,
                  image: cast.profile_path,
                  character: cast.character,
                })
              )
          : series.runtime &&
            series.still_path &&
            data.episodes[0].guest_stars.map(
              (cast: {
                id: number;
                name: string;
                profile_path: string;
                character: string;
              }) => ({
                id: cast.id,
                name: cast.name,
                image: cast.profile_path,
                character: cast.character,
              })
            ),
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
