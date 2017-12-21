const app = require('express')()
const Entertain = require('./routers/entertain')

app.use('/', Entertain)

app.listen(3000)
