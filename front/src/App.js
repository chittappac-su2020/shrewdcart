import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import './App.css';
import "react-bootstrap/dist/react-bootstrap.min.js";
import "react-bootstrap/dist/react-bootstrap";
import Register from '../src/componets/Register';
import Login from '../src/componets/Login';
import Profile from '../src/componets/Profile';
import Home from '../src/componets/Home';
import Logout from '../src/componets/Logout';
import Seller from '../src/componets/Seller';
import Buyer from '../src/componets/Buyer';
import Cart from '../src/componets/Cart';

class App extends Component{

  render(){
    if(!JSON.parse(localStorage.getItem('login'))){
      
    }else{
      var login = JSON.parse(localStorage.getItem('login')).login;
    }
    
    return(
      <div>
            
      <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href=""></Navbar.Brand>
    
        <Nav className="mr-auto">
        <h2 id="logo">e-cart</h2>
        <Nav.Link href="/register">Register</Nav.Link><br></br>
        { (!login) ?
          <Nav.Link href="/login">Login</Nav.Link>
          :
          <Nav.Link href="/logout">Logout</Nav.Link>
        }
        <br/><br/>
        <Nav.Link href="/profile">Profile</Nav.Link><br/><br/>
        <Nav.Link href="/sell">Sell</Nav.Link><br/><br/>
        <Nav.Link href="/buy">Buy</Nav.Link><br/><br/>
        <Nav.Link href="/cart">Cart</Nav.Link>
        </Nav>
    
        </Navbar>

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/logout" component={Logout} />
          <Route path="/sell" component={Seller} />
          <Route path="/buy" component={Buyer} />
          <Route path="/cart" component={Cart} />
        </Switch>

    </div>
    );

  }
    
}
export default App;
