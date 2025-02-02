import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PersonalInfoProps {
  form: UseFormReturn<any>;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ form }) => {
  return (
    <div className="space-y-8">
      <div className="border-b pb-4 mb-8">
        <h2 className="text-2xl font-semibold">Personal Information</h2>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <Form {...form}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <Label>Phone Number *</Label>
            <div className="flex gap-4">
              <div className="w-1/3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="+1" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+1">United States (+1)</SelectItem>
                    <SelectItem value="+44">United Kingdom (+44)</SelectItem>
                    <SelectItem value="+91">India (+91)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Input placeholder="Enter your phone number" />
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your age" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location/City *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation/Role *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your occupation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How would you describe yourself in one sentence?</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example: I'm an entrepreneur looking to scale my business"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </div>
  );
};

export default PersonalInfo;