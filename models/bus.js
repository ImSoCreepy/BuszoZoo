const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Bus = db.model('Bus', {
    regNum: String,
    make: String,
    color: String,
    articulated: Boolean,
      
});

module.exports = Bus;