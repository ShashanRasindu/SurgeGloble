import React, {Component} from "react";
import {Button, FormControl, FormGroup} from "react-bootstrap";
import "./Loging.css";
import {Link} from "react-router-dom";

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

    onChangeUserEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeUserPasword(e) {
        this.setState({
            password: e.target.value
        })
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 6;
    }


    onSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:8080/api/v1/customers', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                email: this.state.email,
                password: this.state.password
            }),

        })
            .then(function (response) {
                return response.json()
            }).then(function (body) {
            if (body.status(200)) {
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
                    <FormGroup controlId="password">
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
                <h6>Don't have an account ? <b><Link to={"/sign"}>Sign up</Link></b></h6>
            </div>
        );
    }
}
