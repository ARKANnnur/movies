import Navbar from "@/_components/Navbar";
import { Roboto } from "next/font/google";
import "@/_styles/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
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
      <body className={`${roboto.className} bg-dark-50 h-auto text-light-50`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
