import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectionBox from "../SelectionBox";

interface InvestmentProps {
  form: UseFormReturn<any>;
}

const Investment: React.FC<InvestmentProps> = ({ form }) => {
  const commitmentLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="border-b pb-4 mb-8">
        <h2 className="text-2xl font-semibold">Your Investment & Commitment</h2>
        <p className="text-gray-600">Tell us about your commitment to growth</p>
      </div>

      <Form {...form}>
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="commitmentLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  On a scale of 1 to 10, how committed are you to investing the time,
                  energy, and resources necessary to achieve your goals?
                </FormLabel>
                <div className="grid grid-cols-5 gap-4 mt-2">
                  {commitmentLevels.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => field.onChange(level)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200
                        ${
                          field.value === level
                            ? "border-black bg-black text-white"
                            : "border-gray-200 hover:border-black"
                        }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resourceInvestment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What resources are you willing to invest in your growth?
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Describe the time and resources you can commit"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="openToStrategies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Are you open to exploring different strategies and approaches?
                </FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <SelectionBox
                    label="Yes, I'm open to new approaches"
                    selected={field.value === true}
                    onClick={() => field.onChange(true)}
                  />
                  <SelectionBox
                    label="I prefer traditional methods"
                    selected={field.value === false}
                    onClick={() => field.onChange(false)}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </div>
  );
};

export default Investment;