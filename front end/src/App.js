import React from 'react';
import './App.css';
import Sign from "./Sign/Sign";
import Login from "./Loging/Loging";
import {Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Link to={"/login"}></Link>
    </div>
  );
}

export default App;
