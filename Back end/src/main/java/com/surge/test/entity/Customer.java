package com.surge.test.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
@Entity
public class Customer extends SuperEntity {


    private String firstname;
    private String lastname;
    @Id
    private String email;
    private String password;

    public Customer() {
    }

    public Customer(String firstN, String lastN, String email, String password) {
        firstname = firstN;
        lastname = lastN;
        email = email;
        password = password;
    }

    public String getFirstN() {
        return firstname;
    }

    public void setFirstN(String firstN) {
        firstname = firstN;
    }

    public String getLastN() {
        return lastname;
    }

    public void setLastN(String lastN) {
        lastname = lastN;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        password = password;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "FirstN='" + firstname + '\'' +
                ", LastN='" + lastname + '\'' +
                ", Email='" + email + '\'' +
                ", Password='" + password + '\'' +
                '}';
    }
}
