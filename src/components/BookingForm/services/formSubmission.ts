
import { FormData } from "../config/formSchema";
import { toast } from "sonner";

export const handleSubmitToWeb3Forms = async (data: FormData) => {
  try {
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
      return true;
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    console.error("Submission error:", error);
    toast.error("There was an error submitting your booking. Please try again.");
    return false;
  }
};
