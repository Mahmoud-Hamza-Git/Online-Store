const mongoose = require("mongoose");
const multer = require("multer");
const md5 = require("md5");



//set up multer to upload files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
module.exports.upload = multer({ storage: storage });




//creating schemas
const Products_Schema = {
    name: String,
    price: Number,
    s_description: String,
    l_description: String,
    catigory1: String,
    catigory2: String,
    img: {
        data: Buffer,
        contentType: String
    },
    count:{
        type:Number,
        default:0
    }
}

const inventory_Schema = {
    products:[Products_Schema],
    cash:{
        type:Number,
        default:0
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
    cart: [{ product: Products_Schema, number: Number }],
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
    }],
    products:[ {product:Products_Schema,count:Number} ]
};


//creating models(collections)
const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", Products_Schema);



const defaultEmail = "default@default.com";
const defaultPassword = md5('0');

var defaultUser = new User({
    fname: 'default',
    lname: 'default',
    email: defaultEmail,
    password: defaultPassword,
    phoneNumber: '',
    admin: false,
    img: {
        data: '',
        contentType: ''
    },
    address: { //cart will be an empty array
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
});

var admin1 = new User({
    fname: 'admin',
    lname: 'admin',
    email: 'admin1@admin.com',
    password: '4a7d1ed414474e4033ac29ccb8653d9b',
    phoneNumber: '',
    admin: true,
    img: {
        data: '',
        contentType: ''
    },
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
});

const users = [defaultUser , admin1];
// save the default user in database if not exist.
User.find({}, function (err, foundList) {
    if (!err && foundList.length == 0) {
        User.insertMany(users, (err1) => {
            if(!err1){
                console.log("Default users are saved in database")
            }
        });
    }
});

module.exports.Product = Product;
module.exports.User = User;
module.exports.defaultUser = defaultUser;










// var defaultProduct = new Product({
//     name: '',
//     price: '',
//     s_description: '',
//     l_description: '',
//     catigory1: '',
//     catigory2: '',
//     img: {
//         contentType: ''
//     }
// });



// /// i want to get value calculated in a function and export it " " but i can't use global variable because JS will not wait with exporting until the variable changes.So we need to export using function to force JS to wait until the function is completed,but also we need to wait until the data come so it's better to use callback functios;
// module.exports.defaultUser = function () {
//     var defaultUser;
//     // save the default user in database.
//     User.find({}, function (err, foundList) {
//         if (!err) {
//             if (foundList.length == 0) {
//                 userItem.save(function (err) {
//                     if (!err) {

//                         console.log("default user saved in database");  ///inserting in database is tooooooooo lasy, javascript will not wait for you, it's flow is not line by line.

//                         // retrieve default user from database.
//                         User.findOne({ email: defaultEmail, password: defaultPassword }, (err, foundUser) => {
//                             if (!err) {
//                                 defaultUser = foundUser;
//                             }
//                         });

//                     }
//                 });
//             }
//             else {
//                 // retrieve default user from database.
//                 User.findOne({ email: defaultEmail, password: defaultPassword }, (err, foundUser) => {
//                     if (!err) {
//                         defaultUser = foundUser; //i can't return here as it will return to the parent function not the targeted one.
//                     }
//                 });
//             }
//         }
//     });
//     setTimeout(() => { /// wait 100 ms until data is comes from database
//         console.log(defaultUser);
//     }, 100);
// };