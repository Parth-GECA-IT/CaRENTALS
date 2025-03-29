import { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingDatesSchema, CarFilter } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = bookingDatesSchema.extend({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropoffLocation: z.string().min(1, "Dropoff location is required"),
});

// type HeroFormValues = z.infer<typeof formSchema>;

// interface HeroSectionProps {
//   onSearch: (filters: Partial<CarFilter>) => void;
// }

// export default function HeroSection({ onSearch }: HeroSectionProps) {
export default function HeroSection({ onSearch }) {
  const [, navigate] = useLocation();
  const [isSameLocation, setIsSameLocation] = useState(true);
  
  // Get today's date and tomorrow's date in YYYY-MM-DD format
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // const formatDate = (date: Date) => {
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const form = useForm<HeroFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: formatDate(today),
      endDate: formatDate(tomorrow),
      pickupLocation: "New York City",
      dropoffLocation: "New York City",
    },
  });

  // const onSubmit = (data: HeroFormValues) => {
  const onSubmit = (data) => {
    // Jump to car section
    navigate("/#cars");
    
    // Filter cars that are available
    onSearch({ available: true });
    
    // Scroll to the cars section
    const carsSection = document.getElementById("cars");
    if (carsSection) {
      carsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const handleDropoffChange = (value: string) => {
  const handleDropoffChange = (value) => {
    setIsSameLocation(value === "same");
    
    if (value === "same") {
      form.setValue("dropoffLocation", form.getValues("pickupLocation"));
    }
  };
  
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

  return (
    <section className="relative bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <h2 className="text-[#FF6B35] text-2xl md:text-3xl font-bold uppercase tracking-wider">BOOK A CAR NOW</h2>
          </div>
          
          <div className="mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
              The Amazing Ride
            </h1>
          </div>
          
          <div className="w-full flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="md:w-1/2 text-left mb-8 md:mb-0 md:pr-8">
              <div className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
                Ride New Models Car,<br />
                Starting at just ₹1499/-
              </div>
              
              <Button 
                className="bg-[#FF6B35] hover:bg-[#FF6B35]/80 text-white font-bold uppercase py-3 px-8 rounded-md text-lg mt-4"
                onClick={() => navigate("/#cars")}
              >
                TAKE A RIDE NOW....
              </Button>
            </div>
            
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80" 
                alt="Orange sports car" 
                className="w-full h-auto rounded-lg" 
              />
            </div>
          </div>
          
          <div className="flex justify-center space-x-3 mb-6">
            <div className="h-2 w-8 bg-gray-500 rounded-full"></div>
            <div className="h-2 w-8 bg-[#FF6B35] rounded-full"></div>
            <div className="h-2 w-8 bg-gray-500 rounded-full"></div>
          </div>
          
          <div className="mt-4">
            <Button 
              className="bg-transparent hover:bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35] font-bold py-2 px-8 rounded-full"
              onClick={() => navigate("/#cars")}
            >
              Search Cars here..!!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
