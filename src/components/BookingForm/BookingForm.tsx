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
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  // Personal Info
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  age: z.string().optional(),
  location: z.string().optional(),
  occupation: z.string().optional(),
  description: z.string().optional(),

  // Goals & Expectations
  goals: z.array(z.string()).optional(),
  outcomes: z.string().optional(),
  challenges: z.string().optional(),

  // Investment
  commitmentLevel: z.number().optional(),
  resourceInvestment: z.string().optional(),
  openToStrategies: z.boolean().optional(),

  // Session Preferences
  package: z.number().optional(),
  distributeSession: z.boolean().optional(),
  availableDays: z.array(z.string()).optional(),
  timeRange: z.string().optional(),
  platform: z.string().optional(),

  // Payment
  paymentMethod: z.string().optional(),
  billingStreet: z.string().optional(),
  billingCity: z.string().optional(),
  termsAccepted: z.boolean().optional(),

  // Final Thoughts
  additionalInfo: z.string().optional(),
  followUpCall: z.boolean().optional(),
  followUpTime: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1:
        return [
          "firstName",
          "lastName",
          "email",
          "phoneNumber",
          "location",
          "occupation",
          "description",
        ];
      case 2:
        return ["goals", "outcomes", "challenges"];
      case 3:
        return ["commitmentLevel", "resourceInvestment", "openToStrategies"];
      case 4:
        return ["package", "availableDays", "timeRange", "platform"];
      case 5:
        return ["paymentMethod", "termsAccepted"];
      case 6:
        return ["followUpCall"];
      default:
        return [];
    }
  };

  const handleNextStep = () => {
    if (currentStep === 6) {
      // Submit form
      const data = form.getValues();
      console.log("Form submitted:", data);
      toast.success("Booking submitted successfully! We'll be in touch soon.");
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
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