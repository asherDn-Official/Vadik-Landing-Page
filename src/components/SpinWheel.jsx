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

  const wheelRef = useRef(null);
  const audioRef = useRef(null);

  /* -------------------- AUDIO SETUP -------------------- */
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

      oscillator.frequency.setValueAtTime(
        800,
        audioRef.current.currentTime
      );
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(
        0.1,
        audioRef.current.currentTime
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioRef.current.currentTime + 0.1
      );

      oscillator.start(audioRef.current.currentTime);
      oscillator.stop(audioRef.current.currentTime + 0.1);
    }
  };

  useEffect(() => {
    let tickInterval;

    if (isSpinning) {
      tickInterval = setInterval(playTickSound, 200);
    }

    return () => {
      if (tickInterval) clearInterval(tickInterval);
    };
  }, [isSpinning]);

  /* -------------------- SPIN LOGIC -------------------- */
  const spinWheel = () => {
    if (isSpinning) return;

    onSpinStart();

    // Filter targeted segments
    const targetedSegments = [];
    segments.forEach((segment, index) => {
      if (
        segment.coupon &&
        segment.coupon._id &&
        targetedCoupons &&
        targetedCoupons.includes(segment.coupon._id)
      ) {
        targetedSegments.push(index);
      }
    });

    const availableTargets =
      targetedSegments.length > 0
        ? targetedSegments
        : Array.from({ length: totalSegments }, (_, i) => i);

    const randomIndex = Math.floor(
      Math.random() * availableTargets.length
    );
    const selectedSegment = availableTargets[randomIndex];

    const segmentCenter =
      selectedSegment * segmentAngle + segmentAngle / 2;
    const targetAngle = 360 - segmentCenter;

    const randomOffset =
      (Math.random() - 0.5) * (segmentAngle * 0.1);
    const finalAngle = targetAngle + randomOffset;

    const minSpins = 8;
    const maxSpins = 12;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);

    const totalRotation = 360 * spins + finalAngle;

    const wheel = wheelRef.current;
    if (wheel) {
      wheel.style.transition =
        "transform 8s cubic-bezier(0.25, 0.1, 0.25, 1)";
      wheel.style.transform = `rotate(${rotation + totalRotation}deg)`;
    }

    setRotation((prev) => prev + totalRotation);

    setTimeout(() => {
      setIsWaiting(true);

      setTimeout(() => {
        setIsWaiting(false);
        onSpinComplete(segments[selectedSegment]);
      }, 2000);
    }, 8000);
  };

  /* -------------------- RENDER -------------------- */
  return (
    <div className="flex flex-col items-center">
      {/* Pointer */}
      <div className="relative">
        <div className="relative w-full flex justify-center">
          <div
            className="w-0 h-0 border-l-[16px] sm:border-l-[22px] border-r-[16px] sm:border-r-[22px] border-t-[20px] sm:border-t-[30px]
              border-l-transparent border-r-transparent border-t-yellow-400
              drop-shadow-2xl transform translate-y-6 sm:translate-y-9 rotate-180"
            style={{
              filter:
                "drop-shadow(0 6px 12px rgba(255, 215, 0, 0.7)) drop-shadow(0 3px 6px rgba(255, 193, 7, 0.9))",
              background:
                "linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FF8C00 50%, #FFA500 75%, #FFD700 100%)",
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              boxShadow:
                "inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.3)",
              zIndex: 99,
            }}
          />
        </div>
      </div>

      {/* Wheel */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mb-6 sm:mb-8">
        <div className="relative w-full h-full">
          <div
            ref={wheelRef}
            className={`absolute inset-0 rounded-full overflow-hidden ${
              isSpinning ? "animate-pulse" : ""
            }`}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {segments.map((segment, index) => {
                const startAngle = index * segmentAngle - 90;
                const endAngle = (index + 1) * segmentAngle - 90;

                const x1 =
                  100 + 85 * Math.cos((startAngle * Math.PI) / 180);
                const y1 =
                  100 + 85 * Math.sin((startAngle * Math.PI) / 180);
                const x2 =
                  100 + 85 * Math.cos((endAngle * Math.PI) / 180);
                const y2 =
                  100 + 85 * Math.sin((endAngle * Math.PI) / 180);

                const largeArcFlag = segmentAngle > 180 ? 1 : 0;

                const pathData = [
                  "M 100 100",
                  `L ${x1} ${y1}`,
                  `A 85 85 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  "Z",
                ].join(" ");

                const textAngle = (startAngle + endAngle) / 2;
                const textX =
                  100 + 50 * Math.cos((textAngle * Math.PI) / 180);
                const textY =
                  100 + 50 * Math.sin((textAngle * Math.PI) / 180);

                const colors = [
                  "#E91E63",
                  "#FF4081",
                  "#9C27B0",
                  "#673AB7",
                  "#3F51B5",
                  "#2196F3",
                  "#00BCD4",
                  "#009688",
                  "#4CAF50",
                  "#8BC34A",
                  "#CDDC39",
                  "#FFEB3B",
                  "#FF9800",
                  "#FF5722",
                  "#795548",
                  "#9E9E9E",
                ];

                return (
                  <g key={segment.id || index}>
                    <defs>
                      <filter
                        id={`shadow-${index}`}
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                      >
                        <feDropShadow
                          dx="2"
                          dy="2"
                          stdDeviation="3"
                          floodColor="rgba(0,0,0,0.3)"
                        />
                      </filter>
                    </defs>

                    <path
                      d={pathData}
                      fill={colors[index % colors.length]}
                      stroke="#fff"
                      strokeWidth="2"
                      filter={`url(#shadow-${index})`}
                    />

                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      fill="white"
                      fontSize="8"
                      fontWeight="bold"
                      transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                      style={{
                        textShadow:
                          "1px 1px 2px rgba(0,0,0,0.8)",
                      }}
                    >
                      {segment.coupon?.discount
                        ? `${segment.coupon.discount}%`
                        : segment.name || `${(index + 1) * 100}`}
                    </text>
                  </g>
                );
              })}

              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="#DC2626"
                strokeWidth="4"
              />
            </svg>
          </div>

          {/* Center Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div
              onClick={spinWheel}
              className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full border-4 flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 ${
                isWaiting
                  ? "animate-pulse ring-4 ring-green-400 ring-opacity-50"
                  : ""
              }`}
              style={{
                background:
                  "linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FF8C00 50%, #FFA500 75%, #FFD700 100%)",
                border: "4px solid #FF8C00",
              }}
            >
              <span className="text-xs sm:text-sm font-bold text-white">
                {isWaiting ? "WAIT" : "SPIN"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* External Button */}
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className={`px-4 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-md transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          isSpinning
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg"
        }`}
      >
        {isSpinning ? "Spinning..." : "SPIN THE WHEEL!"}
      </button>
    </div>
  );
};

SpinWheel.propTypes = {
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      coupon: PropTypes.object,
    })
  ).isRequired,
  onSpinComplete: PropTypes.func.isRequired,
  isSpinning: PropTypes.bool.isRequired,
  onSpinStart: PropTypes.func.isRequired,
  targetedCoupons: PropTypes.arrayOf(PropTypes.string),
};

export default SpinWheel;