
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateSelectionProps {
  form: UseFormReturn<any>;
}

// This would be replaced with actual API data
const mockBookedDates = [
  new Date(2024, 3, 15),
  new Date(2024, 3, 20),
  new Date(2024, 3, 25),
];

// This would come from your calendar API
const mockTimeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const DateSelection: React.FC<DateSelectionProps> = ({ form }) => {
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  const checkDateAvailability = async (date: Date | undefined) => {
    if (!date) return;
    
    setIsCheckingAvailability(true);
    
    try {
      // Simulate API call to check availability
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const isBooked = mockBookedDates.some(
        (bookedDate) => bookedDate.toDateString() === date.toDateString()
      );
      
      if (isBooked) {
        toast.error("This date is already booked. Please select another date.");
        form.setValue("selectedDate", undefined);
        form.setValue("selectedTime", undefined);
        setAvailableTimeSlots([]);
      } else {
        toast.success("Date is available! Please select a time slot.");
        form.setValue("selectedDate", date);
        // In a real implementation, this would fetch available time slots from your calendar API
        setAvailableTimeSlots(mockTimeSlots);
      }
    } catch (error) {
      toast.error("Error checking availability. Please try again.");
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handleTimeSelection = (time: string) => {
    form.setValue("selectedTime", time);
    toast.success(`Selected time slot: ${time}`);
  };

  return (
    <div className="space-y-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4">
          Book Your One-on-One Call with Resk'Que
        </h2>
        <p className="text-gray-600 text-lg mb-8">Select a date and time for your session</p>
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
        <div className="w-full max-w-md space-y-4">
          <p className="text-center text-gray-600">
            Selected date: {format(form.watch("selectedDate"), "MMMM do, yyyy")}
          </p>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Available Time Slots
            </label>
            <Select
              value={form.watch("selectedTime")}
              onValueChange={handleTimeSelection}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {availableTimeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelection;
