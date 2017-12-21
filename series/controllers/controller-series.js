const Series = require('../models/model-movies');
const Version = require('../models/model-version');

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
  },
  version : (req,res) => {
    Version.findOne().then(response => {
      res.json(response);
    }).catch(err => {
      res.send(err)
    });
  }
};
