import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Login from "./Loging/Loging";
import Sign from "./Sign/Sign";
import Users from "./AllUsers/users";

const routing = (
    <Router>
            <Route path="" component={App} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/sign" component={Sign} />
            <Route path="/user" component={Users} />
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
