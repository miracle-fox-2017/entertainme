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

const editTv = async (req, res) => {
  try {
    const findOne = await Tv.findOne({ _id: req.params.id })
    const edit = await Tv.update({ _id: req.params.id }, req.body)
    res.status(200).send({
      status: 'OK',
      last: findOne,
      update: req.body
    })
  } catch (err) {
    res.status(500).send({
      status: 'error cannot update item',
      msg: err
    })
  }
}

const deleteTv = async (req, res) => {
  try {
    const findOne = await Tv.findOne({ _id: req.params.id })
    const remove = await Tv.remove({ _id: req.params.id })
    res.status(200).send({
      status: 'OK',
      deleted: findOne
    })
  } catch (err) {
    res.status(500).send({
      status: 'error cannot delete item',
      msg: err
    })
  }
}

module.exports = {
  getTv,
  addTv,
  editTv,
  deleteTv
};
