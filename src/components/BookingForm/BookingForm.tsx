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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
          - Goals: ${data.goals?.join(", ")}
          - Desired Outcomes: ${data.outcomes}
          - Challenges: ${data.challenges}

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
    </div>
  );
};

export default BookingForm;
