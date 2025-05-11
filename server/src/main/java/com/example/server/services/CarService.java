package com.example.server.services;

import java.util.List;

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
	
	public Car getCarById(Long id) {
		return carRepository.findById(id).orElse(null);
	}
	
	public Car saveCar(Car car) {
		return carRepository.save(car);
	}
	
	public void deleteCar(Long id) {
		carRepository.deleteById(id);
	}
}
