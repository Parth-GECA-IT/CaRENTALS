import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Booking, Car } from "@shared/schema";
import { Loader2, CarFront, BookOpen, Users } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CarManager from "@/components/admin/car-manager";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import RentalHistory from "@/components/account/rental-history";

type BookingWithCar = Booking & { car: Car };

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("cars");
  const [, navigate] = useLocation();
  const { user, isLoading } = useAuth();

  const { data: allCars, isLoading: carsLoading } = useQuery<Car[]>({
    queryKey: ["/api/cars"],
    enabled: !!user?.isAdmin,
  });

  const { data: allBookings, isLoading: bookingsLoading } = useQuery<BookingWithCar[]>({
    queryKey: ["/api/admin/bookings"],
    enabled: !!user?.isAdmin,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the admin panel. This area is restricted to administrators only.
          </p>
          <Button onClick={() => navigate("/")}>Back to Homepage</Button>
        </div>
      </div>
    );
  }

  const availableCars = allCars?.filter(car => car.available).length || 0;
  const totalCars = allCars?.length || 0;
  
  const activeBookings = allBookings?.filter(
    booking => booking.status === "pending" || booking.status === "confirmed"
  ).length || 0;
  
  const completedBookings = allBookings?.filter(
    booking => booking.status === "completed"
  ).length || 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#121212]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400">Manage cars, bookings, and users</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#1A1A1A] border-[#333333] text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-400">Available Cars</p>
                  <p className="text-2xl font-bold text-white">{availableCars} / {totalCars}</p>
                </div>
                <div className="bg-[#FF6B35]/20 p-3 rounded-full">
                  <CarFront className="h-6 w-6 text-[#FF6B35]" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1A1A1A] border-[#333333] text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-400">Active Bookings</p>
                  <p className="text-2xl font-bold text-white">{activeBookings}</p>
                </div>
                <div className="bg-[#FF6B35]/20 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-[#FF6B35]" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1A1A1A] border-[#333333] text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-400">Completed Rentals</p>
                  <p className="text-2xl font-bold text-white">{completedBookings}</p>
                </div>
                <div className="bg-[#FF6B35]/20 p-3 rounded-full">
                  <Users className="h-6 w-6 text-[#FF6B35]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="cars">Cars Management</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cars">
            <Card>
              <CardContent className="p-6">
                {carsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <CarManager cars={allCars || []} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookings">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-6">All Bookings</h2>
                
                {bookingsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <RentalHistory bookings={allBookings || []} isAdmin={true} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
