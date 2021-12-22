const mongoose= require ('mongoose');
const Schema= mongoose.Schema;

const FlightSchema = new Schema (
    {
       Flight_Number :{type : Number , Required : true},
       From:{ type: String, required: true },
       To:{ type: String, required: true },
       Departure_Time : {type : String , required : true},
       Arrival_Time : {type:String , required:true},
       Flight_Date:{ type: String, required: true },
       Cabin:{ type: String, required: true },
       Price:{type: Number, requried: true},
       Firstclassseats:{type: Number, required: true},
       Businessclassseats:{type: Number, required: true},
       Economyclassseats:{type: Number, required: true},
       Seats_Available:{ type: [String], required: true },
       Duration:{type:String, required:true},
       Departure_Terminal:{type:String, required:true},
       Arrival_Terminal:{type:String, required:true}
    }, 
    {timestamps: true,}
);

const Flights= mongoose.model('FLight', FlightSchema);
module.exports = Flights;
