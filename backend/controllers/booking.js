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
  


    exports.createbooking= (req,res)=>
{
    const booking = new Booking(req.body);
    booking.save()
    .then(result=>{
     res.status(200).json({
       booking:result
     });
    });
};

 exports.cancelbooking=(req,res)=>
 {

    const bookingnumber = req.body._id
    const FirstFlight_Number = Booking.find(bookingnumber).FirstFlight_Number
    const FirstSeats_Available = Booking.find(bookingnumber).FirstSeats_Available.length
    const SecondFlight_Number =  Booking.find(bookingnumber).SecondFlight_Number
    const SecondSeats_Available = Booking.find(bookingnumber).SecondSeats_Available.length
    

    for (let i = 0; i < FirstSeats_Available; i++) {
    
       // seatmap array in flights flight.find(FirstFlight_Number).SeatMap.push(Booking.find(bookingnumber).FirstSeats_Available[i])

        if (Booking.find(bookingnumber).FirstCabin[i]=== "Economy") {
            flight.find(FirstFlight_Number).Economyclassseats++
        }
        else if (Booking.find(bookingnumber).FirstCabin[i]=== "Business") {
            flight.find(FirstFlight_Number).Businessclassseats++
        }
        else if(Booking.find(bookingnumber).FirstCabin[i]=="First Class") {
            flight.find(FirstFlight_Number).Firstclassseats++
        }
    }


    for (let i = 0; i < SecondSeats_Available; i++){
        flight.find(SecondFlight_Number).SeatMap.push(Booking.find(bookingnumber).SecondSeats_Available[i])

        if (Booking.find(bookingnumber).SecondCabin[i]=== "Economy") {
            flight.find(SecondFlight_Number).Economyclassseats++
        }
        else if (Booking.find(bookingnumber).SecondCabin[i]=== "Business") {
            flight.find(SecondFlight_Number).Businessclassseats++
        }
        else if(Booking.find(bookingnumber).SecondCabin[i]=="First Class") {
            flight.find(SecondFlight_Number).Firstclassseats++
        }
    }
    
    Booking.remove(bookingnumber)
   } 

   exports.chooseseat=(req,res)=>
   {
    const bookingnumber = req.body._id
    const FirstFlight_Number = Booking.find(bookingnumber).FirstFlight_Number
    const FirstSeats_Available = Booking.find(bookingnumber).FirstSeats_Available.length
    const SecondFlight_Number =  Booking.find(bookingnumber).SecondFlight_Number
    const SecondSeats_Available = Booking.find(bookingnumber).SecondSeats_Available.length

    for (let i = 0; i < FirstSeats_Available; i++) {
    
    Booking.find(bookingnumber).FirstSeats_Available[i].SeatMap.push(flight.find(FirstFlight_Number))
    if (Booking.find(bookingnumber).FirstCabin[i]=== "Economy") {
        flight.find(FirstFlight_Number).Economyclassseats--
    }
    else if (Booking.find(bookingnumber).FirstCabin[i]=== "Business") {
        flight.find(FirstFlight_Number).Businessclassseats--
    }
    else if(Booking.find(bookingnumber).FirstCabin[i]=="First Class") {
        flight.find(FirstFlight_Number).Firstclassseats--
    }
}

for (let i = 0; i < SecondSeats_Available; i++){
    booking.find(bookingnumber).SecondSeats_Available[i].SeatMap.push(flight.find(SecondFlight_Number))

    if (Booking.find(bookingnumber).SecondCabin[i]=== "Economy") {
        flight.find(SecondFlight_Number).Economyclassseats--
    }
    else if (Booking.find(bookingnumber).SecondCabin[i]=== "Business") {
        flight.find(SecondFlight_Number).Businessclassseats--
    }
    else if(Booking.find(bookingnumber).SecondCabin[i]=="First Class") {
        flight.find(SecondFlight_Number).Firstclassseats--
    }
}

   }

   exports.changeseat=(req,res)=>
   {
    const bookingnumber = req.body._id
    const FirstFlight_Number = Booking.find(bookingnumber).FirstFlight_Number
    const FirstSeats_Available = Booking.find(bookingnumber).FirstSeats_Available.length
    const SecondFlight_Number =  Booking.find(bookingnumber).SecondFlight_Number
    const SecondSeats_Available = Booking.find(bookingnumber).SecondSeats_Available.length
    

    for (let i = 0; i < FirstSeats_Available; i++) {
    
        flight.find(FirstFlight_Number).SeatMap.push(Booking.find(bookingnumber).FirstSeats_Available[i])

        if (Booking.find(bookingnumber).FirstCabin[i]=== "Economy") {
            flight.find(FirstFlight_Number).Economyclassseats++
        }
        else if (Booking.find(bookingnumber).FirstCabin[i]=== "Business") {
            flight.find(FirstFlight_Number).Businessclassseats++
        }
        else if(Booking.find(bookingnumber).FirstCabin[i]=="First Class") {
            flight.find(FirstFlight_Number).Firstclassseats++
        }
    }


    for (let i = 0; i < SecondSeats_Available; i++){
        flight.find(SecondFlight_Number).SeatMap.push(Booking.find(bookingnumber).SecondSeats_Available[i])

        if (Booking.find(bookingnumber).SecondCabin[i]=== "Economy") {
            flight.find(SecondFlight_Number).Economyclassseats++
        }
        else if (Booking.find(bookingnumber).SecondCabin[i]=== "Business") {
            flight.find(SecondFlight_Number).Businessclassseats++
        }
        else if(Booking.find(bookingnumber).SecondCabin[i]=="First Class") {
            flight.find(SecondFlight_Number).Firstclassseats++
        }
    }

   }
