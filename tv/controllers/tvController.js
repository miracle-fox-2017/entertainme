//require model
const Tv = require('../models/tvModel')

const getTv = (req, res) => {
  Tv.find()
  .then(tvs => {
    res.send({
      status: "OK",
    	info: "tv found successfully",
    	data: tvs
    })
  })
}

const addTv = (req, res) => {
  let tv = new Tv(req.body)
  tv.save()
  .then( () => {
    res.status(200).send({
      status: 'OK',
      dataAdded: req.body
    })
  })
  .catch(err => {
    res.status(500).send({
      status: 'error',
      error: err
    })
  })
}

module.exports = {
  getTv,
  addTv
};
