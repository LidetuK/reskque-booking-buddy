
import { toast } from "sonner";

interface AvailabilityResponse {
  available: boolean;
  timeSlots: string[];
}

export const checkAvailability = async (date: Date): Promise<AvailabilityResponse> => {
  try {
    // Cal.com API endpoint for availability
    const response = await fetch(`https://api.cal.com/v1/availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CAL_API_KEY}`,
      },
      body: JSON.stringify({
        date: date.toISOString().split('T')[0],
        // Add other parameters as needed
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch availability');
    }

    const data = await response.json();
    return {
      available: data.available,
      timeSlots: data.slots || []
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
        'Authorization': `Bearer ${process.env.CAL_API_KEY}`,
      },
      body: JSON.stringify({
        date: date.toISOString().split('T')[0],
        time,
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
