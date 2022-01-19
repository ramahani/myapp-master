const express =require('express');
const User = require('../airlines/users.js');
const jwt = require('jsonwebtoken');
const bcrypt= require ('bcrypt');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		username: 'airlinesacl@gmail.com',
		password: 'auth1234'
	}
});

exports.signup= async (req,res) => {
    try {
		const user = await User.findOne({
			username: req.body.username,
		})
		const email = await User.findOne({
			email: req.body.email,
		})



		if (user) {
			return res.json("Username already taken")
		}
		if (email) {

			return res.json("Email already registered")
		}

		else {
			const newPassword = await bcrypt.hash(req.body.password, 10)
			await User.create({
				username: req.body.username,
                password: newPassword,
				firstname: req.body.firstname,
				lastname: req.body.lastname,
                homeadress: req.body.homeadress,
				email: req.body.email,
				passportnumber: req.body.passportnumber,
				countrycode: req.body.countrycode,
			})
		}
		return res.json("User Created")
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
}

exports.login=async (req,res)=>{
     
    var user;
	if (req.body.username === "administrator")
		user = await User.findOne({
			username: "Administrator",
		})
	else {
		user = await User.findOne({
			username: req.body.username,
		})
	}

	if (!user) {
		return res.json("User not found")
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		console.log('User logged in')
		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
				email: user.email,
			},
			'secret123'
		)

		return res.json(token)
	} 
    else 
    {
		return res.json("Incorrect password")
	}
}

exports.changepassword= async (req, res) => {

	const newPassword = await bcrypt.hash(req.body.password, 10)
	var datapassword = { password: newPassword }

	User.findByIdAndUpdate(req.params.id, datapassword)
		.then(user => res.json({ msg: 'Updated successfully' }))
		.catch(err =>
			res.status(400).json({ error: 'Unable to update the Database' })
		);
};

exports.encryption= async(req,res)=>
{
   
        try {
            const user = await User.findById(req.params.id)
            const isPasswordValid = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (isPasswordValid) {
                return res.json('Match')
            }
    
        }
        catch (err) {
            res.json({ status: 'error', error: 'Error Old Password' })
        }
    }

