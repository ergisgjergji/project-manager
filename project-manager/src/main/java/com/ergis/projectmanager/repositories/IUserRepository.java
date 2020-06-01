package com.ergis.projectmanager.repositories;

import com.ergis.projectmanager.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
    User getById(Long id);
    // Optional<User> findById(Long id);
}
