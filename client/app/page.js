"use client"
import { useState } from "react";
import CarFilters from "@/components/home/car-filters";
import CarGrid from "@/components/home/car-grid";
import HeroSection from "@/components/home/hero-section";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Home() {
  const [filters, setFilters] = useState({
    type: undefined,
    priceMin: undefined,
    priceMax: undefined,
    features: undefined,
    seats: undefined,
    transmission: undefined,
    available: true,
  });
  
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
    
  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#1A1A1A]">
      <Header />
      <HeroSection onSearch={handleFilterChange} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-10" id="cars">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Available Cars</h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-400 mr-2">Sort by:</span>
              <select className="bg-[#222222] border border-[#333333] text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <CarFilters 
              currentFilters={filters} 
              onFilterChange={handleFilterChange} 
            />
            <CarGrid filters={filters} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
    </>
  );
}