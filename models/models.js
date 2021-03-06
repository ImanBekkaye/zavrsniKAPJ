const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:data');


const Users = sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,

    },
    username:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    longitude: {
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    latitude: {
        type: Sequelize.DECIMAL,
        allowNull: true
    }
});

const Messages = sequelize.define('message',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,

    },
    from:{
        type: Sequelize.STRING,
        allowNull: false
    },
    to:{
        type: Sequelize.STRING,
        allowNull: true
    },
    mess:{
        type: Sequelize.STRING,
        allowNull: false
    },

});



//sve lokacije

const locationList = sequelize.define('location', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_username: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    longitude: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    latitude: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
});




locationList.belongsTo(Users, {
    foreignKey: 'id_username',
    targetKey: 'id'
});

//novo za lokacije

const MeetingPoint = sequelize.define('meetingPoint', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    longitude: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    latitude: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
});
const createTables = function() {

    sequelize.sync({ logging: console.log, force: true }).then(fullfil => {

        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');

            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

    });
};


module.exports.MeetingPoint = MeetingPoint;
module.exports.Users = Users;
module.exports.locationList = locationList;
module.exports.Messages = Messages;
module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
module.exports.createTables = createTables;
