// /** @format */

// import { Copy, Check, Download, Ticket, Calendar, Info } from "lucide-react";
// import PropTypes from "prop-types";
// import { useState, useEffect, useRef } from "react";
// import Confetti from "react-confetti";
// import html2canvas from "html2canvas";

// const CouponPage = ({
//   couponDetails,
//   showLoyaltyPoints = false,
//   loyaltyPoints = 0,
//   title = "Your Reward Details 🎁",
//   subtitle = "Here are your coupon details!",
//   isAlreadyClaimed = false,
//   logo,
//   storeName,
// }) => {
//   const [copied, setCopied] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [downloading, setDownloading] = useState(false);
//   const couponRef = useRef(null);
//   const [windowDimensions, setWindowDimensions] = useState({
//     width: typeof window !== "undefined" ? window.innerWidth : 300,
//     height: typeof window !== "undefined" ? window.innerHeight : 200,
//   });

//   useEffect(() => {
//     setShowConfetti(true);
//     const timer = setTimeout(() => setShowConfetti(false), 8000);
//     const handleResize = () =>
//       setWindowDimensions({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     window.addEventListener("resize", handleResize);
//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const handleCopyCode = async () => {
//     if (couponDetails.code) {
//       await navigator.clipboard.writeText(couponDetails.code);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const handleDownloadCoupon = async () => {
//     if (!couponRef.current) return;
//     setDownloading(true);
//     try {
//       const canvas = await html2canvas(couponRef.current, {
//         backgroundColor: "#F8FAFC",
//         scale: 3,
//         useCORS: true,
//       });
//       const link = document.createElement("a");
//       link.href = canvas.toDataURL("image/png");
//       link.download = `coupon-${couponDetails.code || "voucher"}.png`;
//       link.click();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setDownloading(false);
//     }
//   };

//   const getTheme = () => {
//     const themes = {
//       percentage: {
//         gradient: "from-orange-500 to-red-600",
//         text: "text-orange-600",
//         bg: "bg-orange-50",
//         border: "border-orange-200",
//       },
//       amount: {
//         gradient: "from-emerald-500 to-teal-600",
//         text: "text-emerald-600",
//         bg: "bg-emerald-50",
//         border: "border-emerald-200",
//       },
//       product: {
//         gradient: "from-blue-600 to-indigo-700",
//         text: "text-indigo-600",
//         bg: "bg-indigo-50",
//         border: "border-indigo-200",
//       },
//     };
//     return themes[couponDetails.couponType] || themes.percentage;
//   };

//   const theme = getTheme();
//   const expiryDate = couponDetails.expiryDate
//     ? new Date(couponDetails.expiryDate)
//     : null;

//   return (
//     <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 sm:p-8">
//       {showConfetti && (
//         <Confetti
//           width={windowDimensions.width}
//           height={windowDimensions.height}
//           recycle={false}
//         />
//       )}

//       <div className="max-w-xl w-full space-y-8">
//         <div className="text-center space-y-2">
//           <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
//             {title}
//           </h1>
//           <p className="text-slate-500 font-medium">{subtitle}</p>
//         </div>

//         {/* --- PREMIUM VOUCHER DESIGN --- */}
//         <div ref={couponRef} className="relative group perspective-1000">
//           <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 relative">
//             {/* Top Branding Section */}
//             <div
//               className={`bg-gradient-to-r ${theme.gradient} p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white`}
//             >
//               <div className="flex items-center gap-4">
//                 {logo ? (
//                   <div className="bg-white p-2 rounded-xl shadow-lg">
//                     <img
//                       src={logo}
//                       alt="brand"
//                       className="h-12 w-12 object-contain"
//                     />
//                   </div>
//                 ) : (
//                   <Ticket className="w-10 h-10 opacity-90" />
//                 )}
//                 <div className="text-center sm:text-left">
//                   <h2 className="text-xl font-black tracking-widest uppercase">
//                     {storeName || "Premium Member"}
//                   </h2>
//                   <p className="text-[10px] font-bold opacity-80 tracking-[0.2em]">
//                     OFFICIAL STORE VOUCHER
//                   </p>
//                 </div>
//               </div>
//               <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
//                 <span className="text-xs font-black tracking-tighter uppercase">
//                   {isAlreadyClaimed ? "Redeemed" : "Valid Offer"}
//                 </span>
//               </div>
//             </div>

//             {/* Main Content Area */}
//             <div className="p-8 relative">
//               {/* Decorative Notches */}
//               <div className="absolute top-1/2 -left-4 w-8 h-8 bg-slate-100 rounded-full shadow-inner -translate-y-1/2 border border-slate-200"></div>
//               <div className="absolute top-1/2 -right-4 w-8 h-8 bg-slate-100 rounded-full shadow-inner -translate-y-1/2 border border-slate-200"></div>

//               <div className="text-center space-y-4">
//                 <div
//                   className={`${theme.text} text-6xl sm:text-7xl font-black tracking-tighter`}
//                 >
//                   {couponDetails.couponType === "percentage"
//                     ? `${couponDetails.discount}%`
//                     : `₹${couponDetails.discount}`}
//                   <span className="text-xl block -mt-2 opacity-50 mt-5 uppercase tracking-[0.3em]">
//                     Off Your Order
//                   </span>
//                 </div>

//                 <div className="space-y-1">
//                   <h3 className="text-2xl font-bold text-slate-800">
//                     {couponDetails.name}
//                   </h3>
//                   <p className="text-slate-500 text-sm max-w-sm mx-auto">
//                     {couponDetails.description}
//                   </p>
//                 </div>

//                 {/* Dotted Separator */}
//                 <div className="py-4 flex items-center gap-4 opacity-20">
//                   <div className="flex-1 border-t-2 border-dashed border-slate-900"></div>
//                   <Ticket className="w-5 h-5 text-slate-900" />
//                   <div className="flex-1 border-t-2 border-dashed border-slate-900"></div>
//                 </div>

//                 {/* CENTERED VALIDITY & TERMS */}
//                 <div className="flex flex-col items-center justify-center gap-6">
//                   <div className="flex flex-wrap justify-center gap-8">
//                     <div className="text-center">
//                       <div className="flex items-center justify-center gap-1.5 text-slate-400 mb-1">
//                         <Calendar className="w-3.5 h-3.5" />
//                         <span className="text-[10px] font-bold uppercase tracking-widest">
//                           Valid Until
//                         </span>
//                       </div>
//                       <p className="text-sm font-black text-slate-700">
//                         {expiryDate
//                           ? expiryDate.toLocaleDateString("en-IN", {
//                               day: "2-digit",
//                               month: "long",
//                               year: "numeric",
//                             })
//                           : "Unlimited"}
//                       </p>
//                     </div>

//                     {couponDetails.condition && (
//                       <div className="text-center">
//                         <div className="flex items-center justify-center gap-1.5 text-slate-400 mb-1">
//                           <Info className="w-3.5 h-3.5" />
//                           <span className="text-[10px] font-bold uppercase tracking-widest">
//                             Requirement
//                           </span>
//                         </div>
//                         <p className="text-sm font-black text-slate-700">
//                           {couponDetails.conditionMessage}
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   {/* Promo Code Box */}
//                   {couponDetails.code && (
//                     <div className="w-full max-w-xs group/code relative">
//                       <div className="absolute -inset-1 bg-gradient-to-r from-slate-200 to-slate-100 rounded-xl blur opacity-25 group-hover/code:opacity-50 transition duration-1000"></div>
//                       <div className="relative flex items-center bg-slate-50 border-2 border-slate-200 rounded-xl overflow-hidden">
//                         <div className="flex-1 py-4 px-6 text-center font-mono text-xl font-black tracking-[0.3em] text-slate-800">
//                           {isAlreadyClaimed ? "••••••••" : couponDetails.code}
//                         </div>
//                         {!isAlreadyClaimed && (
//                           <button
//                             onClick={handleCopyCode}
//                             className={`p-4 transition-colors ${
//                               copied
//                                 ? "bg-green-500 text-white"
//                                 : "bg-slate-800 text-white hover:bg-black"
//                             }`}
//                           >
//                             {copied ? (
//                               <Check className="w-6 h-6" />
//                             ) : (
//                               <Copy className="w-6 h-6" />
//                             )}
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Footer Tagline */}
//             {couponDetails.offerMessage && (
//               <div className="bg-slate-50 border-t border-slate-100 p-3 text-center">
//                 <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
//                   ✨ {couponDetails.offerMessage} ✨
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col gap-3">
//           <button
//             onClick={handleDownloadCoupon}
//             disabled={downloading}
//             className={`w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50`}
//           >
//             <Download className="w-5 h-5" />
//             {downloading ? "Preparing your voucher..." : "Download as Image"}
//           </button>

//           {showLoyaltyPoints && (
//             <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
//               +{loyaltyPoints} Points will be added to your wallet
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CouponPage;

/** @format */

/** @format */

import { Copy, Check, Download, Ticket, Calendar } from "lucide-react";
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
  logo,
  storeName,
}) => {
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [base64Logo, setBase64Logo] = useState(null);
  const couponRef = useRef(null);

  // FIX: Convert the logo to Base64 so html2canvas can definitely "see" it
  useEffect(() => {
    if (logo) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        setBase64Logo(canvas.toDataURL("image/png"));
      };
      img.onerror = () => setBase64Logo(logo); // Fallback to original if conversion fails
      img.src = logo;
    }
  }, [logo]);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyCode = async () => {
    if (couponDetails.code) {
      await navigator.clipboard.writeText(couponDetails.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadCoupon = async () => {
    if (!couponRef.current) return;
    setDownloading(true);

    setTimeout(async () => {
      try {
        const canvas = await html2canvas(couponRef.current, {
          backgroundColor: "#F1F5F9",
          scale: 3,
          useCORS: false,
          allowTaint: true,
        });

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png", 1.0);
        link.download = `coupon-${couponDetails.code || "reward"}.png`;
        link.click();
      } catch (err) {
        console.error("Capture Error:", err);
      } finally {
        setDownloading(false);
      }
    }, 500);
  };

  const theme = {
    grad: "from-yellow-400 to-orange-500",
    text: "text-orange-500",
  };

  const expiryDate = couponDetails.expiryDate
    ? new Date(couponDetails.expiryDate)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute top-0 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-yellow-400 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2'></div>
        <div className='absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-blue-400 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-purple-400 rounded-full blur-3xl'></div>
      </div>

      {showConfetti && <Confetti recycle={false} />}

      <div className="max-w-xl w-full flex flex-col items-center relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-white drop-shadow-lg">{title}</h1>
          <p className="text-slate-200 font-medium drop-shadow-md">{subtitle}</p>
        </div>

        {/* --- COUPON CARD --- */}
        <div
          ref={couponRef}
          className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-200 w-full max-w-[500px]"
        >
          {/* Header */}
          <div
            className={`bg-gradient-to-r ${theme.grad} p-8 flex items-center justify-between text-white`}
          >
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-2xl shadow-sm h-14 w-14 flex items-center justify-center overflow-hidden">
                {/* Use base64Logo for the UI and the Capture */}
                {base64Logo || logo ? (
                  <img
                    src={couponDetails.logo}
                    alt="logo"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Ticket className="text-orange-500 w-8 h-8" />
                )}
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-black uppercase tracking-wider leading-none">
                  {storeName }
                </h2>
                <span className="text-[10px] font-bold opacity-70 mt-1.5 tracking-widest">
                  OFFICIAL VOUCHER
                </span>
              </div>
            </div>

            <div className="bg-white/20 px-4 py-2 rounded-full border border-white/20">
              <span className="text-[10px] font-black uppercase tracking-tighter">
                Valid Offer
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-10 flex flex-col items-center text-center bg-white">
            {/* VALUE SECTION: Fixed fontSize and lineHeight to stop overlapping */}
            <div
              className="flex flex-col items-center justify-center w-full mb-8"
              style={{ minHeight: "110px" }}
            >
              <div
                className={`${theme.text} font-black tracking-tighter`}
                style={{
                  fontSize: "72px",
                  lineHeight: "1",
                  marginBottom: "8px",
                }}
              >
                {couponDetails.couponType === "percentage"
                  ? `${couponDetails.discount}%`
                  : `₹${couponDetails.discount}`}
              </div>
              <div className="text-[12px] font-black text-slate-300 tracking-[0.4em] uppercase">
                Off Your Purchase
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-800 leading-tight">
                {couponDetails.name}
              </h3>
              <p className="text-slate-400 text-xs font-medium mt-2 uppercase tracking-widest">
                {couponDetails.description}
              </p>
            </div>

            <div className="w-full border-t-2 border-dashed border-slate-100 my-4 relative">
              <div className="absolute -left-[54px] -top-4 w-8 h-8 bg-slate-50 rounded-full border border-slate-200 shadow-inner"></div>
              <div className="absolute -right-[54px] -top-4 w-8 h-8 bg-slate-50 rounded-full border border-slate-200 shadow-inner"></div>
            </div>

            <div className="w-full flex flex-col items-center py-4 bg-white">
              <div className="flex items-center gap-2 text-slate-300 mb-1">
                <Calendar size={12} />
                <span className="text-[9px] font-black uppercase tracking-widest">
                  Valid Until
                </span>
              </div>
              <p className="text-sm font-black text-slate-700 uppercase">
                {expiryDate
                  ? expiryDate.toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "30 APR 2027"}
              </p>
            </div>

            {/* Code Box */}
            <div className="w-full max-w-[340px] flex items-stretch bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden mt-6 shadow-sm">
              <div className="flex-1 py-4 font-mono text-2xl font-black tracking-[0.3em] text-slate-800 text-center pl-4">
                { couponDetails.code || "CODE"}
              </div>
              {!isAlreadyClaimed && (
                <button
                  onClick={handleCopyCode}
                  className={`px-6 transition-colors flex items-center justify-center ${
                    copied ? "bg-green-500" : "bg-slate-900"
                  } text-white`}
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              )}
            </div>
          </div>

          <div className="bg-slate-50/50 py-4 border-t border-slate-100 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
              {couponDetails.offerMessage ||
                "Thank you for being a valued customer"}
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadCoupon}
          disabled={downloading}
          className="mt-8 w-full max-w-[500px] bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
        >
          <Download size={20} />
          {downloading ? "Saving Image..." : "Download Coupon"}
        </button>
      </div>
    </div>
  );
};

export default CouponPage;
