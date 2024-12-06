/**
 * Ha nem érkezik adat POST-tal, akkor next-et hív, egyébként
 * amennyiben van betöltött busz a res.locals.bus-ban frissíti annak az adatait,
 * egyébként új buszt hoz létre az adatbázisban.
 *  - ha minden rendben redirectel a /-re
 */
const requireOption = require('../requireOption').requireOption;

module.exports = function (objectrepository) {
  
  const BusModel = requireOption(objectrepository, 'BusModel');

  return function (req, res, next) {
    if((typeof req.body.regNum ==='undefined') || 
      (typeof req.body.make ==='undefined') ||
      (typeof req.body.color ==='undefined') || 
      (typeof req.body.articulated ==='undefined')){
        return next();
    }

    if(typeof res.locals.bus === 'undefined'){
      res.locals.bus = new BusModel();
    }

    res.locals.bus.regNum = req.body.regNum;
    res.locals.bus.make = req.body.make;
    res.locals.bus.color = req.body.color;
    res.locals.bus.articulated = req.body.articulated;

    res.locals.bus.save()
    .then(() => {
      return res.redirect("/");
    })
    .catch((err) => {
      return next(err);
    });
  };

};