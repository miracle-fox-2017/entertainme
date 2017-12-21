const app = require('express')()
const Axios = require('axios')

app.get('/entertainme', async (req, res) => {
  try {
    const movies = await Axios.get('http://localhost:3001/movie')
    const series = await Axios.get('http://localhost:3002/tv')
    res.json({
      movies: movies.data,
      series: series.data
    })
  } catch (err) {
    console.log(err)
  }
})

app.listen(3000, (err) =>{
  if(!err) {
    console.log('Main server running on PORT 3000')
  }
})