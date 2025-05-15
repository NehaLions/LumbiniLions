// export const dynamic = 'force-dynamic';
import React from 'react'
import QuizCard from '../components/quizcard'
import { prisma } from '@/lib/db'  // Use the singleton import
import { QuizQuestion } from '@/lib/types';

const QuizPage = async () => {
    const leaderboard = await prisma.fan.findMany({
            orderBy: {
                score: 'desc',
            },
            take: 5,
        });
  let quizQuestions: QuizQuestion[] = [];
  
  // Define fallback data - putting this at the beginning so we have it no matter what
  const fallbackQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which country won the ICC Men's Cricket World Cup 2023?",
      options: ["India", "Australia", "England", "New Zealand"],
      correctanswer: 1,
      answerimage: "qa1.webp", 
      answertext: "Australia defeated India in the final to win their 6th World Cup title, making them the most successful team in World Cup history."
    },
    // ... include all your other fallback questions
  ];
  
  try {
    

    const dbQuestions = await prisma.quizzy.findMany();

    const shuffledQuestions = dbQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
    
    if (dbQuestions && dbQuestions.length > 0) {
      // No mapping needed if your schema and component both use lowercase
      quizQuestions = shuffledQuestions;
    } else {
      quizQuestions = fallbackQuestions;
    }
  } catch (error) {
    quizQuestions = fallbackQuestions;
  }
  //for redeploy change1
  
  return (
    <QuizCard questions={quizQuestions} leaderboard = {leaderboard} />
  );
};

export default QuizPage;