const express =require('express');
const User=  require('../airlines/users.js');


exports.getuser= (req,res)=>
{
  const user= User.find()
  .then(user=> {
    res.status(200).json(user)
  })
  .catch(err => console.log(err));
};


exports.edituser=async (req,res)=>{
  console.log(req.body);
  console.log(req.params.id);
    Flight.findByIdAndUpdate(req.params.id,req.body).then(result =>{
        res.status(200).send("User updated ");
        console.log('The User is Updated successfully !');
    }).catch(err => {
        console.log(err);
      });
  };
