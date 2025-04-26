"use client";

import CsrCard from "@/_components/CsrCard";
import Sidebar from "@/_components/recommendations/SideBar";
import Slider from "@/_components/Slider";
import { customStyles, customStylesMultiple } from "@/_styles/Select";
import { useRouter } from "next/navigation";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import Select from "react-select";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Datas = {
  id: number;
  title: string;
  overview: string;
  genre: number[];
  rating: number;
  releaseDate: string;
  poster: string;
};

interface OptionType {
  value: string;
  label: string;
}

const regionOptions: OptionType[] = [
  { value: "US", label: "United States" },
  { value: "JP", label: "Japan" },
  { value: "KR", label: "South Korea" },
  { value: "CN", label: "China" },
  { value: "ID", label: "Indonesia" },
  { value: "IN", label: "India" },
  { value: "GB", label: "United Kingdom" },
  { value: "DE", label: "Germany" },
  { value: "IT", label: "Italy" },
  { value: "ES", label: "Spain" },
  { value: "FR", label: "France" },
  { value: "BR", label: "Brazil" },
  { value: "RU", label: "Russia" },
  { value: "MX", label: "Mexico" },
  { value: "AR", label: "Argentina" },
  { value: "NL", label: "Netherlands" },
  { value: "SE", label: "Sweden" },
  { value: "PL", label: "Poland" },
  { value: "TR", label: "Turkey" },
  { value: "TH", label: "Thailand" },
  { value: "PH", label: "Philippines" },
  { value: "ZA", label: "South Africa" },
  { value: "NO", label: "Norway" },
  { value: "FI", label: "Finland" },
  { value: "DK", label: "Denmark" },
  { value: "IE", label: "Ireland" },
  { value: "PT", label: "Portugal" },
  { value: "BE", label: "Belgium" },
  { value: "AT", label: "Austria" },
  { value: "CH", label: "Switzerland" },
  { value: "GR", label: "Greece" },
  { value: "CZ", label: "Czech Republic" },
  { value: "HU", label: "Hungary" },
  { value: "RO", label: "Romania" },
  { value: "SK", label: "Slovakia" },
  { value: "BG", label: "Bulgaria" },
  { value: "HR", label: "Croatia" },
  { value: "SI", label: "Slovenia" },
  { value: "LT", label: "Lithuania" },
  { value: "LV", label: "Latvia" },
  { value: "EE", label: "Estonia" },
  { value: "IS", label: "Iceland" },
  { value: "BY", label: "Belarus" },
  { value: "UA", label: "Ukraine" },
  { value: "MD", label: "Moldova" },
  { value: "KZ", label: "Kazakhstan" },
  { value: "UZ", label: "Uzbekistan" },
  { value: "AZ", label: "Azerbaijan" },
  { value: "GE", label: "Georgia" },
  { value: "AM", label: "Armenia" },
  { value: "KG", label: "Kyrgyzstan" },
  { value: "TJ", label: "Tajikistan" },
  { value: "TM", label: "Turkmenistan" },
  { value: "MN", label: "Mongolia" },
  { value: "VN", label: "Vietnam" },
  { value: "MY", label: "Malaysia" },
  { value: "SG", label: "Singapore" },
  { value: "LA", label: "Laos" },
  { value: "MM", label: "Myanmar" },
  { value: "BN", label: "Brunei" },
  { value: "KH", label: "Cambodia" },
  { value: "LK", label: "Sri Lanka" },
  { value: "BD", label: "Bangladesh" },
  { value: "NP", label: "Nepal" },
  { value: "PK", label: "Pakistan" },
  { value: "FR", label: "France" },
];

const sortByType: OptionType[] = [
  { value: "movie", label: "Movie" },
  { value: "tv", label: "Series" },
];

const sortByOptions: OptionType[] = [
  { value: "popularity.asc", label: "Popularity Asc" },
  { value: "popularity.desc", label: "Popularity Desc" },
  { value: "release_date.asc", label: "Oldest First" },
  { value: "release_date.desc", label: "Newest First" },
];

const releaseDateOptions: OptionType[] = [
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
  { value: "2017", label: "2017" },
  { value: "2016", label: "2016" },
];

const ratingOptions: OptionType[] = [
  { value: "7", label: "Above 7" },
  { value: "8", label: "Above 8" },
  { value: "9", label: "Above 9" },
];

const studioOptions: OptionType[] = [
  { value: "420", label: "Marvel Studios" },
  { value: "174", label: "Warner Bros. Pictures" },
  { value: "2", label: "Walt Disney Pictures" },
  { value: "4", label: "Paramount Pictures" },
  { value: "33", label: "Universal Pictures" },
  { value: "25", label: "20th Century Studios" },
  { value: "3", label: "Pixar" },
  { value: "21", label: "Metro-Goldwyn-Mayer (MGM)" },
  { value: "5", label: "Columbia Pictures" },
  { value: "34", label: "New Line Cinema" },
];

// Definisi State
interface FilterState {
  loading: boolean;
  type: OptionType | null;
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
  | { type: "SET_TYPE"; payload: OptionType | null }
  | { type: "SET_SORT_BY"; payload: OptionType | null }
  | { type: "SET_GENRES"; payload: OptionType[] | null }
  | { type: "SET_SELECTED_GENRES"; payload: OptionType[] | null }
  | { type: "SET_RELEASE_DATE"; payload: OptionType | null }
  | { type: "SET_RATING"; payload: OptionType | null }
  | { type: "SET_STUDIO"; payload: OptionType | null }
  | { type: "SET_RESET" };

type FilterActionType =
  | "SET_REGION"
  | "SET_TYPE"
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
    case "SET_TYPE":
      return { ...state, type: action.payload };
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
    case "SET_RESET":
      return {
        ...state,
        type: null,
        region: null,
        sortBy: null,
        genres: [],
        selectedGenres: null,
        releaseDate: null,
        rating: null,
        studio: null,
      };
    default:
      return state;
  }
};

function Page({}) {
  const router = useRouter();
  const [state, dispatch] = useReducer(filterReducer, {
    loading: false,
    region: null,
    type: null,
    sortBy: null,
    selectedGenres: null,
    genres: [],
    releaseDate: null,
    rating: null,
    studio: null,
  });
  const [datas, setDatas] = useState<Datas[]>();
  const [refreshFilter, setRefreshFilter] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const [active, setActive] = useState<string | null>("movies");
  const [page, setPage] = useState<number>(1);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleActive = (id: string, type: string) => {
    setActive(id);
    setPage(1);
    setDatas([]);
    dispatch({ type: "SET_RESET" });
    const params = new URLSearchParams();

    params.set("page", "1");
    params.set("tab", id);
    params.set("type", type);
    if (id === "cartoon") {
      params.set("genres", "16");
    } else {
      params.delete("genres");
    }
    if (id === "hollywood") params.set("region", "US");
    if (id === "bollywood") params.set("region", "IN");
    if (id === "korean") params.set("region", "KR");
    if (id === "chinese") params.set("region", "CN");
    if (id === "indonesian") params.set("region", "ID");

    router.replace(`?${params.toString()}`);
    setRefreshFilter(params.toString());
  };

  useEffect(() => {
    setIsMounted(true);
    const params = new URLSearchParams(window.location.search);
    setActive(params.get("tab") || "movies");
  }, []);

  const handleSetFilterUrl = (
    options: OptionType[],
    settings: FilterActionType,
    name: string
  ) => {
    // get current value in state
    const currentValue = state[name as keyof FilterState] as
      | OptionType
      | OptionType[]
      | null;

    // For multiple (genre), we are immediately dispatched and URL update
    if (settings === "SET_SELECTED_GENRES") {
      const selected = options as OptionType[];
      dispatch({ type: settings, payload: selected });

      const query = selected?.map((g) => g.value).join(",");
      const params = new URLSearchParams(window.location.search);

      if (query) {
        params.set(name, query);
      } else {
        params.delete(name);
      }

      router.replace(`?${params.toString()}`);
      setRefreshFilter(params.toString());
      return;
    }

    // for single select
    const selected = options[0] as OptionType;

    // If the value is the same as before, remove from URL & reset state
    if ((currentValue as OptionType)?.value === selected?.value) {
      dispatch({ type: settings, payload: null });

      const params = new URLSearchParams(window.location.search);
      params.delete(name);

      router.replace(`?${params.toString()}`);
      setRefreshFilter(params.toString());
      return;
    }

    // If different, set as usual
    dispatch({ type: settings, payload: selected });

    const params = new URLSearchParams(window.location.search);
    params.set(name, selected.value);

    router.replace(`?${params.toString()}`);
    setRefreshFilter(params.toString());
  };

  //get Genres
  useEffect(() => {
    const cachedGenres = localStorage.getItem("genres");
    const parsed = cachedGenres ? JSON.parse(cachedGenres) : null;
    const params = new URLSearchParams(window.location.search);
    const typeValue = params.get("type");

    if (cachedGenres) {
      const convertGenresMovies = parsed.genreMovie?.map(
        ({ id, name }: { id: number; name: string }) => ({
          value: id,
          label: name,
        })
      );
      const convertGenresTv = parsed.genreTv?.map(
        ({ id, name }: { id: number; name: string }) => ({
          value: id,
          label: name,
        })
      );
      dispatch({
        type: "SET_GENRES",
        payload: typeValue === "movie" ? convertGenresMovies : convertGenresTv,
      });
      dispatch({ type: "LOADING", payload: false });

      return;
    }
    async function getGenre() {
      try {
        dispatch({ type: "LOADING", payload: true });

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

    if (!cachedGenres) getGenre();
  }, [refreshFilter]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!refreshFilter) {
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
    }

    async function getDatasFilter() {
      try {
        dispatch({ type: "LOADING", payload: true });

        const res = await fetch(
          `${API_URL}/filter?${
            refreshFilter ? refreshFilter : params.toString()
          }`
        );

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        setDatas(page === 1 ? data : [...(datas || []), ...data]);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch({ type: "LOADING", payload: false });
      }
    }

    getDatasFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshFilter, page]);

  function handleResetFilter() {
    const params = new URLSearchParams(window.location.search);
    const typeValue = params.get("type");

    const newParams = new URLSearchParams();
    if (typeValue) {
      newParams.set("type", typeValue);
    }
    router.replace(`?${newParams.toString()}`);
    dispatch({ type: "SET_RESET" });
  }

  function loadMore() {
    setPage((prev) => prev + 1);
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(page + 1));
    router.replace(`?${params.toString()}`);
    setRefreshFilter(params.toString());

    setTimeout(() => {
      loadMoreRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 500);
  }

  const showRegion =
    active !== "hollywood" &&
    active !== "korean" &&
    active !== "bollywood" &&
    active !== "chinese" &&
    active !== "indonesian";

  return (
    <div className="flex lg:justify-between pt-24 px-4 lg:gap-5 sm:px-10 min-h-[200dvh] relative">
      <div>
        <Sidebar active={active} handleActive={handleActive} />
      </div>
      <div className="container">
        <div className="rounded-xl overflow-hidden h-[50dvh]">
          <Slider size="h-[50dvh] rounded-xl" recomemendation={true} />
        </div>
        <div className="flex overflow-x-auto flex-nowrap sm:items-start sm:flex-wrap mt-4 gap-4 scrollbar-thin scrollbar-thumb-[#B3B3B3] scrollbar-track-[#1C1B1D] pb-1">
          {/* Region */}
          {active === "cartoon" && (
            <Select
              className="min-w-[10rem] bg-filter text-light-50 rounded-md"
              options={sortByType}
              value={state.type}
              onChange={(option) =>
                handleSetFilterUrl([option as OptionType], "SET_TYPE", "type")
              }
              placeholder="Type"
              styles={customStyles}
              menuPortalTarget={isMounted ? document.body : undefined}
              menuPosition="fixed"
              instanceId="type-select"
            />
          )}
          {showRegion && (
            <Select
              className="min-w-[10rem] bg-filter text-light-50 rounded-md"
              options={regionOptions}
              value={state.region}
              onChange={(option) =>
                handleSetFilterUrl(
                  [option as OptionType],
                  "SET_REGION",
                  "region"
                )
              }
              placeholder="Region"
              styles={customStyles}
              menuPortalTarget={isMounted ? document.body : undefined}
              menuPosition="fixed"
              instanceId="region-select"
            />
          )}

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
            instanceId="sort-select"
          />

          {/* Genres (Multiple) */}
          <Select
            className="grow min-w-[10rem] sm:max-w-[25rem] bg-filter text-light-50 rounded-md"
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
            instanceId="genres-select"
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
            instanceId="release-date-select"
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
            instanceId="rating-select"
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
            instanceId="studio-select"
          />

          <button
            onClick={handleResetFilter}
            className="bg-[#a12f5c] hover:bg-[#702741] min-h-full text-white px-4 py-2 rounded-md text-nowrap"
          >
            Reset All Filter
          </button>
        </div>
        {state?.loading ? (
          <div className="w-full flex justify-center mt-12">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 my-4">
            {datas && datas.length > 0 ? (
              datas.map((data) => (
                <CsrCard
                  item={data}
                  key={data.id}
                  parentSize="h-[24rem] md:h-[30rem] lg:h-[24rem]"
                  size="h-[20rem] md:h-[28rem] lg:h-[20rem]"
                />
              ))
            ) : (
              <div className="text-center text-white/60 py-10">
                Movies/Series Not Found
              </div>
            )}
          </div>
        )}
        {!state?.loading && (
          <div ref={loadMoreRef} className="py-5 w-full flex justify-center">
            <FaArrowDown
              className="w-5 h-5 text-white cursor-pointer"
              onClick={() => loadMore()}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
