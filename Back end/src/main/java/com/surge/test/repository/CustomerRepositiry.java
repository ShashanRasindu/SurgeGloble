package com.surge.test.repository;

import com.surge.test.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepositiry extends JpaRepository<Customer, String> {
}
