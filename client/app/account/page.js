"use client";
import { useState } from "react";
import { Loader2, User, History, LogOut } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import RentalHistory from "@/components/account/rental-history";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();
  
  // Mock user data for frontend-only implementation
  const user = {
    fullName: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phoneNumber: "+1 234 567 8900",
    isAdmin: true
  };
  
  // Mock bookings data
  const bookings = [
    {
      id: "booking1",
      carName: "Tesla Model S",
      startDate: "2023-10-15",
      endDate: "2023-10-18",
      totalAmount: 4500,
      status: "completed"
    },
    {
      id: "booking2",
      carName: "BMW X5",
      startDate: "2023-11-05",
      endDate: "2023-11-10",
      totalAmount: 7500,
      status: "upcoming"
    }
  ];
  
  const isLoadingBookings = false;
  
  const handleLogout = () => {
    // Mock logout functionality
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  const logoutMutation = {
    isPending: false,
    mutate: (_, callbacks) => {
      setTimeout(() => {
        if (callbacks && callbacks.onSuccess) {
          callbacks.onSuccess();
        }
      }, 1000);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#121212]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">My Account</h1>
          <p className="text-gray-400">Manage your profile and bookings</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="bg-[#1A1A1A] border-[#333333] text-white">
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-[#FF6B35] rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl font-bold text-white">
                      {user.fullName.split(' ').map(name => name[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-center text-white">{user.fullName}</h2>
                  <p className="text-sm text-gray-400 text-center">{user.email}</p>
                </div>
                
                <Separator className="my-4 bg-[#333333]" />
                
                <nav className="space-y-1">
                  <button
                    className={`cursor-pointer w-full flex items-center px-3 py-2 text-sm rounded-md ${
                      activeTab === "profile" 
                      ? "bg-[#FF6B35]/10 text-[#FF6B35] font-medium" 
                      : "text-gray-300 hover:bg-[#333333]"
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </button>
                  <button
                    className={`cursor-pointer w-full flex items-center px-3 py-2 text-sm rounded-md ${
                      activeTab === "rentals" 
                      ? "bg-[#FF6B35]/10 text-[#FF6B35] font-medium" 
                      : "text-gray-300 hover:bg-[#333333]"
                    }`}
                    onClick={() => setActiveTab("rentals")}
                  >
                    <History className="h-4 w-4 mr-3" />
                    Rental History
                  </button>
                  <button
                    className="cursor-pointer w-full flex items-center px-3 py-2 text-sm text-red-400 hover:bg-[#331A1A] rounded-md"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                  >
                    {logoutMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-3 animate-spin" />
                    ) : (
                      <LogOut className="h-4 w-4 mr-3" />
                    )}
                    Logout
                  </button>
                </nav>
              </CardContent>
            </Card>
            
            {user.isAdmin && (
              <div className="mt-4">
                <Button 
                  className="cursor-pointer w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90"
                  onClick={() => router.push("/admin")}
                >
                  Go to Admin Panel
                </Button>
              </div>
            )}
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#262629] rounded-md">
                <TabsTrigger value="profile" className="cursor-pointer">Profile</TabsTrigger>
                <TabsTrigger value="rentals" className="cursor-pointer">Rental History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card className="bg-[#1A1A1A] border-[#333333] text-white">
                  <CardHeader>
                    <CardTitle className="text-white">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 py-3 border-b border-[#333333]">
                        <dt className="text-sm font-medium text-gray-400">Full Name</dt>
                        <dd className="text-sm text-gray-300 col-span-2">{user.fullName}</dd>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 py-3 border-b border-[#333333]">
                        <dt className="text-sm font-medium text-gray-400">Username</dt>
                        <dd className="text-sm text-gray-300 col-span-2">{user.username}</dd>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 py-3 border-b border-[#333333]">
                        <dt className="text-sm font-medium text-gray-400">Email Address</dt>
                        <dd className="text-sm text-gray-300 col-span-2">{user.email}</dd>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 py-3 border-b border-[#333333]">
                        <dt className="text-sm font-medium text-gray-400">Phone Number</dt>
                        <dd className="text-sm text-gray-300 col-span-2">{user.phoneNumber || "Not provided"}</dd>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 py-3">
                        <dt className="text-sm font-medium text-gray-400">Account Type</dt>
                        <dd className="text-sm text-gray-300 col-span-2">
                          {user.isAdmin ? "Administrator" : "Customer"}
                        </dd>
                      </div>
                    </dl>
                    
                    <div className="mt-6">
                      <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 cursor-pointer">
                        Edit Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="rentals">
                <Card className="bg-[#1A1A1A] border-[#333333] text-white">
                  <CardHeader>
                    <CardTitle className="text-white">Rental History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingBookings ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-[#FF6B35]" />
                      </div>
                    ) : (
                      <RentalHistory bookings={bookings || []} />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
