// "use client";
// import { motion } from "framer-motion";
// import { FaFilm, FaTv, FaChild, FaGlobe } from "react-icons/fa";

// function Sidebar() {
//   return (
//     <motion.div
//       className="p-5 backdrop-blur-lg bg-white/10 rounded-lg border border-white/20 sticky top-24 overflow-hidden"
//       initial={{ opacity: 0, x: -30 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <ul className="space-y-3">
//         <SidebarItem icon={<FaFilm />} text="Movies" />
//         <SidebarItem icon={<FaTv />} text="Series" />
//         <SidebarItem icon={<FaChild />} text="Cartoon" />
//       </ul>

//       <h3 className="mt-5 mb-3 text-sm font-semibold text-white/80 uppercase tracking-wide">
//         Region
//       </h3>

//       <ul className="space-y-3">
//         <SidebarItem icon={<FaGlobe />} text="Hollywood" />
//         <SidebarItem icon={<FaGlobe />} text="Bollywood" />
//         <SidebarItem icon={<FaGlobe />} text="Korean" />
//         <SidebarItem icon={<FaGlobe />} text="Chinese" />
//         <SidebarItem icon={<FaGlobe />} text="Indonesian" />
//       </ul>
//     </motion.div>
//   );
// }

// function SidebarItem({ icon, text }: { icon: JSX.Element; text: string }) {
//   return (
//     <motion.li
//       className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/20 rounded-md cursor-pointer transition-all"
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//     >
//       {icon} <span>{text}</span>
//     </motion.li>
//   );
// }

// export default Sidebar;

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFilm,
  FaTv,
  FaChild,
  FaGlobeAmericas,
  FaGlobeAsia,
  FaGlobeAfrica,
} from "react-icons/fa";

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
    { id: "cartoon", icon: <FaChild />, text: "Cartoon" },
  ];

  const regions: SidebarItemType[] = [
    { id: "hollywood", icon: <FaGlobeAmericas />, text: "Hollywood" },
    { id: "bollywood", icon: <FaGlobeAsia />, text: "Bollywood" },
    { id: "korean", icon: <FaGlobeAsia />, text: "Korean" },
    { id: "chinese", icon: <FaGlobeAsia />, text: "Chinese" },
    { id: "indonesian", icon: <FaGlobeAfrica />, text: "Indonesian" },
  ];

  return (
    <motion.div
      className="p-4 backdrop-blur-lg bg-white/10 rounded-lg border border-white/20 sticky top-24 overflow-hidden font-playfair"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
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

      <h3 className="mt-6 mb-3 text-sm font-semibold text-white/80 uppercase tracking-wide pl-3">
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
        transition-all duration-300 overflow-hidden
        ${
          isActive
            ? "text-white font-medium"
            : "text-white/70 hover:text-white hover:bg-gradient-to-r from-purple-600 to-transparent"
        }
      `}
      onClick={onClick}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Active item background gradient */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Icon with animation */}
      <motion.div
        className={`text-lg ${isActive ? "text-white" : "text-white/70"}`}
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
      <span className="relative z-10">{item.text}</span>

      {/* Arrow indicator for active items */}
      {isActive && (
        <motion.div
          className="ml-auto text-white"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      )}
    </motion.li>
  );
}

export default SideBar;
