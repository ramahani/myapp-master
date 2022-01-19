const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    
    
  id: {type: String, required: true },
  FirstName: { type: String, required: true},
  LastName:{type:String, required:true},
  Email: {type: String,required: true},
  Password:{type:String,required:true},
  Birthdate: {type: String,required: true},


  FirstFlight_Number: {type: String,required: true},
  FirstSeats_Available: {type: [String],required: true }, 
  FirstFrom: { type: String,required: true},
  FirstTo: { type: String, required: true},
  FirstFlight_Date: { type: Date, required: true},
  FirstDeparture_Terminal: {type: Number, required: true},
  FirstDeparture_Time: {type: String, required: true},
  FirstArrival_Terminal: {type: Number,required: true},
  FirstArrival_Time: {type: String,required: true},
  FirstCabin:{type:[String],required:true},


    SecondFlight_Number: {type: String,required: true},
    SecondSeats_Available: {type: [String],required: true }, 
    SecondFrom: { type: String,required: true},
    SecondTo: { type: String, required: true},
    SecondFlight_Date: { type: Date, required: true},
    SecondDeparture_Terminal: {type: Number, required: true},
    SecondDeparture_Time: {type: String, required: true},
    SecondArrival_Terminal: {type: Number,required: true},
    SecondArrival_Time: {type: String,required: true},
    SecondCabin:{type:[String],required:true},


  Price: {type: Number,required: true},
},
  { timestamps: true });


const booking = mongoose.model('bookings', bookingSchema);
module.exports = booking;