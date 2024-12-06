/**
 * Amennyiben van betöltött utas a res.locals.passenger-ben, azt törli az adatbázisból.
 * Redirectel a /passenger/:busid-ra
 */
const requireOption = require('../requireOption').requireOption;

module.exports = function (objectrepository) {
  
  return function (req, res, next) {
    if(typeof res.locals.passenger === 'undefined'){
      return next();
    }

    res.locals.passenger.deleteOne()
    .then(() => {
      return res.redirect("/passenger/"+res.locals.bus._id);
    })
    .catch((err) => {
        return next(err);
    });
  };

};