import React from "react";
import TypeCard from "@/_components/TypeCard";

type Props = {
  searchParams: any;
};

function page({ searchParams }: Props) {
  return (
    <div className="flex justify-center pt-32 flex-wrap gap-10 px-5 sm:px-10">
      {/* {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
        <TypeCard key={num} movieId={num} parentSize="w-full sm:w-[20rem] lg:w-[25rem] h-56 sm:h-64" size="w-full h-52 sm:h-60" />
      ))} */}
    </div>
  );
}

export default page;
