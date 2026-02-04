/** @format */

import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { AlertTriangle, XCircle, Loader2, Gift, Zap, Star } from "lucide-react";
import { spinWheelService } from "../services/spinWheelService";
import SpinWheel from "../components/SpinWheel";
import CouponPage from "../components/CouponPage";
import CouponExpired from "../components/CouponExpired";
import QuizContainer from "../components/QuizContainer";

const SpinWheelPage = () => {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customerId");
  const { spinWheelId } = useParams();
  const [spinWheelData, setSpinWheelData] = useState(null);
  const [couponData, setCouponData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponClaimed, setCouponClaimed] = useState(false);
  const [alreadyClaimedUpdated, setAlreadyClaimedUpdated] = useState(false);

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

  const [isSpinning, setIsSpinning] = useState(false);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [winningSegment, setWinningSegment] = useState(null);

  useEffect(() => {
    const loadSpinWheelData = async () => {
      if (!spinWheelId || !customerId) return;

      try {
        setIsLoading(true);
        setError(null);

        const spinWheelResponse = await spinWheelService.getSpinWheel(
          spinWheelId,
          customerId
        );

        if (spinWheelResponse.status && spinWheelResponse.data) {
          setSpinWheelData(spinWheelResponse.data);

          if (
            spinWheelResponse.data.couponOptions &&
            spinWheelResponse.data.couponOptions.length > 0
          ) {
            const couponResponse = await spinWheelService.getSpinWheelCoupons(
              spinWheelResponse.data.couponOptions
            );

            if (couponResponse.status && couponResponse.data) {
              setCouponData(couponResponse.data);
            }
          }
        }
      } catch (err) {
        setError(err.message || "Failed to load spin wheel");
      } finally {
        setIsLoading(false);
      }
    };

    loadSpinWheelData();
  }, [spinWheelId, customerId]);

  useEffect(() => {
    if (
      quizCompleted &&
      finalCouponDetails &&
      selectedCoupon &&
      !couponClaimed
    ) {
      spinWheelService
        .claimSpinWheelCoupon(
          spinWheelId,
          customerId,
          selectedCoupon._id
        )
        .then(() => {
          setCouponClaimed(true);
          console.log("✅ Coupon successfully claimed");
        })
        .catch((err) => {
          console.error("❌ Coupon claim failed:", err);
        });
    }
  }, [
    quizCompleted,
    finalCouponDetails,
    selectedCoupon,
    couponClaimed,
    spinWheelId,
    customerId,
  ]);

  useEffect(() => {
    if (
      isAlreadyClaimed &&
      finalCouponDetails &&
      !alreadyClaimedUpdated &&
      spinWheelId &&
      customerId
    ) {
      spinWheelService
        .claimSpinWheelAlreadyClaimed(
          spinWheelId,
          customerId,
          finalCouponDetails._id
        )
        .then(() => {
          setAlreadyClaimedUpdated(true);
          console.log("✅ Spin wheel already-claimed record updated");
        })
        .catch((err) => {
          console.error("❌ Spin wheel already-claimed update failed:", err);
        });
    }
  }, [
    isAlreadyClaimed,
    finalCouponDetails,
    alreadyClaimedUpdated,
    spinWheelId,
    customerId,
  ]);

  const handleSpinComplete = (segment) => {
    setWinningSegment(segment);
    setSelectedCoupon(segment.coupon);
    setShowWinPopup(true);
    setIsSpinning(false);
  };

  const handleContinueQuiz = async () => {
    if (!spinWheelData || !winningSegment.coupon) return;
    setSelectedCoupon(winningSegment.coupon);

    try {
      setIsSpinning(true);

      const claimResponse = await spinWheelService.checkCouponClaim(
        spinWheelData._id,
        customerId,
        winningSegment.coupon._id
      );

      if (claimResponse.message === "Coupon has already been claimed.") {
        await showFinalCouponDetailsForCoupon(winningSegment.coupon._id);
        setShowWinPopup(false);
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
          setShowWinPopup(false);
        } else if (
          status === 409 &&
          errorMessage === "you have already completed this quiz"
        ) {
          await showFinalCouponDetailsForCoupon(winningSegment.coupon._id);
          setShowWinPopup(false);
        } else if (status === 400) {
          await showFinalCouponDetailsForCoupon(winningSegment.coupon._id);
          setShowWinPopup(false);
        } else {
          setShowExpired(true);
          setShowWinPopup(false);
        }
      } else {
        setShowExpired(true);
        setShowWinPopup(false);
      }
    } finally {
      setIsSpinning(false);
    }
  };

  const loadQuizData = async () => {
    if (!spinWheelData?.allocatedQuizCampainId) {
      setError("No quiz available");
      return;
    }

    try {
      setQuizLoading(true);

      const quizResponse = await spinWheelService.getQuizData(
        spinWheelData.allocatedQuizCampainId,
        customerId
      );

      if (quizResponse._id) {
        setQuizData(quizResponse);
        setShowQuiz(true);
      } else {
        setError("Invalid quiz data");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        await showFinalCouponDetailsForCoupon(
          selectedCoupon?._id || winningSegment?.coupon?._id
        );
      } else {
        setError(
          err.response?.data?.message || err.message || "Failed to load quiz"
        );
      }
    } finally {
      setQuizLoading(false);
    }
  };

  const handleQuizSubmission = async (quizId, customerId, responses) => {
    try {
      setIsSubmittingQuiz(true);

      const submitResponse = await spinWheelService.submitQuiz(
        quizId,
        customerId,
        responses
      );

      if (submitResponse.loyaltyPointsEarned) {
        setLoyaltyPoints(submitResponse.loyaltyPointsEarned);
      }

      setQuizCompleted(true);

      if (selectedCoupon?._id) {
        try {
          const finalCouponResponse =
            await spinWheelService.getFinalCouponDetails(selectedCoupon._id);

          if (finalCouponResponse.status && finalCouponResponse.data) {
            setFinalCouponDetails(finalCouponResponse.data);
          }
        } catch (err) {
          console.error("Error fetching final coupon details:", err);
        }
      }

      setShowQuiz(false);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to submit quiz"
      );
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  const showFinalCouponDetailsForCoupon = async (couponId) => {
    if (!couponId) return;

    try {
      const finalCouponResponse = await spinWheelService.getFinalCouponDetails(
        couponId
      );

      if (finalCouponResponse.status && finalCouponResponse.data) {
        setFinalCouponDetails(finalCouponResponse.data);
        setIsAlreadyClaimed(true);
      } else {
        setError("Failed to load coupon details - invalid response");
      }
    } catch {
      setError("Failed to load coupon details");
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-3 sm:p-4'>
        <div className='text-center max-w-sm mx-auto px-4'>
          <div className='animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 border-4 border-yellow-500 border-t-transparent mx-auto mb-3 sm:mb-4'></div>
          <p className='text-base sm:text-lg md:text-xl text-gray-600'>
            Loading your spin wheel...
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
            Spin Wheel Error
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
        showLoyaltyPoints={true}
        loyaltyPoints={loyaltyPoints}
        title='Quiz Completed Successfully! 🎉'
        subtitle='Thank you for completing the quiz. Here are your rewards!'
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

  if (spinWheelData && couponData.length > 0) {
    const segments = [];
    const spins = spinWheelData.noOfSpins || 3;
    for (let i = 0; i < spins; i++) {
      const couponIndex = i % couponData.length;
      segments.push({
        id: i,
        name: couponData[couponIndex]?.name || `Option ${i + 1}`,
        coupon: couponData[couponIndex],
      });
    }

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

        <div className='max-w-3xl w-full relative z-10 px-3 sm:px-3'>
          <div className='bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-5 md:p-4 text-center'>
            <div className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 sm:p-4 rounded-xl sm:rounded-2xl mb-2 sm:mb-3 shadow-2xl'>
              <div className='flex items-center justify-center mb-2 sm:mb-2'>
                <Gift className='w-6 h-6 sm:w-5 sm:h-5 mr-2 sm:mr-3 drop-shadow-lg' />
                <h1 className='text-lg sm:text-xl md:text-2xl font-bold drop-shadow-lg'>
                  {spinWheelData.name}
                </h1>
              </div>
              <p className='text-sm sm:text-md opacity-90 drop-shadow-md'>
                Spin to win amazing rewards!
              </p>
            </div>
            <div className='mb-4 sm:mb-6'>
              <SpinWheel
                segments={segments}
                isSpinning={isSpinning}
                onSpinStart={() => setIsSpinning(true)}
                onSpinComplete={handleSpinComplete}
                targetedCoupons={spinWheelData?.targetedCoupons || []}
              />
            </div>

            <div className='text-xs sm:text-sm text-gray-500'>
              <p>Spin the wheel and complete the quiz to unlock your reward</p>
            </div>
          </div>
        </div>

        {showWinPopup && winningSegment && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4'>
            <div className='bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full mx-3 sm:mx-4 overflow-hidden animate-zoom-in'>
              <div className='bg-gradient-to-r from-green-400 to-blue-500 p-3 sm:p-4 md:p-6 text-white text-center'>
                <div className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4'>
                  <Gift className='w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-white' />
                </div>

                <h2 className='text-lg sm:text-xl font-bold mb-2'>
                  🎊 CONGRATULATIONS! 🎊
                </h2>
                <p className='text-sm sm:text-base md:text-lg opacity-90'>
                  You&apos;ve won an amazing reward!
                </p>
              </div>

              <div className='p-3 sm:p-4 md:p-6'>
                <div className='text-center mb-3 sm:mb-4 md:mb-6'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4'>
                    <Star className='w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white' />
                  </div>

                  <h3 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2'>
                    {winningSegment.coupon?.name || winningSegment.name}
                  </h3>

                  {winningSegment.coupon && (
                    <div className='space-y-2 sm:space-y-3'>
                      <div className='bg-gradient-to-r from-green-50 to-white p-2 sm:p-3 rounded-lg border-2 border-dashed border-green-300 shadow-inner'>
                        <div className='text-center'>
                          <div className='text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mb-1'>
                            XXXXXXXX
                          </div>
                          <div className='text-xs text-green-600 opacity-80'>
                            Coupon Locked - Complete Quiz to Unlock
                          </div>
                        </div>
                      </div>

                      {winningSegment.coupon.code && (
                        <div className='bg-gray-100 p-2 sm:p-3 rounded-lg'>
                          <p className='text-xs text-gray-500 mb-1'>
                            Coupon Code:
                          </p>
                          <p className='font-mono font-bold text-sm sm:text-lg text-purple-600'>
                            {winningSegment.coupon.code}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className='space-y-2 sm:space-y-3'>
                  <button
                    onClick={handleContinueQuiz}
                    disabled={isSpinning}
                    className='w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-xl font-bold text-sm sm:text-base md:text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isSpinning ? (
                      <>
                        <Loader2 className='w-4 h-4 sm:w-5 sm:h-5 inline mr-2 animate-spin' />
                        Validating...
                      </>
                    ) : (
                      <>
                        <Zap className='w-4 h-4 sm:w-5 sm:h-5 inline mr-2' />
                        Continue Quiz
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
          There are no spin wheels available for you at the moment  or Reward has been already collected
        </p>
      </div>
    </div>
  );
};

export default SpinWheelPage;
