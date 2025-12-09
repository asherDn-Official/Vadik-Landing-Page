/** @format */

import { XCircle, Clock, AlertTriangle } from "lucide-react";
import PropTypes from "prop-types";

const CouponExpired = ({
  title = "Coupon Expired",
  message = "This coupon has expired or is no longer valid.",
  showRetry = false,
  onRetry,
}) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-3 sm:p-4'>
      <div className='max-w-md w-full px-3 sm:px-4'>
        <div className='bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 text-center'>
          <div className='w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6'>
            <XCircle className='w-10 h-10 sm:w-12 sm:h-12 text-red-600' />
          </div>

          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4'>
            {title}
          </h1>
          <p className='text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6'>
            {message}
          </p>

          <div className='bg-gradient-to-r from-red-100 to-orange-100 p-4 sm:p-6 rounded-xl mb-4 sm:mb-6'>
            <div className='flex items-center justify-center mb-2 sm:mb-3'>
              <Clock className='w-5 h-5 sm:w-6 sm:h-6 text-red-600 mr-2' />
              <span className='text-red-700 font-semibold text-sm sm:text-base'>
                Time Expired
              </span>
            </div>
            <p className='text-xs sm:text-sm text-red-600'>
              This offer is no longer available. Please try again later or
              contact support.
            </p>
          </div>

          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm sm:text-base'
            >
              Try Again
            </button>
          )}

          <div className='mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 rounded-lg border border-yellow-200'>
            <div className='flex items-center justify-center mb-2'>
              <AlertTriangle className='w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2' />
              <span className='text-yellow-700 font-medium text-xs sm:text-sm'>
                Need Help?
              </span>
            </div>
            <p className='text-xs text-yellow-600'>
              If you believe this is an error, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

CouponExpired.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  showRetry: PropTypes.bool,
  onRetry: PropTypes.func,
};

export default CouponExpired;
