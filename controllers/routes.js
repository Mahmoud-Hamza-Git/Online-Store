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
    editProduct,
    editSingleProduct,
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

router.route('/editProduct').post( editProduct )

router.route("/catigory").post(catigory)

router.route("/addToCart").post( addToCart )

router.route('/cart').get( cart ) //

router.route('/checkOut').post( checkOut ) //

router.route('/removeFromCart').post( removeFromCart )

router.route("/profile").get( profile )

router.route('/search').post( searchFunc )

router.route('/inventory').get( inventory )

router.route('/editSingleProduct'). post(upload.single("image"), editSingleProduct )

router.route("/productPage").post( productPage )




module.exports = router;