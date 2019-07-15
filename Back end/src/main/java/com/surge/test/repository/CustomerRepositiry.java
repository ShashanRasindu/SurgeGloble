package com.surge.test.repository;

import com.surge.test.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepositiry extends JpaRepository<Customer, String> {


    @Query(value = "SELECT COUNT(email) FROM customer", nativeQuery = true)
    int getCountUsers();
}
