import { useState } from "react";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { Booking, Car } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Calendar, MapPin } from "lucide-react";

// interface RentalHistoryProps {
//   bookings: (Booking & { car: Car })[];
//   isAdmin?: boolean;
// }

// export default function RentalHistory({ bookings, isAdmin = false }: RentalHistoryProps) {
export default function RentalHistory({ bookings, isAdmin = false }) {
  const [, navigate] = useLocation();
  const [filter, setFilter] = useState<string>("all");
  
  // const getStatusBadgeColor = (status: string) => {
    const getStatusBadgeColor = (status) => {
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
  
  // const formatDate = (dateString: string | Date) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const filteredBookings = filter === "all" 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);
    
  // Sort bookings by date, newest first
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (sortedBookings.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
        <p className="text-gray-600 mb-6">
          {filter === "all" 
            ? "You don't have any rental bookings yet." 
            : `You don't have any ${filter} bookings.`}
        </p>
        <Button 
          onClick={() => navigate("/")}
          className="bg-[#3B82F6] hover:bg-[#3B82F6]/90"
        >
          Browse Cars
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge 
          onClick={() => setFilter("all")} 
          className={`cursor-pointer ${filter === "all" ? "bg-[#3B82F6]" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
        >
          All
        </Badge>
        <Badge 
          onClick={() => setFilter("pending")} 
          className={`cursor-pointer ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"}`}
        >
          Pending
        </Badge>
        <Badge 
          onClick={() => setFilter("confirmed")} 
          className={`cursor-pointer ${filter === "confirmed" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-800 hover:bg-blue-200"}`}
        >
          Confirmed
        </Badge>
        <Badge 
          onClick={() => setFilter("completed")} 
          className={`cursor-pointer ${filter === "completed" ? "bg-green-500 text-white" : "bg-green-100 text-green-800 hover:bg-green-200"}`}
        >
          Completed
        </Badge>
        <Badge 
          onClick={() => setFilter("cancelled")} 
          className={`cursor-pointer ${filter === "cancelled" ? "bg-red-500 text-white" : "bg-red-100 text-red-800 hover:bg-red-200"}`}
        >
          Cancelled
        </Badge>
      </div>
      
      <div className="space-y-4">
        {sortedBookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4">
                  <img 
                    src={booking.car.imageUrl} 
                    alt={`${booking.car.brand} ${booking.car.model}`}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="p-4 md:w-3/4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {booking.car.brand} {booking.car.model}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                          {booking.car.type}
                        </span>
                        <Badge className={getStatusBadgeColor(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0 text-right">
                      <p className="text-lg font-bold text-[#3B82F6]">${booking.totalPrice}</p>
                      <p className="text-sm text-gray-600">Booking #{booking.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-600 mt-2 mb-4">
                    <div className="flex items-center mr-6 mb-2 md:mb-0">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>
                        {booking.pickupLocation}{booking.pickupLocation !== booking.dropoffLocation && ` → ${booking.dropoffLocation}`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => navigate(`/booking/${booking.id}`)}
                      variant="outline"
                      className="text-[#3B82F6] border-[#3B82F6]"
                      size="sm"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
