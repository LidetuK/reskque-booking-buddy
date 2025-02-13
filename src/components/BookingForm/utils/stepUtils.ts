
import { FormData } from "../config/formSchema";

export const getFieldsForStep = (step: number): (keyof FormData)[] => {
  switch (step) {
    case 1:
      return ["selectedDate"];
    case 2:
      return [
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "location",
        "occupation",
        "description",
      ];
    case 3:
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
    case 4:
      return ["commitmentLevel", "resourceInvestment", "openToStrategies"];
    case 5:
      return ["package", "availableDays", "timeRange", "platform"];
    case 6:
      return ["paymentMethod", "termsAccepted"];
    case 7:
      return ["followUpCall"];
    default:
      return [];
  }
};
