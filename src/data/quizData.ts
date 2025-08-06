import { QuizQuestion } from "./quiz";

export const mockQuizData: QuizQuestion[] = [
  {
    id: 1,
    type: "multiple-choice",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    category: "Geography",
  },
  {
    id: 2,
    type: "multiple-select",
    question: "Which of the following are programming languages?",
    options: ["JavaScript", "HTML", "Python", "CSS", "Java"],
    correctAnswer: ["JavaScript", "Python", "Java"],
    category: "Technology",
  },
  {
    id: 3,
    type: "text-input",
    question: "What is the largest planet in our solar system?",
    correctAnswer: "Jupiter",
    category: "Science",
  },
  {
    id: 4,
    type: "true-false",
    question: "The Great Wall of China is visible from space.",
    options: ["True", "False"],
    correctAnswer: "False",
    category: "History",
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Michelangelo",
    ],
    correctAnswer: "Leonardo da Vinci",
    category: "Art",
  },
  {
    id: 6,
    type: "multiple-select",
    question: "Which of these are primary colors?",
    options: ["Red", "Green", "Blue", "Yellow", "Purple"],
    correctAnswer: ["Red", "Blue", "Yellow"],
    category: "Art",
  },
  {
    id: 7,
    type: "text-input",
    question: "What is the chemical symbol for gold?",
    correctAnswer: "Au",
    category: "Science",
  },
  {
    id: 8,
    type: "multiple-choice",
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: "1945",
    category: "History",
  },
  {
    id: 9,
    type: "true-false",
    question: "React was created by Facebook.",
    options: ["True", "False"],
    correctAnswer: "True",
    category: "Technology",
  },
  {
    id: 10,
    type: "text-input",
    question: "What is the smallest country in the world?",
    correctAnswer: "Vatican City",
    category: "Geography",
  },
];

// Mock API response for quiz completion
export const mockQuizCompletionAPI = async (
  correctAnswers: number,
  totalQuestions: number
): Promise<any> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const basePoints = correctAnswers * 50;
  const bonusPoints =
    correctAnswers === totalQuestions
      ? 200
      : correctAnswers >= totalQuestions * 0.8
      ? 100
      : 0;
  const pointsEarned = basePoints + bonusPoints;

  return {
    pointsEarned,
    bonusPoints,
    totalQuestions,
    correctAnswers,
    completionMessage:
      correctAnswers === totalQuestions
        ? "Perfect Score! You're a quiz master!"
        : correctAnswers >= totalQuestions * 0.8
        ? "Excellent work! You really know your stuff!"
        : correctAnswers >= totalQuestions * 0.6
        ? "Good job! Keep learning and improving!"
        : "Nice try! Practice makes perfect!",
  };
};
