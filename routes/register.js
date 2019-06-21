var express = require('express');
var router = express.Router();
var data = require('../helpers/data');


//GET register
router.get('/',(req, res)=>{
    res.send('register');
})

//POST register
router.post('/',function(req,res, next){

    var encryptPass = data.encrypt(req.body.password);
    var obj={
        username: req.body.username,
        password: encryptPass,
        longitude: req.body.longitude,
        latitude: req.body.latitude
    }
    console.log('user',  req.body.username);
   // data.check(obj.username, function(ex){
        // if(ex){
        //     console.log('postoji takvo ime ne moze se registrovati');
        //     res.redirect('/register');
        // }else{
            //ne postoji to ime moze se registrovati tj. takav user se dodaje u bazu
            data.addUser(obj,()=>{
                res.cookie('authx', req.body.username);
                console.log('kreiran kolac redirecta', obj);
                res.send('registrovan user');
            })

   // })
    //dodati usera ako moze


})





module.exports = router;
