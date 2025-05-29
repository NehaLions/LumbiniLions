"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Featured videos data
const videosData = [
  {
    id: "e1T8r5eQcSg",
    title: "Lumbini Lions Highlights",
    thumbnail: "/video-thumbnails/video1.jpg", // Replace with actual thumbnail
  },
  {
    id: "TOZf2D0EVrY",
    title: "Lumbini Lions vs Pokhara Rhinos",
    thumbnail: "/video-thumbnails/video2.jpg", // Replace with actual thumbnail
  },
  {
    id: "9rlijxYvaW4",
    title: "Season Highlights",
    thumbnail: "/video-thumbnails/video3.jpg", // Replace with actual thumbnail
  },
  {
    id: "H9aCOrOMoBM",
    title: "YouTube video player",
    thumbnail: "/video-thumbnails/video4.jpg", // Replace with actual thumbnail
  },
  // {
  //   id: 'lmnopqrstuv',
  //   title: 'Best Moments',
  //   thumbnail: '/video-thumbnails/video5.jpg' // Replace with actual thumbnail
  // }
];

export default function FeaturedVideos() {
  const [activeVideo, setActiveVideo] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToVideo = (index: number) => {
    if (carouselRef.current) {
      setActiveVideo(index);
      const scrollAmount = index * 390; // 369px video width + 21px gap
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    const nextIndex = Math.min(activeVideo + 1, videosData.length - 1);
    scrollToVideo(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(activeVideo - 1, 0);
    scrollToVideo(prevIndex);
  };

  return (
    <div className="bg-[#06101B] md:-mt-16 lg:-mt-24 xl:-mt-32 left-5">
      <div className="min-h-[536px] relative w-full overflow-hidden py-16 left-5">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold">
              <span className="text-white md:ml-[9vw] flex flex-col font-[poppins]">
                Featured videos
                {/* <span className="text-[14px] font-medium opacity-60 ">View all</span> */}
                {/* <Link href="/videos">View all videos</Link> */}
              </span>
            </h2>

            {/* Navigation dots */}
            <div className="flex space-x-2 mt-4 lg:mt-0">
              {videosData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToVideo(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeVideo === index ? "bg-amber-500 w-6" : "bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Carousel container with overflow visible */}
          <div className="relative">
            {/* Left/Right Navigation Arrows */}
            <button
              onClick={handlePrev}
              disabled={activeVideo === 0}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white ${
                activeVideo === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100"
              }`}
              aria-label="Previous video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              disabled={activeVideo === videosData.length - 1}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white ${
                activeVideo === videosData.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100"
              }`}
              aria-label="Next video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Main carousel */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-[21px] px-[12%] snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {videosData.map((video, index) => (
                <div
                  key={video.id}
                  className="flex-none w-[369px] h-[238px] relative rounded-lg overflow-hidden snap-center"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    {/* YouTube embedded player */}
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.id}?si=Z0WoGUxz3eIbNN2b`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0"
                    />

                    {/* Play icon overlay (optional) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-amber-500/80 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                          viewBox="0 0 24 24"
                          className="w-8 h-8"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background image */}
        <Image
          alt="Featured videos background"
          src="/fv.webp"
          fill
          className="object-cover z-[1] opacity-70"
          priority
        />
      </div>
    </div>
  );
}
