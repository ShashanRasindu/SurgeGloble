package com.surge.test.controller;


import com.surge.test.service.custom.CustomerService;
import com.surge.test.dto.CustomerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@CrossOrigin
@RequestMapping("/api/v1/customers")
@RestController
public class CustomerController  {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<CustomerDTO> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping(path = "/total")
    public ResponseEntity<String> getcount(){

        String count = Integer.toString(customerService.getUserCounr());
        System.out.println(count);
        return new ResponseEntity<String>("\""+count+"\"",HttpStatus.CREATED);

    }




    @GetMapping(params = {"page","size"})
    public ResponseEntity<PagedResources<CustomerDTO>> getCustomersPage(int page, int size, PagedResourcesAssembler assembler){
        Page<CustomerDTO> customersPage = customerService.getCustomersPage(page, size);
        return new ResponseEntity<>(assembler.toResource(customersPage),HttpStatus.OK);
    }



    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> saveCustomer(@RequestBody CustomerDTO customer){




        if (customer.getLastname().isEmpty() || customer.getFirstname().isEmpty()){
            boolean b = customerService.logingCustome(customer);
            if (b){
                return new ResponseEntity<Void>(HttpStatus.OK);
            }else {
                return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
            }
        }else {
            if (customer.getEmail().isEmpty() || customer.getPassword().isEmpty() || customer.getFirstname().isEmpty() || customer.getLastname().isEmpty()){
                return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
            }else{
                customerService.saveCustomer(customer);
                return new ResponseEntity<Void>(HttpStatus.CREATED);
            }
        }
    }



}
