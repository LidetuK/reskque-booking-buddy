
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const isMobile = useIsMobile();
  
  const steps = [
    "Select Date",
    "Personal Information",
    "Goals & Expectations",
    "Investment",
    "Preferences",
    "Summation",
    "Final Thoughts",
  ];

  return (
    <div className="mb-4 sm:mb-8 overflow-x-auto">
      <div className="flex justify-between items-center min-w-[600px] sm:min-w-0 px-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center ${
              index === steps.length - 1 ? "flex-1" : "flex-1"
            }`}
          >
            <div
              className={`
                relative
                ${
                  index !== steps.length - 1
                    ? "after:content-[''] after:w-full after:h-[2px] after:border-b after:border-gray-300 after:border-4 after:inline-block after:absolute after:top-6 after:min-w-0 after:-right-1/2"
                    : ""
                }
              `}
            >
              <div
                className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                  currentStep > index + 1
                    ? "bg-black text-white"
                    : currentStep === index + 1
                    ? "bg-black text-white"
                    : "bg-gray-300"
                }`}
              >
                <span className="text-xs sm:text-base">{index + 1}</span>
              </div>
            </div>
            <p
              className={`text-[10px] sm:text-sm mt-2 text-center max-w-[80px] sm:max-w-none ${
                currentStep === index + 1 ? "font-semibold" : ""
              }`}
            >
              {isMobile ? step.split(' ')[0] : step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
