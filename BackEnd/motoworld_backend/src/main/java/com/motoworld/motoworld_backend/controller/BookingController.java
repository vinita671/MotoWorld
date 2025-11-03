package com.motoworld.motoworld_backend.controller;

import com.motoworld.motoworld_backend.entity.Booking;
import com.motoworld.motoworld_backend.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class BookingController {

    private final BookingService bookingService;

    // ✅ GET all bookings
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // ✅ GET booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id);
        return booking != null ? ResponseEntity.ok(booking) : ResponseEntity.notFound().build();
    }

    // ✅ POST (create a new booking)
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking savedBooking = bookingService.createBooking(booking);
        return ResponseEntity.ok(savedBooking);
    }

    // ✅ PUT (update an existing booking)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBooking(@PathVariable Long id, @RequestBody(required = false) Booking booking) {
        if (booking == null) {
            return ResponseEntity.badRequest().body("❌ Request body is missing. Please send booking details in JSON.");
        }

        Booking updatedBooking = bookingService.updateBooking(id, booking);
        return updatedBooking != null
                ? ResponseEntity.ok(updatedBooking)
                : ResponseEntity.notFound().build();
    }

    // ✅ DELETE booking by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        boolean deleted = bookingService.deleteBooking(id);
        if (deleted) {
            return ResponseEntity.ok("✅ Booking deleted successfully!");
        } else {
            return ResponseEntity.status(404).body("❌ Booking not found!");
        }
    }
}
