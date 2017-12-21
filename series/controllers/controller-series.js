const Series = require('../models/model-movies');

module.exports = {
  allSeries : (req,res) => {
    Series.find().then(response => {
      res.json({
        info : "tv found successfully",
        data : response
      })
    }).catch(err => {
      res.json({
        info : "tv cannot be found",
        data : response
      })
    });
  }
};
