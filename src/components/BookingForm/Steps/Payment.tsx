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
import { Checkbox } from "@/components/ui/checkbox";
import SelectionBox from "../SelectionBox";

interface PaymentProps {
  form: UseFormReturn<any>;
}

const Payment: React.FC<PaymentProps> = ({ form }) => {
  const paymentMethods = ["Credit/Debit Card", "PayPal", "Bank Transfer"];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="border-b pb-4 mb-8">
        <h2 className="text-2xl font-semibold">Payment Details</h2>
        <p className="text-gray-600">Complete your booking with secure payment</p>
      </div>

      <Form {...form}>
        <div className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Review Your Selection</h3>
            <div className="space-y-2">
              <p>
                Total Hours Booked:{" "}
                <span className="font-semibold">{form.watch("package")} hours</span>
              </p>
              <p>
                Total Cost:{" "}
                <span className="font-semibold">
                  ${form.watch("package") === 1
                    ? "595.99"
                    : form.watch("package") === 5
                    ? "2,830.95"
                    : form.watch("package") === 10
                    ? "5,323.92"
                    : "9,779.85"}
                </span>
              </p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {paymentMethods.map((method) => (
                    <SelectionBox
                      key={method}
                      label={method}
                      selected={field.value === method}
                      onClick={() => field.onChange(method)}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Billing Address (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="billingStreet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billingCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to receive emails and/or SMS messages regarding my
                    booking confirmation and session reminders. I understand the
                    cancellation policy requires 48 hours notice for refunds.
                  </FormLabel>
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

export default Payment;