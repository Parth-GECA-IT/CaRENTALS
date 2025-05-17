"use client"
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Car, Menu, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user } = useAuth();
  const location = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("User logged out");
    // Static logout functionality
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="bg-[#1A1A1A] shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img src="/logo2.png" alt="CaRENTALS" className="h-16 w-16" />
              <h1 className="text-xl font-bold text-white">Ca<span className="text-[#FF6B35]">RENTALS</span></h1>
            </div>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/">
            <span className={`hover:text-[#FF6B35] font-medium cursor-pointer ${location === '/' ? 'text-[#FF6B35]' : 'text-white'}`}>
              Home
            </span>
          </Link>
          <Link href="/#cars">
            <span className="text-white hover:text-[#FF6B35] font-medium cursor-pointer">
              Cars
            </span>
          </Link>
          <span className="text-white hover:text-[#FF6B35] font-medium cursor-pointer">
            Locations
          </span>
          <span className="text-white hover:text-[#FF6B35] font-medium cursor-pointer">
            About
          </span>
          <span className="text-white hover:text-[#FF6B35] font-medium cursor-pointer">
            Contact
          </span>
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                  <Avatar>
                    <AvatarFallback className="bg-[#FF6B35] text-white cursor-pointer">
                      {user.fullName ? getInitials(user.fullName) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-stone-950">
                <div className="p-2 text-sm font-medium">
                  <div>{user.fullName}</div>
                  <div className="text-gray-500 text-xs font-normal">{user.email}</div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <div className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Account</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                {user.isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <div className="flex items-center cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Admin Panel</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex space-x-4">
              <Link href="/auth">
                <span className="text-white hover:text-[#FF6B35] font-medium cursor-pointer">Register</span>
              </Link>
              <Link href="/auth">
                <span className="text-[#FF6B35] hover:text-white border border-[#FF6B35] px-4 py-1 rounded transition duration-300 ease-in-out font-medium cursor-pointer">
                  Login User
                </span>
              </Link>
            </div>
          )}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#222222] border-t border-[#333333]">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 py-3">
              <Link href="/">
                <span className={`text-white hover:text-[#FF6B35] font-medium py-2 cursor-pointer ${location === '/' ? 'text-[#FF6B35]' : ''}`}>
                  Home
                </span>
              </Link>
              <Link href="/#cars">
                <span className="text-white hover:text-[#FF6B35] font-medium py-2 cursor-pointer">
                  Cars
                </span>
              </Link>
              <span className="text-white hover:text-[#FF6B35] font-medium py-2 cursor-pointer">
                Locations
              </span>
              <span className="text-white hover:text-[#FF6B35] font-medium py-2 cursor-pointer">
                About
              </span>
              <span className="text-white hover:text-[#FF6B35] font-medium py-2 cursor-pointer">
                Contact
              </span>
              
              {user ? (
                <>
                  <Link href="/account">
                    <span className="text-white hover:text-[#FF6B35] font-medium py-2 cursor-pointer">
                      My Account
                    </span>
                  </Link>
                  {user.isAdmin && (
                    <Link href="/admin">
                      <span className="text-white hover:text-[#FF6B35] font-medium py-2 cursor-pointer">
                        Admin Panel
                      </span>
                    </Link>
                  )}
                  <Button className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90" onClick={handleLogout}>
                    Log out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link href="/auth">
                    <span className="block text-white hover:text-[#FF6B35] font-medium cursor-pointer">
                      Register
                    </span>
                  </Link>
                  <Link href="/auth">
                    <span className="block text-center bg-[#FF6B35] text-white py-2 rounded-md cursor-pointer">
                      Login User
                    </span>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
