import React, { Component } from 'react';
import * as axios from '../api/request';

class ForgotPassword extends Component {

    reset = (e) => {
        let body = {}
        body.email = document.getElementById("email").value;

        console.log("This is the email");
        console.log(body.email);

        axios.resetPassword().then((res) => {
            console.log("This is the response of reset password");
            console.log(res);
        })
    }

    render() {
        return(
            <div className="forgot-password-screen">
                <h2>Enter your email: </h2>
                <input type="text" id="email" name="email"></input><br></br>
                <input type="button" onClick={(e)=>{this.reset(e)}}  value="Reset password"></input>
            </div>
        );
    }
}

export default ForgotPassword;