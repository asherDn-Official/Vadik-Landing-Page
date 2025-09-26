/** @format */

import api from "../api/api";
 
export const scratchCardService = { 
  getScratchCard: async (scratchCardId, customerId) => {
    const response = await api.get(
      `/api/scratchCards/scratchCard/customer/${scratchCardId}?customerId=${customerId}`
    );
    return response.data;
  },
 
  getCouponDetails: async (couponId) => {
    const response = await api.post(`/api/coupons/spicWheelCoupons`, {
      coupons: [couponId],
    });
    return response.data;
  },
 
  checkCouponClaim: async (scratchCardId, customerId, couponId) => {
    const response = await api.post(
      `/api/scratchCards/scratchCard/code/customer`,
      {
        scratchCardId: scratchCardId,
        customerId: customerId,
        couponId: couponId,
      }
    );

    return response.data;
  }, 
  getQuizData: async (quizId, customerId) => {
    const response = await api.post(`/api/quiz/public/${quizId}`, {
      customerId: customerId,
      type:"scratchCard"
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

  getFinalCouponDetails: async (couponId) => {
    const response = await api.post(`/api/coupons/couponforCampains`, {
      coupons: couponId,
    });
 
    if (response.data && response.data.status && response.data.data) {
      return {
        status: true,
        data: response.data.data,
      };
    }
 
    return response.data;
  },
};
