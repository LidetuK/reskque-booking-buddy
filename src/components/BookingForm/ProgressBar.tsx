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
    "Payment",
    "Final Thoughts"
  ];

  return (
    <div className="w-full mb-12">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${(currentStep / totalSteps) * 100}%`,
            backgroundColor: "#FF0000"
          }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`text-xs font-medium ${
              index + 1 <= currentStep ? "text-black" : "text-gray-400"
            }`}
            style={{ width: "16.66%" }}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;