import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  data: any[];
  size?: string;
  parentSize?: string;
};

function TypeCard({ data, size = "w-56 h-72", parentSize }: Props) {
  return (
    <Link className={parentSize} href={`/movie/${data?.id}`}>
      <div className={`${size} glases rounded-lg overflow-hidden shadow-card`}>
        <div className="glass-effect absolute w-full h-full z-50"></div>
        <Image
          src="https://plus.unsplash.com/premium_photo-1666700698920-d2d2bba589f8?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="slide show image"
          fill
          className="object-cover shadow-card"
        />
      </div>
      <p className="mt-2">{data?.title}</p>
    </Link>
  );
}

export default TypeCard;
