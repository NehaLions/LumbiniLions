"use client"
import { useState, useRef, useEffect } from 'react';


const LionPlayersContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch players from API
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players');
        if (!response.ok) {
          throw new Error('Failed to fetch players');
        }
        const data = await response.json();
        setPlayers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlayers();
  }, []);
  
  // Handle the next/prev button clicks from the parent
  useEffect(() => {
    const handlePrev = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        scrollContainer('left');
      }
    };
    
    const handleNext = () => {
      if (currentIndex < players.length - 1) {
        setCurrentIndex(currentIndex + 1);
        scrollContainer('right');
      }
    };
    
    // Get the button elements
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    
    // Add event listeners
    if (prevButton) prevButton.addEventListener('click', handlePrev);
    if (nextButton) nextButton.addEventListener('click', handleNext);
    
    // Clean up
    return () => {
      if (prevButton) prevButton.removeEventListener('click', handlePrev);
      if (nextButton) nextButton.removeEventListener('click', handleNext);
    };
  }, [currentIndex, players.length]);
  
  // Function to scroll the container
  const scrollContainer = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -300 : 300;
      
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  // Display loading or error states
  if (loading) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="animate-pulse h-10 w-10 bg-amber-500 rounded-full"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full h-80 flex items-center justify-center text-red-500">
        Error loading players data. Please try again later.
      </div>
    );
  }
  
  // Format player data to match your PlayerCard component props
  const formattedPlayers = players.map(player => ({
    id: player.id,
    name: `${player.firstName} ${player.lastName}`.trim(),
    class: player.class || 'Player',
    slug: player.slug || player.id,
    description: '',
    matches: 0,
    // Add any needed defaults
    imageUrl: player.imageId ? `/${player.imageId}.webp` : '/default-player.webp'
  }));
  
  return (
    <div className="w-full max-w-6xl mt-10 mx-auto px-4">
      {/* Debug info - remove in production */}
      {/* {process.env.NODE_ENV !== 'production' && (
        <div className="mb-4 p-2 bg-gray-800 text-white text-xs rounded overflow-hidden" style={{ maxHeight: '100px', overflowY: 'auto' }}>
          <p>Current Index: {currentIndex}</p>
          <p>Total Players: {formattedPlayers.length}</p>
          <p>First player image: {formattedPlayers[0]?.imageUrl}</p>
        </div>
      )} */}

      {/* Simple scrollable container
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-4 mt-2 gap-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {formattedPlayers.map((player, index) => (
          <div key={player.id} className="flex-none h-[400px] w-[300px]">
            <PlayerCard player={player} />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default LionPlayersContent;