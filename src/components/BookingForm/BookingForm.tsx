import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ProgressBar from "./ProgressBar";
import PersonalInfo from "./Steps/PersonalInfo";
import GoalsExpectations from "./Steps/GoalsExpectations";
import Investment from "./Steps/Investment";
import SessionPreferences from "./Steps/SessionPreferences";
import Payment from "./Steps/Payment";
import FinalThoughts from "./Steps/FinalThoughts";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

type FormData = {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age?: string;
  location: string;
  occupation: string;
  description: string;

  // Goals & Expectations
  goals: string[];
  outcomes: string;
  challenges: string;

  // Investment
  commitmentLevel: number;
  resourceInvestment: string;
  openToStrategies: boolean;

  // Session Preferences
  package: number;
  distributeSession?: boolean;
  availableDays: string[];
  timeRange: string;
  platform: string;

  // Payment
  paymentMethod: string;
  billingStreet?: string;
  billingCity?: string;
  termsAccepted: boolean;

  // Final Thoughts
  additionalInfo?: string;
  followUpCall: boolean;
  followUpTime?: string;
};

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm<FormData>();

  const handleNextStep = async () => {
    const fields = await form.trigger();
    if (fields) {
      if (currentStep === 6) {
        // Submit form
        const data = form.getValues();
        console.log("Form submitted:", data);
        toast.success("Booking submitted successfully! We'll be in touch soon.");
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, 6));
      }
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfo form={form} />;
      case 2:
        return <GoalsExpectations form={form} />;
      case 3:
        return <Investment form={form} />;
      case 4:
        return <SessionPreferences form={form} />;
      case 5:
        return <Payment form={form} />;
      case 6:
        return <FinalThoughts form={form} />;
      default:
        return <div>Step {currentStep} coming soon...</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Book Your One-on-One Call with Resk'Que
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for choosing to work with Resk'Que! We're excited to help you
          achieve your goals through personalized guidance and support.
        </p>
      </div>

      <ProgressBar currentStep={currentStep} totalSteps={6} />

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">{renderStep()}</div>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          onClick={handleNextStep}
          disabled={false}
          className="flex items-center gap-2"
        >
          {currentStep === 6 ? "Submit Booking" : "Next"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;