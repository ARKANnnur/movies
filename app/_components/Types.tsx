"use client";

import MovieList from "@/_components/MovieList";

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
  return (
    <div className={parentSize}>
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
