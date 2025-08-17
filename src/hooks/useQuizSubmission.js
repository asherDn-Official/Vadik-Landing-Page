/** @format */

import { useMutation } from "@tanstack/react-query";
import { spinWheelService } from "../services/spinWheelService";

export const useQuizSubmission = (onSuccess, onError) => {
  return useMutation({
    mutationFn: (data) =>
      spinWheelService.submitQuiz(data.quizId, data.customerId, data.responses),
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
};
