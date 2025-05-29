import React from 'react';
import Image from 'next/image';
import { Trophy, Calendar, Award, TrendingUp, Target, Activity, Zap, Disc, Shield, Flag, Medal, Star } from 'lucide-react';
import { prisma } from '@/lib/db';
import MatchCard from '../components/resultcard';


const MatchesPage = async () => {
  // const tournamentlogo = [
  //   { position: 1, name: "Sudurpaschim Royals", points: 12, matches: 7, wins: 6, losses: 1, logo: "/logos/sudurpaschim.webp" },
  //   { position: 2, name: "Janakpur Bolts", points: 10, matches: 7, wins: 5, losses: 2, logo: "/logos/janakpur.webp" },
  //   { position: 3, name: "Chitwan Rhinos", points: 8, matches: 7, wins: 4, losses: 3, logo: "/logos/chitwan.webp" },
  //   { position: 4, name: "Karnali Yaks", points: 8, matches: 7, wins: 4, losses: 3, logo: "/logos/karnali.webp" },
  //   { position: 5, name: "Kathmandu Gurkhas", points: 8, matches: 7, wins: 4, losses: 3, logo: "/logos/kathmandu.webp" },
  //   { position: 6, name: "Biratnagar Kings", points: 4, matches: 7, wins: 2, losses: 5, logo: "/logos/biratnagar.webp" },
  //   { position: 7, name: "Pokhara Avengers", points: 4, matches: 7, wins: 2, losses: 5, logo: "/logos/pokhara.webp" },
  //   { position: 8, name: "Lumbini Lions", points: 2, matches: 7, wins: 1, losses: 6, logo: "/logos/lumbini.webp" }
  // ];
  let tournamentlogo = [];
  try {
    tournamentlogo = await prisma.team.findMany({
      orderBy: {
        pos: 'asc'
      }
    });
    
    tournamentlogo = tournamentlogo.map(team => {
      // Extract first word from team name and convert to lowercase
      const firstWord = team.name?.split(' ')[0]?.toLowerCase() || '';
      
      return {
        ...team,
        logo: `/logos/${firstWord}.webp`,
        position: team.pos // Ensure position field is available for display
      };
    });
    
  } catch(error) {
    console.error("Error getting league details", error)
  }


    let results: any[] = [];
    try {
       results = await prisma.schedule.findMany({
        orderBy: { matchDate: 'desc' },
        // take: 5,
        where: {
          // isCompleted: false
        }
      });
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    }
    

  return (
    <div className="min-h-screen relative">
      {/* Background layer with image and gradient - fixed position */}
      <div className="absolute inset-0 z-[1] h-[595px] w-full">
      <Image
        src="/headerbg2.webp"
        alt="Background image"
        fill
        className="object-cover"
        priority
      />
                          {/* Text Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center z-[10]">
                                  {/* Lion Shield positioned behind text */}
                                  <div className="absolute w-[335px] h-[344.5px] opacity-100">
                                      <Image 
                                          src="/lionsshield.webp"
                                          alt="Lion Shield"
                                          fill
                                          className="object-contain"
                                      />
                                  </div>
                              <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold font-['poppins'] tracking-wider">
                                  Matches
                              </h1>
                          </div>
      <div 
        className="absolute inset-0"
        style={{
        background: `linear-gradient(to bottom, 
          rgba(6, 16, 27, 0) 0%, 
          rgba(6, 16, 27, 0.43) 18%, 
          rgba(6, 16, 27, 0.73) 45%, 
          rgba(6, 16, 27, 0.90) 75%, 
          rgba(6, 16, 27, 1) 100%)`,
        backdropFilter: 'blur(2px)'
        }}
      ></div>
      </div>

      {/* Content starts here - with proper padding from top */}
      <div className="relative z-10 pt-[595px]"></div>

        <div className="bg-gradient-to-b from-[#06101B]/90 to-[#0A192F] text-white min-h-screen py-12">
          {/* Tournament Header */}
          <div className="relative overflow-hidden mb-16">
            <div className="absolute inset-0 bg-amber-500/10 blur-3xl z-0"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between">
                {/* Tournament header content */}
                <div className="mb-6 md:mb-0">
                  <div className="flex items-center">
                    <Trophy className="w-10 h-10 text-amber-500 mr-4" />
                    <div>
                      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">NPL</h1>
                      <p className="text-2xl font-bold text-white/80">2024</p>
                    </div>
                  </div>
                </div>
                <div className="relative h-28 w-28 md:h-32 md:w-32">
                  <Image 
                    src="/logos/lumbini.webp" 
                    alt="Lumbini Lions Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

      <main className="max-w-7xl mx-auto px-4 space-y-12">
              {/* Recent Results */}

                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Calendar className="w-6 h-6 text-amber-500 mr-2" />
                  Matches
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.length > 0 ? (
                    results.map((result) => (
                    <div 
                      key={result.id} 
                      className="w-full overflow-hidden"
                      style={{ borderRadius: '0.75rem' }} // More specific rounded corners styling
                    >
                        <MatchCard match={result} />
                </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-6 bg-[#0F1923]/80 backdrop-blur-md rounded-xl border border-amber-500/30">
                      <p className="text-gray-400">No recent match data available</p>
                    </div>
                  )}
                </div>

        {/* Team Summary */}
        <section className="bg-[#0F1923]/80 backdrop-blur-md rounded-xl border border-amber-500/30 overflow-hidden shadow-lg shadow-amber-500/5">
          <div className="p-4 md:p-6 border-b border-amber-500/20">
            <h2 className="text-2xl font-bold flex items-center">
              <Target className="w-6 h-6 text-amber-500 mr-2" />
              Lumbini Lions Summary
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Matches</p>
              <p className="text-3xl font-bold">7</p>
            </div>
            
            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Wins</p>
              <p className="text-3xl font-bold">1</p>
            </div>
            
            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <Activity className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Losses</p>
              <p className="text-3xl font-bold">6</p>
            </div>
            
            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <Award className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Points</p>
              <p className="text-3xl font-bold">2</p>
            </div>
            
            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Net Run Rate</p>
              <p className="text-3xl font-bold">-0.50</p>
            </div>
            
            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <Zap className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Runs Scored</p>
              <p className="text-3xl font-bold">1,013</p>
            </div>
            
            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <Shield className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Runs Conceded</p>
              <p className="text-3xl font-bold">1,057</p>
            </div>

            <div className="bg-[#1A2A3A] rounded-lg p-4 flex flex-col items-center justify-center">
              <Flag className="w-5 h-5 text-amber-500 mb-1" />
              <p className="text-gray-400 text-sm uppercase">Status</p>
              <p className="text-xl font-bold text-amber-500">Eliminated</p>
            </div>
          </div>
        </section>

{/* League Table */}
{/* <section className="bg-[#0F1923]/80 backdrop-blur-md rounded-xl border border-amber-500/30 overflow-hidden shadow-lg shadow-amber-500/5">
  <div className="p-4 md:p-6 border-b border-amber-500/20">
    <h2 className="text-2xl font-bold flex items-center">
      <Medal className="w-6 h-6 text-amber-500 mr-2" />
      League Table
    </h2>
  </div>
  
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-[#1A2A3A]">
          <th className="p-3 text-left text-gray-400 font-medium">Pos</th>
          <th className="p-3 text-left text-gray-400 font-medium">Team</th>
          <th className="p-3 text-center text-gray-400 font-medium">PLD</th>
          <th className="p-3 text-center text-gray-400 font-medium">W</th>
          <th className="p-3 text-center text-gray-400 font-medium">L</th>
          <th className="p-3 text-center text-gray-400 font-medium">NR</th>
          <th className="p-3 text-center text-gray-400 font-medium">Pts</th>
        </tr>
      </thead>
      <tbody>
        {tournamentlogo.map((team) => (
          <tr 
            key={team.name}
            className={`border-b border-amber-500/10 hover:bg-[#1A2A3A]/50 ${
              team.name === "Lumbini Lions" ? "bg-amber-500/10" : ""
            }`}
          >
            <td className="p-3">{team.pos}</td>
            <td className="p-3">
              <div className="flex items-center">
                <div className="relative h-8 w-8 mr-3">
                  <Image 
                    src={team.logo} 
                    alt={`${team.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className={team.name === "Lumbini Lions" ? "font-bold text-amber-500" : ""}>
                  {team.name}
                </span>
              </div>
            </td>
            <td className="p-3 text-center">{team.played}</td>
            <td className="p-3 text-center">{team.won}</td>
            <td className="p-3 text-center">{team.lost}</td>
            <td className="p-3 text-center">{team.nr}</td>
            <td className="p-3 text-center font-bold">{team.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section> */}

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Batsmen */}
          <section className="bg-[#0F1923]/80 backdrop-blur-md rounded-xl p-6 border border-amber-500/30 shadow-lg shadow-amber-500/5">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-amber-500">
              <Star className="w-5 h-5 mr-2" />
              Top Batsmen
            </h2>
            <ul className="space-y-4">
              <li className="pb-3 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">                     
                     <Image
                      src="/team/rohitcard.webp"
                      alt='Rohit'
                      height={50}
                      width={50}
                      />
                    <strong>Rohit Paudel</strong>
                  </div>
                  <span className="bg-amber-500/20 text-amber-500 text-sm px-2 py-1 rounded-full">SR: 132.60</span>
                </div>
                <div className="mt-2 text-amber-400 text-lg font-medium">279 runs</div>
              </li>
              <li className="pb-3 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                  <Image
                      src="/team/tomcard.webp"
                      alt='Tom'
                      height={50}
                      width={50}
                      />
                    <strong>Tom Moores</strong>
                  </div>
                  <span className="bg-amber-500/20 text-amber-500 text-sm px-2 py-1 rounded-full">SR: 136.66</span>
                </div>
                <div className="mt-2 text-amber-400 text-lg font-medium">123 runs</div>
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                  <Image
                      src="/team/bibekcard.webp"
                      alt='Bibek'
                      height={50}
                      width={50}
                      />
                    <strong>Bibek Yadav</strong>
                  </div>
                  <span className="bg-amber-500/20 text-amber-500 text-sm px-2 py-1 rounded-full">SR: 153.12</span>
                </div>
                <div className="mt-2 text-amber-400 text-lg font-medium">83 runs</div>
              </li>
            </ul>
          </section>

          {/* Top Bowler */}
          <section className="bg-[#0F1923]/80 backdrop-blur-md rounded-xl p-6 border border-amber-500/30 shadow-lg shadow-amber-500/5">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-amber-500">
              <Disc className="w-5 h-5 mr-2" />
              Top Bowler
            </h2>
            <div className="text-center">
                <div className="inline-block h-36 w-55 mb-4 relative">
                <div className="absolute scale:1.2 inset-0 flex items-center justify-center text-2xl font-bold text-amber-500">
                <Image
                      src="/team/saadcard.webp"
                      alt='Saad'
                      height={200}
                      width={200}
                      
                      /> 
                  </div>
              </div>
              <div className="text-2xl font-bold mb-4">Saad Bin Zafar</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1A2A3A] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-500">9</div>
                  <div className="text-xs text-gray-400 uppercase mt-1">Wickets</div>
                </div>
                <div className="bg-[#1A2A3A] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-500">6.5</div>
                  <div className="text-xs text-gray-400 uppercase mt-1">Economy</div>
                </div>
              </div>
            </div>
          </section>

          {/* Boundary Stats */}
          <section className="bg-[#0F1923]/80 backdrop-blur-md rounded-xl p-6 border border-amber-500/30 shadow-lg shadow-amber-500/5">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-amber-500">
              <Zap className="w-5 h-5 mr-2" />
              Boundary Stats
            </h2>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-6">Total Boundary Runs: 624</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1A2A3A] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-500">84</div>
                  <div className="text-xs text-gray-400 uppercase mt-1">Fours</div>
                </div>
                <div className="bg-[#1A2A3A] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-500">48</div>
                  <div className="text-xs text-gray-400 uppercase mt-1">Sixes</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
    </div>

  );
};

export default MatchesPage;