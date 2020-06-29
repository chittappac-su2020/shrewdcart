import React, { Component } from 'react';
import * as axios from '../api/request';

class Register extends Component {

    register = (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        }else{
            alert("Eneter a valid email address");
            return;
        }
        const user = {};
        user.firstname = document.getElementById('fname').value;
        user.lastname = document.getElementById('lname').value;
        user.email = document.getElementById('email').value;
        user.password = document.getElementById('password').value;

        axios.register(user).then((res) => {
            console.log(res);
            if(res.status==500){
                alert(res.data.message);
            }
        });
    }

    render() {
        return(
            <div className="register-screen">
            <form>
                <h2>Register</h2>
                    <label for="fname">First Name:</label>
                    <input type="text" id="fname" name="fname"></input><br></br>
                    <label for="lname">Last Name:    </label>
                    <input type="text" id="lname" name="lname"></input><br></br>
                    <label for="email">Email:    </label>
                    <input type="text" id="email" name="email"></input><br></br>
                    <label for="email">Password:    </label>
                    <input type="password" id="password" name="email"></input><br></br>
                    <input type="button" onClick={(e)=>{this.register(e)}} value="Register"></input>
            </form>
            </div> 
        );
    }
}

export default Register;