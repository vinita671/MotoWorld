package com.motoworld.motoworld_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.motoworld.motoworld_backend.entity.Bike;
import com.motoworld.motoworld_backend.service.BikeService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/bikes")
public class BikeController {

    @Autowired
    private BikeService bikeService;

    // ✅ Get all bikes
    @GetMapping
    public ResponseEntity<List<Bike>> getAllBikes() {
        List<Bike> bikes = bikeService.getAllBikes();
        return ResponseEntity.ok(bikes);
    }

    // ✅ Get bike by ID
    @GetMapping("/{id}")
    public ResponseEntity<Bike> getBikeById(@PathVariable Long id) {
        Bike bike = bikeService.getBikeById(id);
        if (bike == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(bike);
    }

    // ✅ Add new bike (accepts JSON)
    @PostMapping
    public ResponseEntity<Bike> addBike(@RequestBody Bike bike) {
        Bike savedBike = bikeService.addBike(bike);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBike);
    }

    // ✅ Update existing bike (accepts JSON)
    @PutMapping("/{id}")
    public ResponseEntity<Bike> updateBike(@PathVariable Long id, @RequestBody Bike bike) {
        Bike updatedBike = bikeService.updateBike(id, bike);
        if (updatedBike == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(updatedBike);
    }

    // ✅ Delete bike
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBike(@PathVariable Long id) {
        Bike existing = bikeService.getBikeById(id);
        if (existing == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Bike not found with ID: " + id);
        }

        bikeService.deleteBike(id);
        return ResponseEntity.ok("Bike deleted successfully!");
    }
}
