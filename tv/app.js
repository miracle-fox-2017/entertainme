const app = require('express')()

app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    location: 'TV'
  })
})

app.listen(3002)
