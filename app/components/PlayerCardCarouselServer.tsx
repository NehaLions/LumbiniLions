import { prisma } from "@/lib/db";
import PlayerCardCarousel from "./PlayerCardCarousel";

// Revalidate every 6 hours (21600 seconds)
export const revalidate = 21600;

export default async function PlayerCardCarouselServer() {
  // Fetch player data on the server
  const players = await prisma.lions.findMany();

  return <PlayerCardCarousel players={players} />;
}