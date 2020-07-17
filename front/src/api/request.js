import axios from 'axios';
//const '+window.location.hostname+' = process.env.REACT_APP_IP_ADDRESS;

var accessToken;

if(JSON.parse(localStorage.getItem('login'))){
    accessToken = JSON.parse(localStorage.getItem('login')).token;
}

export async function register(user) {

    try {
        const res = await axios.post('http://'+window.location.hostname+':5000/users/register',user);
        console.log('after post request');
        alert("User registered successfully!")
        return res;
    }  catch (error) {
        console.log(error.response)
        return (error.response);
    }

}

export async function login(user){
    console.log("Came to thisssss block")
    try{

        const res = await axios.post('http://'+window.location.hostname+':5000/users/login',user);
        console.log('after login request');
        return res;
    }catch(error){
        console.log(error.response)
        return (error.response);
    }

}

export async function logout(){
    try{
        const res = await axios.post('http://'+window.location.hostname+':5000/users/logout');
        return res;
    }catch(error){
        console.log(error.response)
        return (error.response);
    }
}

export async function profile(user){

    try{
        const res = await axios.post('http://'+window.location.hostname+':5000/users/find',user);
        console.log('after profile request');
        return res;
    }catch(error){
        console.log(error.response)
        return (error.response);
    }
}

export async function update(user){

    const url = 'http://'+window.location.hostname+':5000/users/'+user.id;

    try{
        const res = await axios.put(url,user);
        return res;
    }catch(error){
        console.log(error.response)
        return (error.response);
    }
}

export async function insertBook(book){

    const url = 'http://'+window.location.hostname+':5000/books/insert';

    try{
        const res = await axios.post(url,book,{
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }

}

export async function getSellerBooks(book){

    const url = 'http://'+window.location.hostname+':5000/books/findbooks';

    try{
        const res = await axios.post(url,book);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }

}

export async function getOSellerBooks(book){

    const url = 'http://'+window.location.hostname+':5000/books/othersellerlisting';

    try{
        const res = await axios.post(url,book);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }

}

export async function updateBook(book){

    const url = 'http://'+window.location.hostname+':5000/books/update';

    try{
        const res = await axios.post(url,book);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }

}

export async function deleteBook(book){

    const url = 'http://'+window.location.hostname+':5000/books/delete';

    try{
        const res = await axios.post(url,book);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }

}

export async function findAllBooks(){

    const url = 'http://'+window.location.hostname+':5000/books/findall';

    try{
        const res = await axios.post(url);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }

}

export async function insertCart(cartData){

    const url = 'http://'+window.location.hostname+':5000/cart/insert';

    try{
        const res = await axios.post(url,cartData);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }

}

export async function getCart(){

    const url = 'http://'+window.location.hostname+':5000/cart/findall';

    try{
        const res = await axios.post(url);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }

}

export async function findCart(cartData){

    const url = 'http://'+window.location.hostname+':5000/cart/findone';

    try{
        const res = await axios.post(url,cartData);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }

}

export async function updateCart(cartData){

    const url = 'http://'+window.location.hostname+':5000/cart/update';

    try{
        const res = await axios.post(url,cartData);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }

}


export async function findBoookByIsbn(isbn){

    const url = 'http://'+window.location.hostname+':5000/books/isbn';

    try{
        const res = await axios.post(url,isbn);
        console.log("This is the response after isbn");
        console.log(res);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }

}

export async function insertAuthor(authorData){

    const url = 'http://'+window.location.hostname+':5000/author/insert';

    try{
        const res = await axios.post(url,authorData);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }

}

export async function findAllAuthors(){

    const url = 'http://'+window.location.hostname+':5000/author/findall';

    try{
        const res = await axios.post(url);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }

}

export async function deleteCart(cart){

    const url = 'http://'+window.location.hostname+':5000/cart/delete';

    try{
        const res = await axios.post(url,cart);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }

}

export async function insertImage(img){
    const url = 'http://'+window.location.hostname+':5000/image/insert';

    try{
        const res = await axios.post(url,img);
        console.log(res.data)
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }
}

export async function findImage(img){
    const url = 'http://'+window.location.hostname+':5000/image/find';

    try{
        const res = await axios.post(url,img);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }
}

//Finding all images
export async function findAllImage(img){
    const url = 'http://'+window.location.hostname+':5000/image/find';

    try{
        const res = await axios.post(url);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }
}
//Downloading the image
export async function downloadImage(img){
    const url = 'http://'+window.location.hostname+':5000/image/download';

    try{
        const res = await axios.post(url,img);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }
}

//Deleting the image here
export async function delImage(img){
    const url = 'http://'+window.location.hostname+':5000/image/delete';

    try{
        const res = await axios.post(url,img);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }
}

export async function delImageFromS3(img){
    const url = 'http://'+window.location.hostname+':5000/image/deletefroms3';

    try{
        const res = await axios.post(url,img);
        return res;
    }catch(error){
        console.log(error.response);
        return (error.response);
    }
}











