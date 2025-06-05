package com.example.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.entity.Car;
@Repository
public interface CarRepository extends JpaRepository<Car,Long>{
	List<Car> findByAvailableTrue();
	List<Car> findByType(String type);
	List<Car> findByPricePerDayBetween(Double minPrice, Double maxPrice);
}
