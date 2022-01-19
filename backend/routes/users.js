const userController= require('../controllers/users.js');
const authenticationController= require('../controllers/authentication.js');
const express =require('express');
const router= express.Router();

router.put('/edituser/:id', userController.edituser);
router.get('/', userController.getuser);
router.post('/login', authenticationController.login);
router.post('/signup', authenticationController.signup);
router.put('/password/:id', authenticationController.changepassword);
router.post('/:id', authenticationController.encryption);

module.exports=router;