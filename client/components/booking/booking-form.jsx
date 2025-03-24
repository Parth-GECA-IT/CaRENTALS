import { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Car, insertBookingSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Loader2, Calendar, MapPin, CreditCard } from "lucide-react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface BookingFormProps {
  car: Car;
  onSuccess: () => void;
}

// Get today's date and tomorrow's date in YYYY-MM-DD format
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const bookingFormSchema = insertBookingSchema.omit({
  userId: true,
  totalPrice: true,
  status: true,
}).extend({
  carId: z.number(),
  startDate: z.coerce.date()
    .min(today, { message: "Start date must be today or later" }),
  endDate: z.coerce.date()
    .min(tomorrow, { message: "End date must be after start date" }),
  pickupLocation: z.string().min(3, { message: "Pickup location is required" }),
  dropoffLocation: z.string().min(3, { message: "Dropoff location is required" }),
});

// Get form values type directly from the schema
type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function BookingForm({ car, onSuccess }: BookingFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  
  const locations = [
    "New York City",
    "Los Angeles",
    "Chicago",
    "Miami",
    "San Francisco",
    "Boston",
    "Seattle",
    "Denver",
    "Austin",
    "Washington DC"
  ];

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      carId: car.id,
      startDate: today,
      endDate: tomorrow,
      pickupLocation: "New York City",
      dropoffLocation: "New York City",
    },
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: BookingFormValues) => {
      // Calculate rental days and total price
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      const days = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
      
      // Calculate total price (base price * days + taxes & fees)
      const basePrice = car.pricePerDay * days;
      const taxesAndFees = Math.round(basePrice * 0.15); // 15% for taxes and fees
      const totalPrice = basePrice + taxesAndFees;
      
      // Format dates for the API
      const formattedData = {
        ...data,
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        totalPrice
      };
      
      const res = await apiRequest("POST", "/api/bookings", formattedData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: [`/api/cars/${car.id}`] });
      toast({
        title: "Booking Successful",
        description: "Your car has been booked successfully.",
      });
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an issue with your booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const calculateTotal = () => {
    const startDate = form.getValues("startDate");
    const endDate = form.getValues("endDate");
    
    const days = Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)));
    const basePrice = car.pricePerDay * days;
    const taxesAndFees = Math.round(basePrice * 0.15); // 15% for taxes and fees
    
    return {
      days,
      basePrice,
      taxesAndFees,
      totalPrice: basePrice + taxesAndFees
    };
  };

  const onSubmit = (data: BookingFormValues) => {
    if (step === 1) {
      setStep(2);
    } else {
      createBookingMutation.mutate(data);
    }
  };

  const { days, basePrice, taxesAndFees, totalPrice } = calculateTotal();

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <DialogTitle className="text-xl font-bold">Book Your Car</DialogTitle>
        <DialogDescription>
          Complete your booking for {car.brand} {car.model}
        </DialogDescription>
      </div>
      
      <div className="flex items-center mb-2">
        <span className={`flex items-center justify-center rounded-full w-8 h-8 mr-2 ${step === 1 ? 'bg-[#FF6B35] text-white' : 'bg-[#333333] text-gray-400'}`}>1</span>
        <span className="text-sm font-medium mr-4 text-white">Rental Details</span>
        <div className="h-0.5 bg-[#333333] flex-grow"></div>
        <span className={`flex items-center justify-center rounded-full w-8 h-8 mx-2 ${step === 2 ? 'bg-[#FF6B35] text-white' : 'bg-[#333333] text-gray-400'}`}>2</span>
        <span className="text-sm font-medium text-white">Confirmation</span>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 && (
            <>
              <div className="bg-[#222222] p-4 rounded-md mb-4 border border-[#333333]">
                <h3 className="font-medium mb-2 text-white">{car.brand} {car.model}</h3>
                <div className="flex items-center text-sm text-gray-400">
                  <span className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1 text-[#FF6B35]" />
                    {car.year}
                  </span>
                  <span className="flex items-center">
                    <span className="bg-[#333333] text-gray-300 px-2 py-0.5 rounded text-xs">{car.type}</span>
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          min={formatDate(today)}
                          {...field}
                          value={typeof field.value === 'string' ? field.value : formatDate(field.value)}
                          onChange={(e) => {
                            field.onChange(e);
                            // If end date is before start date, update it
                            const newStartDate = new Date(e.target.value);
                            const currentEndDate = form.getValues("endDate");
                            if (newStartDate >= new Date(currentEndDate)) {
                              const nextDay = new Date(newStartDate);
                              nextDay.setDate(nextDay.getDate() + 1);
                              form.setValue("endDate", nextDay);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Drop-off Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date"
                          min={formatDate(tomorrow)}
                          {...field}
                          value={typeof field.value === 'string' ? field.value : formatDate(field.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pickupLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Location</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select pickup location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dropoffLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Drop-off Location</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select drop-off location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="bg-[#222222] p-4 rounded-md border border-[#333333]">
                <h3 className="font-medium mb-3 text-white">Price Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Daily Rate</span>
                    <span className="text-gray-300">${car.pricePerDay} × {days} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Rental Subtotal</span>
                    <span className="text-gray-300">${basePrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Taxes & Fees</span>
                    <span className="text-gray-300">${taxesAndFees}</span>
                  </div>
                  <Separator className="my-2 bg-[#333333]" />
                  <div className="flex justify-between font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-[#FF6B35]">${totalPrice}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90"
              >
                Continue to Confirm
              </Button>
            </>
          )}
          
          {step === 2 && (
            <>
              <div className="bg-[#222222] p-4 rounded-md mb-4 border border-[#333333]">
                <h3 className="font-medium mb-2 text-white">Booking Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex">
                    <div className="w-1/3 text-gray-400">Car:</div>
                    <div className="w-2/3 text-gray-300 font-medium">{car.brand} {car.model} ({car.year})</div>
                  </div>
                  <div className="flex">
                    <div className="w-1/3 text-gray-400">Rental Period:</div>
                    <div className="w-2/3 text-gray-300">
                      {format(new Date(form.getValues("startDate")), 'MMM dd, yyyy')} - {format(new Date(form.getValues("endDate")), 'MMM dd, yyyy')}
                      <span className="text-gray-500 ml-1">({days} days)</span>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/3 text-gray-400">Pickup:</div>
                    <div className="w-2/3 text-gray-300">{form.getValues("pickupLocation")}</div>
                  </div>
                  <div className="flex">
                    <div className="w-1/3 text-gray-400">Drop-off:</div>
                    <div className="w-2/3 text-gray-300">{form.getValues("dropoffLocation")}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#222222] p-4 rounded-md mb-4 border border-[#333333]">
                <h3 className="font-medium mb-2 text-white">Price Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Daily Rate</span>
                    <span className="text-gray-300">${car.pricePerDay} × {days} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Rental Subtotal</span>
                    <span className="text-gray-300">${basePrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Taxes & Fees</span>
                    <span className="text-gray-300">${taxesAndFees}</span>
                  </div>
                  <Separator className="my-2 bg-[#333333]" />
                  <div className="flex justify-between font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-[#FF6B35]">${totalPrice}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#222222] p-4 rounded-md mb-4 border border-[#333333]">
                <div className="flex items-center mb-3">
                  <CreditCard className="h-5 w-5 text-[#FF6B35] mr-2" />
                  <h3 className="font-medium text-white">Payment Information</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  Your card will only be charged when your booking is confirmed.
                </p>
                <div className="text-sm text-gray-400">
                  <div className="flex items-center mb-1">
                    <span className="font-medium mr-2 text-gray-300">Name:</span>
                    <span className="text-gray-300">{user?.fullName}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2 text-gray-300">Email:</span>
                    <span className="text-gray-300">{user?.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline"
                  className="flex-1 border-[#333333] text-gray-300 hover:text-white hover:bg-[#333333]"
                  onClick={() => setStep(1)}
                  disabled={createBookingMutation.isPending}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-[#FF6B35] hover:bg-[#FF6B35]/90"
                  disabled={createBookingMutation.isPending}
                >
                  {createBookingMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Confirm Booking
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
}
