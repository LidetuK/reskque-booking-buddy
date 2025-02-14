
import { toast } from "sonner";

interface AvailabilityResponse {
  available: boolean;
  timeSlots: string[];
}

// Helper function to check if a date should be available
const isDateAvailable = (date: Date): boolean => {
  const day = date.getDay();
  // Example: Available Monday-Friday (0 = Sunday, 6 = Saturday)
  return day !== 0 && day !== 6;
};

// Generate time slots for available dates
const generateTimeSlots = (date: Date): string[] => {
  if (!isDateAvailable(date)) return [];
  
  return [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM"
  ];
};

export const checkAvailability = async (date: Date): Promise<AvailabilityResponse> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const available = isDateAvailable(date);
    const timeSlots = generateTimeSlots(date);
    
    return {
      available,
      timeSlots
    };
  } catch (error) {
    console.error('Error checking availability:', error);
    toast.error('Failed to check availability. Please try again.');
    return {
      available: false,
      timeSlots: []
    };
  }
};

export const createBooking = async (date: Date, time: string, userDetails: any) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful booking
    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      date: date.toISOString(),
      time,
      ...userDetails,
    };

    toast.success('Booking created successfully!');
    return booking;
  } catch (error) {
    console.error('Error creating booking:', error);
    toast.error('Failed to create booking. Please try again.');
    throw error;
  }
};
