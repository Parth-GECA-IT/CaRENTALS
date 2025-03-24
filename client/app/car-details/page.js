import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ChevronLeft, Star, Users, Calendar } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import BookingForm from "@/components/booking/booking-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Car } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";

export default function CarDetails() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [match, params] = useRoute<{ id: string }>("/cars/:id");
  const [, navigate] = useLocation();
  const { user } = useAuth();

  const { data: car, isLoading, error } = useQuery<Car>({
    queryKey: [`/api/cars/${params?.id}`],
    enabled: !!params?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Car Not Found</h2>
          <p className="text-gray-600 mb-6">The car you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#111111]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center text-gray-300 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to cars
          </Button>
        </div>
        
        <div className="bg-[#1A1A1A] rounded-lg shadow-md overflow-hidden border border-[#333333]">
          {/* Car Image */}
          <div className="relative h-64 md:h-96 bg-black">
            <img 
              src={car.imageUrl} 
              alt={`${car.brand} ${car.model}`} 
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute top-4 right-4 bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-medium">
              {car.available ? "Available" : "Not Available"}
            </div>
          </div>
          
          <div className="p-6">
            {/* Car Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{car.brand} {car.model}</h1>
                <div className="flex flex-wrap items-center text-sm text-gray-400 mb-4">
                  <span className="flex items-center mr-4 mb-2">
                    <Calendar className="h-4 w-4 mr-1 text-[#FF6B35]" />
                    {car.year}
                  </span>
                  <span className="flex items-center mr-4 mb-2">
                    <Users className="h-4 w-4 mr-1 text-[#FF6B35]" />
                    {car.seats} Seats
                  </span>
                  <span className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-[#FF6B35] mr-1" />
                    {car.rating}/5
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-[#222222] text-gray-300 text-xs font-medium px-2 py-1 rounded border border-[#444444]">{car.type}</span>
                  <span className="bg-[#222222] text-gray-300 text-xs font-medium px-2 py-1 rounded border border-[#444444]">{car.transmission}</span>
                  <span className="bg-[#222222] text-gray-300 text-xs font-medium px-2 py-1 rounded border border-[#444444]">{car.fuelType}</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 bg-[#222222] p-4 rounded-lg border border-[#444444]">
                <div className="text-3xl font-bold text-[#FF6B35]">${car.pricePerDay}</div>
                <div className="text-gray-400 text-sm">per day</div>
              </div>
            </div>
            
            {/* Car Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-white">Car Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {car.features?.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B35] mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                )) || <span className="text-gray-400">No features available</span>}
              </div>
            </div>
            
            {/* Booking Action */}
            <div className="border-t border-[#333333] pt-6">
              {user ? (
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full md:w-auto bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white py-3 px-6">
                      Book Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] bg-[#1A1A1A] text-white border-[#333333]">
                    <BookingForm 
                      car={car}
                      onSuccess={() => {
                        setIsBookingOpen(false);
                        navigate("/account");
                      }}
                    />
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <Button 
                    className="w-full md:w-auto bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white py-3 px-6"
                    onClick={() => navigate("/auth")}
                  >
                    Sign In to Book
                  </Button>
                  <span className="text-gray-400 text-sm">
                    You need to be logged in to book a car
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
