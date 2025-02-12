
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";

interface DateSelectionProps {
  form: UseFormReturn<any>;
}

const DateSelection: React.FC<DateSelectionProps> = ({ form }) => {
  return (
    <div className="space-y-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4">
          Book Your One-on-One Call with Resk'Que
        </h2>
        <p className="text-gray-600 text-lg mb-8">Select a date for your session</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <Calendar
          mode="single"
          selected={form.watch("selectedDate")}
          onSelect={(date) => form.setValue("selectedDate", date)}
          disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
          initialFocus
          className="rounded-md border"
        />
      </div>

      {form.watch("selectedDate") && (
        <p className="text-center text-gray-600">
          Selected date: {format(form.watch("selectedDate"), "MMMM do, yyyy")}
        </p>
      )}
    </div>
  );
};

export default DateSelection;
