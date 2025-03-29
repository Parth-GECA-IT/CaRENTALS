// import { Link } from "wouter";
// import { Twitter, Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/car-logo.svg" alt="Car Rental Logo" className="h-10 w-10" />
              <h2 className="text-xl font-bold text-white">CarRide<span className="text-[#FF6B35]">X</span></h2>
            </div>
            <p className="text-gray-400 mb-4">
              Premium car rental service for any occasion. Choose from our wide selection of vehicles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#FF6B35]">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B35]">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B35]">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#FF6B35]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-[#FF6B35]">Home</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FF6B35]">About Us</a>
              </li>
              <li>
                <Link href="/#cars">
                  <a className="text-gray-400 hover:text-[#FF6B35]">Cars</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FF6B35]">Pricing</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FF6B35]">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#FF6B35]">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FF6B35]">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FF6B35]">How to Book</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FF6B35]">Payment Methods</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FF6B35]">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FF6B35]">Terms & Conditions</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#FF6B35]">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-[#FF6B35]" />
                <span className="text-gray-400">1234 Street Name, City, Country</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-[#FF6B35]" />
                <span className="text-gray-400">+1 234 567 8900</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-[#FF6B35]" />
                <span className="text-gray-400">info@carridex.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#333333] mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CarRideX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
