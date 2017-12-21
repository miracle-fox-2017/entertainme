const app = require('express')()
const Tv = require('./routers/tv')

app.use('/tv', Tv)

app.listen(3002)
