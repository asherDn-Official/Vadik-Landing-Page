/** @format */

import { CheckCircle, Loader2 } from "lucide-react";
import PropTypes from "prop-types";
import { useQuizState } from "../hooks/useQuizState";
import {
  getCategoryColor,
  formatQuestionKey,
  calculateProgress,
} from "../utils/quizUtils";

const QuizContainer = ({
  quizData,
  customerId,
  onQuizSubmit,
  isSubmittingQuiz,
}) => {
  const {
    currentQuestionIndex,
    answers,
    isCompleted,
    goToNextQuestion,
    goToPreviousQuestion,
    handleAnswerChange,
    formatAnswersForSubmission,
    isAnswered,
  } = useQuizState();

  const questions = quizData.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progressPercentage = calculateProgress(
    currentQuestionIndex + 1,
    totalQuestions
  );

  const getCurrentAnswer = () => {
    return answers[currentQuestion?.key] || "";
  };

  const handleQuizSubmission = async () => {
    if (!quizData?._id || !customerId) return;

    const responses = formatAnswersForSubmission();
    await onQuizSubmit(quizData._id, customerId, responses);
  };

  const renderQuestionInput = () => {
    const answer = getCurrentAnswer();

    switch (currentQuestion?.type) {
      case "options":
        return (
          <div className='space-y-3 sm:space-y-4'>
            {currentQuestion.options?.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-4 sm:p-5 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 transform hover:scale-[1.01] active:scale-[0.99] touch-manipulation ${
                  Array.isArray(answer) && answer.includes(option)
                    ? "border-green-500 bg-green-50 shadow-md"
                    : "border-gray-200"
                }`}
              >
                <input
                  type='checkbox'
                  className='w-5 h-5 sm:w-6 sm:h-6 text-green-600 border-gray-300 rounded focus:ring-green-500 mr-3 transition-all duration-200 flex-shrink-0'
                  checked={Array.isArray(answer) && answer.includes(option)}
                  onChange={(e) => {
                    const currentAnswers = Array.isArray(answer)
                      ? [...answer]
                      : [];
                    if (e.target.checked) {
                      currentAnswers.push(option);
                    } else {
                      const index = currentAnswers.indexOf(option);
                      if (index > -1) {
                        currentAnswers.splice(index, 1);
                      }
                    }
                    handleAnswerChange(currentQuestion.key, currentAnswers);
                  }}
                />
                <span className='text-base sm:text-lg font-medium text-gray-800 leading-relaxed'>
                  {option}
                </span>
              </label>
            ))}
          </div>
        );

      case "string":
        return (
          <input
            type='text'
            value={answer || ""}
            onChange={(e) =>
              handleAnswerChange(currentQuestion.key, e.target.value)
            }
            placeholder='Type your answer here...'
            className='w-full p-4 sm:p-5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-base sm:text-lg transition-all duration-300 focus:ring-2 focus:ring-blue-200 focus:scale-[1.01] touch-manipulation'
          />
        );

      case "number":
        return (
          <input
            type='number'
            value={answer || ""}
            onChange={(e) =>
              handleAnswerChange(currentQuestion.key, e.target.value)
            }
            placeholder='Enter a number...'
            className='w-full p-4 sm:p-5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-base sm:text-lg transition-all duration-300 focus:ring-2 focus:ring-blue-200 focus:scale-[1.01] touch-manipulation'
          />
        );

      case "date":
         const today = new Date().toISOString().split("T")[0];
        return (
          <input
            type='date'
            value={answer || ""}
            max={today}
            onChange={(e) =>
              handleAnswerChange(currentQuestion.key, e.target.value)
            }
            className='w-full p-4 sm:p-5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-base sm:text-lg transition-all duration-300 focus:ring-2 focus:ring-blue-200 focus:scale-[1.01] touch-manipulation'
          />
        );

      default:
        return (
          <input
            type='text'
            value={answer || ""}
            onChange={(e) =>
              handleAnswerChange(currentQuestion.key, e.target.value)
            }
            placeholder='Type your answer here...'
            className='w-full p-4 sm:p-5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-base sm:text-lg transition-all duration-300 focus:ring-2 focus:ring-blue-200 focus:scale-[1.01] touch-manipulation'
          />
        );
    }
  };

  const isCurrentQuestionAnswered = () => {
    if (!currentQuestion) return false;
    return isAnswered(currentQuestion.key, currentQuestion.type);
  };

  if (isCompleted) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4'>
        <div className='w-full max-w-sm sm:max-w-md lg:max-w-2xl text-center'>
          <div className='bg-white rounded-xl shadow-lg p-6 sm:p-8'>
            {isSubmittingQuiz ? (
              <>
                <Loader2 className='w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mx-auto mb-4 animate-spin' />
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-4 px-2'>
                  Submitting Quiz...
                </h1>
                <p className='text-sm sm:text-base text-gray-600 mb-6 px-4'>
                  Please wait while we save your responses.
                </p>
              </>
            ) : (
              <>
                <CheckCircle className='w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4' />
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-4 px-2'>
                  Ready to Submit Quiz
                </h1>
                <p className='text-sm sm:text-base text-gray-600 mb-6 px-4'>
                  Please review your answers and submit when ready.
                </p>
                <button
                  onClick={handleQuizSubmission}
                  disabled={isSubmittingQuiz}
                  className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50'
                >
                  Submit Quiz 📝
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-2 sm:p-3 md:p-4 pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 md:pb-10'>
      <div className='max-w-4xl mx-auto px-3 sm:px-4 md:px-6'>
        <div className='text-center mb-6 sm:mb-8 animate-fade-in'>
          <div className='flex items-center justify-center mb-3 sm:mb-4'>
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800'>
              Complete Quiz to Unlock Your Reward
            </h1>
          </div>
          <p className='text-sm sm:text-base md:text-lg text-gray-600 px-3 sm:px-4'>
            Answer a few questions to unlock your reward
          </p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 border border-gray-100 animate-slide-up'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 space-y-2 sm:space-y-0'>
            <span className='text-xs sm:text-sm font-medium text-gray-500 text-center sm:text-left'>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className='text-xs sm:text-sm font-medium text-gray-500 text-center sm:text-right'>
              {progressPercentage}% Complete
            </span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden'>
            <div
              className='bg-gradient-to-r from-blue-600 to-purple-600 h-2 sm:h-3 rounded-full transition-all duration-700 ease-out transform origin-left'
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-5 md:p-6 lg:p-8 mb-6 sm:mb-8 border border-gray-100 animate-slide-up'>
          <div className='text-center mb-4 sm:mb-6'>
            <span
              className={`inline-block px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 ${getCategoryColor(
                currentQuestion?.key
              )}`}
            >
              {formatQuestionKey(currentQuestion?.key)}
            </span>
          </div>

          <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center leading-relaxed px-3 sm:px-4'>
            {currentQuestion?.question}
          </h2>

          <div className='max-w-2xl mx-auto animate-fade-in px-2 sm:px-4'>
            {renderQuestionInput()}
          </div>
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 gap-3 sm:gap-4'>
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0 || !currentQuestion}
            className={`w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation text-sm sm:text-base ${
              currentQuestionIndex === 0 || !currentQuestion
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700 shadow-lg hover:shadow-xl"
            }`}
          >
            Previous
          </button>

          {currentQuestionIndex === totalQuestions - 1 ? (
            <button
              onClick={handleQuizSubmission}
              disabled={
                !isCurrentQuestionAnswered() ||
                !currentQuestion ||
                isSubmittingQuiz
              }
              className={`w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation text-sm sm:text-base ${
                !isCurrentQuestionAnswered() ||
                !currentQuestion ||
                isSubmittingQuiz
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700"
              }`}
            >
              {isSubmittingQuiz ? (
                <>
                  <Loader2 className='w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin' />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Quiz </span>
                  <CheckCircle className='w-4 h-4 sm:w-5 sm:h-5 ml-2' />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => goToNextQuestion(totalQuestions, () => {})}
              disabled={!isCurrentQuestionAnswered() || !currentQuestion}
              className={`w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation text-sm sm:text-base ${
                !isCurrentQuestionAnswered() || !currentQuestion
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              }`}
            >
              <span>Next</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

QuizContainer.propTypes = {
  quizData: PropTypes.shape({
    _id: PropTypes.string,
    questions: PropTypes.array,
  }).isRequired,
  customerId: PropTypes.string.isRequired,
  onQuizSubmit: PropTypes.func.isRequired,
  isSubmittingQuiz: PropTypes.bool.isRequired,
};

export default QuizContainer;
