const express = require('express');
const router = express.Router();
const Booking = require('../airlines/booking');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'airlinesacl@gmail.com',
      pass: 'auth1234s'
    }
  });

  exports.getbookings =(req,res)=>{
    const bookings= Booking.find()
    .then(bookings=> {
      res.status(200).json(bookings)
    })
    .catch(err => console.log(err));
  };

  exports.getbooking =(req,res)=>{
    const booking= Booking.findById(req.params.id)
    .then(booking=> {
      res.status(200).json(booking)
    })
    .catch(err => console.log(err));
  };

  exports.sendemail= (req,res)=>
  {
    try {  
        console.log('Email sent')
        
        transporter.sendMail(req.body, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })
      res.json({ status: 'ok' })
  } catch (err) {
      res.json({ status: 'error', error: 'Duplicate email' })
  }
  }

  exports.deletebooking=(req,res)=>{
    Booking.findByIdAndDelete(req.params.id).exec().then(result =>{
    
      res.status(200).send("Booking Deleted");
      console.log("Booking Deleted!");
  }).catch(err => {
      console.log(err);
    });
  
  }

  exports.updatebooking=async (req,res)=>{
    console.log(req.body);
    console.log(req.params.id);
  
      Booking.findByIdAndUpdate(req.params.id,req.body).then(result =>{
          res.status(200).send("Booking updated ");
          console.log('The Booking is Updated successfully !');
      }).catch(err => {
          console.log(err);
        });
    };
    exports.addbooking= (req,res) => {
      const Booking = new Booking(req.body);
      Booking.save()
      .then(result=>{
       res.status(200).json({
         Booking:result
       });
      });
      };
    
