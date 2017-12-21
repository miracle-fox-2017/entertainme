const app = require('express')()

const entertainme = require('./routes/entertainme')

app.use('/', entertainme)

app.listen(3000, () => {
  console.log('listening on port 3000')
})