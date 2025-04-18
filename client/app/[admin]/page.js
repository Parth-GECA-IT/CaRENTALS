"use client"
import { useState } from "react";
import { Loader2, CarFront, BookOpen, Users } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CarManager from "@/components/admin/car-manager";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import RentalHistory from "@/components/account/rental-history";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("cars");
  
  // Static user data
  const user = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    isAdmin: true
  };

  // Static cars data
  const allCars = [
    {
      id: 1,
      brand: "Hyundai",
      model: "Veloster",
      year: 2023,
      available: true,
      pricePerDay: 1499,
      imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      brand: "Mazda",
      model: "MX-5",
      year: 2023,
      available: true,
      pricePerDay: 1899,
      imageUrl: "https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      brand: "BMW",
      model: "3 Series",
      year: 2022,
      available: false,
      pricePerDay: 2499,
      imageUrl: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Static bookings data
  const allBookings = [
    {
      id: 1,
      carId: 1,
      userId: 101,
      startDate: "2023-10-15",
      endDate: "2023-10-18",
      status: "confirmed",
      totalPrice: 4497
    },
    {
      id: 2,
      carId: 2,
      userId: 102,
      startDate: "2023-10-20",
      endDate: "2023-10-25",
      status: "pending",
      totalPrice: 9495
    },
    {
      id: 3,
      carId: 3,
      userId: 103,
      startDate: "2023-09-10",
      endDate: "2023-09-15",
      status: "completed",
      totalPrice: 12495
    }
  ];

  const handleNavigate = (path) => {
    console.log(`Navigating to ${path}`);
    // Navigation would happen here in a real app
  };

  // Loading state simulation (set to false for static data)
  const isLoading = false;
  const carsLoading = false;
  const bookingsLoading = false;

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
          <Button onClick={() => handleNavigate("/")}>Back to Homepage</Button>
        </div>
      </div>
    );
  }

  const availableCars = allCars.filter(car => car.available).length || 0;
  const totalCars = allCars.length || 0;
  
  const activeBookings = allBookings.filter(
    booking => booking.status === "pending" || booking.status === "confirmed"
  ).length || 0;
  
  const completedBookings = allBookings.filter(
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
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#1a1a1a] border-b border-l border-[#333333]">
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
                  <CarManager cars={allCars} />
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
                  <RentalHistory bookings={allBookings} isAdmin={true} />
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
