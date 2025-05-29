"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./PlayerCardCarousel.module.css";

interface Player {
  id: string;
  name: string;
  slug: string;
  class: "Batsman" | "WicketKeeper" | "AllRounder" | "Bowler";
  description: string;
  matches: number;
  strikerate: number;
  wickets: number;
  runs: number;
  imageId?: string | null;
  jersey: number;
}

interface PlayerCardCarouselProps {
  players: Player[];
}

const PlayerCardCarousel: React.FC<PlayerCardCarouselProps> = ({ players }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Initialize carousel with 4 slides visible at once on desktop
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    align: "center", // Changed from 'start' to 'center' for better snapping
    skipSnaps: false,
    slidesToScroll: 1,
    dragFree: false, // Changed from true to false to enforce snapping
    containScroll: "trimSnaps",
    inViewThreshold: 0.7, // Consider a slide in view when 70% visible
    duration: 10, // Animation duration in milliseconds (higher = slower, smoother transitions)
  });

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
    setAutoPlayEnabled(false);
    setTimeout(() => setAutoPlayEnabled(true), 15000);
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
    setAutoPlayEnabled(false);
    setTimeout(() => setAutoPlayEnabled(true), 15000);
  }, [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setActiveIndex(embla.selectedScrollSnap());
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  const scrollTo = useCallback(
    (index: number) => embla && embla.scrollTo(index),
    [embla]
  );

  // Auto-play functionality
  useEffect(() => {
    if (!embla || !autoPlayEnabled) return;

    const autoPlayInterval = setInterval(() => {
      if (embla.canScrollNext()) {
        embla.scrollNext();
      } else {
        embla.scrollTo(0);
      }
    }, 10000); // 10 seconds interval for auto-scrolling

    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [embla, autoPlayEnabled]);

  // Initialize and setup event listeners
  useEffect(() => {
    if (!embla) return;

    setScrollSnaps(embla.scrollSnapList());
    onSelect();
    embla.on("select", onSelect);

    // Reset auto-play when user interacts with carousel
    const handlePointerDown = () => {
      setAutoPlayEnabled(false);
      setTimeout(() => setAutoPlayEnabled(true), 15000);
    };

    embla.on("pointerDown", handlePointerDown);

    return () => {
      embla.off("select", onSelect);
      embla.off("pointerDown", handlePointerDown);
    };
  }, [embla, onSelect]);

  if (players.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">No players available</p>
      </div>
    );
  }

  return (
    <div className="bg-[#06101B] text-white pb-[10vh] md:pb-[30vh] relative">
      {/* Left roar image (decorative) */}
      <div className={styles.roarImageLeft}>
        <Image
          src="/leftroar.webp"
          alt="Decorative lion roar"
          width={287}
          height={466}
          className={styles.roarImg}
        />
      </div>

      {/* Right roar image (decorative) */}
      <div className={styles.roarImageRight}>
        <Image
          src="/rightroar.webp"
          alt="Decorative lion roar"
          width={287}
          height={466}
          className={styles.roarImg}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-2xl md:text-4xl font-bold">
            <span className="text-white md:ml-[9vw] flex flex-col font-[poppins]">
              OUR LIONS
              <Link
                href="/team"
                className="text-[14px] font-medium opacity-60 "
              >
                {/* <span className="text-[14px] font-medium opacity-60 "> */}
                View all
                {/* </span> */}
              </Link>
              {/* <span className="text-[14px] font-medium opacity-60 ">View all</span> */}
            </span>
          </h2>

          {/* Navigation buttons moved to right side */}
          <div className="flex space-x-3">
            <button
              className={styles.navButton}
              onClick={scrollPrev}
              aria-label="Previous players"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              className={styles.navButton}
              onClick={scrollNext}
              aria-label="Next players"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.embla}>
          <div className={styles.emblaViewport} ref={viewportRef}>
            <div className={styles.emblaContainer}>
              {players.map((player) => {
                // Construct the image path
                const imageName = player.name.split(" ")[0].toLowerCase();
                const imgSrc = `/playercards/${imageName}card.webp`;
                // const imgSrc = "/playercards/tomcard.webp"

                return (
                  <div className={styles.emblaSlide} key={player.id}>
                    <Link
                      href={`/players/${player.slug}`}
                      className={styles.playerCard}
                    >
                      <div className={styles.playerImageWrapper}>
                        {/* Changed to fixed dimensions with object-contain */}
                        <div className={styles.imageFixedContainer}>
                          <Image
                            src={imgSrc}
                            alt={`${player.firstName} ${player.lastName}`}
                            fill
                            quality={100}
                            className={styles.playerImage}
                            onError={(e) => {
                              e.currentTarget.src = "/default-player.webp";
                            }}
                          />
                        </div>
                      </div>
                      <div className={styles.playerName}>
                        <h3 className="text-lg flex flex-col font-['poppins'] tracking-wide">
                          <span className="text-amber-500 text-[14px] font-semibold text-align-start leading-none">
                            {player.lastName}
                          </span>
                          <span className="text-white-500 text-[24px] font-semibold text-align-start -mt-1">
                            {player.firstName}
                          </span>
                        </h3>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.dotContainer}>
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === selectedIndex ? styles.dotSelected : ""
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerCardCarousel;
