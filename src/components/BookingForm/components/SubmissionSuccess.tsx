
import React from "react";

const SubmissionSuccess = () => {
  return (
    <div className="text-center py-8 space-y-4 animate-fadeIn">
      <h2 className="text-2xl font-bold text-black mb-4">
        Thank you for Submitting Your Details!
      </h2>
      <p className="text-lg text-black leading-relaxed max-w-2xl mx-auto">
        Your booking will be confirmed, and you'll receive a calendar invite along
        with payment instructions. Thank you for trusting us to support you on your
        journey!
      </p>
      <div className="mt-6">
        <svg
          className="w-16 h-16 text-black mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
