import React, { Component } from 'react';
import { Modal, Card, Button } from 'react-bootstrap';
import supertest from 'supertest';
import './Seller.css';
import * as axios from '../api/request';
import ax from 'axios';
import { Link,Route, Switch, BrowserRouter } from 'react-router-dom';
import Buyer from './Buyer';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Seller extends Component {

    constructor(){
        super();
        this.retrieveAllSellerBooks();
        this.state = {
            book : [],
            obook : [],
            bookno : null,
            allbooks : [],
            authorNames : [],
            allimages : [],
            success : false,
            url : ""
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

    retrieveAllSellerBooks = () => {

        var email ="";
        if(!JSON.parse(localStorage.getItem('details'))){

        }else{

            email = { email : JSON.parse(localStorage.getItem('details')).email };

        }
        

        axios.getSellerBooks(email).then((res) => {

            if(res.status === 200){
                console.log(res.data)
                if(res.data === undefined){
                    this.setState({book : []})
                }else{
                    this.setState({book : res.data})
                }
                
                console.log("dddddd");
                console.log(this.state.book)
            }else{
                alert("Error retrieving the books with seller name");
            }

        });

        axios.getOSellerBooks(email).then((res) => {

            if(res.status === 200){
                console.log(res.data)
                if(res.data === undefined){
                    this.setState({obook : []})
                }else{
                    this.setState({obook : res.data})
                }
                console.log("dddddd");
                console.log(this.state.book)
            }else{
                alert("Error retrieving the books with seller name");
            }

        });

        axios.findAllBooks().then((res) => {

            if(res.status === 200){
                console.log(res.data)
                this.setState({allbooks : res.data});
            }
        })

        axios.findAllAuthors().then((res) => {
            if(res.status === 200){
                console.log("All authors details");
                console.log(res.data);
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

    validate = (e) => {
        const ipaddress = process.env.REACT_APP_IP_ADDRESS;
        const price = parseFloat(document.getElementById("price").value);
        const quantity = parseInt(document.getElementById("quantity").value);
        console.log("This is the quantity of the book");
        console.log(quantity);
        if(isNaN(price) || price < 0.01 || price > 9999.99 ){
            alert("Enter a valid price");
            return;
        }else if(quantity < 0){
            alert("Enter a valid quantity, it should be an integer value");
            return;
        }
        const bookData = {}
        bookData.isbn = document.getElementById("isbn").value;
        bookData.title = document.getElementById("title").value;
        bookData.publicationdate = document.getElementById("pdate").value;
        bookData.sellername = JSON.parse(localStorage.getItem('details')).email;
        bookData.quantity = document.getElementById("quantity").value;
        bookData.price = document.getElementById("price").value;
        console.log("Bookdata")
        console.log(bookData);
        const authorData = document.getElementById("author").value;
        const arrayAuthors = authorData.split(",");
        console.log("arrayAuthors");
        console.log(arrayAuthors);
        const isbnData = {}
        isbnData.isbn = bookData.isbn;
        console.log("This is isbn value");
        console.log(isbnData);
        axios.insertBook(bookData).then((res) => {
            if(res.status === 200){
                console.log(res);
                alert("Book insrerted successfully!");

                axios.findBoookByIsbn(isbnData).then((res) => {
                    console.log("Finding book by isbn");
                    console.log(res.data);
                    const id = res.data.id;
                    //chandrakanth
                    const sellername = res.data.sellername;
                    console.log("Seller name of the book");
                    console.log(sellername);
                    const imagedata = {}
                    imagedata.bookid = id;
                    imagedata.sellername = sellername;
                    //for the pic upload
                    var files = [];
                    console.log("Multiple files listing here");
                    console.log(this.uploadInput.files);
                    var filelist = this.uploadInput.files;
                    for(var i=0;i<filelist.length;i++){
                        files.push(filelist[i]);
                    }
                    // Split the filename to get the name and type
                    console.log("logging the file list here");
                    console.log(files);
                    //chandrakanth
                    //for the pic upload 
                    files.map((f) => {
                        console.log("checking the map function here");
                        console.log(f);
                        let fileParts = f.name.split('.');
                        let fileName = fileParts[0];
                        let fileType = fileParts[1];
                        console.log("Preparing the upload");
                        ax.post("http://"+ipaddress+":5000/image/sign_s3",{
                        fileName : fileName,
                        fileType : fileType
                        })
                        .then(response => {
                        var returnData = response.data.data.returnData;
                        var signedRequest = returnData.signedRequest;
                        var url = returnData.url;
                        this.setState({url: url})
                        console.log("Recieved a signed request " + signedRequest);
                        
                        // Put the fileType in the headers for the upload
                        var options = {
                            headers: {
                            'Content-Type': fileType
                            }
                        };
                        ax.put(signedRequest,f,options)
                        .then(result => {
                            console.log("Response from s3")
                            this.setState({success: true});

                            //newly added code to insert the image data in db
                            imagedata.title = fileName;
                            console.log("this is the image data");
                            console.log(imagedata);
                            axios.insertImage(imagedata).then((res) => {
                            console.log("this is the image insert response");
                            console.log(res);
                            });
                            //newly added code to insert the image data in db
                        })
                        .catch(error => {
                            alert("ERROR " + JSON.stringify(error));
                        })
                        })
                        .catch(error => {
                        alert(JSON.stringify(error));
                        })
                    })
                    //chandrakanth
                    console.log("Id of the book");
                    console.log(id);
                    for(var i=0;i<arrayAuthors.length;i++){    
                        const author = {}
                        author.bookid = id;
                        author.authorname = arrayAuthors[i];
                        console.log("Autor object");
                        console.log(author);
                        axios.insertAuthor(author).then((res) => {
                            console.log(res.data);
                        })
                    }
                });
            }else{
                alert("Error in inserting the book");
            }
        });  
    }

    uploadImage = (e) => {
        const ipaddress = process.env.REACT_APP_IP_ADDRESS;
        const id = e.target.id;
        const isbnData = {};
        isbnData.isbn = document.getElementById("cisbn"+id).value;
        console.log("This is the isbn object we are sending");
        console.log(isbnData);
        axios.findBoookByIsbn(isbnData).then((res) => {
            console.log("Finding book by isbn");
            console.log(res.data);
            const id = res.data.id;
            //chandrakanth
            const sellername = res.data.sellername;
            console.log("Seller name of the book");
            console.log(sellername);
            const imagedata = {}
            imagedata.bookid = id;
            imagedata.sellername = sellername;
            //for the pic upload
            var files = [];
            console.log("Multiple files listing here");
            console.log(this.uploadInput.files);
            var filelist = this.uploadInput.files;
            for(var i=0;i<filelist.length;i++){
                files.push(filelist[i]);
            }
            // Split the filename to get the name and type
            console.log("logging the file list here");
            console.log(files);
            //chandrakanth
            //for the pic upload 
            files.map((f) => {
                console.log("checking the map function here");
                console.log(f);
                let fileParts = f.name.split('.');
                let fileName = fileParts[0];
                let fileType = fileParts[1];
                console.log("Preparing the upload");
                ax.post("http://"+ipaddress+":5000/image/sign_s3",{
                fileName : fileName,
                fileType : fileType
                })
                .then(response => {
                var returnData = response.data.data.returnData;
                var signedRequest = returnData.signedRequest;
                var url = returnData.url;
                this.setState({url: url})
                console.log("Recieved a signed request " + signedRequest);
                
                // Put the fileType in the headers for the upload
                var options = {
                    headers: {
                    'Content-Type': fileType
                    }
                };
                ax.put(signedRequest,f,options)
                .then(result => {
                    console.log("Response from s3")
                    this.setState({success: true});

                    //newly added code to insert the image data in db
                    imagedata.title = fileName;
                    console.log("this is the image data");
                    console.log(imagedata);
                    axios.insertImage(imagedata).then((res) => {
                    console.log("this is the image insert response");
                    console.log(res);
                    });
                    //newly added code to insert the image data in db
                })
                .catch(error => {
                    alert("ERROR " + JSON.stringify(error));
                })
                })
                .catch(error => {
                alert(JSON.stringify(error));
                })
            })
            //chandrakanth
            console.log("Id of the book");
            console.log(id);
        });
    }

    saveImage = (e) => {
        console.log("Saveee imageee");
        console.log(e.target.files);
        this.setState({success: false, url : ""});
    }

    deleteBook = (e) => {
        const bookno = e.target.id;
        const id = {id : document.getElementById("cid"+bookno).value };
        const cart = {title : document.getElementById("ctitle"+bookno).value};

        //Newly added code
        console.log("all images");
        console.log(this.state.allimages);
        console.log(id.id);

        const images = this.state.allimages.filter((i) => {
            return i.bookid === parseInt(id.id);    
        });

        console.log("Images linked to the book");
        console.log(images);

        if(images.length === 1){
            const imagedata = {
            }
            imagedata.imagename = images[0].title;
            console.log("Logging the image data");
            console.log(imagedata);
            axios.delImageFromS3(imagedata).then((res)=>{
                console.log(res);
            })
        }else{
            images.map((i) => {
                const imagedata = {
                }
                imagedata.imagename = i.title
                console.log("Logging the image data");
                console.log(imagedata);
                axios.delImageFromS3(imagedata).then((res)=>{
                    console.log(res);
                })
            });
        }
        //Newly added code

        if(window.confirm("Do you confirm to delete?")){

            axios.deleteBook(id).then((res) => {

                if(res.status === 200){
                    alert(res.data.message)
                }else{
                    alert(res.data.message)
                }
    
            })
            axios.deleteCart(cart).then((res) => {
                console.log(res.data);
            })

        }

        window.location.reload(true);
    }

    showImages = (e) => {
        const i = e.target.id;
        const id = document.getElementById("cid"+i).value;
        var tempImages = []
        var stringImg = ""
        console.log("All images logging here");
        console.log(this.state.allimages);
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
                    console.log("Logging the image name here");
                    console.log(res.data.image);
                    stringImg = "data:image/png;base64,"+res.data.img;
                    console.log("This is the unified string");
                    console.log(stringImg);
                    var img = document.createElement("img");
                    img.src = stringImg;
                    // img.id = b.id+".btnimg";
                    img.id = imgd.image+"img";
                    console.log("Loggin the image name here again")
                    console.log(imgd);
                    img.style.height = "200px";
                    var btn = document.createElement("BUTTON");
                    btn.innerHTML = "Delete Image";
                    // btn.id = b.id+".btn";
                    btn.id = imgd.image;
                    btn.onclick = (e) => this.delImage(e);
                    document.getElementById("id"+i).appendChild(img);
                    document.getElementById("id"+i).appendChild(btn);
                })
            }
        })
    }

    delImage = (e) => {
        const id =e.target.id;
        // var i = id.split('.')
        console.log(id+"img");
        var img = document.getElementById(id+"img");
        var btn = document.getElementById(id);
        console.log("All the varibales");
        console.log(id);
        console.log(img);
        console.log(btn);
        const delImgData = {}
        delImgData.imagename=id;
        axios.delImageFromS3(delImgData).then((res)=>{
            console.log(res);
        })
        img.remove();
        btn.remove();
    }

    showUpdate = (e) => {
        const bookno = e.target.id;
        const p = parseFloat(document.getElementById("cprice"+bookno).value);
        const q = parseInt(document.getElementById("cquantity"+bookno).value);
        if(isNaN(p) || p < 0.01 || p > 9999.99 ){
            alert("Enter a valid price");
            return;
        }else if(q < 1){
            alert("Quantity cannot be 0");
        }
        const updatedBookData = {};
        updatedBookData.id = document.getElementById("cid"+bookno).value;
        updatedBookData.isbn = document.getElementById("cisbn"+bookno).value;
        updatedBookData.title = document.getElementById("ctitle"+bookno).value;
        updatedBookData.pdate = document.getElementById("cdate"+bookno).value;
        updatedBookData.sellername = JSON.parse(localStorage.getItem('details')).email;
        updatedBookData.quantity = document.getElementById("cquantity"+bookno).value;
        updatedBookData.price = document.getElementById("cprice"+bookno).value;
        console.log(updatedBookData);

        axios.updateBook(updatedBookData).then((res) => {
            
            if(res.status === 200){
                alert("Book updated successfully!")
            }else{
                alert(res.data.message)
            }
        });
    }

    editCard = (e) => {
        const i = e.target.id;
        document.getElementById("cisbn"+i).disabled = false;
        document.getElementById("ctitle"+i).disabled = false;
        document.getElementById("cdate"+i).disabled = false;
        document.getElementById("cquantity"+i).disabled = false;
        document.getElementById("cprice"+i).disabled = false;
        document.getElementById("cauthor"+i).disabled = false;
    }

    render() {
        var today = new Date();
        var month = (today.getMonth()+1) < 10 ? ("0"+(today.getMonth()+1)) : (today.getMonth()+1);
        var day = (today.getDate()) < 10 ? ("0"+today.getDate()) : today.getDate();
        var date = today.getFullYear()+'-'+month+'-'+day;
        const tempdata = {};
        var email = "";
        if(!JSON.parse(localStorage.getItem('details'))){
            
        }else{
            email = JSON.parse(localStorage.getItem('details')).email;
        }
        
        const allbooks = this.state.allbooks;
        const booksBySeller = allbooks.filter((e) => {
            return e.sellername === email
        })
        const authors = this.state.authorNames;
        for(var i=0;i<booksBySeller.length;i++){
            for(var j=0;j<authors.length;j++){
                if(booksBySeller[i].id === authors[j].bookid){
                    booksBySeller[i].authorname += authors[j].authorname + ",";
                }
            }
        }
        const bookByOtherSeller = allbooks.filter((e) => {
            return e.sellername !== email
        })
        for(var i=0;i<bookByOtherSeller.length;i++){
            for(var j=0;j<authors.length;j++){
                if(bookByOtherSeller[i].id === authors[j].bookid){
                    bookByOtherSeller[i].authorname += authors[j].authorname + ",";
                }
            }
        }
        var authorCsv = "";
        console.log("Logging all the author names");
        console.log(this.state.authorNames);
        for(var i=0;i<this.state.authorNames.length;i++){
            authorCsv += this.state.authorNames[i].authorname + ",";
        }
        console.log("Author names"+authorCsv);

        //chandrakanth
        const Success_message = () => (
            <div style={{padding:50}}>
              <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
              <a href={this.state.url}>Access the file here</a>
              <br/>
            </div>
        )
        //chandrakanth

        //getting all the books with bookid
        const tempImages = []
        var stringImg = "";
        //getting all the books with bookid

        return(
            <div>
                <h2>Upload a book</h2>
                
                <form>
                    <label for="isbn">ISBN:</label>
                    <input type="text" id="isbn" name="isbn"></input><br></br>
                    <label for="title">Title:    </label>
                    <input type="text" id="title" name="title"></input><br></br>
                    <label for="authors">Authors:    </label>
                    <input type="text" id="author" name="authors"></input><br></br>
                    <label for="pdate">Publiction Date:    </label>
                    <input type="date" id="pdate" name="pdate" min={date}></input><br></br>
                    <label for="quantity">Quantity:    </label>
                    <input type="number" id="quantity" name="quantity" min="1" max="999"></input><br></br>
                    <label for="price">Price:    </label>
                    <input type="text" id="price" name="price"></input><br></br>
                     {this.state.success ? <Success_message/> : null}
                    <input type="file" onChange={(e)=>{this.saveImage(e)}} ref={(ref) => {this.uploadInput = ref;}} multiple/><br></br>
                    <input type="button" onClick={(e)=>{this.validate(e)}}  value="Upload"></input>
                </form>

                <h2>Your published books</h2>
                
                {booksBySeller.map((book,i) => {
                    
                    console.log(date);

                    return(
                        <div>
                            <div>
                                <Card style={{ width: '18rem' }} id={"id"+i}>
                                <Card.Body>
                                    <Card.Title>Title : <input type="text" id={"ctitle"+i} defaultValue = {booksBySeller[i].title} disabled></input></Card.Title> 
                                    <Card.Subtitle className="mb-2 text-muted">ISBN :<input type="text" id={"cisbn"+i} defaultValue= {booksBySeller[i].ISBN} disabled></input></Card.Subtitle>
                                    <Card.Text>
                                        Id :<input type="text" id={"cid"+i} defaultValue = {booksBySeller[i].id} disabled></input> <br/>
                                        Publication date: <input type="date" id={"cdate"+i} defaultValue={booksBySeller[i].publicationdate} min={date} disabled></input> <br/>
                                        Author/Authors: <input type="text" id={"cauthor"+i} defaultValue={authorCsv} disabled></input> <br/>
                                        quantity: <input type="number" id={"cquantity"+i} defaultValue={booksBySeller[i].quantity} min="1" max="999" disabled></input><br/>
                                        price: <input type="text" id={"cprice"+i} defaultValue={booksBySeller[i].price} disabled></input><br/>
                                        Seller: <input type="text" id={"cseller"+i} defaultValue={booksBySeller[i].sellername} disabled></input>
                                    </Card.Text>    
                                    <input type="button" id={i} value="Edit" onClick={(e) => {this.editCard(e)}}></input>
                                    <input type="button" id={i} value="Update" onClick={(e) => {this.showUpdate(e)}}></input>
                                    <input type="button" id={i} value="Delete" onClick={(e) => {this.deleteBook(e)}}></input>
                                    <input type="button" id={i} value="Show Images" onClick={(e) => {this.showImages(e)}}></input>
                                    <input type="file" onChange={(e)=>{this.saveImage(e)}} ref={(ref) => {this.uploadInput = ref;}} multiple/><br></br>
                                    <input type="button" id={i} value="Upload Images" onClick={(e) => {this.uploadImage(e)}}></input>
                                    <div id="a"></div>
                                </Card.Body>
                                </Card>
                            </div>
                        </div>
                    )})

                }

                <h2>Books listed by other Sellers</h2>

                { bookByOtherSeller.map((book,i) => {

                    return(
                        <div>
                            <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Title : <input type="text" id={"otitle"+i} defaultValue = {bookByOtherSeller[i].title} disabled></input></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">ISBN :<input type="text" id={"oisbn"+i} defaultValue= {bookByOtherSeller[i].ISBN} disabled></input></Card.Subtitle>
                                <Card.Text>
                                    Id : <label id={"cid"+i}> {bookByOtherSeller[i].id}</label> <br/>
                                    Publication date: <input type="date" id={"odate"+i} defaultValue={bookByOtherSeller[i].publicationdate} min={date} disabled></input> <br/>
                                    Author/Authors: <input type="text" id={"cauthor"+i} defaultValue={authorCsv} disabled></input> <br/>
                                    quantity: <input type="number" id={"oquantity"+i} defaultValue={bookByOtherSeller[i].quantity} min="1" max="999" disabled></input><br/>
                                    price: <input type="text" id={"oprice"+i} defaultValue={bookByOtherSeller[i].price} disabled></input><br/>
                                    Seller: <input type="text" id={"oseller"+i} defaultValue={bookByOtherSeller[i].sellername} disabled></input>
                                </Card.Text>    
                            </Card.Body>
                            </Card> 
                        </div>
                    )

                })}
            </div>
        );

    }
}


export default Seller;