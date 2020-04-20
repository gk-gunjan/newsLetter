
const express =require("express");
const bodyparser =require("body-parser");
const request =require("request");

const app =express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req,res){
    var firstName =req.body.fname;
    var lastName =req.body.lname;
    var email =req.body.email;

    var data={
        members: [ //array of objects to fetch information
            //with having javaScript objects.
            {
                email_address :email,
                status:"subscribed",
                merge_fields :{
                    FNAME: firstName,
                    LNAME: lastName 
                }
            }
        ]
        //converting reallife javaScript packet to flatpack json objects
    };
    var jsonData =JSON.stringify(data);

    var options ={
        url:"https://us4.api.mailchimp.com/3.0/lists/f1d8eac41a",
        method :"POST",
        headers :{
            "Authorization": "Gunjan1 daa73a34464bc4dd270c6e10985d9383-us4"
        },
     body:jsonData
    };

    request(options,function(error,response,body){
        if(error){
            res.sendfile(__dirname +"/failure.html");
        }else{
            if(response.statusCode===200){
                res.sendfile(__dirname +"/success.html");
            }
            else{
                res.sendfile(__dirname +"/failure.html");
            }
        }

    });
});

// getting post request to the failure route
app.post("/failure",function(req,res){
 res.redirect("/"); 
});

app.listen(process.env.PORT ||3000,function(){
    console.log("server is running at port 3000");

});

//f1d8eac41a

//  daa73a34464bc4dd270c6e10985d9383-us4