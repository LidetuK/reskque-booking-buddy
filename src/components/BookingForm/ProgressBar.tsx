
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
    <div className="mb-4 sm:mb-8">
      <div className="flex justify-between items-center px-1 sm:px-2 max-w-full overflow-x-hidden">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center flex-1 ${
              isMobile ? 'px-1' : ''
            }`}
          >
            <div
              className={`
                relative
                ${
                  index !== steps.length - 1
                    ? "after:content-[''] after:w-full after:h-[1px] after:border-b after:border-gray-300 after:border-2 after:inline-block after:absolute after:top-3 sm:after:top-6 after:min-w-0 after:-right-1/2"
                    : ""
                }
              `}
            >
              <div
                className={`w-6 h-6 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                  currentStep > index + 1
                    ? "bg-black text-white"
                    : currentStep === index + 1
                    ? "bg-black text-white"
                    : "bg-gray-300"
                }`}
              >
                <span className={`${isMobile ? 'text-[10px]' : 'text-base'}`}>{index + 1}</span>
              </div>
            </div>
            <p
              className={`text-[8px] sm:text-sm mt-1 sm:mt-2 text-center ${
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
