const app = require('express')()

app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    location: 'MOVIES'
  })
})

app.listen(3001)
