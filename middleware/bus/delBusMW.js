/**
 * Amennyiben van betöltött busz a res.locals.bus-ban, azt törli az adatbázisból.
 * Redirectel a /-re a törlés után
 */
const requireOption = require('../requireOption').requireOption;

module.exports = function (objectrepository) {
  
  const PassengerModel = requireOption(objectrepository, 'PassengerModel');

  return function (req, res, next) {
    if(typeof res.locals.bus === 'undefined'){
      return next();
    }

    /*res.locals.bus.deleteOne()
    .then(() => {
      return res.redirect("/");
    })
    .catch((err) => {
        return next(err);
    });*/

    // Először töröljük a buszhoz kapcsolódó utasokat
    PassengerModel.deleteMany({ _rajtavan: res.locals.bus._id })
      .then(() => {
        // Miután az utasokat töröltük, töröljük a buszt is
        return res.locals.bus.deleteOne();
      })
      .then(() => {
        return res.redirect("/");
      })
      .catch((err) => {
        return next(err);
      });

      
  };

};