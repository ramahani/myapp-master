const bookingController= require('../controllers/booking.js');
const express =require('express');
const router= express.Router();

router.get('/', bookingController.getbookings);
router.get('/:id', bookingController.getbooking);
router.post('/sendemail',bookingController.sendemail);
router.delete('/deletebooking/:id',bookingController.deletebooking);
router.put('/updatebooking/:id',bookingController.updatebooking);
router.post('/createbooking',bookingController.createbooking);
router.post('/addbooking',bookingController.addbooking);


module.exports=router;