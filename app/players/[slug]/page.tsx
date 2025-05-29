import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { EmblaPlayerCarousel } from "@/app/components/EmblaPlayerCarousel";

export const metadata = {
  title: "Player Profile | Lumbini Lions",
  description:
    "Player profile and statistics for Lumbini Lions cricket team member",
};
export default async function PlayerDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  try {
    const player = await prisma.lions.findUnique({
      where: { slug },
    });

    if (!player) {
      notFound();
    }

    // Split the name for display purposes
    const nameParts = player.name.split(" ");
    const lastName = nameParts.pop() || "";
    const firstName = nameParts.join(" ");

    // Fix the image URL path - use imageId with the correct path
    const imageName = firstName.toLowerCase();
    const imgSrc = `/team/${imageName}card.webp`;

    return (
      <div>
        <div className="relative w-full min-h-screen overflow-hidden bg-[#06101B]">
          {/* Background images and overlays - lowest z-index */}
          <div className="absolute inset-0 z-[1]">
            {/* Base background */}
            <Image
              src="/headerbg2.webp"
              alt="Background image"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay Image */}
            <div className="absolute inset-0 z-[2]">
              <Image
                src="/rectangle151.webp"
                alt="Overlay"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative mt-[15vw] ml-[84vw] opacity-60 text-[100px] z-[3]">
              NPL
            </div>
          </div>

          {/* Trapezium Stat Bars - middle z-index (behind player, above background) */}
          <div className="absolute inset-0 z-[5] flex items-start justify-center mt-60">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center space-y-4">
                {/* First trapezium with mask effect */}
                <div className="relative w-full max-w-[75%] lg:max-w-[65%] h-16 md:h-20 lg:h-24">
                  {/* <div className="w-full h-full  mask-fade-center"> */}
                  {/* Trapezium shape */}
                  <div className="bg-amber-500 clip-roof w-full h-full shadow-lg"></div>
                  {/* </div> */}

                  {/* Content */}
                  <div className="absolute inset-0 flex items-center justify-between px-6 md:px-24 z-10">
                    <div className="text-start md:text-center">
                      <p className="text-2xl md:text-3xl font-bold text-black">
                        {player.matches || 0}
                      </p>
                      <p className="text-xs md:text-sm font-medium text-black/80 uppercase">
                        Matches
                      </p>
                    </div>
                    <div className="hidden md:block"> </div>
                    <div className="text-end md:text-center">
                      <p className="text-2xl md:text-3xl font-bold text-black">
                        {player.runs || 0}
                      </p>
                      <p className="text-xs md:text-sm font-medium text-black/80 uppercase">
                        Runs
                      </p>
                    </div>
                  </div>
                </div>

                {/* Second trapezium with mask effect */}
                <div className="relative w-full max-w-[85%] lg:max-w-[75%] h-16 md:h-20 lg:h-24">
                  {/* <div className="w-full h-full mask-fade-center"> */}
                  {/* Trapezium shape */}
                  <div className="bg-white clip-roof w-full h-full shadow-lg"></div>
                  {/* </div> */}

                  {/* Content */}
                  <div className="absolute inset-0 flex items-center justify-between px-6 md:px-24 z-10">
                    <div className="text-start md:text-center">
                      <p className="text-2xl md:text-3xl font-bold text-black">
                        {player.wickets || 0}
                      </p>
                      <p className="text-xs md:text-sm font-medium text-black/80 uppercase">
                        Wickets
                      </p>
                    </div>
                    <div className="text-end md:text-center">
                      <p className="text-2xl md:text-3xl font-bold text-black">
                        {player.strikerate || 0}
                      </p>
                      <p className="text-xs   md:text-sm font-medium text-black/80 uppercase">
                        Strike Rate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Player image - positioned above trapeziums */}
          <div className="absolute inset-0 z-[10]">
            <Image
              src={imgSrc}
              alt={player.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Content overlay - positioned above all */}
          <div className="container relative z-[20] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 h-full">
            <div className="flex flex-col h-full">
              {/* Player name and details */}
              <div className="lg:max-w-xl mb-auto">
                <div className="text-white font-['poppins'] tracking-wide">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold">
                    {firstName}
                  </h1>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold mt-2 lg:mt-4">
                    {lastName}
                  </h1>
                </div>

                <div className="mt-1 sm:mt-6">
                  <span className="text-white text-xl sm:text-3xl font-semibold font-['poppins'] tracking-wider uppercase">
                    {player.class}
                  </span>
                </div>

                {/* Social Icons */}
                {/* <div className="flex hidden md:block space-x-4 mt-6 y-5 sm:mt-10">
                  <a
                    href="#"
                    className="size-12 py-2 sm:size-8 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300"
                  >
                    <Instagram className="w-6 h-6 sm:w-8 sm:h-8" />
                  </a>
                  <a
                    href="#"
                    className="size-12 py-2 m:size-8 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300"
                  >
                    <Facebook className="w-6 h-6 sm:w-8 sm:h-8" />
                  </a>
                  <a
                    href="#"
                    className="sizeoy-2 -12 sm:size-8 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300"
                  >
                    <Twitter className="w-6 h-6 sm:w-8 sm:h-8" />
                  </a>
                </div> */}

                {/* Additional Information Section
                <div className="mt-16 bg-[#0F1923] p-6 rounded-lg border border-white/10 max-w-lg">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="text-amber-500 mr-3">About</span>
                    <div className="h-px flex-grow bg-white/10"></div>
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {player.description || 'Information coming soon.'}
                  </p>
                  
                  {/* Jersey Number */}
                {/* {player.jersey && (
                    <div className="mt-6">
                      <h3 className="font-semibold text-lg text-gray-300 mb-2">Jersey Number</h3>
                      <div className="bg-amber-500/10 rounded-xl p-3 text-center">
                        <span className="text-3xl font-bold text-amber-500">#{player.jersey}</span>
                      </div>
                    </div>
                  )}  */}

                {/* Additional Metadata */}
                {/* <div className="grid grid-cols-2 mt-6 gap-y-4 pt-6 border-t border-white/10">
                    {player.imageId && (
                      <div>
                        <span className="block text-gray-400 text-sm">Image ID</span>
                        <span>{player.imageId}</span>
                      </div>
                    )}
                    <div>
                      <span className="block text-gray-400 text-sm">Player Class</span>
                      <span>{player.class}</span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-sm">Profile URL</span>
                      <span className="text-amber-500">{slug}</span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-sm">Player ID</span>
                      <span>{player.id}</span>
                    </div>
                  </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="md:mt-0 z-[6]">
          <EmblaPlayerCarousel />
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
