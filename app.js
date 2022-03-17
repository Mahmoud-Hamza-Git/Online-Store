const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

//connect to mongoDB
mongoose.connect("mongodb://localhost:27017/online-storeDB"); //connect local


//home route
app.get("/",function(req,res){
    res.render("home");
})

app.get("/login",function(req,res){
    res.render("login");
})










//listening to the Port.
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port , function(){
    console.log("server has started successfully");
})