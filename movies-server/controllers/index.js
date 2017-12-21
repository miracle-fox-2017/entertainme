const Movies = require('../models')
const axios  = require('axios')

class MoviesCtrl {
  static async getAllMovies(req, res) {
    try {
      const moviesData = await Movies.find()
      res.status(200).send(moviesData)
    } catch(err){
      res.status(500).send(err)
    }
  }

  static seedMovies (req, res) {
    //create some movies
    const movies =[
      {title: 'ratapan didepan McMin', overview: 'Sedih sumpah', popularity: '4', status: 'Udah Tayang'},
      {title: 'ratapan didepan McMin', overview: 'Sedih sumpah', popularity: '4', status: 'Udah Tayang'},
      {title: 'ratapan didepan McMin', overview: 'Sedih sumpah', popularity: '4', status: 'Udah Tayang'},
      {title: 'ratapan didepan McMin', overview: 'Sedih sumpah', popularity: '4', status: 'Udah Tayang'}
    ]

    movies.forEach(movie => {
      var newMovie = new Movies(movie)
      newMovie.save()
    })

    res.send('Database seeded!')
  }

  static addNewMovies (req, res) {
    let newMovie = new Movies(req.body)
    newMovie.save()
    .then(newData => {
      axios.post('http://localhost:3000/api/updateEntertainme', {
          newData: newData,
          type: 'movies'
        })
        .then(response => res.status(200).send(response.data))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.send(err))
  }
}

module.exports = MoviesCtrl
