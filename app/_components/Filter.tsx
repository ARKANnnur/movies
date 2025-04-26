"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type filterCode = {
  code?: string;
  name?: string;
};

type Props = {
  id?: string;
  filterName?: filterCode[];
  activeFilter: string | undefined;
  setActiveFilter: Function;
};

function Filter({ id, filterName, activeFilter, setActiveFilter }: Props) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return (
    <div className="flex items-center h-full border rounded-full cursor-pointer bg-gradient text-sm sm:text-base text-nowrap relative overflow-hidden" >
      {filterName?.map((filter) => {
        const isActive = activeFilter === filter?.code;

        return (
          <div
            key={filter?.code}
            onClick={() => setActiveFilter(filter?.code)}
            className={`relative ${
              isActive
                ? "text-light-50 scale-105 py-1 px-5"
                : "py-1 px-5 text-light-50/70 hover:text-light-50 scale-105"
            }`}
          >
            {isClient && isActive && (
              <motion.div
                layoutId={`filter-highlight-${id}`}
                className="absolute inset-0 bg-opt-gradient rounded-full z-[-1] border scale-105"
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 30,
                  mass: 0.4,
                }}
              />
            )}
            {filter?.name}
          </div>
        );
      })}
    </div>
  );
}

export default Filter;
