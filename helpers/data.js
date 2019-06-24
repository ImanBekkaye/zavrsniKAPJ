const db = require('../models/models');
var crypto = require('crypto');

const Op = db.Sequelize.Op;


//nece trebati jer nema registracije
var addUser = function(obj,regFunction){

    db.Users.create({username: obj.username, password: obj.password, longitude: obj.longitude, latitude: obj.latitude})

        .catch(err => {
            return console.log(err.message);
        }).then(res => {
        //dodat user
        regFunction();//pravi kolacic i redirecta na user-ov profil
    });


}
var regUser = function(obj){

    db.Users.create({username: obj.username, password: obj.password, longitude: obj.longitude, latitude: obj.latitude})

        .catch(err => {
            return console.log(err.message);
        }).then(res => {
        //dodat user
        console.log('registrovan');

    });


}

//nova
var getAllUsers = function(regFunction){
    console.log('u funkciji allUsers')
    db.Users.findAll().then(rows => {
        console.log('zavrsena fja findallUsers', rows);
        var allUsersList = [];
        rows.forEach(function (row) {
            console.log('red',row);
            let  user = {username: row.dataValues.username,
                pasword: row.password,
                longitude: row.dataValues.longitude,
                latitude: row.dataValues.latitude}
            allUsersList.push(user);
        });
        regFunction(allUsersList);

}).catch(err => {
        console.log('error neki',err.message);
    })
}

var encrypt = (password)=>{
    var hash = crypto.createHash('sha256');


    hash.update(password);
    return hash.digest('hex');
}
var checkPass = (obj,mess)=>{
    db.Users.findAll({
        where: {
            username: obj.username,
            password: obj.password
        }
    }).then(e => {
        if (e == null) {
            mess(false)
        } else {
            mess(true)
        }
    });
}
var getUserID = async (username)=>{
    console.log('funkcija getuserid trazi id');
    var user = await db.Users.findAll(
        {where: {
                username: username
            }, limit: 1})
        .then(resk => {
            return resk;
        });
    console.log('ovo je user   ', user);
    var id = user[0].dataValues.id;
    console.log('ovo je id ',id);
    return id;

}

//za lokacije
//umjesto taska staviti lokaciju
var getLocation = async (locationFunction)=> {
    var locationList = [];
    db.MeetingPoint.findAll().catch(err => {
        console.log(err.message);
    }).then(rows => {

        rows.forEach(function (row) {
            console.log(row);
            let obj={user: 'MeetingPoint',
                coordinates:{
                    longitude:row.dataValues.longitude,
                    latitude:row.dataValues.latitude
                }

            }
            locationList.push(obj);
        });


    })

    db.Users.findAll().catch(err => {
        console.log(err.message);
    }).then(rows => {

        rows.forEach(function (row) {
            console.log(row);
            let obj={user: row.dataValues.username,
            coordinates:{
                    longitude:row.dataValues.longitude,
                    latitude:row.dataValues.latitude
            }

            }

            locationList.push(obj);
        });
        locationFunction(locationList);

    })



}

//
var addLocation = async (obj,fun)=>{
    //var id = await getUserID(username);

    db.MeetingPoint.create({ longitude: obj.longitude, latitude: obj.latitude})
        .catch(err => {
            console.log(console.error);
            return console.log(err.message);
        })
        .then(row => {
            console.log("Lokacija uspjesno dodata u tabelu");
            fun();
        })
}




















//auth
var register = function(obj, mess){
    db.Users.findAll({
        where: {
            username: obj.username
        }
    }).then(e => {
        console.log('trazenje u bazi je vratilo:', e);
        if (e.length === 0) {
            regUser(obj);
            mess(false);
        } else {
            mess(true);
        }
    });
}
var check = function(obj, mess){
    db.Users.findAll({
        where: {
            username: obj.username
        }
    }).then(e => {
        console.log('trazenje u bazi je vratilo:', e);
        if (e.length === 0) {
            mess(false);
        } else {
            mess(true);
        }
    });
}












//za poruke
var getGroupMess = function(regFunction){

    db.Messages.findAll({where: { to: null }}).then(rows => {
        console.log('zavrsena fja allGroupMessages', rows);
        var groupMessList = [];
        rows.forEach(function (row) {
            console.log('red',row);
            let  mess = {from: row.dataValues.from,
                to: row.dataValues.to,
                mess: row.dataValues.mess,
            }
            groupMessList.push(mess);
        });
        regFunction(groupMessList);

    }).catch(err => {
        console.log('error neki',err.message);
    })
};
var getUsersMess = function(obj,regFunction){

    db.Messages.findAll({where: { from: {[Op.or]:[obj.from,obj.to]} ,to: {[Op.or]:[obj.to,obj.from] }}}).then(rows => {
        console.log(' zavrsena fja allGroupMessages', rows);
        var usersMessList = [];
        rows.forEach(function (row) {
            console.log('red',row);
            let  mess = {from: row.dataValues.from,
                to: row.dataValues.to,
                mess: row.dataValues.mess,
            }
            usersMessList.push(mess);
        });
        regFunction(usersMessList);

    }).catch(err => {
        console.log('error neki',err.message);
    })
}

var addMess = async (obj,fun)=>{
//funkcija fun treba samo da res.senda da je proslo
    db.Messages.create({from: obj.from, to: obj.to, mess: obj.mess})
        .catch(err => {
            console.log(console.error);
            return console.log(err.message);
        })
        .then(row => {
            console.log("Poruka uspjesno dodata u tabelu");
            fun();
        })
}

module.exports = {
    check,
    checkPass,
    addUser,
    encrypt,
    getLocation,
    addLocation,
    getAllUsers,
    getGroupMess,
    addMess,
    getUsersMess,
    register
};
