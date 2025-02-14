import { NextResponse } from "next/server";

let cachedGenres: Record<number, string> | null = null;

export async function GET() {
  const apiKey = process.env.MOVIE_KEY;
  const baseUrl = process.env.MOVIE_BASE_URL;

  if (!cachedGenres) {
    try {
      // Fetch kedua API secara paralel
      const [movieRes, tvRes] = await Promise.all([
        fetch(`${baseUrl}/genre/movie/list?language=en`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }),
        fetch(`${baseUrl}/genre/tv/list?language=en`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }),
      ]);

      const [movieData, tvData] = await Promise.all([
        movieRes.json(),
        tvRes.json(),
      ]);

      // Gabungkan genre movie & TV, tanpa replace yang sudah ada
      const mergedGenres = { ...movieData };

      tvData.genres.forEach((tvGenre: { id: number; name: string }) => {
        if (
          !mergedGenres.genres.some((g: { id: number }) => g.id === tvGenre.id)
        ) {
          mergedGenres.genres.push(tvGenre);
        }
      });

      cachedGenres = mergedGenres;
    } catch (error) {
      console.error("Error fetching genres:", error);
      return NextResponse.json(
        { error: "Failed to fetch genres" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(cachedGenres, {
    headers: {
      "Cache-Control": "s-maxage=86400, stale-while-revalidate", // Cache selama 24 jam
    },
  });
}
