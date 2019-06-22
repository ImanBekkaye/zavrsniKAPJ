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
   data.register(obj, (ex)=> {
            res.send(ex);

    })
    //dodati usera ako moze


})
router.post('/check',function(req,res, next){

    var encryptPass = data.encrypt(req.body.password);
    var obj={
        username: req.body.username,
        password: encryptPass,
    }
    console.log('user',  req.body.username);
    data.check(obj, (ex)=> {
        res.send(ex);

    })
    //dodati usera ako moze


})





module.exports = router;
