package com.motoworld.motoworld_backend.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Data                   
@NoArgsConstructor       
@AllArgsConstructor    
@Builder                 
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String bikeName;
    private String showroom;
    private LocalDate bookingDate;
    private String status; // Pending, Confirmed, Completed, Cancelled
}
