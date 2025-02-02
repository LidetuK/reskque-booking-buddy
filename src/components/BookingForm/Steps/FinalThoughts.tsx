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
import { Textarea } from "@/components/ui/textarea";
import SelectionBox from "../SelectionBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FinalThoughtsProps {
  form: UseFormReturn<any>;
}

const FinalThoughts: React.FC<FinalThoughtsProps> = ({ form }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="border-b pb-4 mb-8">
        <h2 className="text-2xl font-semibold">Final Thoughts</h2>
        <p className="text-gray-600">Share any additional information</p>
      </div>

      <Form {...form}>
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Is there anything else you would like Resk'Que to know before
                  your session?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share any additional thoughts or questions"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="followUpCall"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Would you like to schedule a quick follow-up call with our team
                  to confirm your booking?
                </FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <SelectionBox
                    label="Yes, I would like a follow-up call"
                    selected={field.value === true}
                    onClick={() => field.onChange(true)}
                  />
                  <SelectionBox
                    label="No, email confirmation is sufficient"
                    selected={field.value === false}
                    onClick={() => field.onChange(false)}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("followUpCall") && (
            <FormField
              control={form.control}
              name="followUpTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    When would be the best time for the follow-up call?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your preferred time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                      <SelectItem value="afternoon">
                        Afternoon (1 PM - 5 PM)
                      </SelectItem>
                      <SelectItem value="evening">Evening (6 PM - 9 PM)</SelectItem>
                    </SelectContent>
                  </Select>
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

export default FinalThoughts;