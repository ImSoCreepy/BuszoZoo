/**
 * Visszaadja a :busid paraméterként kapott ID-jú buszt,
 *  - ha van, azt beleteszi a res.locals.bus objektumba
 */
const requireOption = require('../requireOption').requireOption;

module.exports = function (objectrepository) {
  
  const BusModel = requireOption(objectrepository, 'BusModel');
  
  return function (req, res, next) {
    BusModel.findOne({_id: req.params.busid})
    .then((bus) => {
      if (!bus) {
        const error = new Error("Bus not found");
        error.status = 404;
        return next(error);
      }

      res.locals.bus = bus;
      return next();
    })
    .catch((err) => {
      console.error("Error while fetching bus: ", err);
      return next(err);
    });
  };
};