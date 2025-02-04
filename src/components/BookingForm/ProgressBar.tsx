import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const steps = [
    "Personal Information",
    "Goals & Expectations",
    "Investment",
    "Preferences",
    "summation",
    "Submission",
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center flex-1 ${
              index !== steps.length - 1 ? "after:content-[''] after:w-full after:h-[2px] after:border-b after:border-gray-300 after:border-4 after:inline-block after:absolute after:top-6 after:min-w-0 after:-right-1/2" : ""
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                currentStep > index + 1
                  ? "bg-black text-white"
                  : currentStep === index + 1
                  ? "bg-black text-white"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>
            <p className={`text-xs sm:text-sm mt-2 text-center px-1 ${
              currentStep === index + 1 ? "font-semibold" : ""
            }`}>
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
