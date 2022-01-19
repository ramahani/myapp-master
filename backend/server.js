const express = require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const morgan=require('morgan');
var cookieParser = require('cookie-parser');


require('dotenv').config();

const app= express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//database connection
const uri= process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', ()=>
{
    console.log("Database successfully connected");
})

const stripeSecretKey= process.env.STRIPE_SECRET_KEY
const stripePrivateKey= process.env.STRIPE_PRIVATE_KEY


//routes
const flightsrouter= require('./routes/flights');
const usersrouter=require('./routes/users');
const bookingrouter=require('./routes/booking');

app.use('/flights',flightsrouter); 
app.use('/users',usersrouter);
app.use('/booking',bookingrouter);

//server
app.listen(port, () => 
{
    console.log('Server is running on port', {port});
})


 

 

