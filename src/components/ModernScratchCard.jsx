/** @format */

import { useState, useEffect, useRef } from "react";
import { Gift, Lock, Play, Zap } from "lucide-react";
import PropTypes from "prop-types";

const ModernScratchCard = ({
  offer,
  title,
  onContinueQuiz,
  isLoading = false,
  isLocked = false,
  onQuizClick,
  couponData,
}) => {
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showCouponDetails, setShowCouponDetails] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = 320;
    canvas.height = 320;
    drawScratchSurface(ctx);
  }, []);

  const drawScratchSurface = (ctx) => {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#ec4899");
    gradient.addColorStop(1, "#db2777");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    const dotSize = Math.min(width, height) / 40;
    const spacing = Math.min(width, height) / 8;

    for (let i = 0; i < 50; i++) {
      const x = (i % 8) * spacing + spacing / 2;
      const y = Math.floor(i / 8) * spacing + spacing / 2;
      if (x < width && y < height) {
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, Math.min(width, height) / 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to reveal!", width / 2, height / 2 + 60);
  };

  const getMousePos = (canvas, e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const getTouchPos = (canvas, e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.touches[0].clientX - rect.left) * scaleX,
      y: (e.touches[0].clientY - rect.top) * scaleY,
    };
  };

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 40;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (!isScratching) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.globalCompositeOperation = "source-over";
    checkScratchedArea();
  };

  const checkScratchedArea = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      let transparentPixels = 0;
      const totalPixels = canvas.width * canvas.height;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) {
          transparentPixels++;
        }
      }

      const scratchedPercentage = (transparentPixels / totalPixels) * 100;

      if (scratchedPercentage >= 45 && !isRevealed) {
        setIsRevealed(true);

        setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          setShowCouponDetails(true);
        }, 300);
      }
    } catch (error) {
      console.error("Error checking scratched area:", error);
    }
  };

  const handleMouseDown = (e) => {
    if (isLocked || isRevealed) return;
    setIsScratching(true);
    const pos = getMousePos(canvasRef.current, e);
    scratch(pos.x, pos.y);
  };

  const handleMouseMove = (e) => {
    if (isScratching && !isLocked && !isRevealed) {
      const pos = getMousePos(canvasRef.current, e);
      scratch(pos.x, pos.y);
    }
  };

  const handleMouseUp = () => {
    setIsScratching(false);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
    }
  };

  const handleTouchStart = (e) => {
    if (isLocked || isRevealed) return;
    e.preventDefault();
    setIsScratching(true);
    const pos = getTouchPos(canvasRef.current, e);
    scratch(pos.x, pos.y);
  };

  const handleTouchMove = (e) => {
    if (isLocked || isRevealed) return;
    e.preventDefault();
    if (isScratching) {
      const pos = getTouchPos(canvasRef.current, e);
      scratch(pos.x, pos.y);
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsScratching(false);
  };

  if (isLocked) {
    return (
      <div className='relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl shadow-lg overflow-hidden cursor-pointer select-none'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 flex flex-col items-center justify-center text-white p-4'>
          <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gray-500 rounded-full flex items-center justify-center mb-3 sm:mb-4'>
            <Lock className='w-6 h-6 sm:w-8 sm:h-8' />
          </div>
          <div className='text-base sm:text-lg font-bold mb-2'>Locked</div>
          <div className='text-xs sm:text-sm text-center px-2 sm:px-4 mb-3 sm:mb-4'>
            Complete the quiz to unlock
          </div>
          <button
            onClick={onQuizClick}
            className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm sm:text-base'
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showCouponDetails) {
    return (
      <div className='relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl shadow-lg overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 flex flex-col items-center justify-center text-white p-4 sm:p-6'>
          <div className='animate-bounce mb-3 sm:mb-4'>
            <Gift className='w-6 h-6 sm:w-9 sm:h-9' />
          </div>
          <div className='text-center mb-4 sm:mb-6'>
            <div className='text-xl sm:text-2xl md:text-2xl font-bold mb-2 animate-pulse'>
              {couponData?.discount
                ? `${couponData.discount}% OFF`
                : `${offer}% OFF`}
            </div>
            <div className='text-sm sm:text-base md:text-lg font-semibold mb-1'>
              {couponData?.name || title}
            </div>
            <div className='text-xs sm:text-sm opacity-90'>
              Congratulations! You&apos;ve unlocked your reward!
            </div>
          </div>
          <button
            onClick={onContinueQuiz}
            disabled={isLoading}
            className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base'
          >
            {isLoading ? (
              <>
                <div className='w-4 h-4 border border-white border-t-transparent rounded-full animate-spin' />
                Loading...
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
    );
  }

  return (
    <div className='relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl shadow-lg overflow-hidden select-none'>
      <div className='absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 flex flex-col items-center justify-center text-white p-4'>
        <div className='animate-pulse'>
          <Gift className='w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4' />
        </div>
        <div className='text-2xl sm:text-3xl font-bold mb-2'>
          {couponData?.discount
            ? `${couponData.discount}% OFF`
            : `${offer}% OFF`}
        </div>
        <div className='text-sm sm:text-base text-center px-2 sm:px-4 mb-3 sm:mb-4'>
          {title}
        </div>
        <div className='text-xs sm:text-sm opacity-80'>Your prize awaits!</div>
      </div>

      <canvas
        ref={canvasRef}
        className='absolute inset-0 w-full h-full cursor-pointer'
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "none" }}
      />
    </div>
  );
};

ModernScratchCard.propTypes = {
  offer: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onContinueQuiz: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isLocked: PropTypes.bool,
  onQuizClick: PropTypes.func,
  couponData: PropTypes.shape({
    discount: PropTypes.number,
    name: PropTypes.string,
  }),
};

export default ModernScratchCard;
