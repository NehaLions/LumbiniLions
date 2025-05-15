"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Add proper TypeScript typing
interface FeaturedNewsProps {
  displayFeatured: {
    id: string | number;
    title: string;
    slug?: string;
    image?: string;
    subtitle?: string;
    content: string;
  };
  ExcerptFromContent: string;
}

function MergedFeaturedNews({
  displayFeatured,
  ExcerptFromContent,
}: FeaturedNewsProps) {
  return (
    <div className="w-full relative  backdrop-blur-sm   mt-[2vh] overflow-hidden  ">
      {/* Background Image */}
      <div className="w-full h-[300px] md:h-[595px] relative">
        <Image
          src={displayFeatured.image || "/news.jpg"}
          alt="Featured News"
          fill
          className="object-cover z-[-10]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/news.jpg";
          }}
        />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[335px] opacity-100 z-10">
        <div className="relative w-[335px] h-[344.5px] flex items-center justify-center">
          <Image 
            src="/lionsshield.webp"
            alt="Lion Shield"
            fill
            className="object-contain"
          />
          
          {/* NEWS text positioned over the shield */}
          {/* NEWS text positioned over the shield */}
          
          <h1 className="absolute text-4xl md:text-6xl lg:text-7xl text-white hidden md:block font-bold font-['poppins'] tracking-wider z-20">
            NEWS
          </h1>
        </div>
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#06101B]"></div>
        {/* Text Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 text-center z-[10]">
          <h2 className="text-2xl md:text-4xl font-semibold md:text-[32px]  font-['poppins'] text-white mb-2">
            {displayFeatured.title}
          </h2>
          <p className="text-white opacity-60 mb-4 max-w-3xl text-[16px] font-['poppins'] mx-auto">
            {ExcerptFromContent}
          </p>
            <Link
            href={`/news/${displayFeatured.slug }`}
className="hover:bg-amber-500 text-white underline decoration-amber-500 underline-offset-4 decoration-2 text-xl font-bold text-[15px] font-['Poppins'] px-6 py-2 rounded-lg transition-colors inline-block"            >
            READ MORE
            </Link>
        </div>
      </div>
    </div>
  );
}

export default MergedFeaturedNews;