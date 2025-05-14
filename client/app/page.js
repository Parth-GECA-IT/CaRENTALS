"use client"
import { useState, useEffect } from "react";
import CarFilters from "@/components/home/car-filters";
import CarGrid from "@/components/home/car-grid";
import HeroSection from "@/components/home/hero-section";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { CustomToast } from "@/components/ui/customToast";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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

  const savedUser = JSON.parse(localStorage.getItem("loginSuccess"));
  const succ = (fullName) => {
    setTimeout(() => {
      toast.success(() => (
        <CustomToast
          title="Login Successful"
          description={`Welcome back ${fullName}`}
          variant="success"
        />
      ), {
        style: {
          backgroundColor: "#08bd0e",
          boxShadow: "0 0 10px rgba(170, 170, 170, 0.5)",
          padding: "16px",
        },
        icon: false,
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }, 100); // small delay (100–200ms)
  };

  if (savedUser) {
    console.log("fullname", savedUser);
    succ(savedUser.name);
    localStorage.removeItem("loginSuccess");
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#1A1A1A]">
        <ToastContainer stacked
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
          transition={Bounce}
        // toastStyle={{
        //   backgroundColor: "#eeeeee",
        //   color: "#fff",
        //   borderRadius: "8px",
        // }}
        />
        <Header />
        <HeroSection onSearch={handleFilterChange} />

        <main className="flex-grow container mx-auto px-4 py-8">
          <section className="mb-10" id="cars">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Available Cars</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-400 mr-2">Sort by:</span>
                <select className="bg-[#222222] border border-[#333333] text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] cursor-pointer">
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