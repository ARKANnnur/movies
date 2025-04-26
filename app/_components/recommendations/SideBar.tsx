"use client";

import { motion } from "framer-motion";
import { FaFilm, FaTv } from "react-icons/fa";
import { SiFoodpanda } from "react-icons/si";
import { RiMovie2Line } from "react-icons/ri";
import { IoHomeSharp } from "react-icons/io5";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

type SidebarItemType = {
  id: string;
  icon: JSX.Element;
  text: string;
  type: string;
};

type SidebarItemProps = {
  item: SidebarItemType;
  isActive: boolean;
  onClick: () => void;
};

function SideBar({
  active,
  handleActive,
}: {
  active: string | null;
  handleActive: (id: string, type: string) => void;
}) {
  const [show, setShow] = useState(false);
  const categories: SidebarItemType[] = [
    { id: "movies", icon: <FaFilm />, text: "Movies", type: "movie" },
    { id: "series", icon: <FaTv />, text: "Series", type: "tv" },
    { id: "cartoon", icon: <SiFoodpanda />, text: "Cartoon", type: "movie" },
  ];

  const regions: SidebarItemType[] = [
    {
      id: "hollywood",
      icon: <RiMovie2Line />,
      text: "Hollywood",
      type: "movie",
    },
    {
      id: "bollywood",
      icon: <RiMovie2Line />,
      text: "Bollywood",
      type: "movie",
    },
    { id: "korean", icon: <RiMovie2Line />, text: "Korean", type: "movie" },
    { id: "chinese", icon: <RiMovie2Line />, text: "Chinese", type: "movie" },
    {
      id: "indonesian",
      icon: <RiMovie2Line />,
      text: "Indonesian",
      type: "movie",
    },
  ];

  return (
    <>
      <div className="fixed top-2 left-2 bg-light-400/10 p-2 rounded-full border-b-[1px] border-light-50/10 bg-blend-saturation backdrop-blur-md z-40 mt-24 mx-4 sm:mx-10 lg:hidden">
        <IoHomeSharp
          className="text-light-500 cursor-pointer size-5"
          onClick={() => setShow((prev) => !prev)}
        />
      </div>
      <motion.div
        className={`${
          show ? "fixed top-0 left-0 bottom-0 z-50 w-full sm:w-1/2" : "hidden"
        } lg:block py-4 px-2 backdrop-blur-lg rounded-xl lg:w-full lg:sticky top-24 overflow-hidden`}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#b32eb3]/20 to-purple-900/10 backdrop-blur-xl -z-10"></div>
        <div className="absolute top-2 right-2 bg-light-400/50 p-2 rounded-full border-b-[1px] border-light-50/10 bg-blend-saturation backdrop-blur-md z-40 lg:hidden">
          <IoMdClose
            className="text-white cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          />
        </div>
        <ul className="space-y-2">
          {categories.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isActive={active === item.id}
              onClick={() => {
                handleActive(item.id, item.type);
                setShow((prev) => !prev);
              }}
            />
          ))}
        </ul>

        <h3 className="mt-6 mb-3 text-sm font-semibold text-white tracking-wide pl-3">
          Region
        </h3>

        <ul className="space-y-2">
          {regions.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isActive={active === item.id}
              onClick={() => {
                handleActive(item.id, item.type);
                setShow((prev) => !prev);
              }}
            />
          ))}
        </ul>
      </motion.div>
    </>
  );
}

function SidebarItem({ item, isActive, onClick }: SidebarItemProps) {
  return (
    <motion.li
      className={`
        relative flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer
        transition-all duration-300 overflow-hidden text-sm group
        ${
          isActive
            ? "text-white font-medium bg-gradient-to-r from-purple-600 to-transparent"
            : "hover:text-white hover:bg-gradient-to-r from-purple-600 to-transparent"
        }
      `}
      onClick={onClick}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon with animation */}
      <motion.div
        className={`text-lg ${
          isActive ? "text-white" : "text-light-100 group-hover:text-white"
        }`}
        animate={{
          scale: isActive ? 1.1 : 1,
          rotate: isActive ? [0, 10, 0] : 0,
        }}
        transition={{
          duration: 0.3,
          rotate: { duration: 0.2, ease: "easeInOut" },
        }}
      >
        {item.icon}
      </motion.div>

      {/* Text */}
      <span
        className={`relative z-10 ${
          isActive ? "text-white" : "text-light-100 group-hover:text-white"
        }`}
      >
        {item.text}
      </span>
    </motion.li>
  );
}

export default SideBar;
