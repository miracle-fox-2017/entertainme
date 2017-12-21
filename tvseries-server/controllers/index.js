const TvSeries = require('../models')
const axios = require('axios')

class TvSeriesCtrl {

  static async getAllTvSeries (req, res) {
    try {
      const tvSeriesData = await TvSeries.find()
      res.status(200).send(tvSeriesData)
    } catch (err) {
      res.status(500).send(err)
    }
  }

  static seedTvSeries (req, res) {
    const tvSeriesSeed = [
      {title: 'Firefly', overview: 'Bagus Pakek Banget', popularity: '9.561259', status: 'BT'},
      {title: 'Chuck', overview: 'Lucu guys', popularity: '7.1259', status: 'UT'}
    ]

    tvSeriesSeed.forEach(tv => {
      const newTV = new TvSeries(tv)
      newTV.save()
    })

    res.status(200).send('Udah keisi tong')
  }

  static async addNewTvSeries (req, res) {
    try {
      const newTV = new TvSeries(req.body)
      newTV.save()
      .then(newTvData => {
        axios.post('http://localhost:3000/api/updateEntertainme', {
          newData: newTvData,
          type: 'tv'
        })
        .then(response => res.status(200).send(response.data))
        .catch(err => res.status(500).send(err))
      })
    } catch (e) {
      res.status(200).send(e)
    }
  }

}

module.exports = TvSeriesCtrl
