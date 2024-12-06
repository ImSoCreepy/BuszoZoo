/**
 * Visszaadja a :busid ID-jú busz utasait a res.locals.passengers-ben
 */
const requireOption = require('../requireOption').requireOption;

module.exports = function (objectrepository) {
  
  const PassengerModel = requireOption(objectrepository, 'PassengerModel');
  
  return function (req, res, next) {
      if(typeof res.locals.bus === 'undefined'){
        return next();
      }

      PassengerModel.find({_rajtavan: res.locals.bus._id})
      .then((passengers) => {
        res.locals.passengers = passengers;
        return next();
      })
      .catch((err) => {
        console.error("Error while fetching passengers: ", err);
        return next(err);
      });
  };
};