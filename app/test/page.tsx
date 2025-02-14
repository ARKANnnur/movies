import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

function Page({}) {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center">
      <Link
        key={1}
        className="w-56 h-72 group transition-all duration-500 delay-300"
        href={`/movie/${1}`}
      >
        <div className="w-56 h-72 glases rounded-md overflow-hidden ">
          <div className="card-gradient size-full absolute bottom-0">
            <div className="w-full h-1/2 p-2 absolute bottom-0 z-50 group-hover:opacity-100 transition-al delay-300l">
              <h4 className={`${playfairDisplay.className} text-lg`}>
                Title Movies
              </h4>
              <div className="rating genre text-xs">
                <div className="flex gap-2 text-light-200">
                  <p>8.7</p>
                  <p>|</p>
                  <p>PG-13</p>
                  <p>|</p>
                  <p>2014</p>
                  <p>|</p>
                  <p>movie</p>
                </div>
                <div className="flex gap-2 text-light-200">
                  <p>Adventure</p>
                  <p>|</p>
                  <p>drama</p>
                  <p>|</p>
                  <p>Sci-fi</p>
                  <p>|</p>
                  <p>movie</p>
                </div>
              </div>
              <p className="text-xs">
                Sonic, Knuckles, and Tails reunite against a powerful new
                adversary, Shadow,
              </p>
            </div>
          </div>
          <div className="group-hover:h-1/2 relative size-full transition-all z-10">
            <Image
              src="https://plus.unsplash.com/premium_photo-1666700698920-d2d2bba589f8?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="test"
              fill
              className="bg-center bg-cover brightness-75"
            />
          </div>
        </div>
        <p className="mt-2 text-sm group-hover:opacity-0 transition-all">
          SNOWMAN
        </p>
      </Link>
    </div>
  );
}

export default Page;
