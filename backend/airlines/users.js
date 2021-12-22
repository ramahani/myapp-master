const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    id: {type: String, required: true },
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    Email: {type: String, required: true},
    Password: { type: String, required: true},
    BirthDate: {type: String,required: true},
},
    { timestamps: false });

const user = mongoose.model('users', userSchema);
module.exports = user;