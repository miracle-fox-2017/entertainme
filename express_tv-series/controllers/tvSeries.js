const tvSeries = require('../model/tvSerie')

const create = async (req, res) => {
  try{
    let data = await tvSeries.create(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.status(500).json(e)
  }
}

const list = async (req, res) => {
  try{
    let data = await tvSeries.find()
    res.status(200).json({info: 'tv found successfully', data: data})
  } catch(e) {
    res.status(500).json(e)
  }
}


module.exports = {
  create,
  list
}