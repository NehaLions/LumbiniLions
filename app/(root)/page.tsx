import React from "react";
import "./rootpage.css";
import Image from "next/image";
// import Secondpage from "../components/secondpage";
// import Thirdpage from "../components/thirdpage";
// import QuizPage from "../quizpage/page";
import ResultsSection from "../components/ResultsSection";
import ScrollEffects from "../components/scrolleffects";
// import FixturesSection from "../components/FixturesSection";
// import LionPlayers from "../lionplayers/page";
// import NewsPage from "../news/page";
import styles from "../components/navbar.module.css";
import FeaturedVideos from "../components/featuredVideo";
// import dynamic from 'next/dynamic';
// import LazyLoadSection from '../components/LazyLoadSection';
import { prisma } from "@/lib/db";
// import HeroPlayersWrapper from "../components/HeroPlayersWrapper";
import HeroPlayers from "../components/HeroPlayers";
import PlayerCardCarousel from "../components/PlayerCardCarousel";
import NewsContent from "../components/NewsContent";
import QuizPage from "../quizpage/page";
import NewsContent1 from "../news/page";
import PlayerCardCarouselServer from "../components/PlayerCardCarouselServer";

export const revalidate = 21600; // 6 hours

export default async function RootPage() {
  let resultArray: any = [];
  try {
    resultArray = await prisma.schedule.findMany({
      orderBy: { matchDate: "desc" },
      take: 5,
    });
  } catch (error) {}

  return (
    <div className="min-h-screen relative">
      {/* Hero Section with background image */}
      <div className="relative min-h-[100vh] md:min-h-[100vh]">
        {/* Background image for hero section */}
        <div className="absolute inset-0 z-[1] h-full w-full">
          {/* Desktop background */}
          <div className="hidden md:block relative h-full w-full">
            <Image
              src="/headerbg2.webp"
              alt="Background"
              fill
              className="object-cover object-top"
              priority
              quality={85}
            />
          </div>

          {/* Mobile background - using the same image but with different sizing */}
          <div className="md:hidden relative h-full w-full">
            <Image
              src="/headerbg2.webp"
              alt="Background"
              fill
              className="object-cover object-center"
              priority={false}
              quality={75}
            />
          </div>
        </div>

        <ScrollEffects />

        <HeroPlayers />

        {/* Team image with viewport-relative positioning
        <div className="absolute inset-0 z-[5] flex items-center justify-center">
          {/* Desktop sizing */}
        {/* <div className="hidden md:block relative top-[13.5vh] transform scale-[1.45]">
            <Image 
              src="/team.webp" 
              height={895} 
              width={688} 
              alt="teamimage" 
              className="object-contain"
              priority
            />
          </div>
          
          {/* Mobile sizing */}
        {/* <div className="md:hidden relative w-full h-[60vh] flex items-center justify-center">
            <div className="relative w-[90%] max-w-[350px]">
              <Image 
                src="/team.webp" 
                height={695} 
                width={488} 
                alt="teamimage" 
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div> */}

        {/* Backdrop shadow overlay for better text readability */}
        <div className="absolute inset-0 h-[115vh] z-[3] bg-gradient-to-b from-black/0 via-black/10 to-[#06101B] pointer-events-none"></div>

        {/* Sponsors section with viewport-relative positioning */}
        <div className="absolute w-full hidden md:block z-[12] bottom-[26vh] md:bottom-[-15vh] lg:bottom-[2vh]">
          <div className="container mx-auto px-4 md:px-[150px]">
            <div className="grid grid-cols-4 md:grid-cols-7 gap-4 sm:gap-6 md:gap-8">
              {[
                { src: "/ncell.webp", alt: "Ncell" },
                { src: "/buddhaair.webp", alt: "Buddha Air" },
                { src: "/hilife.webp", alt: "Hi-Life" },
                { src: "/yeti.webp", alt: "Yeti Airlines" },
                { src: "/fortuna.webp", alt: "Fortuna" },
                { src: "/nidpil.webp", alt: "NIDPIL" },
                { src: "/folliderm.webp", alt: "Folliderm" },
              ].map((sponsor, index) => (
                <div key={index} className={styles.logoWrapper}>
                  <div
                    className={`${styles.logoContainer} flex justify-center items-center`}
                  >
                    <Image
                      src={sponsor.src}
                      width={300}
                      height={300}
                      alt={sponsor.alt}
                      className="h-8 sm:h-10 w-auto object-contain hover:scale-110 transition-all duration-300"
                      style={{ filter: "brightness(3) contrast(1.8)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections - using viewport positioning */}
      <div className="relative overflow-hidden bg-[#06101B] z-[11] pt-[10vh] md:pt-[10vh] md:mt-[0] mt-[-32.5vh]">
        <ResultsSection results={resultArray} />
        {/* <LionPlayers /> */}
        {/* <QuizPage /> */}
        <PlayerCardCarouselServer />
        <FeaturedVideos />
        <NewsContent />
        {/* <NewsContent/> */}
      </div>
    </div>
  );
}
