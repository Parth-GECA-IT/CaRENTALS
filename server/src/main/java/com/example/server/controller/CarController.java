package com.example.server.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.entity.Car;
import com.example.server.services.CarService;

@RestController
@RequestMapping("/api/cars")
public class CarController {
	
	@Autowired
	private CarService carService;
	
	@GetMapping
	public ResponseEntity<List<Car>> getAllCars(){
		return ResponseEntity.ok(carService.getAllCars());
	}
	
	@GetMapping("/available")
	public ResponseEntity<List<Car>> getAvailableCars(){
		return ResponseEntity.ok(carService.getAvailableCars());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Car> getCarById(@PathVariable Long id) {
		return carService.getCarById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping
	public ResponseEntity<Car> addCar(@RequestBody Car car){
		if(car.getId() != null) {
			return ResponseEntity.badRequest().body(null);
		}
		return ResponseEntity.ok(carService.addCar(car));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car car){
		Optional<Car> existingCar = carService.getCarById(id);
		if(existingCar.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		car.setId(id);
		return ResponseEntity.ok(carService.updateCar(car));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
		carService.deleteCar(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/filters")
	public ResponseEntity<List<Car>> filterCars(@RequestParam(required = false) String type, @RequestParam(required = false) Double minPrice, @RequestParam(required = false) Double maxPrice){
		if(type != null) {
			return ResponseEntity.ok(carService.getCarsByType(type));
		}
		if(minPrice != null && maxPrice !=null)
			return ResponseEntity.ok(carService.getCarsByPriceRange(minPrice, maxPrice));
		return ResponseEntity.ok(carService.getAllCars());
	}
}
