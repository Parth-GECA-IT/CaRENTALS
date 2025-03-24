import { useLocation } from "wouter";
import { Car } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Star, Users, CheckCircle2 } from "lucide-react";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const [, navigate] = useLocation();

  const handleViewDetails = () => {
    navigate(`/cars/${car.id}`);
  };

  return (
    <div className="bg-[#222222] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-[#333333]">
      <div className="relative">
        <img 
          src={car.imageUrl} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-48 object-cover"
        />
        <span className={`absolute top-3 right-3 ${car.available ? 'bg-[#FF6B35]' : 'bg-red-500'} text-white text-sm font-semibold px-2 py-1 rounded`}>
          {car.available ? 'Available' : 'Unavailable'}
        </span>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white">{car.brand} {car.model}</h3>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-[#FF6B35]" />
            <span className="ml-1 text-sm font-medium text-white">{car.rating}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-[#333333] text-gray-200 text-xs font-medium px-2 py-1 rounded">{car.type}</span>
          <span className="bg-[#333333] text-gray-200 text-xs font-medium px-2 py-1 rounded">{car.transmission}</span>
          <span className="bg-[#333333] text-gray-200 text-xs font-medium px-2 py-1 rounded">{car.fuelType}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-300 mb-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{car.seats} Seats</span>
          </div>
          
          <div className="flex items-center">
            {car.features && car.features[0] && (
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1 text-[#FF6B35]" />
                <span>{car.features[0]}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            {car.features && car.features.includes("Premium Audio") && (
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1 text-[#FF6B35]" />
                <span>Premium</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-[#FF6B35]">₹{car.pricePerDay}</span>
            <span className="text-gray-400 text-sm">/ day</span>
          </div>
          <Button 
            onClick={handleViewDetails}
            className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            {car.available ? 'Book Now' : 'View Details'}
          </Button>
        </div>
      </div>
    </div>
  );
}
