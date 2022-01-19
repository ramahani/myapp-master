const express =require('express');
const Flight = require('../airlines/flights.js');

exports.getflights =(req,res)=>{
  const flights= Flight.find()
  .then(flights=> {
    res.status(200).json(flights)
  })
  .catch(err => console.log(err));
};

exports.getflight =(req,res)=>{
  const flight= Flight.findById(req.params.id)
  .then(flight=> {
    res.status(200).json(flight)
  })
  .catch(err => console.log(err));
};

exports.deleteflight=(req,res)=>{
  Flight.findByIdAndDelete(req.params.id).exec().then(result =>{
  
    res.status(200).send("Flight Deleted");
    console.log("Flight Deleted!");
}).catch(err => {
    console.log(err);
  });

}

exports.addflight= (req,res) => {
    const flight = new Flight(req.body);
    flight.save()
    .then(result=>{
     res.status(200).json({
       flight:result
     });
    });
    };

exports.updateflight=async (req,res)=>{
        console.log(req.body);
        console.log(req.params.id);
      
          Flight.findByIdAndUpdate(req.params.id,req.body).then(result =>{
              res.status(200).send("Flight updated ");
              console.log('The Flight is Updated successfully !');
          }).catch(err => {
              console.log(err);
            });
        };

exports.search = (req,res)=>{
Flight.find(req.body)
  .then(flights => res.json(flights))
  .catch(err => {
    console.log(err);
  });
}