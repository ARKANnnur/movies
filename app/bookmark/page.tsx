import React from "react";

type Props = {
  searchParams: any;
};

function page({ searchParams }: Props) {
  console.log(searchParams, "bookmark");
  return <div>page</div>;
}

export default page;
