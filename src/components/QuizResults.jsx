import React, { useState, useEffect } from "react";
import { Trophy, Star, Gift, RotateCcw, Sparkles } from "lucide-react";

// Mock API function implementation
const mockQuizCompletionAPI = (correctAnswers, totalQuestions) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const percentage = (correctAnswers / totalQuestions) * 100;
      let bonusPoints = 0;
      let completionMessage = "";

      if (percentage === 100) {
        bonusPoints = 100;
        completionMessage = "Perfect! You got all questions right!";
      } else if (percentage >= 80) {
        bonusPoints = 50;
        completionMessage = "Excellent work! You're a quiz master!";
      } else if (percentage >= 60) {
        bonusPoints = 25;
        completionMessage = "Good job! You passed with flying colors!";
      } else if (percentage >= 40) {
        completionMessage = "Not bad! Keep practicing to improve!";
      } else {
        completionMessage = "Keep trying! You'll do better next time!";
      }

      resolve({
        pointsEarned: correctAnswers * 50 + bonusPoints,
        bonusPoints: bonusPoints,
        correctAnswers: correctAnswers,
        totalQuestions: totalQuestions,
        completionMessage: completionMessage,
      });
    }, 1000);
  });
};

const QuizResults = ({ questions, answers, onRestart }) => {
  const [completionData, setCompletionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animatePoints, setAnimatePoints] = useState(false);

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question && question.correctAnswer) {
        if (Array.isArray(question.correctAnswer)) {
          const userAnswer = Array.isArray(answer.answer)
            ? answer.answer.sort()
            : [];
          const correctAnswer = question.correctAnswer.sort();
          if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
            correct++;
          }
        } else {
          if (
            typeof answer.answer === "string" &&
            answer.answer.toLowerCase().trim() ===
              question.correctAnswer.toLowerCase().trim()
          ) {
            correct++;
          }
        }
      }
    });
    return correct;
  };

  useEffect(() => {
    const fetchCompletionData = async () => {
      const correctAnswers = calculateScore();
      try {
        const data = await mockQuizCompletionAPI(
          correctAnswers,
          questions.length
        );
        setCompletionData(data);
        setLoading(false);
        // Trigger points animation after a short delay
        setTimeout(() => setAnimatePoints(true), 500);
      } catch (error) {
        console.error("Failed to fetch completion data:", error);
        setLoading(false);
      }
    };

    fetchCompletionData();
  }, [questions.length, answers]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 text-center">
        <div className="mb-8">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Calculating your results...</p>
        </div>
      </div>
    );
  }

  if (!completionData) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 text-center">
        <p className="text-xl text-red-600">
          Failed to load results. Please try again.
        </p>
        <button
          onClick={onRestart}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const {
    pointsEarned,
    bonusPoints,
    correctAnswers,
    totalQuestions,
    completionMessage,
  } = completionData;
  const percentage = (correctAnswers / totalQuestions) * 100;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-2xl p-8 border border-purple-100 text-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-blue-200 rounded-full opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10">
        {/* Congratulations Header */}
        <div className="mb-8">
          <div className="flex justify-center items-center mb-4">
            <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />
            <Sparkles className="w-8 h-8 text-purple-500 ml-2 animate-pulse" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Congratulations! 🎉
          </h2>
          <p className="text-xl text-gray-700 font-medium">
            {completionMessage}
          </p>
        </div>

        {/* Points Display */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200 mb-6">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-yellow-500 mr-2" />
              <h3 className="text-2xl font-bold text-gray-800">
                Points Earned
              </h3>
            </div>

            <div
              className={`text-6xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-4 transition-all duration-1000 ${
                animatePoints ? "scale-110" : "scale-100"
              }`}
            >
              {pointsEarned}
            </div>

            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between items-center">
                <span>Base Points ({correctAnswers} × 50):</span>
                <span className="font-semibold">{correctAnswers * 50}</span>
              </div>
              {bonusPoints > 0 && (
                <div className="flex justify-between items-center text-green-600">
                  <span className="flex items-center">
                    <Gift className="w-4 h-4 mr-1" />
                    Bonus Points:
                  </span>
                  <span className="font-semibold">+{bonusPoints}</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="flex justify-between items-center text-lg font-bold text-purple-600">
                <span>Total Points:</span>
                <span>{pointsEarned}</span>
              </div>
            </div>
          </div>

          {/* Score Summary */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Quiz Summary
            </h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">
                  {correctAnswers}
                </div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">
                  {totalQuestions - correctAnswers}
                </div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
            </div>
            <div className="mt-4 bg-blue-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600">
                {percentage.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onRestart}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <RotateCcw className="w-6 h-6 mr-3" />
          Take Quiz Again
        </button>

        {/* Achievement Badge */}
        {percentage === 100 && (
          <div className="mt-6 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm animate-pulse">
            🏆 PERFECT SCORE ACHIEVEMENT UNLOCKED! 🏆
          </div>
        )}
        {percentage >= 80 && percentage < 100 && (
          <div className="mt-6 inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full font-bold text-sm animate-pulse">
            ⭐ EXCELLENT PERFORMANCE! ⭐
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizResults;
