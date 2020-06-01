package com.ergis.projectmanager.services;

import com.ergis.projectmanager.domain.User;
import com.ergis.projectmanager.exceptions.UserExceptions.UsernameException;
import com.ergis.projectmanager.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder; // Comes with Spring Security

    public User save(User newUser) {

        // Username has to be unique (UsernameException)
        // Password must be encrypted

        User user = userRepository.findByUsername(newUser.getUsername());
        if(user != null) throw new UsernameException("Username '" + newUser.getUsername() + "' already exists");

        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        return userRepository.save(newUser);
    }
}
