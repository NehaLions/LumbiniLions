import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#06101B] text-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image 
          src="/news3.jpg" 
          alt="Lumbini Lions Team" 
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06101B] to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-['Bebas_Neue'] tracking-wider text-center drop-shadow-lg">
            ABOUT <span className="text-amber-500">LUMBINI LIONS</span>
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-amber-500">Our Story</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Founded in 2020, Lumbini Lions emerged as a formidable cricket franchise with a commitment to excellence and a passion for the sport. 
              Named after the birthplace of Lord Buddha, our team embodies the values of peace, focus, and disciplined competition.
            </p>
            <p className="text-gray-300 leading-relaxed">
              From humble beginnings, we've grown to become one of the most recognized teams in the league, drawing talent from across the region and building a loyal fanbase that roars with us through every match.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-amber-500">Our Vision</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              To build a competitive, entertaining, and inspiring cricket team that contributes to the growth of the sport in Nepal, while fostering a deep connection with our fans and community.             </p>
            <p className="text-gray-300 leading-relaxed">
              To become a powerhouse in Nepali cricket, both on and off the field, by promoting sportsmanship, developing emerging talent, and creating unforgettable cricket experiences. 
            </p>
          </div>
        </div>

        {/* Team Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-amber-500 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Excellence",
                icon: "🏆",
                description: "We pursue excellence in every aspect of our game, from training to performance on the field."
              },
              {
                title: "Unity",
                icon: "🤝",
                description: "As a pride of lions, we stand together, supporting each other to achieve our collective goals."
              },
              {
                title: "Respect",
                icon: "🙏",
                description: "We honor the game, our opponents, our fans, and ourselves through respectful conduct at all times."
              }
            ].map((value, index) => (
              <div key={index} className="bg-[#0F1923] p-6 rounded-lg border-l-4 border-amber-500">
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Achievements */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-amber-500 text-center">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0F1923] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 border-b border-amber-500 pb-2">Tournament Success</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Runners-up in the 2022 National T20 Championship</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Semi-finalists in the 2023 Premier League</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Champions of the Regional Cup 2021</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#0F1923] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 border-b border-amber-500 pb-2">Player Achievements</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Three players selected for the national team</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Best Bowling Attack award in 2023</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Highest team run total in a single match (236 runs)</span>
                </li>
              </ul>
            </div>
          </div>
        </div> */}

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Join the <span className="text-amber-500">Pride</span></h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're a fan, sponsor, or aspiring cricketer, there's a place for you in the Lumbini Lions family. Connect with us and be part of our journey.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/contact" className="bg-amber-500 hover:bg-amber-600 text-[#06101B] px-6 py-3 rounded-lg font-bold transition-colors">
              Contact Us
            </a>
            {/* <a href="/fixtures" className="bg-[#0F1923] hover:bg-[#1a2736] text-white px-6 py-3 rounded-lg font-bold transition-colors">
              Upcoming Matches
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}