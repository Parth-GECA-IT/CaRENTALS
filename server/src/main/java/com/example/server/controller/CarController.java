package com.example.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.entity.Car;
import com.example.server.services.CarService;

@RestController
@RequestMapping("/api/cars")
public class CarController {
	
	@Autowired
	private CarService carService;
	
	@GetMapping
	public List<Car> getAllCars(){
		return carService.getAllCars();
	}
	
	@GetMapping("/{id}")
	public Car getCarById(@PathVariable Long id) {
		return carService.getCarById(id);
	}
	
	@PostMapping
	public Car createCar(@RequestBody Car car) {
		return carService.saveCar(car);
	}
	
	@DeleteMapping("/{id}")
	public void deleteCar(@PathVariable Long id) {
		carService.deleteCar(id);
	}
}
