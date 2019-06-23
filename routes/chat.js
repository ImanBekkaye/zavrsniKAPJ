var express = require('express');
var router = express.Router();
var data = require('../helpers/data');



router.get('/all',function(req, res,next){
    data.getGroupMess((allMess)=>{
        res.send(allMess);
    })

});

router.post('/private',function(req, res,next){
    let obj={from:req.body.from, to: req.body.to}
    data.getUsersMess(obj,(usersMess)=>{
        res.send(usersMess);
    })

});



router.post('/',function(req, res,next){
    let obj ={
        from:req.body.from,
        to: req.body.to,
        mess: req.body.mess
    }


    data.addMess(obj, function(){
        res.send('poruka dodata u bazu')
    })



});

module.exports = router;
