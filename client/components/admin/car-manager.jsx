"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Loader2, PenSquare, Plus, Trash2 } from "lucide-react";
import { CustomToast } from "@/components/ui/customToast";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Mock data for cars
const mockCars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Camry",
    year: 2023,
    type: "Sedan",
    transmission: "Automatic",
    fuelType: "Gasoline",
    seats: 5,
    pricePerDay: 75,
    features: ["Bluetooth", "Backup Camera", "Cruise Control", "USB Port"],
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3",
    available: true
  },
  {
    id: 2,
    brand: "Honda",
    model: "CR-V",
    year: 2022,
    type: "SUV",
    transmission: "Automatic",
    fuelType: "Hybrid",
    seats: 5,
    pricePerDay: 95,
    features: ["Navigation", "Sunroof", "Heated Seats", "Apple CarPlay"],
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3",
    available: false
  },
  {
    id: 3,
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    type: "Electric",
    transmission: "Automatic",
    fuelType: "Electric",
    seats: 5,
    pricePerDay: 120,
    features: ["Autopilot", "Premium Sound", "Heated Seats", "Supercharging"],
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3",
    available: true
  }
];

export default function CarManager() {
  const [cars, setCars] = useState(mockCars);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredCars = activeTab === "all"
    ? cars
    : activeTab === "available"
      ? cars.filter(car => car.available)
      : cars.filter(car => !car.available);

  const sortedCars = [...filteredCars].sort((a, b) => a.id - b.id);

  const form = useForm({
    defaultValues: {
      brand: "",
      model: "",
      year: 2023,
      type: "Sedan",
      transmission: "Automatic",
      fuelType: "Gasoline",
      seats: 5,
      pricePerDay: 0,
      features: "",
      imageUrl: "",
    },
  });

  const validateForm = (data) => {
    const errors = {};

    if (!data.brand) errors.brand = "Brand is required";
    if (!data.model) errors.model = "Model is required";
    if (data.year < 2000 || data.year > 2030) errors.year = "Year must be between 2000 and 2030";
    if (!data.type) errors.type = "Type is required";
    if (!data.transmission) errors.transmission = "Transmission is required";
    if (!data.fuelType) errors.fuelType = "Fuel type is required";
    if (data.seats < 2 || data.seats > 9) errors.seats = "Seats must be between 2 and 9";
    if (data.pricePerDay < 0) errors.pricePerDay = "Price must be a positive number";
    if (!data.imageUrl || !data.imageUrl.startsWith('http')) errors.imageUrl = "Please enter a valid URL";

    return errors;
  };

  const onSubmitCreate = (data) => {
    // Validate form data
    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([key, value]) => {
        form.setError(key, { type: 'manual', message: value });
      });
      return;
    }

    // Process features from comma-separated string to array
    const featuresArray = data.features
      ? data.features.split(',').map(s => s.trim()).filter(s => s !== '')
      : [];

    // Mock creating a car
    const newCar = {
      ...data,
      features: featuresArray,
      id: cars.length + 1,
      available: true
    };
    setCars([...cars, newCar]);
    toast(() => (
      <CustomToast
        title="Car Created"
        description={"The car has been added to the inventory."}
        variant="success"
      />
    ), {
      style: { backgroundColor: '#10B710' },
      icon: false,
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
    setOpenCreateDialog(false);
    form.reset();
  };

  const onSubmitEdit = (data) => {
    if (selectedCar) {
      // Validate form data
      const errors = validateForm(data);
      if (Object.keys(errors).length > 0) {
        Object.entries(errors).forEach(([key, value]) => {
          form.setError(key, { type: 'manual', message: value });
        });
        return;
      }

      // Process features from comma-separated string to array
      const featuresArray = data.features
        ? data.features.split(',').map(s => s.trim()).filter(s => s !== '')
        : [];

      // Mock updating a car
      const updatedCars = cars.map(car =>
        car.id === selectedCar.id ? { ...car, ...data, features: featuresArray } : car
      );
      setCars(updatedCars);
      // toast({
      //   title: "Car Updated",
      //   description: "The car details have been updated successfully.",
      // });
      toast(() => (
        <CustomToast
          title="Car Updated"
          description={"The car details have been updated successfully."}
          variant="success"
        />
      ), {
        style: { backgroundColor: '#10B710' },
        icon: false,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      setOpenEditDialog(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this car? This action cannot be undone.")) {
      // Mock deleting a car
      setCars(cars.filter(car => car.id !== id));
      toast(() => (
        <CustomToast
          title="Car Deleted"
          description={"The car has been removed from the inventory."}
          variant="success"
        />
      ), {
        style: { backgroundColor: '#FF4444' },
        icon: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleToggleAvailability = (id, currentAvailability) => {
    // Mock toggling availability
    const updatedCars = cars.map(car =>
      car.id === id ? { ...car, available: !currentAvailability } : car
    );
    setCars(updatedCars);
    toast(() => (
      <CustomToast
        title="Availability Updated"
        // description="The car's availability status has been updated."
        description={`The car is now ${currentAvailability ? 'unavailable' : 'available'}.`}
        variant="success"
      />
    ), {
      style: { backgroundColor: currentAvailability ? '#FF4444' : '#10B710' },
      icon: false,
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  };

  const handleEditCar = (car) => {
    setSelectedCar(car);
    form.reset({
      brand: car.brand,
      model: car.model,
      year: car.year,
      type: car.type,
      transmission: car.transmission,
      fuelType: car.fuelType,
      seats: car.seats,
      pricePerDay: car.pricePerDay,
      features: car.features.join(', '),
      imageUrl: car.imageUrl,
    });
    setOpenEditDialog(true);
  };

  const handleCreateCar = () => {
    form.reset({
      brand: "",
      model: "",
      year: 2023,
      type: "Sedan",
      transmission: "Automatic",
      fuelType: "Gasoline",
      seats: 5,
      pricePerDay: 0,
      features: "",
      imageUrl: "",
    });
    setOpenCreateDialog(true);
  };

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div>
      <ToastContainer stacked
        position={isMobileView ? "top-center" : "bottom-right"}
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
        className={"custom-toast-container"}
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-lg font-semibold mb-3 sm:mb-0">Car Inventory Management</h2>
        <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={handleCreateCar}
              className="bg-[#10B981] hover:bg-[#10B981]/85 cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Car
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Car</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitCreate)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Toyota" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Camry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={2000}
                            max={2030}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pricePerDay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price Per Day ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select car type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["Sedan", "SUV", "Compact", "Luxury", "Minivan", "Sport", "Electric", "Midsize"].map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seats"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seats</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of seats" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[2, 4, 5, 6, 7, 8, 9].map((num) => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="transmission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transmission</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transmission type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Automatic">Automatic</SelectItem>
                            <SelectItem value="Manual">Manual</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fuelType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select fuel type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["Gasoline", "Diesel", "Hybrid", "Electric"].map((fuel) => (
                              <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features (comma-separated)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g. GPS, Bluetooth, Leather Seats"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the URL of the car image"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-[#3B82F6] hover:bg-[#3B82F6]/90"
                >
                  Create Car
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="cursor-pointer">All Cars ({cars.length})</TabsTrigger>
          <TabsTrigger value="available" className="cursor-pointer">Available ({cars.filter(car => car.available).length})</TabsTrigger>
          <TabsTrigger value="unavailable" className="cursor-pointer">Unavailable ({cars.filter(car => !car.available).length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedCars.map((car) => (
              <Card key={car.id}>
                <div className="relative">
                  <img
                    src={car.imageUrl}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className={`absolute top-2 right-2 ${car.available ? 'bg-[#10B981]' : 'bg-red-500'}`}>
                    {car.available ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">{car.brand} {car.model} ({car.year})</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span>{car.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Seats:</span>
                      <span>{car.seats}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Transmission:</span>
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Fuel:</span>
                      <span>{car.fuelType}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-lg font-bold text-[#3B82F6]">${car.pricePerDay} <span className="text-sm font-normal text-gray-600">/ day</span></p>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {car.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="text-xs text-black font-semibold bg-gray-100 px-2 py-1 rounded-full">{feature}</span>
                    ))}
                    {car.features.length > 3 && (
                      <span className="text-xs text-black font-semibold bg-gray-100 px-2 py-1 rounded-full">+{car.features.length - 3} more</span>
                    )}
                  </div>

                  <Separator className="mb-4" />

                  <div className="flex justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 cursor-pointer"
                      onClick={() => handleToggleAvailability(car.id, car.available)}
                    >
                      {car.available ? 'Set Unavailable' : 'Set Available'}
                    </Button>
                    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 cursor-pointer"
                          onClick={() => handleEditCar(car)}
                        >
                          <PenSquare className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Edit Car</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
                            {/* Form fields identical to create form */}
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="brand"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Brand</FormLabel>
                                    <FormControl>
                                      <Input placeholder="e.g. Toyota" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="model"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Model</FormLabel>
                                    <FormControl>
                                      <Input placeholder="e.g. Camry" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="year"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Year</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        min={2000}
                                        max={2030}
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="pricePerDay"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Price Per Day ($)</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        min={0}
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select car type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {["Sedan", "SUV", "Compact", "Luxury", "Minivan", "Sport", "Electric", "Midsize"].map((type) => (
                                          <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="seats"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Seats</FormLabel>
                                    <Select
                                      onValueChange={(value) => field.onChange(parseInt(value))}
                                      defaultValue={field.value.toString()}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select number of seats" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {[2, 4, 5, 6, 7, 8, 9].map((num) => (
                                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="transmission"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Transmission</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select transmission type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="Automatic">Automatic</SelectItem>
                                        <SelectItem value="Manual">Manual</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="fuelType"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Fuel Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select fuel type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {["Gasoline", "Diesel", "Hybrid", "Electric"].map((fuel) => (
                                          <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={form.control}
                              name="features"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Features (comma-separated)</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="e.g. GPS, Bluetooth, Leather Seats"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="imageUrl"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Image URL</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter the URL of the car image"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button
                              type="submit"
                              className="w-full bg-[#3B82F6] hover:bg-[#3B82F6]/90 cursor-pointer"
                            >
                              Update Car
                            </Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-none text-red-600 border-red-600 hover:bg-red-50 cursor-pointer"
                      onClick={() => handleDelete(car.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedCars.length === 0 && (
            <div className="text-center py-12 bg-secondary-foreground rounded-md">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">No cars found</h3>
              <p className="text-gray-600 mb-6">
                {activeTab === "all"
                  ? "There are no cars in the inventory."
                  : activeTab === "available"
                    ? "There are no available cars in the inventory."
                    : "There are no unavailable cars in the inventory."}
              </p>
              <Button
                onClick={handleCreateCar}
                className="cursor-pointer bg-[#3B82F6] hover:bg-[#3B82E6]/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Car
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
