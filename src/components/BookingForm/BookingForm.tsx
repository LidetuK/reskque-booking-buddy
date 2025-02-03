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
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  age: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  occupation: z.string().min(1, "Occupation is required"),
  description: z.string().min(1, "Please provide a brief description"),

  // Goals & Expectations
  goals: z.array(z.string()).min(1, "Please select at least one goal"),
  outcomes: z.string().min(1, "Please describe your desired outcomes"),
  challenges: z.string().min(1, "Please describe your challenges"),

  // Investment
  commitmentLevel: z.number().min(1).max(10),
  resourceInvestment: z.string().min(1, "Please describe your resource investment"),
  openToStrategies: z.boolean(),

  // Session Preferences
  package: z.number().min(1),
  distributeSession: z.boolean().optional(),
  availableDays: z.array(z.string()).min(1, "Please select at least one day"),
  timeRange: z.string().min(1, "Please select a time range"),
  platform: z.string().min(1, "Please select a platform"),

  // Payment
  paymentMethod: z.string().min(1, "Please select a payment method"),
  billingStreet: z.string().optional(),
  billingCity: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms to continue",
  }),

  // Final Thoughts
  additionalInfo: z.string().optional(),
  followUpCall: z.boolean(),
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

  const handleNextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    
    try {
      await form.trigger(fieldsToValidate);
      const formState = form.formState;
      
      // Check if there are any errors for the current step's fields
      const hasErrors = fieldsToValidate.some(
        field => formState.errors[field]
      );

      if (!hasErrors) {
        if (currentStep === 6) {
          // Submit form
          const data = form.getValues();
          console.log("Form submitted:", data);
          toast.success("Booking submitted successfully! We'll be in touch soon.");
        } else {
          setCurrentStep((prev) => Math.min(prev + 1, 6));
        }
      } else {
        toast.error("Please fill in all required fields before proceeding.");
      }
    } catch (error) {
      console.error("Validation error:", error);
      toast.error("Please fill in all required fields before proceeding.");
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
