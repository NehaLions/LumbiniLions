"use client"
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { QuizCardProps } from '@/lib/types'
import { createFan } from '../actions/action'
import Leaderboard from './leaderboard'

const QuizCard: React.FC<QuizCardProps> = ({ questions, leaderboard = [] }) => {
  // Add browser detection to avoid SSR issues
  const [isBrowser, setIsBrowser] = useState(false);
  const [lastScore, setLastScore] = useState('0');
  
  // Add new state for cooldown
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownTime, setCooldownTime] = useState<string | null>(null);
  
  // Your existing states
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Set browser flag on first render
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Check for cooldown on component mount - only run on client
  useEffect(() => {
    if (!isBrowser) return;
    
    // Check if there's an active cooldown
    const lastAttemptTime = localStorage.getItem('quizLastAttempt');
    const storedLastScore = localStorage.getItem('quizLastScore');
    
    if (storedLastScore) {
      setLastScore(storedLastScore);
    }
    
    if (lastAttemptTime) {
      const lastAttempt = parseInt(lastAttemptTime, 10);
      const now = Date.now();
      const timeDiff = now - lastAttempt;
      const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (timeDiff < cooldownPeriod) {
        // Cooldown still active
        setCooldownActive(true);
        
        // Calculate remaining time
        const remainingTime = cooldownPeriod - timeDiff;
        const hours = Math.floor(remainingTime / (60 * 60 * 1000));
        const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
        setCooldownTime(`${hours}h ${minutes}m`);
        
        // Set a timeout to re-check in a minute
        const interval = setInterval(() => {
          const newNow = Date.now();
          const newTimeDiff = newNow - lastAttempt;
          
          if (newTimeDiff >= cooldownPeriod) {
            // Cooldown expired
            setCooldownActive(false);
            setCooldownTime(null);
            clearInterval(interval);
          } else {
            // Update remaining time
            const newRemainingTime = cooldownPeriod - newTimeDiff;
            const newHours = Math.floor(newRemainingTime / (60 * 60 * 1000));
            const newMinutes = Math.floor((newRemainingTime % (60 * 60 * 1000)) / (60 * 1000));
            setCooldownTime(`${newHours}h ${newMinutes}m`);
          }
        }, 60000); // Update every minute
        
        return () => clearInterval(interval);
      }
    }
  }, [isBrowser]); // Only run when browser detection changes
  
  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Modified to ensure timer is cleared
  const completeQuiz = () => {
    setQuizCompleted(true);
    // Clear the timer when quiz is completed
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  // Modified startQuiz function
  const startQuiz = () => {
    setQuizStarted(true);
    // Start timer
    timerRef.current = setInterval(() => {
      setTime(prevTime => {
        if (prevTime >= 60) {
          // Time's up
          clearInterval(timerRef.current!);
          setQuizCompleted(true);
          return 0;
        }
        return prevTime + 1;
      });
    }, 1000);
  };

  // Format time as MM:SS (unchanged)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Modified form submission handler
  const handleSubmit = async (formData: FormData) => {
    // Save attempt time to localStorage
    localStorage.setItem('quizLastAttempt', Date.now().toString());
    localStorage.setItem('quizLastScore', score.toString());
    
    // Set cooldown active
    setCooldownActive(true);
    
    // Calculate initial cooldown time display
    setCooldownTime('23h 59m');
    
    // Submit the form
    await createFan(formData);
  };

  // Non-interactive component for when cooldown is active
  const CooldownMessage = () => (
    <div className="bg-neutral-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-10 text-center animate-fade-in">
      <div className="w-32 h-32 mx-auto mb-6 relative">
        <Image 
          src="/crickettrophy.webp" 
          alt="Cricket Trophy" 
          width={128}
          height={128}
          className="w-32 h-32 mx-auto object-contain opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-500/20 w-full h-full rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-red-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-['poppins'] text-white mb-4">
        Daily Limit Reached
      </h2>
      <p className="text-gray-300 text-base mb-4">
        You've already played the quiz today. 
      </p>
      <p className="text-amber-400 text-lg mb-8">
        Try again in <span className="font-bold">{cooldownTime}</span>
      </p>
      
      <div className="mb-6">
        <p className="text-gray-400 text-sm">
          Your last score: <span className="text-amber-500 font-bold">{lastScore}/{questions.length}</span>
        </p>
      </div>
      
      <Link href="/">
        <button className="px-5 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-base font-['poppins'] transition-transform hover:scale-105 cursor-pointer">
          BACK TO HOME
        </button>
      </Link>
    </div>
  );

  // Ensure questions array is not empty (unchanged)
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-900 pt-40 pb-16 px-4 flex justify-center items-center">
        <div className="bg-neutral-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-['poppins'] text-white mb-4">
            Quiz questions are loading...
          </h2>
          <p className="text-gray-300 text-base mb-8">
            Please try again in a moment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06101B] pt-10 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-['poppins'] text-amber-500 mb-6 text-center">
          <span className="text-amber-500">|</span> CRICKET QUIZ
        </h1>

        {/* Show cooldown message if active */}
        {cooldownActive ? (
          <CooldownMessage />
        ) : !quizStarted ? (
          // Quiz start screen
          <div className="bg-neutral-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-10 text-center animate-fade-in">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <Image 
                src="/crickettrophy.webp" 
                alt="Cricket Trophy" 
                width={128} 
                height={128}
                className="w-32 h-32 mx-auto object-contain"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-['poppins'] text-white mb-4">
              Test Your Cricket Knowledge!
            </h2>            <p className="text-gray-300 text-base mb-8">
              Answer {questions.length} questions about cricket and test your knowledge. You have 60 seconds to complete the quiz.
            </p>
            
            {/* Leaderboard preview */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-amber-500 mb-2">Leaderboard Top 3</h3>
              <Leaderboard leaderboard={leaderboard.slice(0, 3)} questionCount={questions.length} compact={true} />
            </div>
            
            <button 
              onClick={startQuiz}
              className="px-8 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black text-lg font-['poppins'] transition-transform hover:scale-105"
            >
              START QUIZ
            </button>
          </div>
        ) : !quizCompleted ? (
// Quiz questions
<div className="bg-neutral-800/80 backdrop-blur-sm rounded-lg shadow-lg p-5 md:p-7">
  {/* Timer */}
  <div className="flex justify-between items-center mb-6">
    <p className="text-white font-semibold">
      Question {currentQuestion + 1} of {questions.length}
    </p>    <p className={`font-mono font-bold ${time >= 50 ? 'text-red-500' : 'text-amber-500'}`}>
      {formatTime(time)}
    </p>
  </div>
  
  {/* Question */}
  <div className="mb-6">
    <h3 className="text-xl text-white font-semibold mb-4">
      {questions[currentQuestion].question}
    </h3>
    
    {/* Options */}
    <div className="space-y-3">
      {questions[currentQuestion].options.map((option, index) => (
        <button
          key={index}
          onClick={() => !answerChecked && setSelectedOption(index)}
          disabled={answerChecked}
          className={`w-full text-left p-4 rounded-lg transition-colors ${
            selectedOption === index
              ? answerChecked
                ? index === questions[currentQuestion].correctanswer
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
                : 'bg-amber-500 text-black'
              : answerChecked && index === questions[currentQuestion].correctanswer
              ? 'bg-green-600 text-white'
              : 'bg-neutral-700 text-white hover:bg-neutral-600'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
    {/* Answer explanation (shown after checking) */}
  {showAnswer && (
    <div className="mt-6 p-4 bg-neutral-700/50 rounded-lg">
      <div className="flex flex-col mb-4">
        <p className="text-white text-sm">{questions[currentQuestion].answertext}</p>
      </div>
    </div>
  )}
  
  {/* Navigation buttons */}
  <div className="flex justify-between mt-6">
    {answerChecked ? (
      <>
        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={() => {
              setCurrentQuestion(currentQuestion + 1);
              setSelectedOption(null);
              setAnswerChecked(false);
              setShowAnswer(false);
            }}
            className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black text-base font-medium transition-transform hover:scale-105"
          >
            Next Question
          </button>
        ) : (
          <button
            onClick={completeQuiz} // Use the new completeQuiz function
            className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black text-base font-medium transition-transform hover:scale-105"
          >
            Finish Quiz
          </button>
        )}
      </>
    ) : selectedOption !== null ? (
      <button
        onClick={() => {
          setAnswerChecked(true);
          setShowAnswer(true);
          if (selectedOption === questions[currentQuestion].correctanswer) {
            setScore(prevScore => prevScore + 1);
          }
        }}
        className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-base font-medium transition-transform hover:scale-105"
      >
        Check Answer
      </button>
    ) : (
      <div></div> // Empty placeholder to maintain flex layout
    )}
  </div>
</div>        ) : (
          // Quiz Results - modified to use the new submit handler
          <div className="bg-neutral-800/80 backdrop-blur-sm rounded-lg shadow-lg p-5 md:p-7 text-center animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-['poppins'] text-amber-500 mb-4">
              {time === 60 ? "TIME'S UP!" : "QUIZ COMPLETED!"}
            </h2>
            <p className="text-white text-lg mb-3">
              Your Score: {score} out of {questions.length}
            </p>
            <p className="text-white text-lg mb-6">
              {time === 60 && score < questions.length * 0.7 
                ? "You ran out of time! Try again tomorrow."
                : score === questions.length 
                  ? "Perfect! You're a cricket master!" 
                  : score >= questions.length * 0.7 
                    ? "Great job! You know your cricket well!"
                    : "Nice try! Keep learning about cricket!"}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
              <form action={handleSubmit} className="w-full max-w-md mx-auto mb-6 space-y-3">
                <div className="space-y-3">
                  <input 
                    name="name" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-2 bg-neutral-700 text-white placeholder-neutral-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <input 
                    name="phone" 
                    placeholder="Phone Number" 
                    className="w-full px-4 py-2 bg-neutral-700 text-white placeholder-neutral-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <input 
                    name="email" 
                    placeholder="Email Address" 
                    type="email"
                    className="w-full px-4 py-2 bg-neutral-700 text-white placeholder-neutral-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  
                  {/* Score field - read-only with actual score */}
                  <div className="flex items-center w-full px-4 py-2 bg-neutral-700 text-white rounded-lg border border-amber-500/30">
                    <span className="text-amber-400 mr-2">Your Score:</span>
                    <span className="font-bold">{score} / {questions.length}</span>
                    <input 
                      name="score" 
                      type="hidden"
                      value={score}
                      readOnly
                    />
                  </div>
                  
                  {/* Time taken - hidden input */}
                  <div className="flex items-center w-full px-4 py-2 bg-neutral-700 text-white rounded-lg border border-amber-500/30">
                    <span className="text-amber-400 mr-2">Time Taken:</span>
                    <span className="font-bold">{formatTime(time)}</span>
                    <input 
                      name="time" 
                      type="hidden"
                      value={time}
                      readOnly
                    />
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="w-full px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black text-base font-['poppins'] transition-transform hover:scale-105"
                >
                  GET YOUR PREMIUM MERCHANDISE
                </button>
              </form>
            </div>
            
            {/* Note that "Try Again" is removed since we're limiting to one attempt per day */}
            <div className="text-amber-400 text-sm mb-4">
              <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              You can attempt the quiz once per day
            </div>
            
            <Link href="/">
              <button className="px-5 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-base font-['poppins'] transition-transform hover:scale-105">
                BACK TO HOME
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;