import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  movieId: number;
  size?: string;
};

function TypeCard({ movieId, size = "w-56 h-72" }: Props) {
  return (
    <Link className="w-auto h-auto" href={`/movie/${movieId}`}>
      <div className={`${size} glases rounded-lg overflow-hidden shadow-card`}>
        <Image
          src="https://plus.unsplash.com/premium_photo-1666700698920-d2d2bba589f8?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="slide show image"
          fill
          className="object-cover shadow-card"
        />
      </div>
      <p className="mt-2">Judul</p>
    </Link>
  );
}

export default TypeCard;
