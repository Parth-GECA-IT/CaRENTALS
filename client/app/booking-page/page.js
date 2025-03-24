import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { Car, Booking } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, CalendarDays, MapPin, CreditCard, Check } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type BookingWithCar = Booking & { car: Car };

export default function BookingPage() {
  const [match, params] = useRoute<{ id: string }>("/booking/:id");
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loadingState, setLoadingState] = useState<string | null>(null);

  const { data: bookingData, isLoading, error } = useQuery<BookingWithCar>({
    queryKey: [`/api/bookings/${params?.id}`],
    enabled: !!params?.id,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/bookings/${id}/status`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/bookings/${params?.id}`] });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking updated",
        description: "The booking status has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update booking status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleStatusUpdate = (status: string) => {
    if (!bookingData) return;
    
    setLoadingState(status);
    updateStatusMutation.mutate(
      { id: bookingData.id, status },
      {
        onSettled: () => setLoadingState(null),
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Not Found</h2>
          <p className="text-gray-600 mb-6">The booking you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button onClick={() => navigate("/account")}>Go to My Account</Button>
        </div>
      </div>
    );
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string | Date) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const rentalDays = Math.max(
    1,
    Math.ceil(
      (new Date(bookingData.endDate).getTime() - new Date(bookingData.startDate).getTime()) / (1000 * 60 * 60 * 24)
    )
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1F2937]">Booking Details</h1>
          <p className="text-gray-600">Review and manage your car rental booking</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Booking #{bookingData.id}</h2>
                    <p className="text-sm text-gray-500">
                      Created on {formatDate(bookingData.createdAt)}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <Badge className={getStatusBadgeColor(bookingData.status)}>
                      {bookingData.status.charAt(0).toUpperCase() + bookingData.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Rental Period</h3>
                    <div className="flex items-start">
                      <CalendarDays className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-gray-900 font-medium">
                          {formatDate(bookingData.startDate)} - {formatDate(bookingData.endDate)}
                        </p>
                        <p className="text-sm text-gray-600">{rentalDays} days</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Location</h3>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-gray-900 font-medium">Pickup: {bookingData.pickupLocation}</p>
                        <p className="text-gray-900 font-medium">Dropoff: {bookingData.dropoffLocation}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="w-full sm:w-1/3">
                    <img 
                      src={bookingData.car.imageUrl} 
                      alt={`${bookingData.car.brand} ${bookingData.car.model}`}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {bookingData.car.brand} {bookingData.car.model}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">{bookingData.car.type}</span>
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">{bookingData.car.transmission}</span>
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">{bookingData.car.seats} Seats</span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      Year: {bookingData.car.year} • Fuel: {bookingData.car.fuelType}
                    </p>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Booking Actions</h3>
                  
                  {bookingData.status === "pending" && (
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        className="bg-[#6366F1] hover:bg-[#6366F1]/90"
                        disabled={updateStatusMutation.isPending}
                        onClick={() => handleStatusUpdate("confirmed")}
                      >
                        {loadingState === "confirmed" ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="mr-2 h-4 w-4" />
                        )}
                        Confirm Booking
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        disabled={updateStatusMutation.isPending}
                        onClick={() => handleStatusUpdate("cancelled")}
                      >
                        {loadingState === "cancelled" ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        Cancel Booking
                      </Button>
                    </div>
                  )}
                  
                  {bookingData.status === "confirmed" && (
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        className="bg-[#10B981] hover:bg-[#10B981]/90"
                        disabled={updateStatusMutation.isPending}
                        onClick={() => handleStatusUpdate("completed")}
                      >
                        {loadingState === "completed" ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="mr-2 h-4 w-4" />
                        )}
                        Mark as Completed
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        disabled={updateStatusMutation.isPending}
                        onClick={() => handleStatusUpdate("cancelled")}
                      >
                        {loadingState === "cancelled" ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        Cancel Booking
                      </Button>
                    </div>
                  )}
                  
                  {(bookingData.status === "completed" || bookingData.status === "cancelled") && (
                    <p className="text-gray-600 italic">
                      This booking has been {bookingData.status} and no further actions are available.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Price Summary</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Rate</span>
                    <span className="font-medium">${bookingData.car.pricePerDay} × {rentalDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rental Subtotal</span>
                    <span className="font-medium">${bookingData.car.pricePerDay * rentalDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium">${Math.round(bookingData.car.pricePerDay * rentalDays * 0.15)}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${bookingData.totalPrice}</span>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span>Payment Method: Credit Card</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Your card will only be charged when the booking is confirmed.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/account")}
              >
                Back to My Bookings
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
