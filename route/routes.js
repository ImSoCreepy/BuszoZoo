const getBusesMW = require('../middleware/bus/getBusesMW');
const getBusMW = require('../middleware/bus/getBusMW');
const saveBusMW = require('../middleware/bus/saveBusMW');
const delBusMW = require('../middleware/bus/delBusMW');

const getPassengersMW = require('../middleware/passenger/getPassengersMW');
const getPassengerMW = require('../middleware/passenger/getPassengerMW');
const savePassengerMW = require('../middleware/passenger/savePassengerMW');
const delPassengerMW = require('../middleware/passenger/delPassengerMW');

const renderMW = require('../middleware/renderMW');

const BusModel = require('../models/bus');
const PassengerModel = require('../models/passenger');

module.exports = function (app) {
    const objectRepository = {
        BusModel: BusModel,
        PassengerModel: PassengerModel
    };

    //Új busz hozzáadása
    app.use('/bus/new',
        saveBusMW(objectRepository),
        renderMW(objectRepository, 'buseditnew')
    );

    //Busz szerkesztése
    app.use('/bus/edit/:busid',
        getBusMW(objectRepository),
        saveBusMW(objectRepository),
        renderMW(objectRepository, 'buseditnew')
    );

    //Busz törlése
    app.get('/bus/del/:busid',
        getBusMW(objectRepository),
        delBusMW(objectRepository)
    );
    

    //Utas szerkesztése
    app.use('/passenger/:busid/edit/:passengerid',
        getBusMW(objectRepository),
        getPassengerMW(objectRepository),
        savePassengerMW(objectRepository),
        renderMW(objectRepository, 'passengereditnew')
    );

    //Utas törlése
    app.get('/passenger/:busid/del/:passengerid',
        getBusMW(objectRepository),
        getPassengerMW(objectRepository),
        delPassengerMW(objectRepository)
    );

    //Új utas hozzáadása
    app.use('/passenger/:busid/new',
        getBusMW(objectRepository),
        savePassengerMW(objectRepository),
        renderMW(objectRepository, 'passengereditnew')
    );

    //Adott busz utasainak listája
    app.get('/passenger/:busid',
        getBusMW(objectRepository),
        getPassengersMW(objectRepository),
        renderMW(objectRepository, 'passengers')
    );
    

    //Buszok listája
    app.get('/',
        getBusesMW(objectRepository),
        renderMW(objectRepository, 'index')
    );
};