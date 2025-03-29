"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaFilm, FaTv } from "react-icons/fa";
import { SiFoodpanda } from "react-icons/si";
import { RiMovie2Line } from "react-icons/ri";

type SidebarItemType = {
  id: string;
  icon: JSX.Element;
  text: string;
};

type SidebarItemProps = {
  item: SidebarItemType;
  isActive: boolean;
  onClick: () => void;
};

function SideBar() {
  const [active, setActive] = useState<string | null>("movies");

  const categories: SidebarItemType[] = [
    { id: "movies", icon: <FaFilm />, text: "Movies" },
    { id: "series", icon: <FaTv />, text: "Series" },
    { id: "cartoon", icon: <SiFoodpanda />, text: "Cartoon" },
  ];

  const regions: SidebarItemType[] = [
    { id: "hollywood", icon: <RiMovie2Line />, text: "Hollywood" },
    { id: "bollywood", icon: <RiMovie2Line />, text: "Bollywood" },
    { id: "korean", icon: <RiMovie2Line />, text: "Korean" },
    { id: "chinese", icon: <RiMovie2Line />, text: "Chinese" },
    { id: "indonesian", icon: <RiMovie2Line />, text: "Indonesian" },
  ];

  return (
    <motion.div
      className="py-4 px-2 backdrop-blur-lg rounded-xl sticky top-24 overflow-hidden"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#b32eb3]/20 to-purple-900/10 backdrop-blur-xl -z-10"></div>
      <ul className="space-y-2">
        {categories.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={active === item.id}
            onClick={() => setActive(item.id)}
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
            onClick={() => setActive(item.id)}
          />
        ))}
      </ul>
    </motion.div>
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
