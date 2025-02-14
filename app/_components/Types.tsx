"use client";

import MovieList from "@/_components/MovieList";

type FilterType = {
  code: string;
  name: string;
};

function Types({
  title,
  filterName,
  parentSize = "min-h-72",
  size,
}: {
  title?: string;
  filterName?: FilterType[];
  parentSize?: string;
  size?: string;
}) {
  return (
    <div className={parentSize}>
      <MovieList title={title} filterName={filterName}>
        <MovieList.Filter />
        <MovieList.List>
          <MovieList.Card size={size} />
        </MovieList.List>
      </MovieList>
    </div>
  );
}

export default Types;
