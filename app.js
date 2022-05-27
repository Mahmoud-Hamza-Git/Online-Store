const express = require("express");
const app = express();
const mongoose = require("mongoose");
const md5 = require("md5");
const routes = require('./controllers/routes');


// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true })); ///now bodyparser is embeded in express
app.use(express.urlencoded({extended:false})); 
app.use( routes ); // مينفعش تبدلهم لان الترتيب بياثر



app.set("view engine", "ejs");
app.use(express.static("public"));

//connect to mongoDB
mongoose.connect("mongodb://localhost:27017/storeDB"); //connect local



//listening to the Port.
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, function () {
    console.log("server has started successfully");
});
