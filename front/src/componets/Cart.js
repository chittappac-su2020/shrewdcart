import React, { Component } from 'react';
import './Home.css'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import * as axios from '../api/request';

class Cart extends Component {
    constructor(){
        super();
        this.getCartDetails();
        this.state = {cartdetails:[]};     
        console.log(this.state.cartdetails);   
    }

    getCartDetails = () => {
        
        axios.getCart().then((res) => {
           const allCartItems = res.data;

           const cartByUser = allCartItems.filter((e) => {
            return e.buyerid === JSON.parse(localStorage.getItem('details')).email;
           })

           console.log("All cart items");
           console.log(allCartItems);
           console.log("Cart by User");
           console.log(cartByUser);

           this.setState({cartdetails:cartByUser});
        })
    }

    componentWillMount(){
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

    render() {
        const tabledata = [];
        this.state.cartdetails.map((c,i) => {
            const temp = {
                name : this.state.cartdetails[i].title,
                price : this.state.cartdetails[i].price,
                quantity : this.state.cartdetails[i].quantity,
                total : parseFloat(this.state.cartdetails[i].price) * parseFloat(this.state.cartdetails[i].quantity)
            }
            tabledata.push(temp);
        })
        return(
            <BootstrapTable data = {tabledata} striped hover condensed>
            <TableHeaderColumn dataField='name' isKey>Book Name</TableHeaderColumn>
            <TableHeaderColumn dataField='price'>Price</TableHeaderColumn>
            <TableHeaderColumn dataField='quantity'>Quantity</TableHeaderColumn>
            <TableHeaderColumn dataField='total'>Total</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default Cart;