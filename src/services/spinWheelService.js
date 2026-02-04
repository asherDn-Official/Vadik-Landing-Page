/** @format */

import api from "../api/api";


export const spinWheelService = {



  getSpinWheel: async (spinWheelId, customerId) => {
    const response = await api.get(
      `/api/spinWheels/spinWheel/customer/${spinWheelId}?customerId=${customerId}`
    );
    return response.data;
  },





  getSpinWheelCoupons: async (couponIds) => {
    const response = await api.post(`/api/coupons/spicWheelCoupons`, {
      coupons: couponIds,
    });
    return response.data;
  },





  checkCouponClaim: async (spinWheelId, customerId, couponId) => {
    const response = await api.post(`/api/spinWheels/coupon/code/spinWheel`, {
      spinWheelId: spinWheelId,
      customerId: customerId,
      couponId: couponId,
    });
    return response.data;
  },





  getQuizData: async (quizId, customerId) => {
    const response = await api.post(`/api/quiz/public/${quizId}`, {
      customerId: customerId,
      type: 'spinWheel'
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


 claimSpinWheelCoupon: async (spinWheelId, customerId, couponId) => {
    const response = await api.post(`/api/coupons/coupon/code/spinWheel/claim`, {
      spinWheelId,
      customerId,
      couponId,
    });
    return response.data;
  },

  claimSpinWheelAlreadyClaimed: async (spinWheelId, customerId, couponId) => {
    const response = await api.post(`/api/spinWheels/coupon/code/spinWheel/already-claim`, {
      spinWheelId,
      customerId,
      couponId,
    });
    return response.data;
  },
};