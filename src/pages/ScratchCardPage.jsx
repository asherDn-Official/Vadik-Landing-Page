/** @format */

import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { AlertTriangle, XCircle, Gift } from "lucide-react";
import { scratchCardService } from "../services/scratchCardService";
import ModernScratchCard from "../components/ModernScratchCard";
import CouponPage from "../components/CouponPage";
import CouponExpired from "../components/CouponExpired";
import QuizContainer from "../components/QuizContainer";

const ScratchCardPage = () => {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customerId");
  const { scratchCardId } = useParams();

  const [scratchCardData, setScratchCardData] = useState(null);
  const [couponData, setCouponData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);

  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [finalCouponDetails, setFinalCouponDetails] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isAlreadyClaimed, setIsAlreadyClaimed] = useState(false);
  const [showExpired, setShowExpired] = useState(false);

  useEffect(() => {
    const loadScratchCardData = async () => {
      if (!scratchCardId || !customerId) return;

      try {
        setIsLoading(true);
        setError(null);

        const scratchCardResponse = await scratchCardService.getScratchCard(
          scratchCardId,
          customerId
        );

        if (scratchCardResponse.status && scratchCardResponse.data) {
          setScratchCardData(scratchCardResponse.data);

          if (scratchCardResponse.data.couponId) {
            const couponResponse = await scratchCardService.getCouponDetails(
              scratchCardResponse.data.couponId
            );

            if (
              couponResponse.status &&
              couponResponse.data &&
              couponResponse.data.length > 0
            ) {
              setCouponData(couponResponse.data[0]);
              setSelectedCoupon(couponResponse.data[0]);
            }
          }
        }
      } catch (err) {
        setError(err.message || "Failed to load scratch card");
      } finally {
        setIsLoading(false);
      }
    };

    loadScratchCardData();
  }, [scratchCardId, customerId]);

  const handleContinueQuiz = async () => {
    if (!scratchCardData || !selectedCoupon) return;

    try {
      setQuizLoading(true);

      const claimResponse = await scratchCardService.checkCouponClaim(
        scratchCardData._id,
        customerId,
        selectedCoupon._id
      );

      if (claimResponse.message === "Coupon has already been claimed.") {
        await showFinalCouponDetailsForCoupon(selectedCoupon._id);
        setQuizLoading(false);
      } else {
        await showFinalCouponDetailsForCoupon(selectedCoupon._id);
        setQuizLoading(false);
      }
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        const errorMessage = err.response.data?.message || err.message;

        if (
          errorMessage ===
          "Customer has not completed the allocated quiz campaign."
        ) {
          await loadQuizData();
        } else if (
          status === 409 &&
          errorMessage === "you have already completed this quiz"
        ) {
          setQuizCompleted(true);
          await showFinalCouponDetailsForCoupon(selectedCoupon._id);
          setQuizLoading(false);
        } else if (status === 400) {
          await showFinalCouponDetailsForCoupon(selectedCoupon._id);
          setQuizLoading(false);
        } else {
          setShowExpired(true);
          setQuizLoading(false);
        }
      } else {
        setShowExpired(true);
        setQuizLoading(false);
      }
    }
  };

  const loadQuizData = async () => {
    if (!scratchCardData?.allocatedQuizCampainId) {
      setError("No quiz available");
      setQuizLoading(false);
      return;
    }

    try {
      const quizResponse = await scratchCardService.getQuizData(
        scratchCardData.allocatedQuizCampainId,
        customerId
      );

      if (quizResponse._id) {
        setQuizData(quizResponse);
        setShowQuiz(true);
        setQuizLoading(false);
      } else {
        setError("Invalid quiz data");
        setQuizLoading(false);
      }
    } catch (err) {
      setError(err.message || "Failed to load quiz");
      setQuizLoading(false);
    }
  };

  const handleQuizSubmission = async (quizId, customerId, responses) => {
    if (!quizId || !customerId) return;

    try {
      setIsSubmittingQuiz(true);

      const submitResponse = await scratchCardService.submitQuiz(
        quizId,
        customerId,
        responses
      );

      if (submitResponse.loyaltyPointsEarned) {
        setLoyaltyPoints(submitResponse.loyaltyPointsEarned);
      }

      setQuizCompleted(true);
      setShowQuiz(false);

      await showFinalCouponDetails();
    } catch (err) {
      setError(err.message || "Failed to submit quiz");
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  const showFinalCouponDetails = async () => {
    if (!selectedCoupon?._id) return;

    try {
      const finalCouponResponse =
        await scratchCardService.getFinalCouponDetails(selectedCoupon._id);

      if (finalCouponResponse.status && finalCouponResponse.data) {
        setFinalCouponDetails(finalCouponResponse.data);
      }
    } catch (err) {
      console.error("Error fetching final coupon details:", err);
      setError("Failed to load coupon details");
    }
  };

  const showFinalCouponDetailsForCoupon = async (couponId) => {
    if (!couponId) return;

    try {
      const finalCouponResponse =
        await scratchCardService.getFinalCouponDetails(couponId);

      if (finalCouponResponse.status && finalCouponResponse.data) {
        setFinalCouponDetails(finalCouponResponse.data);
        if (quizCompleted && loyaltyPoints > 0) {
         } else {
          setIsAlreadyClaimed(true);
        }
      }
    } catch (err) {
      console.error("Error fetching final coupon details:", err);
      setError("Failed to load coupon details");
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-3 sm:p-4'>
        <div className='text-center max-w-sm mx-auto px-4'>
          <div className='animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 border-4 border-yellow-500 border-t-transparent mx-auto mb-3 sm:mb-4'></div>
          <p className='text-base sm:text-lg md:text-xl text-gray-600'>
            Loading your scratch card...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-3 sm:p-4'>
        <div className='text-center max-w-sm mx-auto px-4'>
          <AlertTriangle className='w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-red-500 mx-auto mb-3 sm:mb-4' />
          <h1 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2'>
            Scratch Card Error
          </h1>
          <p className='text-sm sm:text-base text-gray-600 mb-4'>{error}</p>
        </div>
      </div>
    );
  }

  if (isAlreadyClaimed && finalCouponDetails) {
    return (
      <CouponPage
        couponDetails={finalCouponDetails}
        showLoyaltyPoints={false}
        title='Coupon Already Claimed'
        subtitle='You have already claimed this coupon. Here are your reward details!'
        isAlreadyClaimed={true}
      />
    );
  }

  if (quizCompleted && finalCouponDetails) {
    return (
      <CouponPage
        couponDetails={finalCouponDetails}
        showLoyaltyPoints={loyaltyPoints > 0}
        loyaltyPoints={loyaltyPoints}
        title={
          loyaltyPoints > 0
            ? "Quiz Completed Successfully! 🎉"
            : "Quiz Already Completed "
        }
        subtitle={
          loyaltyPoints > 0
            ? "Thank you for completing the quiz. Here are your rewards!"
            : "You have already completed this quiz. Here are your reward details!"
        }
      />
    );
  }

  if (quizLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-3 sm:p-4'>
        <div className='text-center max-w-sm mx-auto px-4'>
          <div className='animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 border-4 border-yellow-500 border-t-transparent mx-auto mb-3 sm:mb-4'></div>
          <p className='text-base sm:text-lg md:text-xl text-gray-600'>
            Loading quiz...
          </p>
        </div>
      </div>
    );
  }

  if (showExpired) {
    return (
      <CouponExpired
        title='Coupon Expired'
        message='This coupon has expired or is no longer valid. Please try again later.'
        showRetry={true}
        onRetry={() => {
          setShowExpired(false);
          setError(null);
        }}
      />
    );
  }

  if (showQuiz && quizData) {
    return (
      <QuizContainer
        quizData={quizData}
        customerId={customerId}
        onQuizSubmit={handleQuizSubmission}
        isSubmittingQuiz={isSubmittingQuiz}
      />
    );
  }

  if (scratchCardData) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-20'>
          <div className='absolute top-0 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-yellow-400 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2'></div>
          <div className='absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-blue-400 rounded-full blur-3xl'></div>
          <div className='absolute top-1/2 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-purple-400 rounded-full blur-3xl'></div>
        </div>

        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className='absolute w-1 h-1 sm:w-2 sm:h-2 bg-yellow-300 rounded-full animate-pulse'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}

        <div className='max-w-3xl w-full relative z-10 px-3 sm:px-4'>
          <div className='bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 md:p-6 text-center'>
            <div className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 sm:p-5 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 shadow-2xl'>
              <div className='flex items-center justify-center mb-2 sm:mb-3'>
                <Gift className='w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 drop-shadow-lg' />
                <h1 className='text-lg sm:text-xl md:text-2xl font-bold drop-shadow-lg'>
                  {scratchCardData.name || "Scratch & Win"}
                </h1>
              </div>
              <p className='text-sm sm:text-md opacity-90 drop-shadow-md'>
                Scratch to reveal your amazing reward!
              </p>
            </div>

            <div className='mb-6 sm:mb-8 flex justify-center items-center'>
              <ModernScratchCard
                offer={couponData?.discount?.toString() || "XX"}
                title={
                  couponData?.name || scratchCardData.name || "Scratch & Win"
                }
                onContinueQuiz={handleContinueQuiz}
                isLoading={quizLoading}
                couponData={couponData}
              />
            </div>

            <div className='text-xs sm:text-sm text-gray-500'>
              <p>
                Scratch the card and complete the quiz to unlock your reward
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-3 sm:p-4'>
      <div className='text-center max-w-sm mx-auto px-4'>
        <XCircle className='w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-gray-500 mx-auto mb-3 sm:mb-4' />
        <h1 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2'>
         Reward has been already collected Greate Job!
        </h1>
        <p className='text-sm sm:text-base text-gray-600'>
          There are no scratch cards available for you at the moment or Reward has been already collected
        </p>
      </div>
    </div>
  );
};

export default ScratchCardPage;
