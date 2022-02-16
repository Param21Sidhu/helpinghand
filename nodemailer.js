var express = require("express");
var path = require("path");
var app = express();
var fileUpload = require("express-fileupload");
app.use(express.urlencoded({ 'extended': false }));
app.use(express.static("NODEJS"));
app.use(fileUpload());
var mysql = require("mysql");


app.listen(1000, function () {
    console.log("server started");
  });

  app.get("/", function (req, resp) {
    console.log("okay");
    resp.sendFile(__dirname+"/demo.html");
  })

  var hostapply = {
    host: "localhost",
    user: "root",
    password:"",
    database:"project"
  }
  var hostconn = mysql.createConnection(hostapply)
  hostconn.connect(function (err) {
    if (err)
      console.log(err)
    else
      console.log("working");
  })

  app.get("/submit",function(req,resp){
      var dataAry=[req.query.txtemail,req.query.txtemail1,req.query.txtsub,req.query.txtcomm,req.query.txtpwd];
      hostconn.query("insert into node values(?,?,?,?,?)",dataAry,function(err){
          if(err)
          {
              console.log(err);

          }
          else
          {
              console.log("Sent");
          }
      })
      const { param } = require("express/lib/request");
      var nodemailer=require("nodemailer");
      var transporter=nodemailer.createTransport({
      host:"smtp.gmail.com",
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
          user:req.query.txtemail,
          pass:req.query.txtpwd
      }
      })
      var mailOptions={
          from:req.query.txtemail,
          to:req.query.txtemail1,
          subject:req.query.txtsub,
          text:req.query.txtcomm
      }
      transporter.sendMail(mailOptions,function(err,info){
          if(err)
          console.log(err);
          else
          console.log("Message Sent",info.response);
      })

})