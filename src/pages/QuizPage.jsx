/** @format */

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import QuizResults from "../components/QuizResults";
import { quizService } from "../services/quizService";

const QuizPage = () => {
  const { quizId } = useParams();
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customerId");
  const [questions, setQuestions] = useState([]);
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    answers: [],
    isCompleted: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [quizSubmissionData, setQuizSubmissionData] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      setError(null);
      setAlreadyCompleted(false);

      try { 
        const quizData = await quizService.getQuiz(quizId, customerId); 
        if (
          quizData.message &&
          quizData.message.toLowerCase().includes("already completed")
        ) {
          setAlreadyCompleted(true);
          setLoading(false);
          return;
        }

        // Transform API response to match expected question format
        if (quizData.questions && Array.isArray(quizData.questions)) {
          const transformedQuestions = quizData.questions.map((q, index) => ({
            id: index + 1, // Generate sequential IDs
            question: q.question,
            category: q.key || q.section || "General",
            type:
              q.type === "options"
                ? "multiple-choice"
                : q.type === "string"
                ? "text-input"
                : q.type === "boolean"
                ? "true-false"
                : q.type === "date"
                ? "dateinput"
                : "multiple-choice",
            options: q.options || [],
            correctAnswer: q.correctAnswer || "", // API might not provide correct answers
            key: q.key,
            section: q.section,
            iconUrl: q.iconUrl,
          }));

           setQuestions(transformedQuestions);
        } else { 
           setQuestions([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);

        // Check if it's a 409 Conflict (already completed)
        if (error.response && error.response.status === 409) {
          const errorMessage = error.response.data?.message || error.message;
          if (errorMessage.toLowerCase().includes("already completed")) {
            setAlreadyCompleted(true);
            setLoading(false);
            return;
          }
        }

        setError("Failed to load quiz. Please try again.");
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuizData();
    }
  }, [quizId, customerId]);

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

  const submitQuiz = async () => {
    setSubmitting(true);
    try {
      // Submit quiz responses to get loyalty points
      const responses = quizState.answers.map((answer) => {
        const question = questions.find((q) => q.id === answer.questionId);
        return {
          key: question?.key || `question_${answer.questionId}`,
          value: answer.answer,
        };
      });

      // Call the actual API to submit quiz and get loyalty points
      const apiResponse = await quizService.submitQuiz(
        quizId,
        customerId ? customerId : "anonymous",
        responses
      );

      setQuizSubmissionData(apiResponse);
      setQuizState((prev) => ({
        ...prev,
        isCompleted: true,
      }));
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      setError("Failed to submit quiz. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const goToNextQuestion = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    } else {
      // Submit quiz when reaching the last question
      submitQuiz();
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
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4'></div>
          <p className='text-xl text-gray-600'>Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  if (alreadyCompleted) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center'>
        <div className='text-center max-w-md mx-auto p-6'>
          <div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
            <div className='mb-6'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
              <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                Quiz Already Completed!
              </h2>
              <p className='text-gray-600'>
                You have already completed this quiz. Great job!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            <p className='text-md'>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-xl text-gray-600'>
            No questions available for this quiz.
          </p>
        </div>
      </div>
    );
  }

  if (quizState.isCompleted) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4'>
        <div className='w-full max-w-2xl'>
          <QuizResults
            questions={questions}
            answers={quizState.answers}
            onRestart={restartQuiz}
            quizId={quizId}
            customerId={customerId}
            showLoyaltyOnly={!!customerId}
            quizSubmissionData={quizSubmissionData}
          />
        </div>
      </div>
    );
  }

  const currentQuestion = questions[quizState.currentQuestion];


  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-2 pt-10 pb-10'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center mb-4'>
            <Trophy className='w-8 h-8 text-yellow-500 mr-2' />
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
              Interactive Quiz
            </h1>
          </div>
          <p className='text-gray-600 text-md'>
            Test your knowledge across various topics
          </p>
        </div>
        <div className='bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100'>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-sm font-medium text-gray-500'>
              Question {quizState.currentQuestion + 1} of {questions.length}
            </span>
            <span className='text-sm font-medium text-gray-500'>
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

        <div className='mb-8'>
          <QuestionCard
            question={currentQuestion}
            answer={getCurrentAnswer()}
            onAnswerChange={handleAnswerChange}
          />
        </div>

        <div className='flex justify-between items-center'>
          <button
            onClick={goToPreviousQuestion}
            disabled={quizState.currentQuestion === 0}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              quizState.currentQuestion === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700 transform hover:scale-105 shadow-lg"
            }`}
          >
            <ChevronLeft className='w-5 h-5 mr-2' />
            Previous
          </button>

          <button
            onClick={goToNextQuestion}
            disabled={!isAnswered() || submitting}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              !isAnswered() || submitting
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg"
            }`}
          >
            {quizState.currentQuestion === questions.length - 1
              ? "Finish Quiz"
              : "Next"}
            <ChevronRight className='w-5 h-5 ml-2' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
