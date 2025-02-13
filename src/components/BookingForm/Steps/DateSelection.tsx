
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import { toast } from "sonner";

interface DateSelectionProps {
  form: UseFormReturn<any>;
}

// This would normally come from your backend/API
const mockBookedDates = [
  new Date(2024, 3, 15),
  new Date(2024, 3, 20),
  new Date(2024, 3, 25),
];

const DateSelection: React.FC<DateSelectionProps> = ({ form }) => {
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  const checkDateAvailability = (date: Date | undefined) => {
    if (!date) return;
    
    setIsCheckingAvailability(true);
    
    // Simulate API call to check availability
    setTimeout(() => {
      const isBooked = mockBookedDates.some(
        (bookedDate) => bookedDate.toDateString() === date.toDateString()
      );
      
      if (isBooked) {
        toast.error("This date is already booked. Please select another date.");
        form.setValue("selectedDate", undefined);
      } else {
        toast.success("Date is available!");
        form.setValue("selectedDate", date);
      }
      
      setIsCheckingAvailability(false);
    }, 500);
  };

  return (
    <div className="space-y-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4">
          Book Your One-on-One Call with Resk'Que
        </h2>
        <p className="text-gray-600 text-lg mb-8">Select a date for your session</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md relative">
        {isCheckingAvailability && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        <Calendar
          mode="single"
          selected={form.watch("selectedDate")}
          onSelect={checkDateAvailability}
          disabled={(date) => 
            date < new Date() || 
            date.getDay() === 0 || 
            date.getDay() === 6 ||
            mockBookedDates.some(
              (bookedDate) => bookedDate.toDateString() === date.toDateString()
            )
          }
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
