const app = require('express')()

app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    location: 'ENTERTAIN ME'
  })
})

app.listen(3000)
