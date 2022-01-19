const flightController= require('../controllers/flights.js');
const express =require('express');
const router= express.Router();

router.get('/flightslist', flightController.getflights);
router.get('/:id', flightController.getflight);
router.delete('/deleteflight/:id',flightController.deleteflight);
router.post('/addflight',flightController.addflight);
router.put('/updateflight/:id',flightController.updateflight);
router.put('/search',flightController.search);

module.exports=router;