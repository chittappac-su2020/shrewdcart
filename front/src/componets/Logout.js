import React, { Component } from 'react';
import * as axios from '../api/request';

class Logout extends Component {

    constructor(){
        super();
        axios.logout().then((res) => {
            console.log(res);
        })
    }

    componentDidMount(){
        localStorage.setItem('login',JSON.stringify({
            login:false,
            token:null
        }));
        localStorage.setItem('details',JSON.stringify({
            
        }));
    }

    render() {
        return(
            <div className="logout-screen">
                <h2>You are successfully logged out!</h2>
            </div>
        );
    }
}

export default Logout;