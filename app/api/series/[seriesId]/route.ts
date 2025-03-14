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
      rating: Math.round(series.vote_average),
      releaseFirstDate: series.first_air_date,
      releaseLastDate: series.last_air_date,
      totalEpisode: series.episode_run_time[0],
      totalSeason: series.last_episode_to_air.season_number,
      created: series.created_by,
      genre: series.genres,
      overview: series.overview,
      homepage: series.homepage,
      poster: series.poster_path,
      lastEps: {
        id: series.last_episode_to_air.id,
        name: series.last_episode_to_air.name,
        overview: series.last_episode_to_air.overview,
        rating: Math.round(series.last_episode_to_air.vote_average),
        releaseDate: series.last_episode_to_air.air_date,
        episodeNumber: series.last_episode_to_air.episode_number,
        runtime: series.last_episode_to_air.runtime,
        seasonNumber: series.last_episode_to_air.season_number,
        poster: series.last_episode_to_air.still_path,
      },
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
