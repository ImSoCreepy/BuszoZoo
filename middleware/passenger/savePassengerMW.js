/**
 * Ha nem érkezik adat POST-tal, akkor next-et hív, egyébként
 * amennyiben van betöltött utas a res.locals.passenger-ban frissíti annak az adatait,
 * egyébként új utast hoz létre az adatbázisban.
 *  - ha minden rendben redirectel a /passenger/:busid-re
 */
const requireOption = require('../requireOption').requireOption;

module.exports = function (objectrepository) {

  const PassengerModel = requireOption(objectrepository, 'PassengerModel');

  return function (req, res, next) {
    if ((typeof req.body.p_name === 'undefined') ||
      (typeof req.body.dateOfBirth === 'undefined') ||
      (typeof req.body.city === 'undefined') ||
      (typeof req.body.hairColor === 'undefined') ||
      (typeof res.locals.bus === 'undefined')) {
      return next();
    }

    if (typeof res.locals.passenger === 'undefined') {
      res.locals.passenger = new PassengerModel();
    }

    res.locals.passenger.name = req.body.p_name;
    res.locals.passenger.dateOfBirth = req.body.dateOfBirth;
    res.locals.passenger.city = req.body.city;
    res.locals.passenger.hairColor = req.body.hairColor;
    res.locals.passenger._rajtavan = res.locals.bus._id;

    res.locals.passenger.save()
      .then(() => {
        return res.redirect("/passenger/" + res.locals.bus._id);
      })
      .catch((err) => {
        return next(err);
      });
  };
};