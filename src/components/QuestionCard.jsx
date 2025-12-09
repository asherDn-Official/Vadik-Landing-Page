import React from "react";
import { CheckCircle, Circle, Square, CheckSquare } from "lucide-react";

const QuestionCard = ({ question, answer, onAnswerChange }) => {

  console.log(question);

  const getCategoryColor = (category) => {
    const colors = {
      Geography: "bg-blue-100 text-blue-800",
      Technology: "bg-green-100 text-green-800",
      Science: "bg-purple-100 text-purple-800",
      History: "bg-orange-100 text-orange-800",
      Art: "bg-pink-100 text-pink-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const handleMultipleSelectChange = (option) => {
    const currentAnswers = Array.isArray(answer) ? answer : [];
    const updatedAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter((a) => a !== option)
      : [...currentAnswers, option];
    onAnswerChange(updatedAnswers);
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case "multiple-choice":
      case "true-false":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="relative">
                  {answer === option ? (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answer === option}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  className="sr-only"
                />
                <span className="ml-3 text-gray-700 font-medium">{option}</span>
              </label>
            ))}
          </div>
        );

      case "multiple-select":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => {
              const isSelected =
                Array.isArray(answer) && answer.includes(option);
              return (
                <label
                  key={index}
                  className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-300 hover:bg-green-50 transition-all duration-200"
                >
                  <div className="relative">
                    {isSelected ? (
                      <CheckSquare className="w-5 h-5 text-green-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleMultipleSelectChange(option)}
                    className="sr-only"
                  />
                  <span className="ml-3 text-gray-700 font-medium">
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        );

      case "text-input":
        return (
          <div>
            <input
              type="text"
              value={typeof answer === "string" ? answer : ""}
              onChange={(e) => onAnswerChange(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:ring-purple-200 focus:ring-2 focus:outline-none transition-all duration-200 text-lg"
            />
          </div>
        );

      case "dateinput":
         const today = new Date().toISOString().split("T")[0];
        return (
          <input
            type='date'
            value={answer || ""}
            max={today}
            onChange={(e) =>
              onAnswerChange(e.target.value)
            }
            className='w-full p-4 sm:p-5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-base sm:text-lg transition-all duration-300 focus:ring-2 focus:ring-blue-200 focus:scale-[1.01] touch-manipulation'
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
      <div className="mb-6">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
            question.category
          )}`}
        >
          {question.category}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
        {question.question}
      </h2>

      {renderQuestionInput()}
    </div>
  );
};

export default QuestionCard;
