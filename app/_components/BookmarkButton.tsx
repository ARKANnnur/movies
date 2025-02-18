"use client";
import { useState } from "react";
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from "react-icons/md";

export default function BookmarkButton() {
  const [isBookmark, setIsBookmark] = useState(false);

  return (
    <>
      {isBookmark ? (
        <MdOutlineBookmarkAdded
          onClick={() => setIsBookmark(false)}
          className="md:w-5 md:h-5 cursor-pointer text-light-400"
        />
      ) : (
        <MdOutlineBookmarkAdd
          onClick={() => setIsBookmark(true)}
          className="md:w-5 md:h-5 cursor-pointer text-white"
        />
      )}
    </>
  );
}
