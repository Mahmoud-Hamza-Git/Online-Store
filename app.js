const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { redirect, render } = require("express/lib/response");
const md5 = require("md5");

const fs = require("fs");
const path = require("path")

// app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

//connect to mongoDB
mongoose.connect("mongodb://localhost:27017/storeDB"); //connect local


//set up multer to upload files
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
const upload = multer({ storage: storage });




//creating schemas
const Products_Schema = {
    name: String,
    price: Number,
    description: String,
    catigory1: String,
    catigory2: String,
    img: {
        data: Buffer,
        contentType: String
    }
}

const userSchema = {
    fname: String,
    lname: String,
    email: String,
    password: String,
    phoneNumber: String,
    admin: Boolean,
    img: {
        data: Buffer,
        contentType: String
    },
    cart: [String],
    address: {
        country: String,
        state: String,
        street: String,
        zip: String,
    },
    payments: [{
        method: String,
        cardName: String,
        cardNumber: String,
        expiration: String,
        cvv: String
    }]
};


//creating models(collections)
const Product = mongoose.model("Product", Products_Schema);
const User = mongoose.model("User", userSchema);



// 6257c5864ab8291ca0657cd5
// 6257c6b34ab8291ca0657cd7
// 6257c7038947912fb326b307
// 6257cca7fcd406c72d1966ee

// User.find({
//     '_id': { $in: ['6257c5864ab8291ca0657cd5','6257c6b34ab8291ca0657cd7', '6257c7038947912fb326b307','6257cca7fcd406c72d1966ee']}
// }, function(err, docs){
//      console.log(docs);
// });


//global variables
var defaultUser = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    phoneNumber: '',
    admin: false,
    img: {
        data: '',
        contentType: ''
    },
    cart: [''],
    address: {
        country: '',
        state: '',
        street: '',
        zip: '',
    },
    payments: [{
        method: '',
        cardName: '',
        cardNumber: '',
        expiration: '',
        cvv: ''
    }]
};

var signedUser = defaultUser;
var signed = false;



//Main route
app.get("/main", (req, res) => {
    if (!signed) {
        console.log("You need to Sign In first!")
        res.redirect("/");
    } else {
        Product.find({}, function (err1, items) {
            if (err1) {
                console.log(err1);
            } else {
                res.render("main", { products: items, user: signedUser, signed: true });
            }
        });
    }
});

//Sign In
app.get("/", (req, res) => {
    res.render("signIn", { user: signedUser });
})

app.post("/", (req, res) => {
    const email = req.body.email;
    const password = md5(req.body.password);
    User.findOne({ email: email }, (err, item) => {
        if (err) {
            console.log(err);
        } else if (item == null) {
            console.log("this email is not existed")
        }
        else {
            if (item.password == password) {
                signed = true;
                signedUser = item;
                res.redirect("/main");
            } else {
                console.log("the password is wrong!")
            }
        }
    });
});




//signUP
const countries = ["Egypt", "England", "France", "Sudan", "America"];
const states = ["Cairo", "Alexandria", "Giza", "Tanta"];
countries.sort();
states.sort();

app.get("/signUp", (req, res) => {
    res.render("signUp", { countries: countries, states: states, user: signedUser });
})

app.post("/signUp", (req, res) => {
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: md5(req.body.password),
        phoneNumber: req.body.phoneNumber,
        admin: false,
        img: {
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
    User.findOne({ email: email }, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            if (found != null) {
                console.log("This Email is already exists!")
                red.redirect("/signUp");
            } else {
                user.save(function (err1) {
                    if (err1) {
                        console.log(err1);
                    } else {
                        User.findOne({ email: email, password: md5(password) }, (err2, item) => {
                            if (err2) {
                                console.log(err2);
                            } else {
                                signed = true;
                                signedUser = item;
                                res.redirect("/main");
                            }
                        });
                    }
                });
            }
        }
    });
});


//Sign Out
app.get("/signOut", (req, res) => {
    signed = false;
    signedUser = defaultUser;
    res.redirect("/");
})

// Product.find({ catigory: "clothes" }, (err, items) => {
//     if (err) {
//         console.log(err);
//     } else {
//         items
//     }
// })


// addProduct
const catigories = ['Phones', 'Books', 'Clothes']
app.get("/addProduct", function (req, res) {
    if (!signed) {
        console.log("You need to Sign In first!")
        res.redirect("/");
    } else {
        res.render("addProduct", { catigories: catigories, user: signedUser })
    }
})
app.post("/addProduct", upload.single("image"), function (req, res) {
    const obj = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        catigory1: req.body.catigory,
        img: {
            data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
            contentType: 'image/png'
        }
    })
    console.log()
    obj.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/main");
        }
    });
});



//productPage
app.get("/productPage", (req, res) => {
    if (!signed) {
        console.log("You need to Sign In first!")
        res.redirect("/");
    } else {
        res.render("product", { user: signedUser });
    }
})

app.post("/productPage", (req, res) => {
    const productId = req.body.productId;
    // const catigoryId = req.body.product[1];  //we can use array or object to be passed
    Product.findOne({ _id: productId }, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            res.render("product", { product: item, user: signedUser });
        }
    });
});


//Personal Profile
app.get("/profile", function (req, res) {
    if (!signed) {
        console.log("You need to Sign In first!")
        res.redirect("/");
    } else {
        res.render("PersonalProfile", { user: signedUser })
    }
})


// Add Pyament
// app.post("/addPayment",function(req,res){
//     User.updateOne({_id:signedUser._id},{ $push:{payments:{}} })
// })
// remove payment
// Edit payment





app.get("/cart", function (req, res) {
    res.render("cart")
})

app.get("/search", function (req, res) {
    res.render("Searching")
})
app.get("/cart", function (req, res) {
    res.render("cart")
})
app.get("/sign_up_seller", function (req, res) {
    res.render("signupseller")
})





// app.post("/catigory",function(req,res){
//     // Catigory.updateOne({name:"books"},{$push : {products:product} },function(err,found){
//     //     if(!err){
//     //         console.log("apple product inserted succesfully")
//     //         res.redirect("/");
//     //     }
//     // })
//     Catigory.findOne({name:"fruits"},function(err,catigoryFound1){ //change books catigory to most_seller catigory
//         if(!err){
//             res.render("main",{products: catigoryFound1.products});
//         }
//     })
// })

// router.post ('/sign_in', function(req,res,next) {
//     var item = {
//         email: req.body.email,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         password: req.body.password
//     };
//     mongo.connect(url, function (err, db) {
//         assert.equal(null, err);
//         db.collection('userData').insertOne(item, function (err, result) {
//             assert.equal(null, err);
//             console.log('item has been inserted');
//             db.close;
//         });
//     });
// });




//listening to the Port.
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, function () {
    console.log("server has started successfully");
});
