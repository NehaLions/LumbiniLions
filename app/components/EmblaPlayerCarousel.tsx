"use client"

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { usePlayerData } from "../hooks/usePlayerData";
import styles from "./EmblaPlayerCarousel.module.css";
import PlayerCard from "./PlayerCard"; // Import the PlayerCard component

export const EmblaPlayerCarousel = () => {
  const { players, loading, error } = usePlayerData();
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Add state to track auto-play
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  
  // Main carousel
  const [mainViewRef, mainEmbla] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    skipSnaps: false,
  });
  
  // Thumbnail carousel
  const [thumbViewRef, thumbEmbla] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    loop: false
  });
  
  const onThumbClick = useCallback(
    (index) => {
      if (!mainEmbla || !thumbEmbla) return;
      mainEmbla.scrollTo(index);
      
      // Pause autoplay for a short time when manually navigating
      setAutoPlayEnabled(false);
      setTimeout(() => setAutoPlayEnabled(true), 15000); // Resume after 15 seconds of inactivity
    },
    [mainEmbla, thumbEmbla]
  );
  
  const scrollPrev = useCallback(() => {
    if (mainEmbla) mainEmbla.scrollPrev();
    
    // Pause autoplay for a short time when manually navigating
    setAutoPlayEnabled(false);
    setTimeout(() => setAutoPlayEnabled(true), 15000); // Resume after 15 seconds of inactivity
  }, [mainEmbla]);

  const scrollNext = useCallback(() => {
    if (mainEmbla) mainEmbla.scrollNext();
    
    // Pause autoplay for a short time when manually navigating
    setAutoPlayEnabled(false);
    setTimeout(() => setAutoPlayEnabled(true), 15000); // Resume after 15 seconds of inactivity
  }, [mainEmbla]);
  
  const onSelect = useCallback(() => {
    if (!mainEmbla || !thumbEmbla) return;
    
    // Update selected index
    const newIndex = mainEmbla.selectedScrollSnap();
    setSelectedIndex(newIndex);
    
    // Scroll thumbnail carousel to keep active thumb visible
    thumbEmbla.scrollTo(newIndex);
  }, [mainEmbla, thumbEmbla]);
  
  // Auto-play functionality
  useEffect(() => {
    if (!mainEmbla || !autoPlayEnabled) return;
    
    // Set up interval for auto-scrolling
    const autoPlayInterval = setInterval(() => {
      mainEmbla.scrollNext();
    }, 10000); // 10 seconds
    
    // Clear interval on cleanup
    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [mainEmbla, autoPlayEnabled]);
  
  // Initialize
  useEffect(() => {
    if (!mainEmbla || !thumbEmbla) return;
    
    onSelect();
    mainEmbla.on("select", onSelect);
    
    // Reset auto-play when user interacts with carousel
    const handlePointerDown = () => {
      setAutoPlayEnabled(false);
      setTimeout(() => setAutoPlayEnabled(true), 15000);
    };
    
    mainEmbla.on("pointerDown", handlePointerDown);
    
    return () => {
      mainEmbla.off("select", onSelect);
      mainEmbla.off("pointerDown", handlePointerDown);
    };
  }, [mainEmbla, thumbEmbla, onSelect]);
  
  // Show loading state if players data is still loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Show error message if there was an error
  if (error || players.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-red-400">Failed to load player data</p>
        <p className="text-gray-400 text-sm mt-2">{error}</p>
      </div>
    );
  }
  
  const selectedPlayer = players[selectedIndex] || {};
  
  return (
    <div className="bg-[#06101B] text-white relative ">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl md:ml-[10vw] font-bold text-start mb-0">
          <span className="text-white-500 font-[poppins]">OUR LIONS</span> 
        </h2>
        {/* <p className="text-1xl pb-[5%] md:text-[14px] mt-10px md:ml-[10.1vw] opacity-80 font-[poppins] text-start mb-0">
          View all lions
        </p> */}
        
        {/* Main carousel with roar controls */}
        <div className={styles.emblaMain}>
          {/* Left Roar Control */}
          <button 
            className={styles.roarControl}
            onClick={scrollPrev}
            aria-label="Previous player"
          >
            <Image
              src="/leftroar.webp"
              alt="Previous"
              width={287}
              height={466}
              className={styles.roarImg}
            />
          </button>
          
          <div className={styles.emblaMainViewport} ref={mainViewRef}>
            <div className={styles.emblaMainContainer}>
            {players.map((player, index) => (
              <div className={styles.emblaMainSlide} key={player.id} data-active={index === selectedIndex}>
                <div className={styles.playerMainCard}>
                  {/* Simply use PlayerCard component */}
                  <div className={styles.playerCardWrapper}>
                    <PlayerCard player={player} />
                  </div>
                  
                  {/* Keep the desktop stats section */}
{/* Redesigned desktop stats section */}
<div className={`${styles.playerInfo} md:block hidden`}>
  <h3 className="text-3xl md:text-4xl font-bold mb-2 font-['Bebas_Neue']">
    {player.firstName} <span className="text-amber-500">{player.lastName}</span>
  </h3>
  
  <div className="flex items-center mb-6 space-x-4">
    <span className="bg-amber-500 text-[#06101B] px-4 py-1 rounded-md uppercase text-sm font-bold tracking-wider">
      {player.class || "All-Rounder"}
    </span>
    <span className="text-gray-400 text-sm">Jersey: {player.jersey}</span>
  </div>
  
  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-6">
    <div className={styles.statItem}>
      <span className="text-amber-400 text-lg font-bold">{player.matches}</span>
      <span className="text-sm text-gray-300">Matches</span>
    </div>
    <div className={styles.statItem}>
      <span className="text-amber-400 text-lg font-bold">{player.runs}</span>
      <span className="text-sm text-gray-300">Runs</span>
    </div>
    <div className={styles.statItem}>
      <span className="text-amber-400 text-lg font-bold">38</span>
      <span className="text-sm text-gray-300">Average</span>
    </div>
    <div className={styles.statItem}>
      <span className="text-amber-400 text-lg font-bold">{player.strikerate}</span>
      <span className="text-sm text-gray-300">Strike Rate</span>
    </div>
  </div>
  
  <p className="text-gray-300 text-sm leading-relaxed mb-6">
    {player.description || 
      "A formidable player known for powerful batting and strategic gameplay. Has been a key asset for the Lumbini Lions with consistent performances throughout the season."}
  </p>
  
  <a 
    href={`/players/${player.slug}`} 
    className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-[#06101B] font-bold py-2 px-4 rounded-md transition-all"
  >
    Player Profile
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
    </svg>
  </a>
</div>
                </div>
              </div>
            ))}
            </div>
          </div>
          
          {/* Right Roar Control */}
          <button 
            className={`${styles.roarControl} ${styles.roarControlRight}`}
            onClick={scrollNext}
            aria-label="Next player"
          >
            <Image
              src="/rightroar.webp"
              alt="Next"
              width={287}
              height={466}
              quality={100}
              className={styles.roarImg}
            />
          </button>
        </div>
        
{/* Thumbnails section */}
<div className={styles.emblaThumb}>
  <div className={styles.emblaThumbViewport} ref={thumbViewRef}>
    <div className={styles.emblaThumbContainer}>
      {players.map((player, index) => {
        // Use consistent image path construction
        const imageName = player.firstName.toLowerCase();
        const imgSrc = `/playercards/${imageName}card.webp`;
        
        return (
          <button
            key={player.id}
            className={`${styles.emblaThumbSlide} ${
              index === selectedIndex ? styles.emblaThumbSelected : ""
            }`}
            onClick={() => onThumbClick(index)}
          >
            <div className={styles.thumbImageContainer}>
              <Image
                src={imgSrc}
                alt={`${player.firstName} ${player.lastName} thumbnail`}
                width={80}
                height={80}
                className="object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.src = "/default-player.webp";
                }}
              />
              <span className={styles.playerNumber}>{index + 1}</span>
            </div>
            <span className={styles.thumbPlayerName}>
              {player.firstName.split(" ")[0]}
            </span>
          </button>
        );
      })}
    </div>
  </div>
</div>
      </div>
    </div>
  );
};