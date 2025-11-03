package com.motoworld.motoworld_backend.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.motoworld.motoworld_backend.entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
}

