package com.surge.test.service.custom.impl;

import com.surge.test.entity.Customer;
import com.surge.test.service.custom.CustomerService;

import com.surge.test.dto.CustomerDTO;
import com.surge.test.repository.CustomerRepositiry;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                .map(c -> new CustomerDTO(c.getFirstN(), c.getLastN(), c.getEmail(),c.getPassword()));
    }

    public List<CustomerDTO> getAllCustomers()  {
        List<CustomerDTO> customers = customerRepository.findAll().stream().map(customer -> new CustomerDTO(customer.getFirstN(), customer.getLastN(), customer.getEmail(),customer.getPassword())).collect(Collectors.toList());
        return customers;

    }
    public void saveCustomer(CustomerDTO dto)   {
        customerRepository.save(new Customer(dto.getFirstN(), dto.getLastN(), dto.getEmail(),dto.getPassword()));
    }

    @Override
    public boolean logingCustome(CustomerDTO dto) {
        Customer one = customerRepository.getOne(dto.getEmail());
        if (one.getPassword().equals(dto.getPassword())){
            return true;
        }
        else {
            return false;
        }
    }

//    @Override
//    public boolean isCustomerExists(String Email) {
//     return   customerRepository.existsById(Email);
//    }
//
//    @Override
//    public CustomerDTO getCustomerById(String Email) {
//        Customer customer = customerRepository.getOne(Email);
//        CustomerDTO customerDTO = new CustomerDTO(customer.getFirstN(), customer.getLastN(), customer.getEmail(),customer.getPassword());
//        return customerDTO;
//    }


}
