/** @format */

import { Copy, Check, AlertCircle } from "lucide-react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

const CouponPage = ({
  couponDetails,
  showLoyaltyPoints = false,
  loyaltyPoints = 0,
  title = "Your Reward Details 🎁",
  subtitle = "Here are your coupon details!",
  isAlreadyClaimed = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 300,
    height: typeof window !== "undefined" ? window.innerHeight : 200,
  });

  useEffect(() => {
    setShowConfetti(true);

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCopyCode = async () => {
    if (couponDetails.code) {
      try {
        await navigator.clipboard.writeText(couponDetails.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy code:", err);
      }
    }
  };

  if (!couponDetails) {
    return null;
  }

  const expiryDate = couponDetails.expiryDate
    ? new Date(couponDetails.expiryDate)
    : null;
  const isExpired =
    expiryDate && !Number.isNaN(expiryDate.getTime())
      ? expiryDate.getTime() < Date.now()
      : false;

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-2 sm:p-3 relative overflow-hidden'>
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={2000}
          recycle={false}
          gravity={0.05}
          initialVelocityY={20}
          initialVelocityX={10}
          wind={0.005}
          friction={0.99}
          opacity={0.9}
          tweenDuration={8000}
          confettiSource={{
            x: 0,
            y: 0,
            w: windowDimensions.width,
            h: 0,
          }}
          drawShape={(ctx) => {
            const shapes = ["square", "circle", "triangle", "ribbon"];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];

            ctx.beginPath();

            switch (shape) {
              case "square": {
                const size = Math.random() * 8 + 6;
                ctx.fillRect(-size / 2, -size / 2, size, size);
                break;
              }
              case "circle": {
                const radius = Math.random() * 6 + 3;
                ctx.arc(0, 0, radius, 0, 2 * Math.PI);
                ctx.fill();
                break;
              }
              case "triangle": {
                const triSize = Math.random() * 8 + 4;
                ctx.moveTo(0, -triSize / 2);
                ctx.lineTo(-triSize / 2, triSize / 2);
                ctx.lineTo(triSize / 2, triSize / 2);
                ctx.closePath();
                ctx.fill();
                break;
              }
              case "ribbon": {
                const ribbonWidth = Math.random() * 4 + 2;
                const ribbonHeight = Math.random() * 12 + 6;
                ctx.fillRect(
                  -ribbonWidth / 2,
                  -ribbonHeight / 2,
                  ribbonWidth,
                  ribbonHeight
                );
                break;
              }
            }
          }}
          colors={[
            "#FFD700",
            "#FF6B6B",
            "#4ECDC4",
            "#45B7D1",
            "#96CEB4",
            "#FFEAA7",
            "#FD79A8",
            "#A29BFE",
            "#00B894",
            "#FDCB6E",
          ]}
        />
      )}

      <div className='max-w-xl w-full relative z-10 px-1 sm:px-2'>
        <div className='bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-5 md:p-6 text-center'>
          <h1 className='text-md sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4'>
            {title}
          </h1>
          <p className='text-xs sm:text-sm md:text-sm text-gray-600 mb-6 sm:mb-8'>
            {subtitle}
          </p>

          {showLoyaltyPoints && loyaltyPoints > 0 && (
            <div className='bg-gradient-to-r from-yellow-100 to-orange-100 p-4 sm:p-6 rounded-xl mb-4 sm:mb-6'>
              <h2 className='text-md sm:text-xl md:text-xl font-bold text-yellow-600 mb-2'>
                +{loyaltyPoints} Loyalty Points Earned! 🏆
              </h2>
              <p className='text-xs sm:text-sm text-gray-600'>
                You have earned loyalty points for completing the quiz!
              </p>
            </div>
          )}

          <div className='bg-gradient-to-r from-green-100 to-blue-100 p-4 sm:p-6 rounded-xl mb-4 sm:mb-6'>
            <h2 className='text-md sm:text-sm md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4'>
              {showLoyaltyPoints ? "Your Reward Details" : "Your Coupon"}
            </h2>

            {isAlreadyClaimed ? (
              <div className='bg-red-50 p-4 sm:p-6 rounded-lg border-2 border-dashed border-red-300'>
                <div className='text-center'>
                  <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                    <AlertCircle className='w-6 h-6 text-red-600' />
                  </div>
                  
                  <div className='text-sm text-gray-600 mb-3'>
                    This coupon has already been claimed and cannot be used
                    again.
                  </div>
                  <div className='text-xs text-gray-500 bg-white p-2 rounded border'>
                    <p className='font-semibold text-gray-700'>Coupon Code:</p>
                    <p className='font-mono text-gray-600'>
                      {couponDetails.code}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className='bg-white p-3 sm:p-4 rounded-lg border-2 border-dashed border-green-300'>
                <div className='text-center'>
                  <div className='text-xl sm:text-2xl font-bold text-green-600 mb-2'>
                    {couponDetails.couponType === "percentage"
                      ? `${couponDetails.discount}% OFF`
                      : couponDetails.couponType === "flat"
                      ? `₹${couponDetails.discount} OFF`
                      : `${couponDetails.discount}% OFF`}
                  </div>
                  <div className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'>
                    {couponDetails.name}
                  </div>
                  <div className='text-xs sm:text-sm text-gray-600 mb-3'>
                    {couponDetails.description}
                  </div>
                  {couponDetails.code && (
                    <div
                      className={`p-2 sm:p-3 rounded-lg transition-colors duration-300 ${
                        copied
                          ? "bg-green-50 border border-green-200"
                          : "bg-gray-100"
                      }`}
                    >
                      <p className='text-xs text-gray-500 mb-1'>Coupon Code:</p>
                      <div className='flex items-center justify-center gap-2'>
                        <p className='font-mono font-bold text-sm sm:text-lg text-purple-600'>
                          {couponDetails.code}
                        </p>
                        <button
                          onClick={handleCopyCode}
                          className='p-1 hover:bg-gray-200 rounded transition-all duration-200'
                          title={copied ? "Copied!" : "Copy code"}
                        >
                          {copied ? (
                            <Check className='w-4 h-4 sm:w-5 sm:h-5 text-green-600 animate-pulse' />
                          ) : (
                            <Copy className='w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-purple-600 transition-colors duration-200' />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                  {couponDetails.condition && (
                    <div className='mt-3 text-xs text-gray-600 bg-yellow-50 p-2 rounded'>
                      <p className='font-semibold text-yellow-700'>Terms:</p>
                      <p>{couponDetails.conditionMessage}</p>
                    </div>
                  )}
                  {expiryDate && (
                    <div className='mt-3 text-xs text-gray-600 bg-red-50 p-2 rounded'>
                      <p className='font-semibold text-red-700'>Expiry Date:</p>
                      <p>{expiryDate.toLocaleDateString()}</p>
                      {isExpired && (
                        <p className='mt-1 font-semibold text-red-600'>Coupon already expired</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CouponPage.propTypes = {
  couponDetails: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    code: PropTypes.string,
    discount: PropTypes.number,
    description: PropTypes.string,
    couponType: PropTypes.string,
    condition: PropTypes.bool,
    conditionMessage: PropTypes.string,
    expiryDate: PropTypes.string,
  }).isRequired,
  showLoyaltyPoints: PropTypes.bool,
  loyaltyPoints: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isAlreadyClaimed: PropTypes.bool,
};

export default CouponPage;
