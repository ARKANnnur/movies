"use client";
import { useEffect, useState } from "react";
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from "react-icons/md";
import StarRating from "./StarRating";

const STORAGE_KEY = "myBookmarks";

type Item = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  genre: number[];
  rating: number;
  releaseDate: string;
  poster: string;
};

export default function BookmarkButton({ data }: { data: any }) {
  const { isBookmarked, toggleBookmark, rating, toggleRating } =
    useBookmark(data);

  return (
    <>
      {isBookmarked ? (
        <MdOutlineBookmarkAdded
          onClick={toggleBookmark}
          className="md:w-5 md:h-5 cursor-pointer text-light-400"
        />
      ) : (
        <MdOutlineBookmarkAdd
          onClick={toggleBookmark}
          className="md:w-5 md:h-5 cursor-pointer text-white"
        />
      )}
      <StarRating rating={rating} toggleRating={toggleRating} />
    </>
  );
}

function useBookmark(item?: Item) {
  const [bookmark, setBookmark] = useState(false);
  const [localRating, setLocalRating] = useState(0);
  const data = {
    id: item?.id,
    title: item?.title,
    name: item?.name,
    overview: item?.overview,
    genre: item?.genre,
    releaseDate: item?.releaseDate,
    poster: item?.poster,
  };

  useEffect(() => {
    if (typeof window === "undefined" || !item) return;

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const exists = stored.find((i: Item) => i.id === item.id);

    if (exists) {
      setBookmark(exists.watched || false);
      setLocalRating(exists.rating || 0);
    }
  }, [item]);

  const toggleBookmark = () => {
    if (typeof window === "undefined" || !item) return;

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const exists = stored.find((i: Item) => i.id === item.id);
    let updated;

    if (exists) {
      updated = stored.filter((i: Item) => i.id !== item.id);
      setLocalRating(0);
    } else {
      updated = [...stored, { ...data, watched: true, rating: localRating }];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setBookmark(!exists);
  };

  const toggleRating = (rating: number) => {
    setLocalRating(rating);

    if (typeof window === "undefined" || !item) return;

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const exists = stored.find((i: Item) => i.id === item.id);

    if (exists) {
      const updated = stored.map((i: Item) =>
        i.id === data.id ? { ...i, rating: rating } : i
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  return {
    isBookmarked: bookmark,
    rating: localRating,
    toggleBookmark,
    toggleRating,
  };
}
