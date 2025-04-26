"use client";

import { useState } from "react";

export default function VideoPlayer({ video }: { video: string }) {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className="w-full min-h-24 lg:w-2/3 mt-12 order-1 lg:order-2 z-40 relative">
      {showVideo ? (
        <iframe
          className="w-full h-[50dvh] lg:size-full lg:ml-5 rounded-xl shadow z-40"
          src={video}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div
          className="size-full lg:ml-5 relative flex justify-center items-center cursor-pointer"
          onClick={() => setShowVideo(!showVideo)}
        >
          <div className="rounded-full bg border glases border-white/10 p-5">
            <div className="relative size-24 lg:size-32">
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
              >
                <defs>
                  <mask id="mask-cutout" maskUnits="userSpaceOnUse">
                    <rect width="100" height="100" fill="white" />
                    <path d="M40 30 L70 50 L40 70 Z" fill="black" />
                  </mask>
                </defs>

                <circle
                  cx="50"
                  cy="50"
                  r="50"
                  fill="rgba(255,255,255,0.1)"
                  mask="url(#mask-cutout)"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
