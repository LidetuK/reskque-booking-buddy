import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const GOALS = [
  "Personal Growth",
  "Career/Business Development",
  "Relationship Improvement",
  "Financial Empowerment",
  "Health & Wellness",
  "Philanthropy",
  "Other",
];

const SITUATIONS = [
  "Entrepreneur",
  "Business Owner",
  "Executive",
  "Freelancer",
  "Student",
  "Employed",
  "Seeking Direction",
  "Other",
];

const IMPROVEMENT_AREAS = [
  "Leadership",
  "Communication",
  "Sales",
  "Marketing",
  "Mindset",
  "Productivity",
  "Relationships",
  "Finances",
];

const SUPPORT_TYPES = [
  "Strategic guidance",
  "Mentorship",
  "Accountability",
  "Skill development",
  "Mindset shift",
];

interface GoalsExpectationsProps {
  form: UseFormReturn<any>;
}

const GoalsExpectations: React.FC<GoalsExpectationsProps> = ({ form }) => {
  return (
    <div className="space-y-8">
      <div className="border-b pb-4 mb-8">
        <h2 className="text-2xl font-semibold">Goals and Expectations</h2>
        <p className="text-gray-600">Help us understand what you want to achieve</p>
      </div>

      <Form {...form}>
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="currentSituation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What best describes your current situation?</FormLabel>
                <FormControl>
                  <select
                    className="w-full p-2 border rounded-md"
                    {...field}
                  >
                    <option value="">Select your situation</option>
                    {SITUATIONS.map((situation) => (
                      <option key={situation} value={situation}>
                        {situation}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="background"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Briefly describe your personal and professional background</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Education, career highlights, key achievements..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are your primary passions and interests outside of work/business?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your interests and hobbies..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="topThreeGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are your top 3 goals you'd like to achieve in the next 6-12 months?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Be specific and measurable..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="challenges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are the biggest challenges currently preventing you from reaching these goals?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your main obstacles..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="improvementAreas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What areas of your life or business are you most focused on improving?</FormLabel>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {IMPROVEMENT_AREAS.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox id={area} />
                      <Label htmlFor={area}>{area}</Label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="successVision"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What does success look like to you? Describe your ideal future.</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paint a picture of your ideal future..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="previousAttempts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What have you already tried to address these challenges? What were the results?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your previous experiences..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="supportType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What kind of support are you looking for from Resk'Que?</FormLabel>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {SUPPORT_TYPES.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox id={type} />
                      <Label htmlFor={type}>{type}</Label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confidenceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>On a scale of 1-10, how confident are you in achieving your goals without external support?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-3" id="1-3" />
                      <Label htmlFor="1-3">1-3 (Not very confident)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4-6" id="4-6" />
                      <Label htmlFor="4-6">4-6 (Somewhat confident)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="7-10" id="7-10" />
                      <Label htmlFor="7-10">7-10 (Very confident)</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("confidenceLevel") === "1-3" && (
            <FormField
              control={form.control}
              name="uncertaintyReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What makes you feel uncertain or hesitant?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your concerns..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </Form>
    </div>
  );
};

export default GoalsExpectations;