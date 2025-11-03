package com.motoworld.motoworld_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.motoworld.motoworld_backend.entity.Bike;
import com.motoworld.motoworld_backend.repo.BikeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BikeService {

    @Autowired
    private BikeRepository bikeRepository;

    // ✅ Get all bikes
    public List<Bike> getAllBikes() {
        return bikeRepository.findAll();
    }

    // ✅ Get bike by ID
    public Bike getBikeById(Long id) {
        return bikeRepository.findById(id).orElse(null);
    }

    // ✅ Add new bike
    public Bike addBike(Bike bike) {
        return bikeRepository.save(bike);
    }

    // ✅ Update existing bike
    public Bike updateBike(Long id, Bike bike) {
        Optional<Bike> existingOpt = bikeRepository.findById(id);
        if (existingOpt.isPresent()) {
            Bike existing = existingOpt.get();
            existing.setName(bike.getName());
            existing.setModel(bike.getModel());
            existing.setPrice(bike.getPrice());
            existing.setStatus(bike.getStatus());
            existing.setImage(bike.getImage()); // stores image URL
            return bikeRepository.save(existing);
        }
        return null;
    }

    // ✅ Delete bike by ID
    public void deleteBike(Long id) {
        bikeRepository.deleteById(id);
    }
}
