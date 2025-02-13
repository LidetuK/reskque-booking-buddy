
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "../ui/button";
import ProgressBar from "./ProgressBar";
import DateSelection from "./Steps/DateSelection";
import PersonalInfo from "./Steps/PersonalInfo";
import GoalsExpectations from "./Steps/GoalsExpectations";
import Investment from "./Steps/Investment";
import SessionPreferences from "./Steps/SessionPreferences";
import Payment from "./Steps/Payment";
import FinalThoughts from "./Steps/FinalThoughts";
import SubmissionSuccess from "./components/SubmissionSuccess";

import { formSchema, FormData } from "./config/formSchema";
import { getFieldsForStep } from "./utils/stepUtils";
import { handleSubmitToWeb3Forms } from "./services/formSubmission";

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const handleNextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    
    // Check if the required fields for the current step are filled
    const hasEmptyFields = fields.some(
      (field) => !form.getValues(field)
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all required fields before proceeding.");
      return;
    }

    if (currentStep === 7) {
      setIsSubmitting(true);
      const data = form.getValues();
      const success = await handleSubmitToWeb3Forms(data);
      if (success) {
        setIsSubmitted(true);
      }
      setIsSubmitting(false);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 7));
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    if (isSubmitted && currentStep === 7) {
      return <SubmissionSuccess />;
    }

    switch (currentStep) {
      case 1:
        return <DateSelection form={form} />;
      case 2:
        return <PersonalInfo form={form} />;
      case 3:
        return <GoalsExpectations form={form} />;
      case 4:
        return <Investment form={form} />;
      case 5:
        return <SessionPreferences form={form} />;
      case 6:
        return <Payment form={form} />;
      case 7:
        return <FinalThoughts form={form} />;
      default:
        return <div>Step {currentStep} coming soon...</div>;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-8 animate-fadeIn">
      <ProgressBar currentStep={currentStep} totalSteps={7} />

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 mb-8 overflow-x-hidden">
        {renderStep()}
      </div>

      {(!isSubmitted || currentStep !== 7) && (
        <div className="flex justify-between mt-4 sm:mt-8">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 1 || isSubmitting}
            className="flex items-center gap-2 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            onClick={handleNextStep}
            disabled={isSubmitting}
            className="flex items-center gap-2 text-sm sm:text-base"
          >
            {currentStep === 7 ? (isSubmitting ? "Submitting..." : "Submit Booking") : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
