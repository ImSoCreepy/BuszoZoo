/**
 * Visszaadja az adatbázisban szereplő összes busz adatait a res.locals.buses-ban
 */
const requireOption = require('../requireOption').requireOption;

module.exports = function (objectrepository) {
  
  const BusModel = requireOption(objectrepository, 'BusModel');

    return function (req, res, next) {
      BusModel.find({})
      .then((buses) => {
        res.locals.buses = buses;
        return next();
      })
      .catch((err) => {
        console.error("Error while fetching buses: ", err);
        return next(err);
      });
    };

  };