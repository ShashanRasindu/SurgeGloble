package com.surge.test.controller;


import com.surge.test.service.custom.CustomerService;
import com.surge.test.dto.CustomerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping("/api/v1/customers")
@RestController
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<CustomerDTO> getAllCustomers() {
        return customerService.getAllCustomers();
    }


//    @GetMapping(params = {"page","size"})
//    public ResponseEntity<PagedResources<CustomerDTO>> getCustomersPage(int page, int size, PagedResourcesAssembler assembler){
//        Page<CustomerDTO> customersPage = customerService.getCustomersPage(page, size);
//        return new ResponseEntity<>(assembler.toResource(customersPage),HttpStatus.OK);
//    }

//    @GetMapping(value = "/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<CustomerDTO> getCustomer(@PathVariable("email") String email) {
//        CustomerDTO dto = null;
//        if (customerService.isCustomerExists(email)){
//            dto = customerService.getCustomerById(email);
//        }
//        return new ResponseEntity<CustomerDTO>(dto, (dto != null) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
//    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> saveCustomer(@RequestBody CustomerDTO customer){
        if (customer.getLastN().isEmpty() || customer.getFirstN().isEmpty()){
            boolean b = customerService.logingCustome(customer);
            if (b){
                return new ResponseEntity<Void>(HttpStatus.OK);
            }else {
                return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
            }
        }else {
            if (customer.getEmail().isEmpty() || customer.getPassword().isEmpty() || customer.getFirstN().isEmpty() || customer.getLastN().isEmpty()){
                return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
            }else{
                customerService.saveCustomer(customer);
                return new ResponseEntity<Void>(HttpStatus.CREATED);
            }
        }
    }



}
