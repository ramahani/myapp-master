const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    username: {type: String, required: true },
    password: { type: String, required: true},
    // passwordreset:{type:String, required:true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    homeaddress:{type:String,required:true},
    countrycode:{type:String,required:true}, 
    telephone_number:{type:String,required:true},
    email:{type:String,required:true} ,
    passportnumber:{type:String,required:true},
    BirthDate: {type: String,required: false},
    type:{type:String, default:"User"},
    
},
    { timestamps: false });

 

const user = mongoose.model('users', userSchema);
module.exports = user;