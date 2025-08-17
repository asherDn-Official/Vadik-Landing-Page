/** @format */

import React, { useState, useEffect } from "react";
import { Trophy, Star, RotateCcw, Sparkles } from "lucide-react";

const QuizResults = ({
  questions,
  answers,
  onRestart,
  quizId,
  customerId,
  showLoyaltyOnly = false,
  quizSubmissionData,
}) => {
  const [animatePoints, setAnimatePoints] = useState(false);

  useEffect(() => {
    // Trigger points animation after a short delay
    setTimeout(() => setAnimatePoints(true), 500);
  }, []);

  if (!quizSubmissionData) {
    return (
      <div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100 text-center'>
        <p className='text-xl text-red-600'>
          Failed to load results. Please try again.
        </p>
        <button
          onClick={onRestart}
          className='mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const { loyaltyPointsEarned, message } = quizSubmissionData;

  return (
    <div className='bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-2xl p-8 border border-purple-100 text-center relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute -top-4 -left-4 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-pulse'></div>
        <div className='absolute -top-8 -right-8 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000'></div>
        <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500'></div>
        <div className='absolute -bottom-4 -right-4 w-28 h-28 bg-blue-200 rounded-full opacity-20 animate-pulse delay-700'></div>
      </div>

      <div className='relative z-10'>
        <div className='mb-8'>
          <div className='flex justify-center items-center mb-4'>
            <Trophy className='w-10 h-10 text-yellow-500 animate-bounce' />
          </div>
          <h2 className='text-xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
            Loyalty Points Earned! 🎉
          </h2>
          <p className='text-sm sm:text-md text-gray-700 font-medium'>
            {message}
          </p>
        </div>

        <div className='mb-8'>
          <div className='bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200 mb-6'>
            <div className='flex items-center justify-center mb-4'>
              <Star className='w-5 h-5 text-yellow-500 mr-2' />
              <h3 className='text-xl font-bold text-gray-800'>
                Loyalty Points Earned
              </h3>
            </div>

            <div
              className={`text-6xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-4 transition-all duration-1000 ${
                animatePoints ? "scale-110" : "scale-100"
              }`}
            >
              {loyaltyPointsEarned}
            </div>

            <div className='text-gray-600 text-lg'>
              <p className='font-semibold text-purple-600'>
                Thank you for completing the quiz!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
