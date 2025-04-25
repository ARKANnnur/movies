"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Link from "next/link";
import CardAnimate from "@/_components/CardAnimate";

type Alert = {
  id: string;
  title: string;
};

function Page() {
  const STORAGE_KEY = "myBookmarks";
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [resfresh, setRefresh] = useState(false);
  const [show, setShow] = useState<boolean | Alert>(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setBookmarks(stored);
  }, [resfresh]);

  const deleteBookmark = (id: string) => {
    const updated = bookmarks.filter((data) => data.id !== id);
    setBookmarks(updated);
    setRefresh((ref) => !ref);
    setShow(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-24 gap-10 lg:gap-5 lg:gap-y-10 px-4 sm:px-10 relative">
        {bookmarks.length > 0 ? (
          bookmarks.map((data) => (
            <CardAnimate
              item={data}
              key={data.id}
              parentSize="h-[18rem] md:h-[20rem]"
              deleteBookmark={setShow}
            />
          ))
        ) : (
          <div className="flex justify-center items-center col-span-1 md:col-span-2 lg:col-span-4 h-[50dvh] ">
            <motion.div
              className="border glases border-white/10 p-5 rounded-full cursor-pointer"
              whileHover={{
                scale: [null, 1.1, 1.5],
                rotateX: [0, 0, 360],
                transition: {
                  duration: 0.5,
                  times: [0, 0.6, 1],
                  ease: ["easeInOut", "easeOut"],
                },
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <Link
                href="/recommendation?type=movie"
                className="text-sm md:text-xl"
              >
                Add Your Bookmark First
              </Link>
            </motion.div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {show && typeof show !== "boolean" && (
          <div className="w-full h-full fixed top-0 left-0 inset-0 flex justify-center items-start z-50 ">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                mass: 0.6,
                duration: 0.4,
              }}
              className="bg-dark-50 space-y-4 p-4 rounded-md text-light-50 font-semibold shadow-xl textsm sm:text-lg lg:text-xl max-w-64 mt-12"
            >
              <p className="text-center">
                Do you want delete {typeof show === "object" && show.title} from
                Bookmark?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    typeof show === "object" &&
                    "id" in show &&
                    deleteBookmark(show.id)
                  }
                  className="w-1/2 py-2 text-base rounded-md hover:opacity-70 bg-light-500 transition text-white"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShow(false)}
                  className="w-1/2 py-2 text-base rounded-md hover:opacity-70 bg-red-500 transition text-white"
                >
                  No
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Page;
