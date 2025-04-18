"use client"
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CarFilters({ currentFilters, onFilterChange }) {
  // Local state for filters before applying
  const [typeFilters, setTypeFilters] = useState(currentFilters?.type || []);
  const [priceRange, setPriceRange] = useState([
    currentFilters?.priceMin || 0,
    currentFilters?.priceMax || 200
  ]);
  const [featuresFilters, setFeaturesFilters] = useState(currentFilters?.features || []);
  const [seatsFilters, setSeatsFilters] = useState(currentFilters?.seats || []);
  const [transmissionFilters, setTransmissionFilters] = useState(currentFilters?.transmission || []);

  useEffect(() => {
    // Update local state when currentFilters change
    setTypeFilters(currentFilters?.type || []);
    setPriceRange([currentFilters?.priceMin || 0, currentFilters?.priceMax || 200]);
    setFeaturesFilters(currentFilters?.features || []);
    setSeatsFilters(currentFilters?.seats || []);
    setTransmissionFilters(currentFilters?.transmission || []);
  }, [currentFilters]);

  const handleTypeChange = (type, checked) => {
    setTypeFilters(prev => 
      checked
        ? [...prev, type]
        : prev.filter(t => t !== type)
    );
  };

  const handleFeaturesChange = (feature, checked) => {
    setFeaturesFilters(prev => 
      checked
        ? [...prev, feature]
        : prev.filter(f => f !== feature)
    );
  };

  const handleSeatsChange = (seats, checked) => {
    setSeatsFilters(prev => 
      checked
        ? [...prev, seats]
        : prev.filter(s => s !== seats)
    );
  };

  const handleTransmissionChange = (transmission, checked) => {
    setTransmissionFilters(prev => 
      checked
        ? [...prev, transmission]
        : prev.filter(t => t !== transmission)
    );
  };

  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
  };

  const applyFilters = () => {
    onFilterChange({
      type: typeFilters.length > 0 ? typeFilters : undefined,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      features: featuresFilters.length > 0 ? featuresFilters : undefined,
      seats: seatsFilters.length > 0 ? seatsFilters : undefined,
      transmission: transmissionFilters.length > 0 ? transmissionFilters : undefined,
      available: true
    });
  };

  // Static data for filter options
  const carTypes = ["Economy", "Compact", "Midsize", "SUV", "Luxury", "Minivan", "Sport", "Electric"];
  const features = ["Automatic Transmission", "Bluetooth", "Navigation System", "Backup Camera", "Sunroof", "Leather Seats", "Premium Audio", "All-wheel Drive"];
  const passengerCapacities = ["2-4", "5-7", "8+"];
  const transmissionTypes = ["Automatic", "Manual"];

  return (
    <div className="lg:w-1/4">
      <div className="bg-[#222222] rounded-lg shadow-md p-5 border border-[#333333]">
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3 text-[#FF6B35]">Car Type</h3>
          <div className="space-y-2">
            {carTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox 
                  id={`type-${type}`} 
                  checked={typeFilters.includes(type)} 
                  onCheckedChange={(checked) => handleTypeChange(type, checked)}
                  className="border-[#FF6B35] text-[#FF6B35]"
                />
                <Label htmlFor={`type-${type}`} className="text-white cursor-pointer">{type}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3 text-[#FF6B35]">Price Range</h3>
          <div className="px-2 py-4">
            <Slider
              defaultValue={priceRange}
              max={500}
              step={5}
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              className="my-5 cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-300 mt-2">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}/day</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3 text-[#FF6B35]">Features</h3>
          <div className="space-y-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox 
                  id={`feature-${feature}`} 
                  checked={featuresFilters.includes(feature)} 
                  onCheckedChange={(checked) => handleFeaturesChange(feature, checked)}
                  className="border-[#FF6B35] text-[#FF6B35]"
                />
                <Label htmlFor={`feature-${feature}`} className="text-white cursor-pointer">{feature}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3 text-[#FF6B35]">Passenger Capacity</h3>
          <div className="space-y-2">
            {passengerCapacities.map((seats) => (
              <div key={seats} className="flex items-center space-x-2">
                <Checkbox 
                  id={`seats-${seats}`} 
                  checked={seatsFilters.includes(seats)} 
                  onCheckedChange={(checked) => handleSeatsChange(seats, checked)}
                  className="border-[#FF6B35] text-[#FF6B35]"
                />
                <Label htmlFor={`seats-${seats}`} className="text-white cursor-pointer">{seats} passengers</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3 text-[#FF6B35]">Transmission</h3>
          <div className="space-y-2">
            {transmissionTypes.map((transmission) => (
              <div key={transmission} className="flex items-center space-x-2">
                <Checkbox 
                  id={`transmission-${transmission}`} 
                  checked={transmissionFilters.includes(transmission)} 
                  onCheckedChange={(checked) => handleTransmissionChange(transmission, checked)}
                  className="border-[#FF6B35] text-[#FF6B35]"
                />
                <Label htmlFor={`transmission-${transmission}`} className="text-white cursor-pointer">{transmission}</Label>
              </div>
            ))}
          </div>
        </div>

        <Button 
          onClick={applyFilters} 
          className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-bold py-2 rounded-md transition duration-300 cursor-pointer"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
