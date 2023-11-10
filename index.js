// const { config } = require("dotenv");
const express = require("express");
require('./database')
const app = express();
var parser = require('body-parser');
var path = require('path');
const cors = require( 'cors' ),
    // Allow Origins according to your need.
    corsOptions = {
        'origin': '*'
    };
    

app.use( cors( corsOptions ) );
// var app = express();
app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())
// config()
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
// app.use(express.static(__dirname + '/public'));
// const port = process.env.port;
const port = 5000
// var multipart = require('connect-multiparty');
// app.use(multipart());
app.set('view engine', 'ejs');
// app.get('/admin', (req, res) => {
//     res.render('home');
// });
// app.get('/dashboard', (req, res) => {
  
    
//     res.render('dashboard');
  
// });
// app.get('/categoryAdd', (req, res) => {
  
    
//     res.render('category');
  
// });
// app.get('/itemsAdd', (req, res) => {
  
    
//     res.render('items');
  
// });
// app.get('/ordersDetail', (req, res) => {
  
    
//     res.render('orders');
  
// });
app.use(express.json())

app.listen(port, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
});
// const ownerRoutes = require("./routes/ownerRoute")
const userRoutes = require("./routes/userRoute")
const categoryRoutes = require("./routes/categoryRoute")
const itemRoutes = require("./routes/itemRoute")
const feedbackRoutes = require("./routes/feedbackRoute")
const orderRoutes = require("./routes/orderRoute")
const addressRoutes = require("./routes/addressRoute")
const cartRoutes = require("./routes/cartRoute")




app.use("/api/user", userRoutes )
app.use("/api/category", categoryRoutes )
app.use("/api/order", orderRoutes )
app.use("/api/item", itemRoutes )
app.use("/api/address", addressRoutes )
app.use("/api/cart", cartRoutes )
app.use("/api/feedback", feedbackRoutes )
// app.use("/api/owner", ownerRoutes )


module.exports = app;
