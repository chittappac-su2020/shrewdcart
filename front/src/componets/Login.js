import React, { Component } from 'react';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Seller from './Seller'
import * as axios from '../api/request';
import ForgotPassword from '../componets/ForgotPassword';
import { Route, Switch } from 'react-router-dom';

class Login extends Component {

    constructor(){
        super();
        this.state={
            firstname:null,
            lastname:null,
            password:null,
            login:false,
            store:null,
        }
    }

    componentDidMount(){
        this.storeSetter()
    }

    storeSetter(){
        let store = JSON.parse(localStorage.getItem('login'));
        let details = JSON.parse(localStorage.getItem('details'));
        if(store && store.login && details){
            this.setState({firstname:details.firstname,lastname:details.lastname,password:details.password,login:true,store:store});
        }
    }


    login = (e) => {
        console.log("Came to this block");
        e.preventDefault();

        const user = {};

        user.email = document.getElementById('email').value;
        user.password = document.getElementById('password').value;

        console.log('login details');
        console.log(user);

        axios.login(user).then((res) => {
            console.log("This is after loginnnn");
            console.log(res);
            
            if(res.data.message){
                alert(res.data.message);
            }else{

                localStorage.setItem('login',JSON.stringify({
                    login:true,
                    token:res.data.token
                }));

                axios.profile(user).then((res) => {
                    console.log('after profile request');
                    console.log(res);
                    localStorage.setItem('details',JSON.stringify({
                        id:res.data.id,
                        firstname:res.data.firstname,
                        email:res.data.email,
                        lastname:res.data.lastname,
                        password:res.data.password
                    }))
                    this.setState({firstname:res.data.firstname,lastname:res.data.lastname,password:res.data.password,login:true});
                })
            }
        });
    }

    sellerRoute = (e) => {
        return(
            <div>
                <Switch>
                <Route path="/seller" component={Seller} />
                </Switch>
            </div>
        );
    }

    toggleDisable = (e) => {

        e.preventDefault();
        
        document.getElementById("fname").disabled = false
        document.getElementById("lname").disabled = false
        document.getElementById("em").disabled = false
    }

    updateProfile = (e) => {

        e.preventDefault();

        const user = {}

        user.id = JSON.parse(localStorage.getItem('details')).id;
        user.firstname = document.getElementById("fname").value;
        user.lastname = document.getElementById("lname").value;
        user.password = document.getElementById("em").value;

        localStorage.setItem('details',JSON.stringify({
            firstname:document.getElementById("fname").value,
            lastname:document.getElementById("lname").value,
            password:"$2b$10$/Hpk7s/lpTFM90nxQZsgJeYsiFWdkn4QANvJzT9AQMrEfaaxF6s22"
        }));

        axios.update(user).then((res) => {
            console.log("after update request");
            alert(res.data.message)
            console.log(res)
        });

    }

    reset = (e) => {

    }

    render() {

        return(

            <div className="login-screen">
                {
                    !this.state.login?
                    <div>

                    <form>
                    <label for="username">Username:</label>
                    <input type="text" id="email" name="email"></input><br></br>
                    <label for="password">Passsword:    </label>
                    <input type="password" id="password" name="password"></input><br></br>
                    <input type="button" onClick={(e)=>{this.login(e)}}  value="Login"></input>
                    
                    <Nav.Link href="/resetpassword">Forgot password?</Nav.Link><br/><br/>
                    </form>
                    </div>
                    :
                    <div>
                        <Seller/>
                    </div>
                }
            </div>
            
            
        )
                

        }
    }

export default Login;