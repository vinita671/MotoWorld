package com.motoworld.motoworld_backend.service;

import com.motoworld.motoworld_backend.entity.User;
import com.motoworld.motoworld_backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Fetch all admins
    public List<User> getAllAdmins() {
        return userRepository.findByRoleIgnoreCase("ADMIN");
    }

    // ✅ Add new admin
    public User addAdmin(User admin) {
        admin.setRole("ADMIN");
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return userRepository.save(admin);
    }

    // ✅ Update admin
    public User updateAdmin(Long id, User updatedAdmin) {
        User existingAdmin = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found with ID: " + id));

        existingAdmin.setName(updatedAdmin.getName());
        existingAdmin.setEmail(updatedAdmin.getEmail());
        
        if (updatedAdmin.getPassword() != null && !updatedAdmin.getPassword().isEmpty()) {
            existingAdmin.setPassword(passwordEncoder.encode(updatedAdmin.getPassword()));
        }

        return userRepository.save(existingAdmin);
    }

    // ✅ Delete admin
    public void deleteAdmin(Long id) {
        userRepository.deleteById(id);
    }
}
