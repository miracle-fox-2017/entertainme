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
  // res.json({
  //   status: 'OK',
  //   info: 'tv found successfully',
  //   data: [
  //     {
  //       id: 1,
  //       title: 'The Walking Dead',
  //       year: 2010,
  //       overview: 'Sheriff Deputy Rick Grimes wakes up from a coma to learn the world is in ruins, and must lead a group of survivors to stay alive.',
  //       poster_path: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMzNkMWNmZGUtNWFlZi00MTYwLWIwMjQtOGViN2QzNmI2MWYwXkEyXkFqcGdeQXVyODA1MDc5NjM@._V1_.jpg',
  //       popularity: '8.5',
  //       tag: ['Drama', 'Horror', 'Thriller'],
  //       status: ''
  //     },
  //     {
  //       id: 2,
  //       title: 'Bill Nye, the Science Guy',
  //       year: 1993,
  //       overview: 'Scientist/comedian Bill Nye explores various aspects of science for young viewers.',
  //       poster_path: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI0NjcwNTkxOV5BMl5BanBnXkFtZTcwNjU5NjMyMQ@@._V1_.jpg',
  //       popularity: '8.4',
  //       tag: ['Documentary', 'Comedy', 'Family'],
  //       status: ''
  //     }
  //   ]
  // })

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
