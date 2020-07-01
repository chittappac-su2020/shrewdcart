import React, { Component } from 'react';
import * as axios from '../api/request';
import { Modal, Card, Button } from 'react-bootstrap';

class Buyer extends Component {

    constructor(){
        super();
        this.retrieveAllBooks();
        this.state = {
            allbooks : [],
            authorNames : [],
            allImages : []
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

    retrieveAllBooks = () => {
        var email = ""
        if(!JSON.parse(localStorage.getItem('details'))){

        }else{
            email = { email : JSON.parse(localStorage.getItem('details')).email };
        }
        
        axios.findAllBooks().then((res) => {

            if(res.status === 200){
                console.log(res.data)
                this.setState({allbooks : res.data});
            }

        })
        axios.findAllAuthors().then((res) => {
            if(res.status === 200){
                this.setState({authorNames:res.data});
            }
        })
        axios.findAllImage().then((res) => {
            if(res.status === 200){
                console.log("All image details");
                console.log(res.data);
                this.setState({allimages:res.data});
            }
        })
    }

    //Adding to cart
    addToCart = (e) => {
        const i = e.target.id;
        const cartData={};
        cartData.title = document.getElementById("ctitle"+i).value;
        cartData.quantity = 1;
        cartData.price = document.getElementById("cprice"+i).value;
        cartData.sellerid = document.getElementById("cseller"+i).value;
        cartData.buyerid = JSON.parse(localStorage.getItem('details')).email;
        cartData.bookid = document.getElementById("cid"+i).value;
        console.log(i);
        console.log("This is the cart data");
        console.log(cartData);

        axios.findCart(cartData).then((res) => {
            console.log("This the cart details of the matched book");
            console.log(res.data);
            console.log(res);
            if(res.data === "Item does not exist"){
                console.log("The pointer is in this method now");
                if(document.getElementById("cquantity"+i).value === 0){
                    alert("You cannot buy this book anymore");
                    return;
                }
                axios.insertCart(cartData).then((res) => {
                    if(res.status == 200){
                        const bookData = {};
                        bookData.title = document.getElementById("ctitle"+i).value;
                        bookData.quantity = document.getElementById("cquantity"+i).value - 1;
                        bookData.price = document.getElementById("cprice"+i).value;
                        bookData.sellername = document.getElementById("cseller"+i).value;
                        bookData.id = document.getElementById("cid"+i).value;
                        bookData.isbn = document.getElementById("cisbn"+i).value;
                        bookData.pdate = document.getElementById("cdate"+i).value;
                        if(bookData.quantity === 0){
                            alert("You cannot buy this book anymore");
                            return;
                        }
                        axios.updateBook(bookData).then((res) => {
                            console.log("Update Book after adding to the cart");
                            console.log(res.data);
                        });
                        alert("Added to the cart successfully");
                    }else{
                        console.log(res);
                        alert("Error in adding the cart");
                    }
                })
            }else{
                const q = res.data.quantity;
                console.log("This is the value of q");
                console.log(q);
                cartData.quantity = q + parseInt(cartData.quantity);
                console.log("This is the quantity");
                console.log(cartData.quantity);
                if(document.getElementById("cquantity"+i).value == 0){
                    alert("You cannot buy this book anymore");
                    return;
                }
                axios.updateCart(cartData).then((res) => {
                    if(res.status == 200){
                        const bookData = {};
                        bookData.title = document.getElementById("ctitle"+i).value;
                        bookData.quantity = document.getElementById("cquantity"+i).value - 1;
                        bookData.price = document.getElementById("cprice"+i).value;
                        bookData.sellername = document.getElementById("cseller"+i).value;
                        bookData.id = document.getElementById("cid"+i).value;
                        bookData.isbn = document.getElementById("cisbn"+i).value;
                        bookData.pdate = document.getElementById("cdate"+i).value;
                        if(bookData.quantity === -1){
                            alert("You cannot buy this book anymore");
                            return;
                        }
                        axios.updateBook(bookData).then((res) => {  
                            console.log("Update Book after adding to the cart");
                            console.log(res.data);
                        });
                        alert("Updated the cart successfully");
                    }else{
                        alert("Error in adding the cart");
                    }
                })
            }
        })
    }

    showImage = (e) => {
        const i = e.target.id;
        const id = document.getElementById("cid"+i).value;
        var tempImages = []
        var stringImg = ""
        this.state.allimages.map((b) => {
            console.log("checking checking")
            console.log(typeof(b.bookid));
            console.log(typeof(id));
            if(b.bookid === parseInt(id)){
                tempImages.push(b);
                const imgd = {};
                imgd.image = b.title;
                console.log("imgdvalue");
                console.log(imgd);
                axios.downloadImage(imgd).then((res)=>{
                    console.log(res);
                    stringImg = "data:image/png;base64,"+res.data.img;
                    console.log("This is the unified string");
                    console.log(stringImg);
                    var img = document.createElement("img");
                    img.src = stringImg;
                    img.id = b.id+".btnimg";
                    img.style.height = "200px";
                    document.getElementById("id"+i).appendChild(img);
                })
            }
        })
    }

    render() {
        var email = ""
        if(!JSON.parse(localStorage.getItem('details'))){

        }else{
            email = JSON.parse(localStorage.getItem('details')).email;
        }
        
        const allbooks = this.state.allbooks;
        const bookByOtherSeller = allbooks.filter((e) => {
            return e.sellername !== email
        })
        var authorCsv = "";
        for(var i=0;i<this.state.authorNames.length;i++){
            authorCsv += this.state.authorNames[i].authorname + ",";
        }
        return(
            <div>
                <h2>Shop Books</h2>
                
                {bookByOtherSeller.map((book,i) => {
                    return(
                        <div>
                            <div>
                                <Card style={{ width: '18rem' }} id={"id"+i}>
                                <Card.Body>
                                    <Card.Title>Title : <input type="text" id={"ctitle"+i} defaultValue = {bookByOtherSeller[i].title} disabled></input></Card.Title> 
                                    <Card.Subtitle className="mb-2 text-muted">ISBN :<input type="text" id={"cisbn"+i} defaultValue= {bookByOtherSeller[i].ISBN} disabled></input></Card.Subtitle>
                                    <Card.Text>
                                        Id :<input type="text" id={"cid"+i} defaultValue = {bookByOtherSeller[i].id} disabled></input> <br/>
                                        Publication date: <input type="date" id={"cdate"+i} defaultValue={bookByOtherSeller[i].publicationdate} disabled></input> <br/>
                                        Author/Authors: <input type="text" id={"cauthor"+i} defaultValue={authorCsv} disabled></input> <br/>
                                        quantity: <input type="number" id={"cquantity"+i} defaultValue={bookByOtherSeller[i].quantity} disabled></input><br/>
                                        price: <input type="text" id={"cprice"+i} defaultValue={bookByOtherSeller[i].price} disabled></input><br/>
                                        Seller: <input type="text" id={"cseller"+i} defaultValue={bookByOtherSeller[i].sellername} disabled></input>
                                    </Card.Text>    
                                    <input type="button" id={i} value="Add to Cart" onClick={(e) => {this.addToCart(e)}}></input>
                                    <input type="button" id={i} value="Show Images" onClick={(e) => {this.showImage(e)}}></input>
                                    <div id="a"></div>
                                </Card.Body>
                                </Card>
                            </div>
                        </div>
                    )})
                }
            </div>
        );
    }
}

export default Buyer;