for(var i=0;i<files.length;i++){
    
    console.log("checking the map function here");
    console.log(files[i]);
    let fileParts = files[i].name.split('.');
    let fileName = fileParts[0];

    //newly added code to insert the image data in db
    imagedata.title = fileName;
    console.log("this is the image data");
    console.log(imagedata);

    axios.insertImage(imagedata).then((res) => {
        console.log("this is the image insert response");
        console.log(res);
        let fileType = fileParts[1];
        console.log("Preparing the upload");
        ax.post("http://localhost:5000/image/sign_s3",{
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
        ax.put(signedRequest,files[i],options)
        .then(result => {
            console.log("Response from s3")
            this.setState({success: true});
        })
        .catch(error => {
            alert("ERROR " + JSON.stringify(error));
        })
        })
        .catch(error => {
        alert(JSON.stringify(error));
        })
    });
}

//---------------------

files.map((f) => {
    console.log("checking the map function here");
    console.log(f);
    let fileParts = f.name.split('.');
    let fileName = fileParts[0];

    //newly added code to insert the image data in db
    imagedata.title = fileName;
    console.log("this is the image data");
    console.log(imagedata);
    axios.insertImage(imagedata).then((res) => {
        console.log("this is the image insert response");
        console.log(res);
    });
    //newly added code to insert the image data in db

    let fileType = fileParts[1];
    console.log("Preparing the upload");
    ax.post("http://localhost:5000/image/sign_s3",{
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
    })
    .catch(error => {
        alert("ERROR " + JSON.stringify(error));
    })
    })
    .catch(error => {
    alert(JSON.stringify(error));
    })
})

