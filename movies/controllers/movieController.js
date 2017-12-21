const getMovie = (req, res) => {
  res.json({
    status: 'OK',
    info: 'movies found successfully',
    data: [
      {
        id: 1,
        title: 'Ex Machina',
        year: 2015,
        overview: 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a breath-taking humanoid A.I.',
        poster_path: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
        popularity: '7.7',
        tag: ['Drama', 'Mystery', 'Sci-Fi'],
        status: ''
      },
      {
        id: 2,
        title: 'I, Robot',
        year: 2004,
        overview: 'In 2035, a technophobic cop investigates a crime that may have been perpetrated by a robot, which leads to a larger threat to humanity.',
        poster_path: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTQwNzI5NTQ0OF5BMl5BanBnXkFtZTYwMTI3Mjk2._V1_.jpg',
        popularity: '7.1',
        tag: ['Action', 'Crime', 'Drama'],
        status: ''
      },
      {
        id: 3,
        title: 'Chappie',
        year: 2015,
        overview: 'In the near future, crime is patrolled by a mechanized police force. When one police droid, Chappie, is stolen and given new programming, he becomes the first robot with the ability to think and feel for himself.',
        poster_path: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUyNTI4NTIwNl5BMl5BanBnXkFtZTgwMjQ4MTI0NDE@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
        popularity: '6.8',
        tag: ['Action', 'Crime', 'Drama'],
        status: ''
      }
    ]
  })
}

module.exports = {
  getMovie
};
