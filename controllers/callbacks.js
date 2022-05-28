// const express = require("express");
const md5 = require("md5");
const fs = require("fs");
const path = require("path")
const { User, Product, defaultUser, Inventory } = require("../models/schema");


// globals
var signedUser = defaultUser;
var signed = false;



function getSignIn (req,res){
        // res.render('loading');   // try later using looding page in the start of the website.
        res.render("signIn", { user: signedUser }); 
}

function postSignIn (req,res){
    const email = req.body.email;
    const password = md5(req.body.password);
    User.findOne( { email: email } , (error, found_user) => {
        if (found_user == null) {
            console.log("this email is not existed")
        }
        else {
            if (found_user.password == password) {
                signed = true;
                signedUser = found_user;
                res.redirect("/main");
            } else {
                console.log("the password is wrong!")
                res.redirect('/');
            }
        }
    });
}


const countries = ["Egypt", "England", "France", "Sudan", "America"];
const states = ["Cairo", "Alexandria", "Giza", "Tanta"];
countries.sort();
states.sort();

function getSignUp (req, res){ 
    res.render("signUp", { countries: countries, states: states, user: signedUser });
}

function postSignUp (req, res){
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: md5(req.body.password),
        phoneNumber: req.body.phoneNumber,
        admin: false,
        img: {
            data: '',
            contentType: ''
        },
        address: {
            country: req.body.country,
            state: req.body.state,
            street: req.body.street,
            zip: req.body.zip
        },
        payments: [{
            method: req.body.paymentMethod,
            cardName: req.body.cardName,
            cardNumber: req.body.cardNumber,
            expiration: req.body.expiration,
            cvv: req.body.cvv
        }]
    });
    const email = req.body.email;
    const password = req.body.password;
    User.findOne( { email: email } , (error, found) => {
        if (found != null) {
            console.log("This Email is already exists!")
            red.redirect("/signUp");
        } else {
            user.save(function (error) {
                User.findOne({ email: email, password: md5(password) }, (error, found_user) => {
                    signed = true;
                    signedUser = found_user;
                    res.redirect("/main");
                });
            });
        }
    });
}


//Sign Out
function signOut (req, res){ ///it's easier to make get request in html file,and also there is no data to be posted
    signed = false;
    signedUser = defaultUser;
    res.redirect("/");
}

//Main route
function main (req, res){
    if (!signed) {
        Product.find({}, function (error, found_items) {
            res.render("main", { products: found_items, user: signedUser }); 
        });
    } else {
        Product.find({}, function (error, found_items) {
            User.findOne({ _id: signedUser._id }, (error, foundUser) => {
                signedUser = foundUser;
                res.render("main", { products: found_items, user: signedUser });
            });
        });
    }
}

function getAddProduct (req, res){
    if (signedUser.admin == true) {
        res.render("addProduct", { user: signedUser })
    }
}
function postAddProduct (req, res){
    const obj = new Product({
        name: req.body.name,
        price: req.body.price,
        s_description: req.body.s_description,
        l_description: req.body.l_description,
        catigory1: req.body.catigory1,
        catigory2: req.body.catigory2,
        img: {
            data: fs.readFileSync(path.join(__dirname + "/../uploads/" + req.file.filename)),
            contentType: 'image/png'
        },
        pieces_available: req.body.pieces
    })
    obj.save((error) => {
        res.redirect("/addProduct"); //// can i redirect with parmeters??
    });
}

function editProduct (req,res){
    if (!signed) {
        console.log("You need to Sign In first!");
        res.redirect('/');
    } else {
        const productId = req.body.id
        Product.findById( {_id : productId} , (error,foundProduct)=>{
            res.render('editProduct',{ user: signedUser , product: foundProduct})
        })
    }
}

function editSingleProduct (req,res){
    const id = req.body.id;
    Product.updateOne({_id : id} , req.body ,(error)=>{
        res.redirect('/main')
    })
}


//productPage
function productPage (req, res){
    if (!signed) {
        console.log("You need to Sign In first!");
        res.redirect('/');
    } else {
        const productId = req.body.productId;                                                                                       // const catigoryId = req.body.product[1];  //we can use array or object to be passed
        Product.findOne({ _id: productId }, (error, found_product) => {

            res.render("ProductPage", { product: found_product, user: signedUser });

        });
    }
}


// catigories of products
function catigory (req, res){
    const catigory1 = req.body.catigory1;
    const catigory2 = req.body.catigory2;
    Product.find({ catigory1: catigory1, catigory2: catigory2 }, function (error, found_items) {

        res.render("main", { products: found_items, user: signedUser });

    });
}


//add to cart
function addToCart (req, res){
    const page = req.body.page;
    const productNumber = req.body.number;
    const productId = req.body.id;
    const pieces_available = req.body.pieces_available;

    Product.findOneAndUpdate({ _id: productId }, { pieces_available: pieces_available} , {new: true } ,(error, foundProduct) => {
        let obj1 = {
            product: foundProduct,
            number: productNumber
        }
        User.findOneAndUpdate({ _id: signedUser._id }, { $push: { cart: obj1 } }, function (error, found_user) {                    //the great function "findOneAndUpdate"
            signedUser = found_user;                                                                                                 ///// remember we need to re assign variables ofter update the values in database, also notice that the 'item' found is the user before update so the cart will not include the last product added, so you need to reassign it in the get('/cart') function before it views the products, so the current assign is useless but keep it to remeber what was the problem.
            if (page == 'main') {
                res.redirect('/main')
            } else {
                res.render(page, { product: foundProduct, user: signedUser });
            }
        });
    });
}

// Cart
function cart (req, res){
    if (!signed) {
        console.log("You need to Sign In first!")
        res.redirect('/')
    } else {
        User.findOne({ _id: signedUser._id }, function (error, foundUser) {                                         // we find the user to stay updated if the cart changed or not.
            signedUser = foundUser;
            res.render("cart", { user: signedUser });
        });
    }
}

function removeFromCart (req, res){
    const itemId = req.body.itemId;
    User.updateOne({ _id: signedUser._id }, { $pull: { cart: { _id: itemId } } }, (error) => {                                //removing object from array
        console.log("The product is removed from the cart");
        res.redirect('/cart');
    });
}

function checkOut (req, res){
    const {total_price} = req.body;
    
    Inventory.findOne({}, (error,foundinventory)=>{
        const id = foundinventory._id
        Inventory.updateOne( {_id : id} , {$inc: {cash: total_price } })
    })

    User.findOneAndUpdate({ _id: signedUser._id }, { $set: { cart: [] } }, (error,found_user) => {
        var purchased_items = found_user.cart
        var new_obj = {
            products:purchased_items
        }

        User.updateOne( {_id: signedUser._id} , { $push: {history : new_obj} } ,(error)=>{
            console.log("All product are checked out")
            res.redirect('/cart');
        })  
    })
}



//Personal Profile
function profile (req, res){
    if(!signed){
        console.log("You need to Sign In first!")
        res.redirect('/')
    }else{
        res.render("PersonalProfile", { user: signedUser })
    }
}


function searchFunc (req, res){
    let searchWord = req.body.searchWord.toLowerCase();
    let result = [];
    Product.find(function (error, products) {
        for (item of products) {
            if (item.name.toLowerCase().match(searchWord) != null) {
                result.push(item);
            }
        }
        res.render("main", { products: result, user: signedUser });
    });
}


function inventory (req, res){
    if(!signed){
        console.log("You need to Sign In first!")
        res.redirect('/')
    }else{
        Product.find({} , (err,found_items)=>{
            if(!err){
                Inventory.findOne({} , (error, found_inventory)=>{
                    let inventory = found_inventory
                    let cash;
                    if(typeof inventory == "undefined"){
                        cash = 0
                    }else{
                        cash = inventory.cash
                    }
                    res.render('inventory', { products: found_items ,  user: signedUser , cash: cash})
                })
            }
        })
    }
}


module.exports = {
    getSignIn,
    postSignIn,
    getSignUp,
    postSignUp,
    signOut,
    main,
    getAddProduct,
    postAddProduct,
    editProduct,
    editSingleProduct,
    productPage,
    catigory,
    cart,
    addToCart,
    removeFromCart,
    checkOut,
    profile,
    searchFunc,
    inventory
}