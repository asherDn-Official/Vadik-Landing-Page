/** @format */

import api from "../api/api";
 
export const quizService = { 
  getQuiz: async (quizId, customerId) => {
    const response = await api.post(`/api/quiz/public/${quizId}`, {
      customerId: customerId,
    });
    return response.data;
  },
 
  submitQuiz: async (quizId, customerId, responses) => {
    const response = await api.post(`/api/quiz/submit`, {
      quizId: quizId,
      customerId: customerId,
      responses: responses,
    });
    return response.data;
  },
};
