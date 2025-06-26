import Navbar from "@/_components/Navbar";
import { Roboto, Playfair_Display } from "next/font/google";
import "@/_styles/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-roboto",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
});

export const metadata = {
  title: {
    template: "%s / Movies",
    default: "Movies",
  },
  description:
    "Discover the best movies easily! 🎬 Use Movies to search for your favorite films, read reviews, and save movies to watch later. Bookmark must-watch films effortlessly! 🚀",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
       <link rel="icon" href="/icon.svg" sizes="any" />
      </head>
      <body
        className={`${roboto.variable} ${playfairDisplay.variable} font-roboto bg-dark-50 h-auto text-light-50`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
