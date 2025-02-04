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
  currentSituation: z.string().optional(),
  background: z.string().optional(),
  passions: z.string().optional(),
  topThreeGoals: z.string().optional(),
  challenges: z.string().optional(),
  improvementAreas: z.array(z.string()).optional(),
  successVision: z.string().optional(),
  previousAttempts: z.string().optional(),
  supportType: z.array(z.string()).optional(),
  confidenceLevel: z.string().optional(),
  uncertaintyReason: z.string().optional(),

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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
        return [
          "currentSituation",
          "background",
          "passions",
          "topThreeGoals",
          "challenges",
          "improvementAreas",
          "successVision",
          "previousAttempts",
          "supportType",
          "confidenceLevel",
          "uncertaintyReason",
        ];
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

  const handleSubmitToWeb3Forms = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      const formData = {
        access_key: "4cca38c5-c19a-4881-bfb7-2f2c8725e350",
        subject: `New Booking Request from ${data.firstName} ${data.lastName}`,
        from_name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        message: `
          Personal Information:
          - Name: ${data.firstName} ${data.lastName}
          - Email: ${data.email}
          - Phone: ${data.phoneNumber}
          - Location: ${data.location}
          - Occupation: ${data.occupation}
          - Description: ${data.description}

          Goals & Expectations:
          - Current Situation: ${data.currentSituation}
          - Background: ${data.background}
          - Passions: ${data.passions}
          - Top 3 Goals: ${data.topThreeGoals}
          - Challenges: ${data.challenges}
          - Improvement Areas: ${data.improvementAreas?.join(", ")}
          - Success Vision: ${data.successVision}
          - Previous Attempts: ${data.previousAttempts}
          - Support Type: ${data.supportType?.join(", ")}
          - Confidence Level: ${data.confidenceLevel}
          - Uncertainty Reason: ${data.uncertaintyReason}

          Investment:
          - Commitment Level: ${data.commitmentLevel}/10
          - Resource Investment: ${data.resourceInvestment}
          - Open to New Strategies: ${data.openToStrategies ? "Yes" : "No"}

          Session Preferences:
          - Package Hours: ${data.package}
          - Available Days: ${data.availableDays?.join(", ")}
          - Time Range: ${data.timeRange}
          - Platform: ${data.platform}

          Payment Details:
          - Payment Method: ${data.paymentMethod}
          - Billing Street: ${data.billingStreet}
          - Billing City: ${data.billingCity}

          Final Thoughts:
          - Additional Info: ${data.additionalInfo}
          - Follow-up Call: ${data.followUpCall ? "Yes" : "No"}
          - Preferred Follow-up Time: ${data.followUpTime}
        `,
        redirect: "https://web3forms.com/success",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        // Also send to mailto link
        const mailtoLink = `mailto:thee.lifeguide+1on1bookings@gmail.com?subject=New Booking Request&body=${encodeURIComponent(formData.message)}`;
        window.location.href = mailtoLink;
        
        setIsSubmitted(true);
        toast.success("Booking submitted successfully! We'll be in touch soon.");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("There was an error submitting your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 6) {
      // Submit form
      const data = form.getValues();
      handleSubmitToWeb3Forms(data);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    if (isSubmitted && currentStep === 6) {
      return (
        <div className="text-center py-8 space-y-4 animate-fadeIn">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Thank you for Submitting Your Details!
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Your booking will be confirmed, and you'll receive a calendar invite along with payment instructions. Thank you for trusting us to support you on your journey!
          </p>
          <div className="mt-6">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
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
    }

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
      {currentStep === 1 && (
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Book Your One-on-One Call with Resk'Que
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for choosing to work with Resk'Que! We're excited to help you
            achieve your goals through personalized guidance and support.
          </p>
        </div>
      )}

      <ProgressBar currentStep={currentStep} totalSteps={6} />

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">{renderStep()}</div>

      {(!isSubmitted || currentStep !== 6) && (
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 1 || isSubmitting}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            onClick={handleNextStep}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {currentStep === 6 ? (isSubmitting ? "Submitting..." : "Submit Booking") : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingForm;