import { StylesConfig } from "react-select";

const hideScrollbarStyles = {
  msOverflowStyle: "none",
  scrollbarWidth: "none" as "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

export const customStyles: StylesConfig = {
  control: (styles, state) => ({
    ...styles,
    borderRadius: "0.5rem",
    borderWidth: "1px",
    fontSize: "0.875rem",
    borderColor: state.isFocused ? "#b32eb3" : "rgb(179, 46, 179, 0.2)",
    boxShadow: state.isFocused
      ? "0 0 0 2px rgba(241, 102, 33, 0.2)"
      : undefined,
    "&:hover": {
      borderColor: "#b32eb3",
      color: "#ffff",
    },
    backgroundColor: "transparent",
    position: "relative",
    zIndex: 1,
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "#fff",
    "::placeholder": {
      color: "#fff",
    },
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: "#fff",
  }),
  option: (styles, state) => ({
    ...styles,
    borderRadius: state.isSelected ? "0.5rem" : "0px",
    backgroundColor: state.isSelected ? "rgb(179, 46, 179, 1)" : undefined,
    color: state.isSelected
      ? "rgb(255, 255, 255, 1)"
      : "rgb(255, 255, 255, 0.6)",
    "&:hover": {
      backgroundColor: "rgb(179, 46, 179, 1)",
      borderRadius: "0.5rem",
      color: "#f5f3ff",
    },
    padding: "8px 12px",
    margin: "4px 0",
    transition: "all 0.2s ease",
  }),
  menuList: (styles) => ({
    ...styles,
    borderRadius: "0",
    borderWidth: "0",
    padding: "5px",
    "&::-webkit-scrollbar": {
      width: "2px",
      height: "2px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#b32eb3",
      borderRadius: "0 25px 0 25px",
      overflow: "hidden",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#c43ec4",
    },
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: "0.5rem",
    backgroundColor: "#100F10",
    border: "1px solid #b32eb3",
    position: "absolute",
    overflowY: "hidden",
    zIndex: 9999,
  }),
  menuPortal: (styles) => ({
    ...styles,
    zIndex: 9999,
  }),
};

export const customStylesMultiple: StylesConfig = {
  control: (styles, state) => ({
    ...styles,
    borderRadius: "0.5rem",
    borderWidth: "1px",
    fontSize: "0.875rem",
    borderColor: state.isFocused ? "#b32eb3" : "rgb(179, 46, 179, 0.2)",
    boxShadow: state.isFocused
      ? "0 0 0 2px rgba(241, 102, 33, 0.2)"
      : undefined,
    "&:hover": {
      borderColor: "#b32eb3",
      color: "#ffff",
    },
    backgroundColor: "transparent",
    position: "relative",
    zIndex: 1,
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "#fff",
    "::placeholder": {
      color: "#fff",
    },
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: "#fff",
  }),
  option: (styles, state) => ({
    ...styles,
    borderRadius: state.isSelected ? "0.5rem" : "0px",
    backgroundColor: state.isSelected ? "rgb(179, 46, 179, 1)" : undefined,
    color: state.isSelected
      ? "rgb(255, 255, 255, 1)"
      : "rgb(255, 255, 255, 0.6)",
    "&:hover": {
      backgroundColor: "rgb(179, 46, 179, 1)",
      borderRadius: "0.5rem",
      color: "#f5f3ff",
    },
    padding: "8px 12px",
    margin: "4px 0",
    transition: "all 0.2s ease",
  }),
  menuList: (styles) => ({
    ...styles,
    borderRadius: "0",
    borderWidth: "0",
    padding: "5px",
    "&::-webkit-scrollbar": {
      width: "2px",
      height: "2px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#b32eb3",
      borderRadius: "0 25px 0 25px",
      overflow: "hidden",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#c43ec4",
    },
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: "0.5rem",
    backgroundColor: "#100F10",
    border: "1px solid #b32eb3",
    position: "absolute",
    overflowY: "hidden",
    zIndex: 9999,
  }),
  menuPortal: (styles) => ({
    ...styles,
    zIndex: 9999,
  }),
  valueContainer: (styles: any) => ({
    ...styles,
    overflow: "auto",
    whiteSpace: "nowrap",
    scrollbarWidth: "thin",
    scrollbarColor: "#b32eb3 #333",
    flexWrap: "wrap",
    maxHeight: "50px",
    maxWidth: "25rem",
  }),
  multiValue: (styles) => ({
    ...styles,
    borderRadius: "0.5rem",
    color: "#fff",
    backgroundColor: "transparent",
    border: "1px solid #b32eb3",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#fff",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "#fff",
    ":hover": {
      backgroundColor: "transparent",
      color: "white",
    },
  }),
};
