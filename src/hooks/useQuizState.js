/** @format */

import { useState, useCallback } from "react";

export const useQuizState = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setIsSubmitted(false);
  }, []);

  const goToNextQuestion = (totalQuestions, onComplete) => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Don't automatically complete the quiz - let the user submit from the last question
      if (onComplete) {
        onComplete();
      }
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleAnswerChange = (questionKey, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionKey]: answer,
    }));
  };

  const formatAnswersForSubmission = () => {
    return Object.entries(answers).map(([key, value]) => ({
      key: key,
      value: value,
    }));
  };

  const isAnswered = (questionKey, questionType) => {
    const answer = answers[questionKey];
    if (questionType === "options" && Array.isArray(answer)) {
      return answer.length > 0;
    }
    return answer !== "" && answer !== null && answer !== undefined;
  };

  return {
    currentQuestionIndex,
    answers,
    isCompleted,
    isSubmitted,
    setIsSubmitted,
    setIsCompleted,
    resetQuiz,
    goToNextQuestion,
    goToPreviousQuestion,
    handleAnswerChange,
    formatAnswersForSubmission,
    isAnswered,
  };
};
