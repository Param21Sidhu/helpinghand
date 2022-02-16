var express = require("express");
var path = require("path");
var app = express();
var fileUpload = require("express-fileupload");
app.use(express.urlencoded({ 'extended': false }));
app.use(express.static("project"));
app.use(fileUpload());
var mysql = require("mysql");
const res = require("express/lib/response");
var mysql = require("mysql");
var nodemailer=require("nodemailer");
const { param } = require("express/lib/request");




app.listen(3022, function () {
    console.log("server started");
  });

  app.get("/", function (req, resp) {

    resp.sendFile(__dirname + "/project/index.html");
  })


  var hostapply = {
    host: "localhost",
    user: "root",
    password: "",
    database: "project"
  }
  var hostconn = mysql.createConnection(hostapply)
  hostconn.connect(function (err) {
    if (err)
      console.log(err)
    else
      console.log("working");
  })


 app.post("/submit1",function(req,resp){
    console.log("okaY");
      var dataAry=[req.body.txtemail,req.body.txtpwd,req.body.txtnum,req.body.txtrad];
      hostconn.query("insert into users1 values(?,?,?,?,CURRENT_DATE())",dataAry,function(err){
          if(err)
          {
              console.log(err);
          }
          else
          {
              console.log("Saved Successfully");
          }
      })
  })

  app.get("/checkRecord",function(req,resp){
    hostconn.query("select * from users1 where Name=?",[req.query.txtEmail],function(err,result){
    if(err)
    resp.send(err);
    else
    resp.send(result);
    })
  })
  
  app.get("/validRecord",function(req,resp){
    
    hostconn.query("select * from users1 where Name=? and Password=?",[req.query.Email,req.query.pwd],function(err,result)
    {
        if(err)
        resp.send(err);
        else
        {
        resp.send(result);
        }
    })


app.get("/newpwdsubmit",function(req,resp){
    var dataAry=[req.query.txtpwdnew,req.query.txtemailold,req.query.txtpwdold];
    hostconn.query("update users1 set Password=? where Name=? and Password=?",dataAry,function(err){
      if(err)
      {
        console.log(err);

      }
      else
      console.log("Password Changed");
    })
})

















    const { param } = require("express/lib/request");
    var nodemailer=require("nodemailer");
    var transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:req.query.Email,
        pass:req.query.pwd
    }
    })
    var mailOptions={
        from:req.query.Email,
        to:req.query.Email,
        subject:"Welcome",
        text:"Someone logged in From your Account"
    }
    transporter.sendMail(mailOptions,function(err,info){
        if(err)
        console.log(err);
        else
        console.log("Message Sent",info.response);
    })

    
  })












 
  
  
  
  
  
  app.post("/submit", function (req, resp) {
   
    resp.setHeader("Content-Type", "Text/html");
    //  resp.write("Email ="+req.body.txtemail);
    //resp.write("<br>File Name"+req.files.txtf1.name);
    //resp.write("<br>City "+req.body.txtcity);
    var filename = "nopic.png";
  
  
    if (req.files != null) {
      var destination = path.join(process.cwd(),"project","uploads", req.files.txtf1.name)
      req.files.txtf1.mv(destination, function (err) {
        if (err)
          console.log(err);
        else
          console.log("File Loaded Successfully");
      });
      filename = req.files.txtf1.name;
    }
    else
      console.log("Error in file Loading");
  
  
    var dataAry = [req.body.txtemail, req.body.txtname, req.body.txtnum, req.body.txtadd, req.body.txtcity.toString(), filename,req.body.flexRadioDefault];
    hostconn.query("insert into workingg values(?,?,?,?,?,?,CURRENT_DATE(),?)", dataAry, function (err) {
      if (err)
        console.log(err);
      else
        //resp.send("record saved succesfully");
              resp.redirect("prosign-1redirect.html");
    })
  
    // resp.end();
  })
  
  
  app.post("/update", function (req, resp) {
  
    var filename;
    if (req.files != null) {
      var destination = path.join(process.cwd(),"project","uploads", req.files.txtf1.name)
      req.files.txtf1.mv(destination, function (err) {
        if (err)
          console.log(err);
        else
          console.log("File Loaded Successfully");
      });
      filename = req.files.txtf1.name;
    }
    else
    {
      console.log(req.body.jasoos);
      filename= req.body.jasoos;
    }
  
    var dataAry = [req.body.txtname, req.body.txtnum, req.body.txtadd, req.body.txtcity.toString(), filename,req.body.flexRadioDefault, req.body.txtemail];
    hostconn.query("update workingg set Name=?,Contact=?,Address=?,Cities=?,Picture=?,Plan=? where Email=?", dataAry, function (err) {
      if (err)
        console.log(err);
      else
      {
        //resp.send("record saved succesfully");
        resp.redirect("prosign-1redirect.html");
      }
    })
  
    // resp.end()`
  })
  app.post("/showall", function (req, resp) {
    hostconn.query("select * from workingg", function (err, result) {
      if (err)
        resp.send(err);
      else
        resp.send(result);
    })
  })
  app.all("/showallangular", function (req, resp) {
    hostconn.query("select * from workingg", function (err, result) {
      if (err)
        resp.send(err);
      else
        resp.send(result);
    })
  })
  app.post("/delete", function (req, resp) {
    hostconn.query("delete from workingg where Email=?", [req.body.txtemail], function (err, result) {
      if (err)
        resp.send(err);
      else
        resp.send(result.affectedRows + "Record Khatam");
    })
  })
  app.all("/deleteangular", function (req, resp) {
    hostconn.query("delete from workingg where Email=?", [req.query.x], function (err, result) {
      if (err)
        resp.send(err);
      else
        resp.send(result.affectedRows + "Record Khatam");
    })
  })
  app.get("/fetchRecord",function(req,resp){
   
    
    hostconn.query("select * from workingg where Email=?",[req.query.txtEmail],function(err,result){
    if(err)
    resp.send(err);
    else
    resp.send(result);
    })
  })
  app.get("/fetchCities",(req,resp)=>{
       
    hostconn.query("select distinct Cities from workingg",(err,result)=>
    {
        if(err)
            resp.send(err);
        else
            resp.send(result); //it send JSON Array
    })
 })
 app.get("/SelectedCities",function(req,resp){
   //console.log(req.query.y);
   hostconn.query("select * from workingg where Cities=?",[req.query.y],function(err,result){
     if(err)
     {
       resp.send(err);
     }
     else{
       resp.send(result);
     }
   })
 })

app.get("/knowmoreall",function(req,resp){
  hostconn.query("select * from workingg where Email=?",req.query.x,function(err,result)
  {
    if(err)
    {
      console.log(err);
    }
    else
    {
      resp.send(result);
    }
  })
})
















  app.post("/postsubmit",function(req,resp){


    
    var dataAry=[req.body.txtpostemail,req.body.reqlist,req.body.txtwhat,req.body.txtcities,req.body.txtdate];
    hostconn.query("insert into postrequirement values(?,?,?,?,?)",dataAry,function(err){
      if(err)
      console.log(err);
      else
      {
     // console.log("send to post");
     resp.redirect("prosign-1redirect.html");
    }
    })
  })



  app.get("/findworkcityandcategory",function(req,resp){
    //console.log("pk");
    hostconn.query("select distinct city,Faculties from postrequirement",function(err,result) {
     if(err)
     {
       console.log(err);
     }
     else
     {
       resp.send(result);
     }
      
    })
  })



  app.get("/showall",function(req,resp){
    hostconn.query("select * from postrequirement where city=? and Faculties=?",[req.query.x,req.query.y],function(err,result){
      if(err)
      {
        console.log(err);

      }
      else
      {
        resp.send(result);
      }
    })
  })
  

























  app.post("/worker-profileSub",function(req,resp){
  
  
  
  
    var filename1 = "nopic.png";
  
  
    if (req.files != null) {
      var destination = path.join(process.cwd(),"project","uploads", req.files.txtf1.name)
      req.files.txtf1.mv(destination, function (err) {
        if (err)
          console.log(err);
        else
          console.log("File Loaded Successfully");
      });
      filename1 = req.files.txtf1.name;
    }
    else
      console.log("Error in file Loading");




      var filename2 = "nopic.png";
  
  
      if (req.files != null) {
        var destination = path.join(process.cwd(),"project","uploads", req.files.txtf2.name)
        req.files.txtf2.mv(destination, function (err) {
          if (err)
            console.log(err);
          else
            console.log("File Loaded Successfully");
        });
        filename2 = req.files.txtf2.name;
      }
      else
        console.log("Error in file Loading");
    
  
  
  
  
  
  
  
    //  console.log("ko0");
//    console.log(req.body.txtemail);
    var dataAry=[req.body.txtemail,req.body.txtname,req.body.txtnum,req.body.txtcity,req.body.txtaddress,req.body.txtwork,req.body.txtexp,req.body.txtshop,req.body.txtarea,filename1,filename2];
  hostconn.query("insert into workersprofile values(?,?,?,?,?,?,?,?,?,?,?)",dataAry,function(err){
    if(err)
    {
      console.log(err);
    }
    else
    {
     // console.log("Worker Profile Done");
      resp.redirect("prosign-1redirect.html");    
    }
  })
  
});











app.get("/fetchfindcities",(req,resp)=>{
       
  hostconn.query("select distinct City from workersprofile",(err,result)=>
  {
      if(err)
          resp.send(err);
      else
          resp.send(result); //it send JSON Array
  })
})

app.get("/fetchfindcategory",(req,resp)=>{
       
  hostconn.query("select distinct Category from workersprofile",(err,result)=>
  {
      if(err)
          resp.send(err);
      else
          resp.send(result); //it send JSON Array
  })
})



app.get("/fetchfindcityandcat",function(req,resp){
  //console.log(req.query.x);
  //console.log(req.query.y);
  hostconn.query("select * from workersprofile where City=? and Category=?",[req.query.x,req.query.y],function(err,result){
    if(err)
    {
      resp.send(err);
    }
    else
    {
      resp.send(result)
    }
  })
})