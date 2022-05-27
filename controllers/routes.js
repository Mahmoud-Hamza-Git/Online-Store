const express = require("express");
const router = express.Router();
const schema = require("../models/schema");
const upload = schema.upload;

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
    statics,
    searchFunc

} = require ('./callbacks');



// signUp globals




router.route('/').get(getSignIn).post(postSignIn);
router.route('/signUp').get(getSignUp).post(postSignUp)
router.route('/signOut').get(signOut);
router.route('/main').get(main);
router.route('/addProduct').get(getAddProduct).post(upload.single("image"),postAddProduct)


//productPage
router.post("/productPage",productPage);

// catigories of products
router.post("/catigory", catigory);


//add to cart
router.post("/addToCart", addToCart);

// Cart
router.get("/cart", cart);

router.post('/removeFromCart', removeFromCart);

router.get('/checkOut', checkOut);

//Personal Profile
router.get("/profile", profile)


// Add Pyament
// router.post("/addPayment",function(req,res){
//     User.updateOne({_id:signedUser._id},{ $push:{payments:{}} })
// })

// remove payment

// Edit payment

router.post('/search', searchFunc)

router.get('/statics',statics)


module.exports = router;
