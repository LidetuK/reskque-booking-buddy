import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import SelectionBox from "./SelectionBox";

const FOCUS_AREAS = [
  "Mindset",
  "Health",
  "Business",
  "Happiness",
  "Wealth",
  "Relationships",
  "Leadership",
];

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area)
        ? prev.filter((a) => a !== area)
        : [...prev, area]
    );
  };

  const handleNextStep = () => {
    if (selectedAreas.length > 0) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fadeIn">
      <ProgressBar currentStep={currentStep} totalSteps={5} />
      
      <div className="space-y-8">
        <h1 className="text-4xl font-bold mb-12">
          What areas of your life do you want to focus on?
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FOCUS_AREAS.map((area) => (
            <SelectionBox
              key={area}
              label={area}
              selected={selectedAreas.includes(area)}
              onClick={() => toggleArea(area)}
            />
          ))}
        </div>

        <button
          onClick={handleNextStep}
          className={`mt-8 px-8 py-3 rounded-full bg-black text-white font-medium
            transition-all duration-200 hover:bg-gray-800
            ${selectedAreas.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={selectedAreas.length === 0}
        >
          Next step
        </button>
      </div>
    </div>
  );
};

export default BookingForm;