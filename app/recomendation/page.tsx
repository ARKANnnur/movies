"use client";

import Sidebar from "@/_components/recommendations/SideBar";
import Slider from "@/_components/Slider";
import { customStyles, customStylesMultiple } from "@/_styles/Select";
import Image from "next/image";
import React, { useReducer } from "react";
import Select from "react-select";

interface OptionType {
  value: string;
  label: string;
}

// Opsi Filter
const genreOptions: OptionType[] = [
  { value: "28", label: "Action" },
  { value: "35", label: "Comedy" },
  { value: "18", label: "Drama" },
  { value: "878", label: "Sci-Fi" },
];

const regionOptions: OptionType[] = [
  { value: "US", label: "United States" },
  { value: "JP", label: "Japan" },
  { value: "KR", label: "South Korea" },
  { value: "FR", label: "France" },
];

const sortByOptions: OptionType[] = [
  { value: "popularity.desc", label: "Popularity Desc" },
  { value: "popularity.asc", label: "Popularity Asc" },
  { value: "release_date.desc", label: "Newest First" },
  { value: "release_date.asc", label: "Oldest First" },
];

const releaseDateOptions: OptionType[] = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
];

const ratingOptions: OptionType[] = [
  { value: "7", label: "Above 7" },
  { value: "8", label: "Above 8" },
  { value: "9", label: "Above 9" },
];

const studioOptions: OptionType[] = [
  { value: "420", label: "Marvel Studios" },
  { value: "9993", label: "Warner Bros" },
  { value: "2", label: "Paramount Pictures" },
];

// Definisi State
interface FilterState {
  region: OptionType | null;
  sortBy: OptionType | null;
  genres: OptionType[];
  releaseDate: OptionType | null;
  rating: OptionType | null;
  studio: OptionType | null;
}

// Definisi Action untuk Reducer
type FilterAction =
  | { type: "SET_REGION"; payload: OptionType | null }
  | { type: "SET_SORT_BY"; payload: OptionType | null }
  | { type: "SET_GENRES"; payload: OptionType[] }
  | { type: "SET_RELEASE_DATE"; payload: OptionType | null }
  | { type: "SET_RATING"; payload: OptionType | null }
  | { type: "SET_STUDIO"; payload: OptionType | null };

// Reducer Function
const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "SET_REGION":
      return { ...state, region: action.payload };
    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload };
    case "SET_GENRES":
      return { ...state, genres: action.payload };
    case "SET_RELEASE_DATE":
      return { ...state, releaseDate: action.payload };
    case "SET_RATING":
      return { ...state, rating: action.payload };
    case "SET_STUDIO":
      return { ...state, studio: action.payload };
    default:
      return state;
  }
};

function Page() {
  const [state, dispatch] = useReducer(filterReducer, {
    region: null,
    sortBy: null,
    genres: [],
    releaseDate: null,
    rating: null,
    studio: null,
  });

  return (
    <div className="flex justify-between pt-24 gap-5 px-5 sm:px-10 min-h-[200dvh]">
      <div>
        <Sidebar />
      </div>
      <div className="container">
        <div className="rounded-xl overflow-hidden h-[50dvh]">
          <Slider size="h-[50dvh] rounded-xl" recomemendation={true} />
        </div>
        <div className="flex items-center flex-wrap mt-4 gap-4">
          {/* Region */}
          <Select
            className="min-w-[10rem] bg-filter text-light-50 rounded-md"
            options={regionOptions}
            value={state.region}
            onChange={(option) =>
              dispatch({ type: "SET_REGION", payload: option as OptionType })
            }
            placeholder="Region"
            styles={customStyles}
          />

          {/* Sort By */}
          <Select
            className="min-w-[10rem] bg-filter text-light-50 rounded-md"
            options={sortByOptions}
            value={state.sortBy}
            onChange={(option) =>
              dispatch({ type: "SET_SORT_BY", payload: option as OptionType })
            }
            placeholder="Sort By"
            styles={customStyles}
          />

          {/* Genres (Multiple) */}
          <Select
            className="grow bg-filter text-light-50 rounded-md"
            options={genreOptions}
            value={state.genres}
            onChange={(options) =>
              dispatch({ type: "SET_GENRES", payload: options as OptionType[] })
            }
            isMulti
            placeholder="Genres"
            styles={customStylesMultiple}
          />

          {/* Release Date */}
          <Select
            className="min-w-[10rem] bg-filter text-light-50 rounded-md"
            options={releaseDateOptions}
            value={state.releaseDate}
            onChange={(option) =>
              dispatch({
                type: "SET_RELEASE_DATE",
                payload: option as OptionType,
              })
            }
            placeholder="Release Date"
            styles={customStyles}
          />

          {/* Rating */}
          <Select
            className="min-w-[10rem] bg-filter text-light-50 rounded-md"
            options={ratingOptions}
            value={state.rating}
            onChange={(option) =>
              dispatch({ type: "SET_RATING", payload: option as OptionType })
            }
            placeholder="Rating"
            styles={customStyles}
          />

          {/* Studio */}
          <Select
            className="min-w-[200px] bg-filter text-light-50 rounded-md"
            options={studioOptions}
            value={state.studio}
            onChange={(option) =>
              dispatch({ type: "SET_STUDIO", payload: option as OptionType })
            }
            placeholder="Studio"
            styles={customStyles}
          />
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}

export default Page;
