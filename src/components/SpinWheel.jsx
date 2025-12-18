/** @format */

import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const SpinWheel = ({
  segments,
  onSpinComplete,
  isSpinning,
  onSpinStart,
  targetedCoupons,
}) => {
  const totalSegments = segments.length;
  const segmentAngle = 360 / totalSegments;

  const [rotation, setRotation] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wheelRef = useRef(null);
  const audioRef = useRef(null);

  // --- CONFIGURATION ---
  const wheelSize = 400;
  const center = wheelSize / 2;
  const radius = wheelSize / 2 - 20;

  const fallbackColors = [
    "#E91E63", "#FF4081", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#00BCD4", "#009688", "#4CAF50", "#8BC34A",
    "#CDDC39", "#FFEB3B", "#FF9800", "#FF5722", "#795548", "#9E9E9E"
  ];

  // --- RESPONSIVE CHECKER ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- AUDIO SETUP ---
  useEffect(() => {
    if (typeof window !== "undefined" && window.AudioContext) {
      audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, []);

  const playTickSound = () => {
    if (audioRef.current && audioRef.current.state === "running") {
      const oscillator = audioRef.current.createOscillator();
      const gainNode = audioRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioRef.current.destination);
      oscillator.frequency.setValueAtTime(800, audioRef.current.currentTime);
      oscillator.type = "sine";
      gainNode.gain.setValueAtTime(0.05, audioRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioRef.current.currentTime + 0.05);
      oscillator.start(audioRef.current.currentTime);
      oscillator.stop(audioRef.current.currentTime + 0.05);
    }
  };

  useEffect(() => {
    let tickInterval;
    if (isSpinning) {
      // Tick faster or slower depending on preference
      tickInterval = setInterval(playTickSound, 150);
    }
    return () => {
      if (tickInterval) clearInterval(tickInterval);
    };
  }, [isSpinning]);

  // --- CRITICAL: THE TARGETING MATH ---
  const spinWheel = () => {
    if (isSpinning || isWaiting) return;

    onSpinStart();

    // 1. Identify Valid Targets
    const targetedSegments = [];
    segments.forEach((segment, index) => {
      // Robust ID Extraction
      let segmentId = null;
      if (typeof segment === 'string') segmentId = segment;
      else if (segment.coupon && segment.coupon._id) segmentId = segment.coupon._id;
      else if (segment._id) segmentId = segment._id;
      else if (segment.id) segmentId = segment.id;

      // Check against targeted list
      if (segmentId && targetedCoupons && targetedCoupons.some(tId => String(tId) === String(segmentId))) {
        targetedSegments.push(index);
      }
    });

    // 2. Choose Winner
    const availableTargets = targetedSegments.length > 0
      ? targetedSegments
      : Array.from({ length: totalSegments }, (_, i) => i);

    const randomIndex = Math.floor(Math.random() * availableTargets.length);
    const winningIndex = availableTargets[randomIndex];

    // 3. Calculate Geometry
    // Because your SVG starts drawing at -90deg (12 o'clock), Index 0 is ALREADY at the top.
    // Index 1 is at [segmentAngle] degrees.
    // To get Index 1 to the top, we must rotate the wheel 360 - [segmentAngle].
    
    // Position of the WINNER relative to the start (0 degrees)
    const segmentCenterAngle = (winningIndex * segmentAngle) + (segmentAngle / 2);

    // Calculate Target Rotation:
    // We want the wheel to land such that the winner is at 0 (Top).
    // Formula: 360 - (Location of winner)
    const targetBaseAngle = 360 - segmentCenterAngle;

    // Add Random Offset (Jitter) to land randomly within the slice (+/- 40% of slice width)
    const randomOffset = (Math.random() - 0.5) * (segmentAngle * 0.8);
    
    // Calculate distance needed to travel from CURRENT rotation
    const currentModulo = rotation % 360;
    let distanceToTravel = (targetBaseAngle + randomOffset) - currentModulo;

    // Ensure we always spin FORWARD (Positive/Clockwise)
    if (distanceToTravel < 0) {
      distanceToTravel += 360;
    }

    // Add multiple full spins (e.g., 8 full rotations)
    const extraSpins = 360 * 8;
    const finalRotation = rotation + extraSpins + distanceToTravel;

    setRotation(finalRotation);

    setTimeout(() => {
      setIsWaiting(true);
      setTimeout(() => {
        setIsWaiting(false);
        onSpinComplete(segments[winningIndex]);
      }, 1000);
    }, 8000); // Must match CSS transition duration
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 w-full overflow-hidden">
      
      <div className="relative w-[80vw] max-w-[320px] md:max-w-[400px] aspect-square">
        
        {/* OUTER RIM */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
          viewBox={`0 0 ${wheelSize} ${wheelSize}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BF953F" />
              <stop offset="25%" stopColor="#FCF6BA" />
              <stop offset="50%" stopColor="#B38728" />
              <stop offset="75%" stopColor="#FBF5B7" />
              <stop offset="100%" stopColor="#AA771C" />
            </linearGradient>
            <filter id="hubShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.5"/>
            </filter>
            <filter id="textShadow">
               <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.5)" />
            </filter>
          </defs>
          
          <circle cx={center} cy={center} r={radius + 15} fill="none" stroke="url(#goldGradient)" strokeWidth="16"/>
          <circle cx={center} cy={center} r={radius + 8} fill="none" stroke="#7a5c1c" strokeWidth="2"/>
        </svg>

        {/* ROTATING WHEEL */}
        <div
          className="absolute top-0 left-0 w-full h-full rounded-full overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 8s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)"
          }}
          ref={wheelRef}
        >
          <svg 
            className="w-full h-full" 
            viewBox={`0 0 ${wheelSize} ${wheelSize}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {segments.map((segment, index) => {
              // Note: -90 aligns Index 0 to the top (12 o'clock)
              const startAngle = index * segmentAngle - 90;
              const endAngle = (index + 1) * segmentAngle - 90;

              const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
              const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
              const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
              const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);

              const largeArcFlag = segmentAngle > 180 ? 1 : 0;

              const pathData = [
                `M ${center} ${center}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                "Z",
              ].join(" ");

              const textAngle = (startAngle + endAngle) / 2;
              const textRadius = radius * 0.58; 
              const textX = center + textRadius * Math.cos((textAngle * Math.PI) / 180);
              const textY = center + textRadius * Math.sin((textAngle * Math.PI) / 180);
              
              const segmentColor = segment.color || fallbackColors[index % fallbackColors.length];
              const discountText = segment.coupon?.discount ? `${segment.coupon.discount}%` : segment.offer ? `${segment.offer}%` : "";
              const mainText = segment.name || segment.productName || (typeof segment === 'string' ? "PRIZE" : "WIN");
              
              const fontSize = isMobile 
                ? (totalSegments > 12 ? '10px' : '12px') 
                : (totalSegments > 12 ? '12px' : '15px');

              return (
                <g key={segment.id || segment._id || index}>
                  <path
                    d={pathData}
                    fill={segmentColor}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    transform={`rotate(${textAngle + 180}, ${textX}, ${textY})`}
                    style={{ 
                        fontSize: fontSize,
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 'bold',
                        filter: "url(#textShadow)",
                        pointerEvents: "none"
                    }}
                  >
                      <tspan x={textX} dy={discountText ? "-0.6em" : "0.3em"}>
                        {mainText.substring(0, 12).toUpperCase()}
                      </tspan>
                      {discountText && (
                        <tspan x={textX} dy="1.3em" fontSize="0.85em">
                            {discountText} OFF
                        </tspan>
                      )}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* CENTER HUB */}
        <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
            onClick={spinWheel}
            style={{ width: '20%', height: '20%' }}
        >
          <svg width="100%" height="100%" viewBox="0 0 80 80" className="cursor-pointer transition-transform hover:scale-105 active:scale-95 touch-action-manipulation">
            <g filter="url(#hubShadow)">
                <circle cx="40" cy="40" r="36" fill="url(#goldGradient)" stroke="#96711c" strokeWidth="2"/>
                <circle cx="40" cy="40" r="28" fill="url(#goldGradient)" stroke="#FFF" strokeOpacity="0.5" strokeWidth="3" />
                <text x="40" y="45" textAnchor="middle" fill="#3e2d0a" fontSize="14" fontWeight="900">
                    {isWaiting ? "WAIT" : "SPIN"}
                </text>
            </g>
          </svg>
        </div>

        {/* POINTER - FIXED AT TOP */}
        <div 
            className="absolute -top-[5%] left-1/2 transform -translate-x-1/2 z-40 drop-shadow-lg"
            style={{ width: '12%', height: 'auto' }}
        >
         <svg width="100%" height="100%" viewBox="0 0 45 55">
             <path d="M 22.5 55 L 6 22 Q 0 11 11 6 L 22.5 0 L 34 6 Q 45 11 39 22 Z" fill="url(#goldGradient)" stroke="#7a5c1c" strokeWidth="2" />
         </svg>
        </div>

        {/* DECORATIVE RIVETS */}
        <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-20" 
            viewBox={`0 0 ${wheelSize} ${wheelSize}`}
            preserveAspectRatio="xMidYMid meet"
        >
            {Array.from({ length: 12 }, (_, i) => {
              const angle = i * 30 * (Math.PI / 180);
              const r = radius + 8; 
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              return <circle key={i} cx={x} cy={y} r="5" fill="url(#goldGradient)" stroke="#7a5c1c" strokeWidth="1" />;
            })}
        </svg>

      </div>

      <button
        onClick={spinWheel}
        disabled={isSpinning || isWaiting}
        className={`mt-8 sm:mt-10 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 touch-action-manipulation ${
          isSpinning || isWaiting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-700"
        }`}
      >
        {isSpinning ? "SPINNING..." : isWaiting ? "PROCESSING..." : "SPIN THE WHEEL"}
      </button>
    </div>
  );
};

SpinWheel.propTypes = {
  segments: PropTypes.array.isRequired,
  onSpinComplete: PropTypes.func.isRequired,
  isSpinning: PropTypes.bool.isRequired,
  onSpinStart: PropTypes.func.isRequired,
  targetedCoupons: PropTypes.arrayOf(PropTypes.string),
};

export default SpinWheel;