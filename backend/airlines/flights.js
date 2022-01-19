const mongoose= require ('mongoose');
const Schema= mongoose.Schema;

const FlightSchema = new Schema (
    {
       Flight_Number :{type : String , Required : false},
       From:{ type: String, required: false },
       To:{ type: String, required: false },
       Departure_Time : {type : String , required : false},
       Arrival_Time : {type:String , required:false},
       Flight_Date:{ type: String, required: false },
       Seats: {type: String, required: false},
       Departure_Date:{ type: String, required: false },
       Arrival_Date:{ type: String, required: false },
       Cabin:{ type: String, required: false },
       Price:{type: String, requried: false},
       Firstclassseats:{type: String, required: false},
       Businessclassseats:{type: String, required: false},
       Economyclassseats:{type: String, required: false},
       Seats_Available:{ type: [String], required: false },
       Duration:{type:String, required:false},
       Departure_Terminal:{type:String, required:false},
       Arrival_Terminal:{type:String, required:false}
    }, 
    {timestamps: true,}
);

const Flights= mongoose.model('Flight', FlightSchema);
module.exports = Flights;
