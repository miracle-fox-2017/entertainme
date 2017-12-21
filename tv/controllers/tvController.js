//require model
const Tv = require('../models/tvModel')
const TvVersion = require('../models/tvVersionModel')

const getTv = async (req, res) => {
  try {
    const tvs = await Tv.find()
    res.send({
      status: "OK",
    	info: "tv found successfully",
    	data: tvs
    })
  } catch (err) {
    res.status(500).send({
      status: "cannot get tv",
      msg: err
    })
  }
}

const addTv = (req, res) => {
  let tv = new Tv(req.body)
  tv.save()
  .then( () => {
    checkVersion()
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
    checkVersion()
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
    checkVersion()
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

const checkVersion = async () => {
  try {
    const ver = await TvVersion.find()
    if (ver.length > 0) {
      let tvVersion = await TvVersion.find()
      await TvVersion.update({ _id: tvVersion[0]._id }, {
        ver: tvVersion[0].ver+1
      })

    } else {
      let tvVersion = new TvVersion({ver: 0})
      await tvVersion.save()
    }
  } catch (err) {
    console.log(err)
  }
}

const getVer = async (req, res) => {
  try {
    const version = await TvVersion.find()
    res.send({
      status: 'OK',
      version: version[0].ver
    })
  } catch (err) {
    res.status(500).send({
      status: 'cannot get version',
      msg: err
    })
  }
}

module.exports = {
  getTv,
  addTv,
  editTv,
  deleteTv,
  getVer
};
