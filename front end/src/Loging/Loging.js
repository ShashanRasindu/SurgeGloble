import React, { Component } from "react";
import { Button, FormGroup, FormControl} from "react-bootstrap";
import "./Loging.css";
import {Link} from "react-router-dom";
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
            this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
            this.onChangeUserPasword = this.onChangeUserPasword.bind(this);
        this.state = {
            email: "",
            password: ""
        };
    }
    onChangeUserEmail(e){
        this.setState({
            email:e.target.value
        })
    }
    onChangeUserPasword(e){
        this.setState({
            password:e.target.value
        })
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 6;
    }

    // handleChange = event => {
    //     this.setState({
    //         [event.target.id]: event.target.value
    //     });
    // }

    // handleSubmit = event => {
    //     event.preventDefault();
    // }

    onSubmit(e){
        e.preventDefault();
        // console.log(this.email);
        // console.log(this.onChangeUserPasword);
        // const obj ={
        //     email :'shashan@gmail.com',
        //     password : '123456789'
        // };

        // axios.post('http://localhost:8080/api/v1/customers' , obj)
        //     .then(res => {alert("Log in")})
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        // this.setState({
        //     email: "",
        //     password: ""
        // });
        fetch('http://localhost:8080/api/v1/customers',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                email : this.state.email,
                    password : this.state.password
            }),

        })
            .then(function(response){
                return response.json()
            }).then(function(body){
            if (body.status(200)){
                this.props.history.push('/user');
            }
        }).catch((error) => {
            console.error(error);
        });


    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.onSubmit}>
                    <FormGroup controlId="email">
                        <label>Email</label>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.onChangeUserEmail}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" >
                        <label>Password</label>
                        <FormControl
                            value={this.state.password}
                            onChange={this.onChangeUserPasword}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
                <br/>
                {/*<h6>Don't have an account ? <b>Sign up</b></h6>*/}

                <h6>Don't have an account ? <b><Link to={"/sign"}>Sign up</Link></b></h6>
            </div>
        );
    }
}
