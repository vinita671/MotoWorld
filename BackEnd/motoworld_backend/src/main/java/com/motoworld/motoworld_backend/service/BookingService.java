package com.motoworld.motoworld_backend.service;

import com.motoworld.motoworld_backend.entity.Booking;
import com.motoworld.motoworld_backend.repo.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;

    // ✅ Get all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // ✅ Get booking by ID
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    // ✅ Create new booking
    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    // ✅ Update existing booking
    public Booking updateBooking(Long id, Booking updatedBooking) {
        return bookingRepository.findById(id)
                .map(existingBooking -> {
                    // update only necessary fields
                    existingBooking.setBikeName(updatedBooking.getBikeName());
                    existingBooking.setCustomerName(updatedBooking.getCustomerName());
                    existingBooking.setShowroom(updatedBooking.getShowroom());
                    existingBooking.setBookingDate(updatedBooking.getBookingDate());
                    existingBooking.setStatus(updatedBooking.getStatus());
                    return bookingRepository.save(existingBooking);
                })
                .orElse(null); // return null if booking not found
    }

    // ✅ Delete booking (returns true if deleted, false if not found)
    public boolean deleteBooking(Long id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
