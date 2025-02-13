
import { toast } from "sonner";

const CAL_API_KEY = "cal_live_2aafe697f95e2216c60353585da35e98"; // Note: In a production environment, this should be handled more securely

interface AvailabilityResponse {
  available: boolean;
  timeSlots: string[];
}

export const checkAvailability = async (date: Date): Promise<AvailabilityResponse> => {
  try {
    // Cal.com API endpoint for availability
    const response = await fetch(`https://api.cal.com/v1/schedules`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CAL_API_KEY}`,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch availability');
    }

    const data = await response.json();
    console.log('Cal.com API Response:', data);

    // For now, let's consider all dates as available and provide some default time slots
    // You'll need to adjust this based on your actual Cal.com schedule configuration
    const defaultTimeSlots = [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM"
    ];

    return {
      available: true,
      timeSlots: defaultTimeSlots
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
    const response = await fetch(`https://api.cal.com/v1/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CAL_API_KEY}`,
      },
      body: JSON.stringify({
        start: `${date.toISOString().split('T')[0]}T${time}`,
        end: `${date.toISOString().split('T')[0]}T${time}`,
        eventTypeId: 1, // You'll need to replace this with your actual event type ID
        ...userDetails,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create booking');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating booking:', error);
    toast.error('Failed to create booking. Please try again.');
    throw error;
  }
};
