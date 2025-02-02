import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
          <div>
            <Label className="text-lg mb-4 block">
              What is your primary goal for working with Resk'Que?
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GOALS.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox id={goal} />
                  <Label htmlFor={goal}>{goal}</Label>
                </div>
              ))}
            </div>
          </div>

          <FormField
            control={form.control}
            name="outcomes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What specific outcomes do you hope to achieve from these sessions?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Example: "I want clarity on my next steps"'
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
                <FormLabel>
                  What challenges are you currently facing that Resk'Que can help you overcome?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Example: "Lack of focus, difficulty managing time effectively"'
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </div>
  );
};

export default GoalsExpectations;