import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import QuizResults from "../components/QuizResults";

// Mock quiz data implementation
const mockQuizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    category: "Geography",
    type: "multiple-choice",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question:
      "Which of these are programming languages? (Select all that apply)",
    category: "Technology",
    type: "multiple-select",
    options: ["HTML", "Python", "CSS", "JavaScript"],
    correctAnswer: ["Python", "JavaScript"],
  },
  {
    id: 3,
    question: "What is the largest planet in our solar system?",
    category: "Science",
    type: "multiple-choice",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter",
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    category: "Art",
    type: "multiple-choice",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    id: 5,
    question:
      "Which of these elements are noble gases? (Select all that apply)",
    category: "Science",
    type: "multiple-select",
    options: ["Helium", "Oxygen", "Neon", "Carbon"],
    correctAnswer: ["Helium", "Neon"],
  },
  {
    id: 6,
    question: "In which year did World War II end?",
    category: "History",
    type: "text-input",
    correctAnswer: "1945",
  },
  {
    id: 7,
    question: "The chemical symbol for gold is:",
    category: "Science",
    type: "multiple-choice",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
  },
  {
    id: 8,
    question:
      "Which of these countries are in South America? (Select all that apply)",
    category: "Geography",
    type: "multiple-select",
    options: ["Mexico", "Brazil", "Spain", "Argentina"],
    correctAnswer: ["Brazil", "Argentina"],
  },
  {
    id: 9,
    question: "Who wrote 'Romeo and Juliet'?",
    category: "Literature",
    type: "multiple-choice",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    correctAnswer: "William Shakespeare",
  },
  {
    id: 10,
    question: "What is the main component of the Sun?",
    category: "Science",
    type: "multiple-choice",
    options: ["Liquid lava", "Hydrogen", "Oxygen", "Carbon dioxide"],
    correctAnswer: "Hydrogen",
  },
  {
    id: 11,
    question: "Which of these animals are mammals? (Select all that apply)",
    category: "Science",
    type: "multiple-select",
    options: ["Dolphin", "Shark", "Eagle", "Bat"],
    correctAnswer: ["Dolphin", "Bat"],
  },
  {
    id: 12,
    question: "The Great Wall of China is located in which country?",
    category: "Geography",
    type: "true-false",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: 13,
    question: "What is the capital of Japan?",
    category: "Geography",
    type: "text-input",
    correctAnswer: "Tokyo",
  },
  {
    id: 14,
    question: "Which planet is known as the Red Planet?",
    category: "Science",
    type: "multiple-choice",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    id: 15,
    question: "Who was the first president of the United States?",
    category: "History",
    type: "multiple-choice",
    options: [
      "Thomas Jefferson",
      "Abraham Lincoln",
      "George Washington",
      "John Adams",
    ],
    correctAnswer: "George Washington",
  },
];

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    answers: [],
    isCompleted: false,
  });
  const [loading, setLoading] = useState(true);

  // Simulate API call to fetch quiz data
  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setQuestions(mockQuizData);
      setLoading(false);
    };

    fetchQuizData();
  }, []);

  const getCurrentAnswer = () => {
    const currentQuestionId = questions[quizState.currentQuestion]?.id;
    const existingAnswer = quizState.answers.find(
      (a) => a.questionId === currentQuestionId
    );
    return existingAnswer
      ? existingAnswer.answer
      : questions[quizState.currentQuestion]?.type === "multiple-select"
      ? []
      : "";
  };

  const handleAnswerChange = (answer) => {
    const currentQuestionId = questions[quizState.currentQuestion].id;
    const updatedAnswers = [...quizState.answers];
    const existingIndex = updatedAnswers.findIndex(
      (a) => a.questionId === currentQuestionId
    );

    if (existingIndex >= 0) {
      updatedAnswers[existingIndex] = { questionId: currentQuestionId, answer };
    } else {
      updatedAnswers.push({ questionId: currentQuestionId, answer });
    }

    setQuizState((prev) => ({
      ...prev,
      answers: updatedAnswers,
    }));
  };

  const goToNextQuestion = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    } else {
      setQuizState((prev) => ({
        ...prev,
        isCompleted: true,
      }));
    }
  };

  const goToPreviousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  const restartQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      answers: [],
      isCompleted: false,
    });
  };

  const isAnswered = () => {
    const answer = getCurrentAnswer();
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    return answer !== "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  if (quizState.isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <QuizResults
            questions={questions}
            answers={quizState.answers}
            onRestart={restartQuiz}
          />
        </div>
      </div>
    );
  }

  const currentQuestion = questions[quizState.currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-yellow-500 mr-2" />
            <h1 className="text-4xl font-bold text-gray-800">
              Interactive Quiz
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Test your knowledge across various topics
          </p>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500">
              Question {quizState.currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {Math.round(
                ((quizState.currentQuestion + 1) / questions.length) * 100
              )}
              % Complete
            </span>
          </div>
          <ProgressBar
            current={quizState.currentQuestion + 1}
            total={questions.length}
          />
        </div>

        {/* Question Section */}
        <div className="mb-8">
          <QuestionCard
            question={currentQuestion}
            answer={getCurrentAnswer()}
            onAnswerChange={handleAnswerChange}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={goToPreviousQuestion}
            disabled={quizState.currentQuestion === 0}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              quizState.currentQuestion === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700 transform hover:scale-105 shadow-lg"
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <button
            onClick={goToNextQuestion}
            disabled={!isAnswered()}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              !isAnswered()
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg"
            }`}
          >
            {quizState.currentQuestion === questions.length - 1
              ? "Finish Quiz"
              : "Next"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
