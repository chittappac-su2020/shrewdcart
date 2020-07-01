import React, { Component } from 'react';

class Logout extends Component {

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