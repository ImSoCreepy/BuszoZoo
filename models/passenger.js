const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Passenger = db.model('Passenger', {
    name: String,
    dateOfBirth: String,
    city: String,
    hairColor: String,
    _rajtavan:{
        type: Schema.Types.ObjectId,
        ref: 'Bus'
    }
});

module.exports = Passenger;