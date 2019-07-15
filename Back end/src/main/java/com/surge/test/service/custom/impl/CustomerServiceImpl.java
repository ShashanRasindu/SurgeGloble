package com.surge.test.service.custom.impl;

import com.surge.test.entity.Customer;
import com.surge.test.service.custom.CustomerService;

import com.surge.test.dto.CustomerDTO;
import com.surge.test.repository.CustomerRepositiry;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.NoResultException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepositiry customerRepository;

    @Override
    public Page<CustomerDTO> getCustomersPage(int page, int size) {
        return customerRepository.findAll(PageRequest.of(page, size))
                .map(c -> new CustomerDTO(c.getFirstname(), c.getLastname(), c.getEmail(),c.getPassword()));
    }

    public List<CustomerDTO> getAllCustomers()  {
        List<CustomerDTO> customers = customerRepository.findAll().stream().map(customer -> new CustomerDTO(customer.getFirstname(), customer.getLastname(), customer.getEmail(),customer.getPassword())).collect(Collectors.toList());
        return customers;

    }
    public void saveCustomer(CustomerDTO dto)   {
        String originalPassword = dto.getPassword();
        String generatedSecuredPasswordHash = BCrypt.hashpw(originalPassword, BCrypt.gensalt(12));

        customerRepository.save(new Customer(dto.getFirstname(), dto.getLastname(), dto.getEmail(),generatedSecuredPasswordHash));
    }

    @Override
    public boolean logingCustome(CustomerDTO dto) {
        Customer one = customerRepository.getOne(dto.getEmail());
        if (BCrypt.checkpw(dto.getPassword(), one.getPassword())){
            return true;
        }
        else {
            return false;
        }
    }



    public int getUserCounr() {
        try {

            return customerRepository.getCountUsers();
        } catch (NoResultException e) {
            return 0;
        }
    }
}
