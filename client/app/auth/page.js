"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CustomToast } from "@/components/ui/customToast";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  // const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock user state
  const [user, setUser] = useState(null);

  // Mock navigation
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const loginForm = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      fullName: "",
      phoneNumber: "",
    },
  });

  const onLoginSubmit = async (data) => {
    setIsPending(true);
    // Simulate API call
    try {
      const res = await fetch('http://localhost:8090/loginUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const user = await res.json();

      if (!res.ok) {
        // The backend sends: { error: "message" }
        throw new Error(`(${res.status}) ${user.error}` || "Login failed");
      }

      localStorage.setItem("loginSuccess", JSON.stringify(user.name));
      router.push("/");
    }
    catch (error) {
      console.log("Login error:", error);
      toast.error(<CustomToast
        title="Login failed"
        description={error.message || "Invalid username or password"}
        variant="error" />, {
        style: {
          backgroundColor: "#171717",
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
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setIsPending(false);
    }

    // Mock successful login
    // setTimeout(() => {
    //   console.log("Login data:", data);
    //   setIsPending(false);
    //   // Mock successful login
    //   setUser({ username: data.username });
    //   navigate("/");
    // }, 1500);
  };

  const onRegisterSubmit = async (data) => {
    setIsPending(true);
    // Simulate API call
    // e.preventDefault();
    const res = await fetch('http://localhost:8090/registerUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    window.location.reload();
    console.log("Register data:", data);
    setIsPending(false);

    // setTimeout(() => {
    //   console.log("Register data:", data);
    //   setIsPending(false);
    //   // Mock successful registration
    //   setUser({ username: data.username });
    //   navigate("/");
    // }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#111111]">
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
      {/* Same as */}
      <Header />

      <div className="flex-grow flex items-center justify-center py-12">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="bg-[#1A1A1A] rounded-lg shadow-lg overflow-hidden border border-[#333333]">
            <div className="flex flex-col md:flex-row">
              {/* Left side - Form */}
              <div className="md:w-1/2 p-8">
                <h1 className="text-2xl font-bold text-white mb-6">Welcome to Ca<span className="text-[#FF6B35]">RENTALS</span></h1>

                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="text-gray-200">
                  <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#222222]">
                    <TabsTrigger value="login" className="data-[state=active]:bg-[#FF6B35] data-[state=active]:text-white">Login</TabsTrigger>
                    <TabsTrigger value="register" className="data-[state=active]:bg-[#FF6B35] data-[state=active]:text-white">Register</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                        <FormField
                          control={loginForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem className="text-white">
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your username" {...field} className="bg-[#222222] border-[#444444]" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className="text-white">
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} className="bg-[#222222] border-[#444444]" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90"
                          disabled={isPending}
                        >
                          {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : null}
                          Sign In
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>

                  <TabsContent value="register">
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                        <FormField
                          control={registerForm.control}
                          name={`fullName`}
                          render={({ field }) => (
                            <FormItem className="text-white">
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} className="bg-[#222222] border-[#444444]" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="text-white">
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} className="bg-[#222222] border-[#444444]" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={registerForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem className="text-white">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                  <Input placeholder="Choose a username" {...field} className="bg-[#222222] border-[#444444]" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem className="text-white">
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your phone number"
                                    className="bg-[#222222] border-[#444444]"
                                    value={field.value || ''}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className="text-white">
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Create a password" {...field} className="bg-[#222222] border-[#444444]" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem className="text-white">
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Confirm your password" {...field} className="bg-[#222222] border-[#444444]" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90"
                          disabled={isPending}
                        >
                          {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : null}
                          Create Account
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right side - Hero */}
              <div className="md:w-1/2 bg-[#111111] p-8 text-white flex flex-col justify-center border-l border-[#333333]">
                <div className="max-w-md mx-auto py-8">
                  <h2 className="text-3xl font-bold mb-4">Your Journey Starts Here</h2>
                  <p className="mb-8 text-gray-400">
                    Join CaRENTALS today and get access to our premium fleet of vehicles. Whether you need a car for business, vacation, or just a weekend getaway, we've got the perfect vehicle for you.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 bg-[#FF6B35] p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#FF6B35]">Wide Selection</h3>
                        <p className="text-sm text-gray-400">Choose from economy, luxury, SUVs, and more</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="mt-1 bg-[#FF6B35] p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#FF6B35]">Flexible Rentals</h3>
                        <p className="text-sm text-gray-400">Daily, weekly, or monthly rental options available</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="mt-1 bg-[#FF6B35] p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#FF6B35]">Easy Booking</h3>
                        <p className="text-sm text-gray-400">Online reservation system with instant confirmation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
