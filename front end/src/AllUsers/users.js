import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './tableRow';
import { Table} from "react-bootstrap";
export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            total : ""
        };
    }
    getAllUsers(){
        axios.get('http://localhost:8080/api/v1/customers')
            .then(response => {
                this.setState({ customers: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getTotalUserd(){
        axios.get('http://localhost:8080/api/v1/customers/total')
            .then(response => {
                this.setState({ total: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount(){
        this.getAllUsers();
        this.getTotalUserd();

    }
    tabRow(){
        return this.state.customers.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
    }


    render() {
        return (
            <div>
                <br/>
                <h5 align="left">Customer List</h5>
                <h6>Total Users : {this.state.total}</h6>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        {/*<th colSpan="2">Action</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    { this.tabRow() }
                    </tbody>
                </Table>
            </div>
        );
    }
}