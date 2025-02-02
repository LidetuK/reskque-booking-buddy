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
import { Checkbox } from "@/components/ui/checkbox";
import SelectionBox from "../SelectionBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SessionPreferencesProps {
  form: UseFormReturn<any>;
}

const SessionPreferences: React.FC<SessionPreferencesProps> = ({ form }) => {
  const packages = [
    { hours: 1, price: 595.99, discount: 0 },
    { hours: 5, price: 2830.95, discount: 5 },
    { hours: 10, price: 5323.92, discount: 12 },
    { hours: 20, price: 9779.85, discount: 15 },
  ];

  const platforms = [
    "Google meets",
    "Zoom calls",
    "Phone call",
    "Any of the above",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="border-b pb-4 mb-8">
        <h2 className="text-2xl font-semibold">Session Preferences</h2>
        <p className="text-gray-600">Choose your preferred session options</p>
      </div>

      <Form {...form}>
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="package"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many hours would you like to book?</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {packages.map((pkg) => (
                    <SelectionBox
                      key={pkg.hours}
                      label={`${pkg.hours} Hour${pkg.hours > 1 ? "s" : ""} ($${
                        pkg.price
                      }${
                        pkg.discount > 0
                          ? ` – Includes ${pkg.discount}% discount`
                          : ""
                      })`}
                      selected={field.value === pkg.hours}
                      onClick={() => field.onChange(pkg.hours)}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("package") > 1 && (
            <FormField
              control={form.control}
              name="distributeSession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Would you like these sessions distributed over multiple weeks?
                  </FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <SelectionBox
                      label="Yes"
                      selected={field.value === true}
                      onClick={() => field.onChange(true)}
                    />
                    <SelectionBox
                      label="No"
                      selected={field.value === false}
                      onClick={() => field.onChange(false)}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="availableDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Days</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {days.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes(day)}
                        onCheckedChange={(checked) => {
                          const updatedDays = checked
                            ? [...(field.value || []), day]
                            : field.value?.filter((d: string) => d !== day);
                          field.onChange(updatedDays);
                        }}
                      />
                      <span>{day}</span>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Time Range</FormLabel>
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
                    <SelectItem value="9AM-12PM">9 AM - 12 PM</SelectItem>
                    <SelectItem value="1PM-5PM">1 PM - 5 PM</SelectItem>
                    <SelectItem value="6PM-9PM">6 PM - 9 PM</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Platform</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {platforms.map((platform) => (
                    <SelectionBox
                      key={platform}
                      label={platform}
                      selected={field.value === platform}
                      onClick={() => field.onChange(platform)}
                    />
                  ))}
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

export default SessionPreferences;