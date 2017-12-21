const app = require('express')()
const logger = require('morgan')

const entertainme = require('./routes/entertainme')

app.use(logger('dev'));
app.use('/', entertainme)

app.listen(3000, () => {
  console.log('listening on port 3000')
})