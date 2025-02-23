import React from "react";

type Props = {
  searchParams: any;
};

function page({ searchParams }: Props) {
  return (
    <div className="flex justify-center pt-32 flex-wrap gap-10 px-5 sm:px-10">
      Recomendation
    </div>
  );
}

export default page;
