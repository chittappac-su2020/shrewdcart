import React, { Component } from 'react';
import './Profile.css'
import * as axios from '../api/request';

class Profile extends Component {

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
        if(!JSON.parse(localStorage.getItem('login'))){

            alert("Please login to continue");
            window.location.href = "/login";

        }else{
            var login = JSON.parse(localStorage.getItem('login')).login;
            if(!login){
            alert("Please login to continue");
            window.location.href = "/login";
            }
        }
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
            password:document.getElementById("em").value,
        }));

        axios.update(user).then((res) => {
            console.log("after update request");
            alert(res.data.message)
            console.log(res)
        });

    }

    toggleDisable = (e) => {

        e.preventDefault();
        
        document.getElementById("fname").disabled = false
        document.getElementById("lname").disabled = false
        document.getElementById("em").disabled = false
    }

    render() {
            var firstname = "";
            var lastname = "";
            var password = "";
        if(!JSON.parse(localStorage.getItem('details'))){

            firstname = "";
            lastname = "";
            password = "";

        }else{
            let details = JSON.parse(localStorage.getItem('details'));
            firstname = details.firstname;
            lastname = details.lastname;
            password = details.password;
        }
        return(
            <div className="profile-screen">
                <h2>Profile</h2>
                <label for="username">Firstname:</label>
                <input type="text" class="userdata" id="fname"  defaultValue={firstname} disabled></input><br></br>
                <label for="lastname">Lastname:    </label>
                <input type="text" class="userdata" id="lname" defaultValue={lastname} disabled></input><br></br>
                <label for="email">Password:    </label> 
                <input type="password" class="userdata" id="em" defaultValue={password} disabled></input><br></br>
                <p>Password is hidden for security purposes</p>
                <input type="button" value="Edit" onClick={(e)=>{this.toggleDisable(e)}}></input>
                <input type="button" value="Update" onClick={(e)=>{this.updateProfile(e)}}></input>
            </div>
        );
    }
}

export default Profile;