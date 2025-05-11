package com.example.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.entity.Car;
@Repository
public interface CarRepository extends JpaRepository<Car,Long>{

}
