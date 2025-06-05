package com.example.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.entity.Car;
import com.example.server.repository.CarRepository;

@Service
public class CarService {
	@Autowired
	private CarRepository carRepository;
	
	public List<Car> getAllCars(){
		return carRepository.findAll();
	}
	
	public List<Car> getAvailableCars(){
		return carRepository.findByAvailableTrue();
	}
	
	public Car addCar(Car car) {
		return carRepository.save(car);
	}
	
	public Car updateCar(Car car) {
		return carRepository.save(car);
	}
	
	public Optional<Car> getCarById(Long id) {
		return carRepository.findById(id);
	}
	
	public void deleteCar(Long id) {
		carRepository.deleteById(id);
	}
	
	public List<Car> getCarsByType(String type){
		return carRepository.findByType(type);
	}
	
	public List<Car> getCarsByPriceRange(double min, double max){
		return carRepository.findByPricePerDayBetween(min, max);
	}
}
