"use client";

import Sidebar from "@/_components/recommendations/SideBar";
import Slider from "@/_components/Slider";
import { customStyles, customStylesMultiple } from "@/_styles/Select";
import { useRouter } from "next/navigation";
import React, { useEffect, useReducer, useState } from "react";
import Select from "react-select";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface OptionType {
  value: string;
  label: string;
}

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
  loading: boolean;
  region: OptionType | null;
  sortBy: OptionType | null;
  genres: OptionType[] | null;
  selectedGenres: OptionType[] | null;
  releaseDate: OptionType | null;
  rating: OptionType | null;
  studio: OptionType | null;
}

// Definisi Action untuk Reducer
type FilterAction =
  | { type: "LOADING"; payload: boolean }
  | { type: "SET_REGION"; payload: OptionType | null }
  | { type: "SET_SORT_BY"; payload: OptionType | null }
  | { type: "SET_GENRES"; payload: OptionType[] | null }
  | { type: "SET_SELECTED_GENRES"; payload: OptionType[] | null }
  | { type: "SET_RELEASE_DATE"; payload: OptionType | null }
  | { type: "SET_RATING"; payload: OptionType | null }
  | { type: "SET_STUDIO"; payload: OptionType | null };

type FilterActionType =
  | "SET_REGION"
  | "SET_SORT_BY"
  | "SET_SELECTED_GENRES"
  | "SET_RELEASE_DATE"
  | "SET_RATING"
  | "SET_STUDIO";

// Reducer Function
const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: action.payload };
    case "SET_REGION":
      return { ...state, region: action.payload };
    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload };
    case "SET_GENRES":
      return { ...state, genres: action.payload };
    case "SET_SELECTED_GENRES":
      return { ...state, selectedGenres: action.payload };
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
    loading: false,
    region: null,
    sortBy: null,
    selectedGenres: null,
    genres: [],
    releaseDate: null,
    rating: null,
    studio: null,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const handleSetFilterUrl = (
    options: OptionType[],
    settings: FilterActionType,
    name: string
  ) => {
    if (settings === "SET_SELECTED_GENRES") {
      dispatch({ type: settings, payload: options });
    } else {
      dispatch({ type: settings, payload: options[0] });
    }

    console.log("Selected option:", options);

    const query = options.map((g) => g.value).join(",");

    const params = new URLSearchParams(window.location.search);
    params.set(name, query);

    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    async function getGenre() {
      try {
        dispatch({ type: "LOADING", payload: true });
        const cachedGenres = localStorage.getItem("genres");
        const parsed = cachedGenres ? JSON.parse(cachedGenres) : null;

        if (cachedGenres) {
          const convertGenres = parsed.genreMovie.map(
            ({ id, name }: { id: number; name: string }) => ({
              value: id,
              label: name,
            })
          );
          dispatch({
            type: "SET_GENRES",
            payload: convertGenres,
          });
          dispatch({ type: "LOADING", payload: false });
          console.log(convertGenres);
          return;
        }

        const res = await fetch(`${API_URL}/genre`);

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        const convertGenres = data?.genreMovie?.map(
          ({ id, name }: { id: number; name: string }) => ({
            value: id,
            label: name,
          })
        );
        dispatch({ type: "SET_GENRES", payload: convertGenres });
        localStorage.setItem("genres", JSON.stringify(data));
      } catch (err) {
        console.log(err);
      } finally {
        dispatch({ type: "LOADING", payload: false });
      }
    }

    getGenre();
  }, []);
  console.log(state.genres);

  return (
    <div className="flex justify-between pt-24 gap-5 px-5 sm:px-10 min-h-[200dvh]">
      <div>
        <Sidebar />
      </div>
      <div className="container">
        <div className="rounded-xl overflow-hidden h-[50dvh]">
          <Slider size="h-[50dvh] rounded-xl" recomemendation={true} />
        </div>
        <div className="flex items-start flex-wrap mt-4 gap-4">
          {/* Region */}
          <Select
            className="min-w-[10rem] bg-filter text-light-50 rounded-md"
            options={regionOptions}
            value={state.region}
            onChange={(option) =>
              handleSetFilterUrl([option as OptionType], "SET_REGION", "region")
            }
            placeholder="Region"
            styles={customStyles}
            menuPortalTarget={isMounted ? document.body : undefined}
            menuPosition="fixed"
          />

          {/* Sort By */}
          <Select
            className="min-w-[10rem] bg-filter text-light-50 rounded-md"
            options={sortByOptions}
            value={state.sortBy}
            onChange={(option) =>
              handleSetFilterUrl(
                [option as OptionType],
                "SET_SORT_BY",
                "sortBy"
              )
            }
            placeholder="Sort By"
            styles={customStyles}
            menuPortalTarget={isMounted ? document.body : undefined}
            menuPosition="fixed"
          />

          {/* Genres (Multiple) */}
          <Select
            className="grow max-w-[25rem] bg-filter text-light-50 rounded-md"
            options={state?.genres || []}
            isLoading={state.loading}
            value={state?.selectedGenres}
            onChange={(options) =>
              handleSetFilterUrl(
                options as OptionType[],
                "SET_SELECTED_GENRES",
                "genres"
              )
            }
            isMulti
            placeholder="Genres"
            styles={customStylesMultiple}
            menuPortalTarget={isMounted ? document.body : undefined}
            menuPosition="fixed"
          />

          {/* Release Date */}
          <Select
            className="min-w-[10rem] bg-filter text-light-50 rounded-md"
            options={releaseDateOptions}
            value={state.releaseDate}
            onChange={(option) =>
              handleSetFilterUrl(
                [option as OptionType],
                "SET_RELEASE_DATE",
                "releaseDate"
              )
            }
            placeholder="Release Date"
            styles={customStyles}
            menuPortalTarget={isMounted ? document.body : undefined}
            menuPosition="fixed"
          />

          {/* Rating */}
          <Select
            className="min-w-[10rem] bg-filter text-light-50 rounded-md"
            options={ratingOptions}
            value={state.rating}
            onChange={(option) =>
              handleSetFilterUrl([option as OptionType], "SET_RATING", "rating")
            }
            placeholder="Rating"
            styles={customStyles}
            menuPortalTarget={isMounted ? document.body : undefined}
            menuPosition="fixed"
          />

          {/* Studio */}
          <Select
            className="min-w-[200px] bg-filter text-light-50 rounded-md"
            options={studioOptions}
            value={state.studio}
            onChange={(option) =>
              handleSetFilterUrl([option as OptionType], "SET_STUDIO", "studio")
            }
            placeholder="Studio"
            styles={customStyles}
            menuPortalTarget={isMounted ? document.body : undefined}
            menuPosition="fixed"
          />
        </div>
        <div className="">
          
        </div>
      </div>
    </div>
  );
}

export default Page;
