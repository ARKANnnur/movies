import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { movieID: string } }
) {
  const { movieID } = params;
  console.log(movieID);

  // Contoh fetch data dari API eksternal
  const res = await fetch(`https://api.example.com/movies/${movieID}`);
  if (!res.ok)
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });

  const movie = await res.json();
  return NextResponse.json(movie);
}
