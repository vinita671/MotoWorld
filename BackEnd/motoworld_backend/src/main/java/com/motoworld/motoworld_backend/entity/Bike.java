package com.motoworld.motoworld_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bikes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String model;

    // 💡 Consider using a numeric type for price to make sorting/calculation easier
    @Column(nullable = false)
    private String price;

    @Column(nullable = false)
    private String status;

    // ✅ Allows long URLs or base64 strings
    @Column(columnDefinition = "TEXT")
    private String image;
}
