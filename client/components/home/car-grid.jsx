"use client"
import { useState } from "react";
import CarCard from "./car-card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CarGrid({ filters }) {
  const [visibleCars, setVisibleCars] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  // Sample cars data (static)
  const sampleCars = [
    {
      id: 1,
      brand: "Hyundai",
      model: "Veloster",
      year: 2023,
      type: "Sport",
      transmission: "Automatic",
      fuelType: "Gasoline",
      seats: 4,
      pricePerDay: 1499,
      features: ["Bluetooth", "Navigation System", "Premium Audio"],
      imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80",
      available: true,
      rating: 4.8
    },
    {
      id: 2,
      brand: "Mazda",
      model: "MX-5",
      year: 2023,
      type: "Sport",
      transmission: "Manual",
      fuelType: "Gasoline",
      seats: 2,
      pricePerDay: 1899,
      features: ["Convertible", "Leather Seats", "Premium Audio"],
      imageUrl: "https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=600&q=80",
      available: true,
      rating: 4.7
    },
    {
      id: 3,
      brand: "BMW",
      model: "3 Series",
      year: 2022,
      type: "Luxury",
      transmission: "Automatic",
      fuelType: "Hybrid",
      seats: 5,
      pricePerDay: 2499,
      features: ["Navigation System", "Leather Seats", "Premium Audio", "Sunroof"],
      imageUrl: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=600&q=80",
      available: true,
      rating: 4.9
    },
    {
      id: 4,
      brand: "Tesla",
      model: "Model 3",
      year: 2023,
      type: "Electric",
      transmission: "Automatic",
      fuelType: "Electric",
      seats: 5,
      pricePerDay: 2299,
      features: ["Autopilot", "Premium Audio", "All-wheel Drive"],
      imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80",
      available: true,
      rating: 5.0
    },
    {
      id: 5,
      brand: "Mercedes",
      model: "C-Class",
      year: 2022,
      type: "Luxury",
      transmission: "Automatic",
      fuelType: "Gasoline",
      seats: 5,
      pricePerDay: 2699,
      features: ["Navigation System", "Leather Seats", "Premium Audio", "Sunroof"],
      imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80",
      available: true,
      rating: 4.8
    },
    {
      id: 6,
      brand: "Audi",
      model: "A5",
      year: 2023,
      type: "Luxury",
      transmission: "Automatic",
      fuelType: "Gasoline",
      seats: 5,
      pricePerDay: 2599,
      features: ["Navigation System", "Leather Seats", "Premium Audio", "Sunroof"],
      imageUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=600&q=80",
      available: true,
      rating: 4.7
    }
  ];
  
  // Filter cars based on the provided filters
  const filteredCars = sampleCars.filter(car => {
    // Type filter
    if (filters.type && filters.type.length > 0 && !filters.type.includes(car.type)) {
      return false;
    }
    
    // Price range filter
    if (filters.priceMin !== undefined && car.pricePerDay < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== undefined && car.pricePerDay > filters.priceMax) {
      return false;
    }
    
    // Features filter
    if (filters.features && filters.features.length > 0) {
      if (!filters.features.some(feature => car.features.includes(feature))) {
        return false;
      }
    }
    
    // Seats filter
    if (filters.seats && filters.seats.length > 0 && !filters.seats.includes(car.seats)) {
      return false;
    }
    
    // Transmission filter
    if (filters.transmission && filters.transmission.length > 0 && !filters.transmission.includes(car.transmission)) {
      return false;
    }
    
    // Availability filter
    if (filters.available !== undefined && car.available !== filters.available) {
      return false;
    }
    
    return true;
  });
  
  const loadMore = () => {
    setVisibleCars(prev => prev + 6);
  };
  
  if (isLoading) {
    return (
      <div className="lg:w-3/4 flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF6B35]" />
      </div>
    );
  }
  
  if (filteredCars.length === 0) {
    return (
      <div className="lg:w-3/4 flex justify-center items-center min-h-[300px]">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">No Cars Found</h3>
          <p className="text-gray-300 mb-4">Sorry, no cars match your search criteria. Try adjusting your filters.</p>
        </div>
      </div>
    );
  }
  
  const displayedCars = filteredCars.slice(0, visibleCars);
  
  return (
    <div className="lg:w-3/4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
        
        {/* Load More Button */}
        {filteredCars.length > visibleCars && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mt-4">
            <Button 
              onClick={loadMore}
              variant="outline" 
              className="border border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10 font-medium py-3 px-6 rounded-md transition duration-300"
            >
              Load More Cars
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
export function handleViewDetailsHome(carId) {
  // This function can be imported in CarCard component
  // and called with the car.id as an argument
  const router = useRouter();
  router.push(`/cars/${carId}`);
}