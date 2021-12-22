const express = require('express'),
app = express();
app.use(express.json());

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.listen(5000, process.env.IP, () => {
    console.log('Server successfully started!');
});
const cors = require('cors');



app.use(cors());


mongoose = require('mongoose');
const flight = require('./airlines/flights.js')
const user = require('./airlines/users.js')
const booking = require('./airlines/booking.js')
const reservation = require('./airlines/booking.js');
require('dotenv').config(); 
app.use(express.json());
const uri = "mongodb+srv://rama:CcPZ9iujt9BTLAv@cluster0.k93bn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected!!");
});



app.post("/add", (req, res) => {
   const From =req.body.From ;
    const To = req.body.To;
    const Flight_Number= req.body.Flight_Number;
    const Departure_Time= req.body.Departure_Time;
    const Arrival_Time= req.body.Arrival_Time;
    const Flight_Date =req.body.Flight_Date;
    const  Cabin =req.body.Cabin;
    const Seats_Available=Number(req.body.Seats_Available);

    const newFlight = new flight ({
        Flight_Number,
        From,
        To,
        Departure_Time,
        Arrival_Time,
        Flight_Date,
        Cabin,
        Seats_Available

    }) ;
    newFlight.save().then((result) => {
        res.send(result)
    })
        .catch((err) => {
            console.log(err)
        })

})


app.get("/flightslist" , (req, res) => {                                               
    flight.find({}).exec(function(err, data){
        res.send(data)
    })
    
});

app.post("/flightslist" , (req, res) => {                                               
    flight.find({}).exec(function(err, data){
        res.send(data)
    })
    
});


app.post("/deleteFlights", (req, res) => {
    flight.deleteOne({ _id : req.body._id}).exec(function (err, leads) {
           res.status(201).send(leads);
       });
   });
   app.post("/updateFlights", (req, res) => {
    flight.updateOne({ _id: req.body._id }, req.body).exec(function (err, leads) {
        res.status(201).send(leads);
    });
});


app.post("/searchFlights",async (req, res) => {
   
    const criteria = req.body; 
    try{
        const query=await flight.find(criteria);
        res.json(query);
 
    }catch (err){
        res.json({message:err});}
    
 });
 
 app.post('/createReservation',(req,res)=>{
    const reservation1 = new booking({
    
      id: req.body.id,
      FirstName:req.body.FirstName,
      LastName:req.body.LastName,
      Email:req.body.Email,
      Password:req.body.Password,
      BirthDate:req.body.BirthDate,

  
      FirstFlight_Number:req.body.FirstFlight_Number,
      FirstSeats_Available:req.body.FirstSeats_Available, 
      FirstFrom:req.body.FirstFrom,
      FirstTo:req.body.FirstTo,
      FirstFlight_Date:req.body.FirstFlight_Date,
      FirstDeparture_Terminal:req.body.FirstDeparture_Terminal,
      FirstDeparture_Time:req.body.FirstDeparture_Time,
      FirstArrival_Terminal:req.body.FirstArrival_Terminal,
      FirstArrival_Time:req.body.FirstArrival_Time,
      FirstCabin:req.body.FirstCabin,  
    


      SecondFlight_Number:req.body.SecondFlight_Number,
      SecondSeats_Available:req.body.SecondSeats_Available,  
      SecondFrom:req.body.SecondFrom,
      SecondTo:req.body.SecondTo,
      SecondFlight_Date:req.body.SecondFlight_Date,
      SecondDeparture_Terminal:req.body.SecondDeparture_Terminal,
      SecondDeparture_Time:req.body.SecondDeparture_Time,
      SecondArrival_Terminal:req.body.SecondArrival_Terminal,
      SecondArrival_Time:req.body.SecondArrival_Time,
      SecondCabin:req.body.SecondCabin,
      
    

    })
    reservation1.save().then((result) => {
        res.send(result)

        //Sending Email to user
        /*const msg = {
            to: req.body.email,
            from: 'test@example.com', // Use the email address or domain you verified above
            subject: 'A booking was made with this Email',
            text: 'you can go to this link to check out your bookings ',
          };
          sgMail.send(msg).then(() => {}, error => {
                    console.error(error);

                if (error.response) {
                console.error(error.response.body)
                }
                console.log("Email sent successfuly ")
            });*/
        
    })
        .catch((err) => {
            console.log(err)
        })

})



app.get("/getReservations",(req,res)=>{

    reservation.find({}).exec(function(err, data){
        
        res.send(data)
        
    })

})

app.get("/adduser",(req,res) =>{
    const id =req.body.id ;
    const FirstName = req.body.FirstName;
    const LastName= req.body.LastName;
    const password= req.body.password;
    const Email= req.body.Email;
    const BirthDate =req.body.BirthDate;


    const newUser = new User ({
        id,
        FirstName,
        LastName,
        password,
        Email,
        BirthDate

    }) ;

    newUser.save()
      .then(() => res.json ('User Added!'))
      .catch (err=> res.status (400).json('Error:' + err));

});


app.post("/cancelbooking", (req, res) => {
   
    //find booking in bookings
    const bookingnumber = req.body._id
    const FirstFlight_Number = booking.find(bookingnumber).FirstFlight_Number
    const FirstSeats_Available = booking.find(bookingnumber).FirstSeats_Available.length
    const SecondFlight_Number =  booking.find(bookingnumber).SecondFlight_Number
    const SecondSeats_Available = booking.find(bookingnumber).SecondSeats_Available.length
    
    //put seats from dep flight seats from booking back to dep seats in flights
    for (let i = 0; i < deptSeatCount; i++) {
        // Move seats from booking to be available in flight 
        flight.find(deptFlightNo).SeatMap.push(booking.find(bookingnumber).DepartureFlightSeats[i])

        // Increase number of available seats depending on seat type in flight 
        if (booking.find(bookingnumber).FirstCabin[i]=== "Economy") {
            flight.find(deptFlightNo).Economyclassseats++
        }
        else if (booking.find(bookingnumber).FirstCabin[i]=== "Business") {
            flight.find(deptFlightNo).Businessclassseats++
        }
        else if(booking.find(bookingnumber).FirstCabin[i]=="First Class") {
            flight.find(deptFlightNo).Firstclassseats++
        }
    }

    // Repeat same loop for the return flight in resevation
    for (let i = 0; i < retSeatCount; i++){
        flight.find(retFlightNo).SeatMap.push(booking.find(bookingnumber).ReturnFlightSeats[i])

        if (booking.find(bookingnumber).SecondCabin[i]=== "Economy") {
            flight.find(retFlightNo).Economyclassseats++
        }
        else if (booking.find(bookingnumber).SecondCabin[i]=== "Business") {
            flight.find(retFlightNo).Businessclassseats++
        }
        else if(booking.find(bookingnumber).SecondCabin[i]=="First Class") {
            flight.find(retFlightNo).Firstclassseats++
        }
    }
    //Remove booking from bookings
    booking.remove(bookingnumber)
   });



/*const express = require('express');
const cors= require('cors');
const mongoose= require('mongoose');

require('dotenv').config();

const app= express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri= process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', ()=>
{
    console.log("Database successfully connected");
})

const flightsrouter= require('./routes/flights');
const cartrouter = require ('./routes/cart');




app.use('/flights',flightsrouter); 
app.use('/cart',cartrouter);

app.listen(port, () => 
{
    console.log('Server is running on port', {port});
})

app.post("/searchflights",async(req, res) => {
   
    const criteria = req.body; 
    try{
        const query=await Flight.find(criteria);
        res.json(query);
 
    }catch (err){
        res.json({message:err});}
    
 });*/
 

 


