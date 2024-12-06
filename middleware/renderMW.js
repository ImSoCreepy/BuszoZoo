/**
 * Rendereli a template-nek megfelelően a kapott adatokat
 */
module.exports = function (objectrepository, viewName) {
  
    return function (req, res, next) {
        res.render(viewName, res.locals);
    };
  
  };