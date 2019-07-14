package com.surge.test.service.custom;



import com.surge.test.service.SuperService;
import com.surge.test.dto.CustomerDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CustomerService extends SuperService {

    Page<CustomerDTO> getCustomersPage(int page, int size);

    List<CustomerDTO> getAllCustomers();

    void saveCustomer(CustomerDTO dto);

    boolean logingCustome(CustomerDTO dto);
//    boolean isCustomerExists(String Email);
//
//    CustomerDTO getCustomerById(String Email);


}
