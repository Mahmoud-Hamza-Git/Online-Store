const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { redirect } = require("express/lib/response");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

//connect to mongoDB
mongoose.connect("mongodb://localhost:27017/storeDB"); //connect local

//creating schemas
const Products_Schema = {
    name : String,
    price : Number,
    discription : String,
    picture : String
}
const Catigories_Schema = {
    name : String,
    products : [ Products_Schema ]
}
const Main_Classes_Schema = {
    name : String,
    catigories : [ Catigories_Schema ]
}

//creating models(collections)
const Product = mongoose.model("Product" , Products_Schema);
const Catigory = mongoose.model("Catigory" , Catigories_Schema);
const Class = mongoose.model("Class",Main_Classes_Schema);

// creating some documents
// const book1 = new Product({
//     name : "Alice in wander land",
//     price : 10 ,
//     discription : "A fiction book for kids",
//     picture : "book.jpg"
// })
// const book2 = new Product({
//     name : "An Orphan's War",
//     price : 10 ,
//     discription : "A historical fiction book",
//     picture : "book.jpg"
// })
// const listOfProducts = [book1, book2];
// Product.insertMany(listOfProducts,function(err){
//     if(!err){
//         console.log("success");
//     }
// })
// const catigory1 = new Catigory({
//     name : "books",
//     products : listOfProducts
// })
// catigory1.save();

// const product5 = new Product({
//     name : "pine apple",
//     price: 50, 
//     descreption : "best fruit",
//     picture : "shoes4.jpg"
// })
// const p_list = product5;
// Catigory.insertMany({name:"fruits",p_list});





//home route
app.get("/",function(req,res){
    Catigory.findOne({name:"books"},function(err,catigoryFound){ //change books catigory to most_seller catigory
        if(!err){
            console.log("main page got it's data,now")
            res.render("main",{products: catigoryFound.products});
        }
    })
})
app.get("/sign_up",function(req,res){
    res.render("SignUP")
})
app.get("/sign_in",function(req,res){
    res.render("SignIn")
})
app.get("/cart",function(req,res){
    res.render("cart")
})
app.get("/personal_profile",function(req,res){
    res.render("PersonalProfile")
})
app.get("/add_product",function(req,res){
    res.render("AddProduct")
})
app.get("/search",function(req,res){
    res.render("Searching")
})
app.get("/cart",function(req,res){
    res.render("cart")
})
app.get("/product_page",function(req,res){
    res.render("ProductPage")
})
app.get("/sign_up_seller",function(req,res){
    res.render("signupseller")
})





app.post("/catigory",function(req,res){
    // Catigory.updateOne({name:"books"},{$push : {products:product} },function(err,found){
    //     if(!err){
    //         console.log("apple product inserted succesfully")
    //         res.redirect("/");
    //     }
    // })
    Catigory.findOne({name:"fruits"},function(err,catigoryFound1){ //change books catigory to most_seller catigory
        if(!err){
            res.render("main",{products: catigoryFound1.products});
        }
    })
})







app.get("/sign_in",function(req,res){
    res.render("sign_in");
})

app.get("/sign_up",function(req,res){
    res.render("sign_up");
})















//listening to the Port.
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port , function(){
    console.log("server has started successfully");
})