"use client";

type filterCode = {
  code?: string;
  name?: string;
};

type Props = {
  filterName?: filterCode[];
  activeFilter: string | undefined;
  setActiveFilter: Function;
};

function Filter({ filterName, activeFilter, setActiveFilter }: Props) {
  return (
    <div className="flex items-center h-full border rounded-full cursor-pointer bg-gradient text-sm sm:text-base text-nowrap">
      {filterName?.map((filter, index) => (
        <div
          key={index}
          className={
            activeFilter === filter?.code
              ? "border bg-opt-gradient text-nowrap rounded-full h-full text-light-50 scale-105 py-1 px-5"
              : "py-1 px-5 text-light-50/70 hover:text-light-50"
          }
          onClick={() => setActiveFilter(filter?.code)}
        >
          {filter?.name}
        </div>
      ))}
    </div>
  );
}

export default Filter;
