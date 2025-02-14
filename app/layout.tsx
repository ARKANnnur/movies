import Navbar from "@/_components/Navbar";
import { Playfair_Display, Roboto } from "next/font/google";
import "@/_styles/globals.css";
import Test from "./_components/test";

// const playfairDisplay = Playfair_Display({
//   subsets: ["latin"],
//   weight: ["400", "700", "900"],
// });
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
    "Escape to tranquility in the heart of nature. Cozy cabins with breathtaking views, where mountains meet the lake. Your serene retreat awaits. ",
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
