import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params }: { params: { seriesId: string } }
) {
  const { seriesId } = params;
  const apiKey = process.env.MOVIE_KEY;
  const baseUrl = process.env.MOVIE_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/tv/${seriesId}?language=en-US`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const series = await res.json();

    const filterData = {
      id: series.id,
      name: series.name,
      rating: series.vote_average,
      releaseFirstDate: series.first_air_date,
      releaseLastDate: series.last_air_date,
      totalEpisode: series.episode_run_time[0],
      totalSeason: series.last_episode_to_air.season_number,
      created: series.created_by,
      genre: series.genres,
      overview: series.overview,
      homepage: series.homepage,
      poster: series.poster_path,
      lastEps: series.last_episode_to_air,
      nextEps: series.next_episode_to_air,
    };
    return NextResponse.json(filterData);
  } catch (error) {
    console.error("Error fetching API:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
