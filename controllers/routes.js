const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
    getSignIn,
    postSignIn,
    getSignUp,
    postSignUp,
    signOut,
    main,
    getAddProduct,
    postAddProduct,
    productPage,
    catigory,
    cart,
    addToCart,
    removeFromCart,
    checkOut,
    profile,
    inventory,
    searchFunc

} = require ('./callbacks');


//set up multer to upload files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({ storage: storage });




router.route('/').get( getSignIn ).post( postSignIn );

router.route('/signUp').get( getSignUp ).post( postSignUp )

router.route('/signOut').get( signOut )

router.route('/main').get( main )

router.route('/addProduct').get( getAddProduct ).post(upload.single("image"), postAddProduct )

router.route("/productPage").post( productPage )

router.route("/catigory").post(catigory)

router.route("/addToCart").post( addToCart )

router.route('/cart').get( cart ) //

router.route('/checkOut').post( checkOut ) //

router.route('/removeFromCart').post( removeFromCart )

router.route("/profile").get( profile )

router.route('/search').post( searchFunc )

router.route('/inventory').get( inventory )


module.exports = router;


//productPage
// router.post("/productPage",);

// catigories of products
// router.post("/catigory", catigory);


//add to cart
// router.post("/addToCart", addToCart);

// Cart
// router.get("/cart", cart);

// router.post('/removeFromCart', removeFromCart);

// router.get('/checkOut', checkOut);

//Personal Profile
// router.get("/profile", profile)


// router.post('/search', searchFunc)

// router.get('/statics',statics)

// Add Pyament
// router.post("/addPayment",function(req,res){
//     User.updateOne({_id:signedUser._id},{ $push:{payments:{}} })
// })

// remove payment

// Edit payment