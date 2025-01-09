import Stars from "@/_components/StarRating";
import Image from "next/image";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <div className="w-dvw h-dvh">
      <div className="w-[80%] right-0 absolute h-full bg-page">
        <Image
          src="https://plus.unsplash.com/premium_photo-1666700698920-d2d2bba589f8?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="slide show image"
          fill
          className="object-cover w-3/4 absolute right-0 -z-10"
        />
      </div>
      <div className="gap-5 flex flex-col p-5 h-dvh">
        <div className="border-b glases w-full md:w-1/3 p-2 md:p-5 rounded-xl z-50 min-h-64 text-light-50 space-y-3 mt-12">
          <h1 className="text-2xl">Title Movies</h1>
          <div className="rating genre text-xs">
            <p className="space-x-5">8.7 | PG-13 | 2014 | movie</p>
            <p className="space-x-5 text-light-200">Adventure drama Sci-fi</p>
          </div>
          <div className="director-actor text-sm">
            <p className="text-light-100">Director: Ahmad subarjo</p>
            <p className="text-light-100">
              Actors: stephin hawking, albert einstain, nicola tesla, davinci
            </p>
          </div>
          <div className="deskripsion text-light-300">
            <p>
              When Earth becomes uninhabitable in the future, a farmer and
              ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft,
              along with a team of researchers, to find a new planet for humans.
            </p>
          </div>
        </div>
        <div className="border-b glases w-full md:w-1/3 rounded-lg z-50 h-14 text-light-50 flex justify-center items-center gap-2">
          <Stars />
        </div>
      </div>
    </div>
  );
}

export default page;
