var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    data.getLocation(function(locationList){
        res.send(locationList);
    })

});

router.post('/', function(req, res, next) {
    //napraviomo objekat od podataka koje smo postali na rutu i talav objekat dodajemo u lisu
    var location = {
        id_username: req.body.id_username,
        longitude: req.body.longitude,
        latitude: req. body.latitude
    };
    //data.push(location);
    data.addLocation(location,function(){
        res.send('Uspjesno dodat navedeni objekat u tabelu lokacija: ', location);
    });

});

module.exports = router;



