const router= require ('express').Router();
let User = require ('../airlines/users');

router.route('/').get((req,res)=> {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err)) ;

}) ;


router.route('/adduser').post ((req,res) => {
    const id = 3;
    //req.body.id ;
    const FirstName = "habiba";
    //req.body.FirstName;
    const LastName= "omar";
   // req.body.LastName;
    const password= "habiba";
    //req.body.password;
    const Email= "habibasherif";
   // req.body.Email;
    const BirthDate ="9/9/2020";
    req.body.BirthDate;


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

router.route('/edituser/:id').post((req,res)=>
{
    User.findById(req.params.id)
    .then(User => {
        User.id=Number(req.body.id);
        User.FirstName =req.body.FirstName ;
        User.LastName = req.body.LastName;
        User.password = req.body.password;
        User.Email = req.body.Email;
        User.BirthDate = req.body.BirthDate;
        User.save()

        .then(() => res.json ('User updated!'))
      .catch (err=> res.status (400).json('Error:' + err));
    })
    .catch (err=> res.status (400).json('Error:' + err));
});



module.exports= router;