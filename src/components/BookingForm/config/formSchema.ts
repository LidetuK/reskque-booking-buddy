
import * as z from "zod";

export const formSchema = z.object({
  selectedDate: z.date({
    required_error: "Please select a date for your session",
  }),
  selectedTime: z.string({
    required_error: "Please select a time slot",
  }),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  age: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  occupation: z.string().min(1, "Occupation is required"),
  description: z.string().optional(),
  currentSituation: z.string().min(1, "Current situation is required"),
  background: z.string().min(1, "Background information is required"),
  passions: z.string().min(1, "Passions are required"),
  topThreeGoals: z.string().min(1, "Goals are required"),
  challenges: z.string().min(1, "Challenges are required"),
  improvementAreas: z.array(z.string()).min(1, "Please select at least one improvement area"),
  successVision: z.string().min(1, "Success vision is required"),
  previousAttempts: z.string().optional(),
  supportType: z.array(z.string()).min(1, "Please select at least one support type"),
  confidenceLevel: z.string().min(1, "Confidence level is required"),
  uncertaintyReason: z.string().optional(),
  commitmentLevel: z.number().optional(),
  resourceInvestment: z.string().optional(),
  openToStrategies: z.boolean().optional(),
  package: z.number().optional(),
  distributeSession: z.boolean().optional(),
  availableDays: z.array(z.string()).optional(),
  timeRange: z.string().optional(),
  platform: z.string().optional(),
  paymentMethod: z.string().optional(),
  billingStreet: z.string().optional(),
  billingCity: z.string().optional(),
  termsAccepted: z.boolean().optional(),
  additionalInfo: z.string().optional(),
  followUpCall: z.boolean().optional(),
  followUpTime: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;
