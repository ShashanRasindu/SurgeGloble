import React, { Component } from "react";
import { Button, FormGroup, FormControl} from "react-bootstrap";
import "./Sign.css";
import {Link} from "react-router-dom";
import axios from 'axios';
export default class Sign extends Component {
    constructor(props) {
        super(props);

        this.onChangeFname=this.onChangeFname.bind(this);

        this.onChangeLname=this.onChangeLname.bind(this);

        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onChangeCpw=this.onChangeCpw.bind(this);

        this.state = {
            Fname: "",
            Lname: "",
            email:"",
            password:"",
            Cpw:""
        };


    }


    //
    // handleChange = event => {
    //     this.setState({
    //         Fname: event.target.value,
    //         Lname: event.target.value,
    //         email: event.target.value,
    //         password: event.target.value,
    //         Cpw: event.target.value
    //     });
    // }
    //
    onChangeFname(e){
        this.setState({
            Fname:e.target.value

        })


    }
    onChangeLname(e){
        this.setState({
            Lname:e.target.value
        })
        console.log(this.state.Fname);
    }
    onChangeEmail(e){
        this.setState({
            email:e.target.value
        })
    }
    onChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }
    onChangeCpw(e){
        this.setState({
            Cpw:e.target.value
        })

    }
    //
    validateForm() {
        console.log("lol");
        // let fname=this.state.email;
        //
        // if(!(fname > 0 && this.state.password.length > 6 && this.state.Fname.length > 0 && this.state.Lname.length > 0 && this.state.Cpw.length > 0))
        // {
        //
        //     alert("Passwords and Confirm PW dose match");
        //     return;
        //
        // }else if (!(this.state.password == this.state.Cpw)) {
        //
        //     alert("Passwords and Confirm PW dose match");
        //     return;
        //
        // }
    }






    onSubmit(e){


        e.preventDefault();

        // const obj ={
        //
        //     Fname : this.state.Fname,
        //     Lname : this.state.Lname,
        //     email :this.state.email,
        //     password : this.state.password
        // };

        // axios.post('http://localhost:8080/api/v1/customers' , obj)
        //     .then(res => {alert("Log in")})
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        fetch('http://localhost:8080/api/v1/customers',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                firstname: this.state.Fname,
                lastname: this.state.Lname,
                email:this.state.email,
                password:this.state.password
            }),

        })
            .then(function(response){
                return response.json()
            }).then(function(body){
           if (body.status(201)){
               this.props.history.push('/user');
           } ;
            alert("lol");
            }).catch((error) => {
            console.error(error);
        });
        this.setState({
            Fname: "",
            Lname: "",
            email: "",
            password: ""
        });


    }



    // handleSubmit = event => {
    //     event.preventDefault();
    // }

    render() {
        return (
            <div className="Sign">
                <form onSubmit={this.onSubmit}>
                    <FormGroup controlId="Fname">
                        <label>Fast Name</label>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.Fname}
                            onChange={this.onChangeFname}
                        />
                    </FormGroup>
                    <FormGroup controlId="Lname" >
                        <label>Last Name</label>
                        <FormControl
                            value={this.state.Lname}
                            onChange={this.onChangeLname}
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup controlId="email">
                        <label>Email</label>
                        <FormControl
                            type="email"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" >
                        <label>Password</label>
                        <FormControl
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup controlId="Cpw" >
                        <label>Comfirm Password</label>
                        <FormControl
                            value={this.state.Cpw}
                            onChange={this.onChangeCpw}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        // disabled={!this.validateForm()}
                        onclick={this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
                <br/>
                <h6 >Back to <b><Link to={"/login"}> Log In</Link></b></h6>
            </div>
        );
    }
}
