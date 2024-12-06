/**
 * Visszaadja a :passengerid paraméterként kapott ID-jú utast,
 *  - ha van, azt beleteszi a res.locals.passenger objektumba
 */
const requireOption = require('../requireOption').requireOption;

module.exports = function (objectrepository) {

  const PassengerModel = requireOption(objectrepository, 'PassengerModel');

  return function (req, res, next) {
    PassengerModel.findOne({_id: req.params.passengerid})
    .then((passenger) => {
      if(!passenger){
        const error = new Error("Passenger not found");
        error.status = 404;
        return next(error);
      }

      res.locals.passenger = passenger;
      return next();
    })
    .catch((err) => {
      console.error("Error while fetching passenger: ", err);
      return next(err);
    })
  };
};