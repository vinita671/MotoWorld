package com.motoworld.motoworld_backend.controller;

import com.motoworld.motoworld_backend.entity.User;
import com.motoworld.motoworld_backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // ✅ Inject password encoder

    // ✅ Get all admins
    @GetMapping
    public List<User> getAllAdmins() {
        return userRepository.findByRoleIgnoreCase("ADMIN");
    }

    // ✅ Get admin by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getAdminById(@PathVariable Long id) {
        return userRepository.findById(id)
                .filter(user -> "ADMIN".equalsIgnoreCase(user.getRole()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Add new admin (with encoded password)
    @PostMapping
    public ResponseEntity<User> addAdmin(@RequestBody User admin) {
        admin.setRole("ADMIN");
        if (admin.getPassword() != null && !admin.getPassword().isEmpty()) {
            admin.setPassword(passwordEncoder.encode(admin.getPassword())); // 🔒 encode password
        }
        User savedAdmin = userRepository.save(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    // ✅ Update admin (with optional encoded password)
    @PutMapping("/{id}")
    public ResponseEntity<User> updateAdmin(@PathVariable Long id, @RequestBody User updatedAdmin) {
        return userRepository.findById(id)
                .filter(user -> "ADMIN".equalsIgnoreCase(user.getRole()))
                .map(existingAdmin -> {
                    existingAdmin.setName(updatedAdmin.getName());
                    existingAdmin.setEmail(updatedAdmin.getEmail());

                    // ✅ Only update password if provided (and encode it)
                    if (updatedAdmin.getPassword() != null && !updatedAdmin.getPassword().isEmpty()) {
                        existingAdmin.setPassword(passwordEncoder.encode(updatedAdmin.getPassword()));
                    }

                    User saved = userRepository.save(existingAdmin);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete admin
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Long id) {
        return userRepository.findById(id)
                .filter(user -> "ADMIN".equalsIgnoreCase(user.getRole()))
                .map(admin -> {
                    userRepository.delete(admin);
                    return ResponseEntity.ok("Admin deleted successfully");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
