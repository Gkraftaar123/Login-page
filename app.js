const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
const https=require('https');

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",(req,res)=>{
    let fName=req.body.fName;
    let lName=req.body.lName;
    let email=req.body.email;
   
    let data={
        members:[
            {
            email_address : email,
            status:"subscribed",
            merge_fields:{
                FNAME:fName,
                LNAME:lName
            }
        }

        ]
    };

    let jsonData=JSON.stringify(data);
    const url="https://us5.api.mailchimp.com/3.0/lists/710e39f7d7";

    const options={
        method:"POST",
        auth:"giriraj123:a9d1d4fb1165b18bb655fc254a481a4f2-us5"
    }

    const request=https.request(url,options,(response)=>{

    if(response.statusCode===200)
    {
       res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }        
        response.on("data",data=>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure",(req,res)=>{
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,()=>{
    console.log("running on 3000");
})

//API key
// 9d1d4fb1165b18bb655fc254a481a4f2-us5

// list Id
// 710e39f7d7