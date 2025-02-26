import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { movieID: string } }
) {
  const { movieID } = params;
  const apiKey = process.env.MOVIE_KEY;
  const baseUrl = process.env.MOVIE_BASE_URL;

  try {
    const [movieRes, castCrewRes, recommendationsRes] = await Promise.all([
      fetch(`${baseUrl}/movie/${movieID}?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }),
      fetch(`${baseUrl}/movie/${movieID}/credits?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }),
      fetch(
        `${baseUrl}/movie/${movieID}/recommendations?language=en-US&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      ),
    ]);

    if (!movieRes.ok || !castCrewRes.ok || !recommendationsRes.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const movieData = await movieRes.json();
    const castCrewData = await castCrewRes.json();
    const recommendationsData = await recommendationsRes.json();

    const director =
      castCrewData.crew.find(({ job }: { job: string }) => job === "Director")
        ?.name || "Unknown";
    const castFilter = castCrewData.cast
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
      );
    const recommendationsFilter = recommendationsData.results
      .slice(0, 10)
      .map((movie: { id: number; title: string; backdrop_path: string }) => ({
        id: movie.id,
        title: movie.title,
        poster: movie.backdrop_path,
      }));

    const responseData = {
      title: movieData.title,
      rating: Math.round(movieData.vote_average),
      releaseDate: movieData.release_date,
      runtime: movieData.runtime,
      genre: movieData.genres,
      overview: movieData.overview,
      poster: movieData.backdrop_path,
      director,
      cast: castFilter, 
      recommendations: recommendationsFilter, 
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching API:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
