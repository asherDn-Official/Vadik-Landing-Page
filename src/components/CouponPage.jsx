/** @format */

import { Copy, Check, AlertCircle, Download, Loader2 } from "lucide-react";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import html2canvas from "html2canvas";

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
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Ref specifically for the CLEAN download version
  const downloadRef = useRef(null);

  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 300,
    height: typeof window !== "undefined" ? window.innerHeight : 200,
  });

  useEffect(() => {
    if (!isAlreadyClaimed) {
        setShowConfetti(true);
        const timer = setTimeout(() => setShowConfetti(false), 8000);
        return () => clearTimeout(timer);
    }
  }, [isAlreadyClaimed]);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const handleDownloadCoupon = async () => {
    if (!downloadRef.current) return;

    setIsDownloading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Capture the hidden clean template
      const canvas = await html2canvas(downloadRef.current, {
        scale: 2, 
        useCORS: true,
        backgroundColor: "#ffffff", // Clean white background
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `Coupon-${couponDetails.code || "Reward"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading coupon:", error);
    } finally {
      setIsDownloading(false);
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
        />
      )}

      {/* --- HIDDEN CLEAN DOWNLOAD TEMPLATE --- 
          This is positioned off-screen so the user never sees it, 
          but html2canvas can still capture it. 
      */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <div 
            ref={downloadRef} 
            className="w-[400px] bg-white p-8 rounded-xl border-4 border-dashed border-gray-800 text-center flex flex-col items-center justify-center"
        >
             {/* 1. Main Discount */}
             <h1 className="text-5xl font-extrabold text-green-600 mb-2">
                {couponDetails.couponType === "percentage"
                    ? `${couponDetails.discount}% OFF`
                    : couponDetails.couponType === "flat"
                    ? `₹${couponDetails.discount} OFF`
                    : `${couponDetails.discount}% OFF`}
             </h1>
             
             {/* 2. Coupon Name */}
             <p className="text-xl font-semibold text-gray-700 mb-6 uppercase tracking-wide">
                {couponDetails.name}
             </p>

             {/* 3. The Code (Big & Clear) */}
             <div className="bg-gray-100 border-2 border-gray-300 rounded-lg px-8 py-4 w-full mb-4">
                <p className="text-sm text-gray-500 uppercase font-bold mb-1 tracking-widest">Code</p>
                <p className="text-4xl font-mono font-black text-gray-900 tracking-wider">
                    {couponDetails.code}
                </p>
             </div>

             {/* 4. Minimal Footer */}
             {expiryDate && (
                <p className="text-sm text-gray-400 font-medium">
                    Valid until: {expiryDate.toLocaleDateString()}
                </p>
             )}
        </div>
      </div>
      {/* -------------------------------------- */}

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

            {/* VISIBLE UI CARDS (Not captured by download) */}
            {isAlreadyClaimed ? (
              <div className='bg-blue-50 p-4 sm:p-6 rounded-lg border-2 border-dashed border-blue-300 relative'>
                <div className='text-center'>
                  <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                    <AlertCircle className='w-6 h-6 text-blue-600' />
                  </div>
                  <div className='text-sm text-gray-700 font-medium mb-3'>
                    You already own this coupon!
                  </div>
                  <div className='text-xs text-gray-500 bg-white p-3 rounded border shadow-sm'>
                    <p className='font-semibold text-gray-700 mb-1'>Coupon Code:</p>
                    <div className="flex items-center justify-center gap-2">
                        <p className='font-mono text-lg font-bold text-blue-600 tracking-wider'>
                        {couponDetails.code}
                        </p>
                        <button
                          onClick={handleCopyCode}
                          className='p-1 hover:bg-gray-100 rounded transition-all duration-200'
                          title={copied ? "Copied!" : "Copy code"}
                        >
                          {copied ? (
                            <Check className='w-4 h-4 text-green-600 animate-pulse' />
                          ) : (
                            <Copy className='w-4 h-4 text-gray-400 hover:text-blue-600' />
                          )}
                        </button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                     <p className="text-lg font-bold text-gray-800">{couponDetails.name}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className='bg-white p-4 sm:p-6 rounded-lg border-2 border-dashed border-green-300 shadow-sm relative'>
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
                      className={`p-2 sm:p-3 rounded-lg transition-colors duration-300 mb-2 ${
                        copied
                          ? "bg-green-50 border border-green-200"
                          : "bg-gray-100"
                      }`}
                    >
                      <p className='text-xs text-gray-500 mb-1'>
                        Coupon Code:
                      </p>
                      <div className='flex items-center justify-center gap-2'>
                        <p className='font-mono font-bold text-sm sm:text-lg text-purple-600 tracking-wider'>
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

                  {/* {couponDetails.condition && (
                    <div className='mt-3 text-xs text-gray-600 bg-yellow-50 p-2 rounded'>
                      <p className='font-semibold text-yellow-700'>Terms:</p>
                      <p>{couponDetails.conditionMessage}</p>
                    </div>
                  )} */}
                  {expiryDate && (
                    <div className='mt-3 text-xs text-gray-600 bg-red-50 p-2 rounded'>
                      <p className='font-semibold text-red-700'>
                        Expiry Date:
                      </p>
                      <p>{expiryDate.toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
                onClick={handleDownloadCoupon}
                disabled={isDownloading}
                className='mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed'
            >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download Code
                  </>
                )}
            </button>

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