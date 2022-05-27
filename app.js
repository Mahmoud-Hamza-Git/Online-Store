const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config()
const routes = require('./controllers/routes');


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:false})); 


//set middleware
app.use( routes ); // مينفعش تبدلهم لان الترتيب بياثر







// connect to DataBase and starting the server
const start = async () =>{
    await mongoose.connect(process.env.MONGO_URI)           //.then(console.log("CONNECTED TO THE DATABASE...."))

    let port = process.env.PORT || 3000

    app.listen(port, ()=> { console.log("server has started successfully") })
}

start()