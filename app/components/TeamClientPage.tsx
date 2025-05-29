"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import PlayerCard from './PlayerCard';

const TeamClientPage = ({ initialPlayers }) => {
    // Process player names when initializing state
    const processPlayers = (playersData) => {
        if (!playersData) return [];
        
        return playersData.map(player => {
            // Split the name into first and last name
            const nameParts = player.name.split(' ');
            const lastName = nameParts.pop() || ''; // Last word as last name
            const firstName = nameParts.join(' '); // Rest as first name
            
            return {
                ...player,
                firstName: firstName,
                lastName: lastName
            };
        });
    };

    const [players, setPlayers] = useState(processPlayers(initialPlayers) || []);
    const [filteredData, setFilteredData] = useState(processPlayers(initialPlayers) || []);
    const [searchItem, setSearchItem] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if(searchItem===null) {
            setFilteredData(players)
        } else {
            setFilteredData(players.filter(player => 
                player.class === searchItem));
        }
    }, [searchItem, players]);

    if(loading){
        return <div>loading...</div>
    }
    if (error) {
        return <div>Error loading players</div>;
    }

    return(
        <div className="overflow-x-hidden w-full"> 
            {/* Header with background, overlay, and text */}
            <div className="w-full relative">
                {/* Background Image */}
                <div className="w-full h-[300px] md:h-[595px] relative">
                    <Image 
                        src="/headerbg2.webp"
                        alt="Header Background"
                        fill
                        className="object-cover"
                    />

                    
                    {/* Overlay Image */}
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
                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
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
                            OUR LIONS
                        </h1>
                    </div>
                </div>
            </div>

            {/* Center filter buttons with new styling */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-12">
                <div className='text-white font-bold text-[20px] font-[poppins] flex flex-wrap gap-6 mb-12 justify-center'>
                    <button 
                        onClick={() => setSearchItem(null)}
                        className={`px-2 py-1 transition-all duration-300 cursor-pointer ${
                            searchItem === null 
                            ? 'text-white border-b-2 border-amber-500' 
                            : 'text-white/60 hover:text-white'
                        }`}
                    >
                        ALL PLAYERS
                    </button>
                    <button 
                        onClick={() => setSearchItem("AllRounder")}
                        className={`px-2 py-1 transition-all duration-300 cursor-pointer ${
                            searchItem === "AllRounder" 
                            ? 'text-white border-b-2 border-amber-500' 
                            : 'text-white/60 hover:text-white'
                        }`}
                    >
                        ALL ROUNDERS
                    </button>
                    <button 
                        onClick={() => setSearchItem("Batsman")}
                        className={`px-2 py-1 transition-all duration-300 cursor-pointer ${
                            searchItem === "Batsman" 
                            ? 'text-white border-b-2 border-amber-500' 
                            : 'text-white/60 hover:text-white'
                        }`}
                    >
                        BATTERS
                    </button>
                    <button 
                        onClick={() => setSearchItem("Bowler")}
                        className={`px-2 py-1 transition-all duration-300 cursor-pointer ${
                            searchItem === "Bowler" 
                            ? 'text-white border-b-2 border-amber-500' 
                            : 'text-white/60 hover:text-white'
                        }`}
                    >
                        BOWLERS
                    </button>
                    <button 
                        onClick={() => setSearchItem("WicketKeeper")}
                        className={`px-2 py-1 transition-all duration-300 cursor-pointer ${
                            searchItem === "WicketKeeper" 
                            ? 'text-white border-b-2 border-amber-500' 
                            : 'text-white/60 hover:text-white'
                        }`}
                    >
                        WICKET KEEPERS
                    </button>
                </div>
                
                {/* Player grid with even spacing */}

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-10 md:gap-y-12">
                {filteredData.map((player, index) => (
                    <div 
                        key={player?.id ? `${player.id}-${index}` : `empty-${index}`} 
                        className="flex flex-col items-center"
                    >
                        {/* Card container with controlled dimensions */}
                        <div className="w-[270px] mb-3">
                            {player && <PlayerCard player={player} />}
                        </div>
                        
                        {/* Name container aligned with card */}
                        <div className="w-[270px] text-left pl-4 mt-5">
                            <h3 className="flex flex-col font-['poppins'] tracking-wide">
                                <span className="text-amber-500 text-[14px] font-semibold leading-tight">
                                    {player.lastName || ''}
                                </span>
                                <span className="text-white text-[24px] font-semibold -mt-1">
                                    {player.firstName || ''}
                                </span>
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    )
}


export default TeamClientPage;