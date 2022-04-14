const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { redirect, render } = require("express/lib/response");

const fs = require("fs");
const path = require("path")

// app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static("public"));

//connect to mongoDB
mongoose.connect("mongodb://localhost:27017/storeDB"); //connect local


//set up multer to upload files
const multer = require("multer");
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now());
    }
});
const upload = multer({storage: storage});




//creating schemas
const Products_Schema = {
    name : String,
    price : Number,
    description : String,
    img : {
        data: Buffer,
        contentType: String
    }
}
const Catigories_Schema = {
    name : String,
    products : [ Products_Schema ]
}
const userSchema = {
    fname: String,
    lname: String,
    email: String,
    password: String,
    phoneNumber: Number,
    address: {
        country: String,
        state: String,
        street: String,
        zip : Number,
    },
    payment:{
        type: String,
        cardNumber: Number,
        expiration: String,
        cvv: Number
    }
};



//creating models(collections)
const Product = mongoose.model("Product" , Products_Schema);
const Catigory = mongoose.model("Catigory" , Catigories_Schema);
const User = mongoose.model("User",userSchema);


// creating some documents
const cat1 = {
    name:"default",
    products:[]
}
const cat2 = {
    name:"phones",
    products:[]
}
const cat3 = {
    name:"books",
    products:[]
}
const cat4 = {
    name:"clothes",
    products:[]
}
const siteCatigories = [cat1,cat2,cat3,cat4];

const book1 = new Product({
    name : "Product_1",
    price : 10 ,
    description : "A fiction book for kids",
    img :{
        data: "book",
        contentType: "hello"
    } 
})
const book2 = new Product({
    name : "Product_2",
    price : 10 ,
    description : "A historical fiction book",
    img :{
        data: "book",
        contentType: "hello"
    } 
})
const defaultProducts = [book1,book2];






//home route
app.get("/",function(req,res){
    Catigory.findOne({name:"default"},function(err,item){
        if(err){
            console.log(err);
        }else if(item==null){
            Catigory.insertMany(siteCatigories,(err) => {
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/");
                }
            })
        }else{
            res.render("main",{products: item.products});
        }
    })
})




// addProduct
app.get("/addProduct", (req,res) =>{
    Catigory.find({},(err,items) =>{
        if(err){
            console.log(err);
        }else{
            res.render("add",{catigories: items})
        }
    })
})

app.post("/addProduct",upload.single("image"),function(req,res){
    const obj = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        img:{
            data: fs.readFileSync(path.join(__dirname +  "/uploads/" +req.file.filename)),
            contentType: 'image/png'
        }
    })
    obj.save();
    const catigory = req.body.catigory;
    // const Class = req.body.class;
    Catigory.findOneAndUpdate({name:catigory},{$push : {products:obj}},(err, item) =>{
        if(err){
            console.log(err);
        }
        else{
            Catigory.findOneAndUpdate({name:"default"},{$push : {products:obj}},(err) =>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("done!");
                    res.redirect("/");
                }
            });
        }
    });
});




//productPage
app.get("/productPage", (req,res) =>{
    res.render("product");
})

app.post("/productPage",(req,res) => {
    const productId = req.body.productId;
    // const catigoryId = req.body.product[1];  //we can use array or object to be passed
    Product.findOne({_id: productId},(err,item) => {
        if(err){
            console.log(err);
        }else{
            res.render("product",{product:item});
        }
    })
})


//signUP
const countries = ["Egypt","England","France","Sudan","America"];
countries.sort();
app.get("/signUp",(req,res) => {
    res.render("signUp",{countries:  countries});
})



// app.get("/sign_up",function(req,res){
//     res.render("SignUp")
// })
app.get("/sign_in",function(req,res){
    res.render("signIn")
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
router.post ('/sign_in', function(req,res,next) {
    var item = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    };
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('userData').insertOne(item, function (err, result) {
            assert.equal(null, err);
            console.log('item has been inserted');
            db.close;
        });
    });







//listening to the Port.
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port , function(){
    console.log("server has started successfully");
});

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