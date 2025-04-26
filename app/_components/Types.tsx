"use client";

import MovieList from "@/_components/MovieList";
import { useMounted } from "@/_utils/useMounted";

type FilterType = {
  code: string;
  name: string;
};

function Types({
  id,
  title,
  filterName,
  parentSize = "min-h-72",
  size,
}: {
  id?: string;
  title?: string;
  filterName?: FilterType[];
  parentSize?: string;
  size?: string;
}) {
  const mounted = useMounted();

  if (!mounted) {
    console.log("Types");
    return null;
  }
  return (
    <div className={parentSize} id={id || title} key={id || title}>
      <MovieList id={id} title={title} filterName={filterName}>
        <MovieList.Filter />
        <MovieList.List>
          <MovieList.Card size={size} />
        </MovieList.List>
      </MovieList>
    </div>
  );
}

export default Types;
