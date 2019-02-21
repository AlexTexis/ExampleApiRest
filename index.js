const express = require('express')
const debug = require('debug')('app:server-listen')
const bodyParser = require('body-parser')
const apiProducts= require('./routes/api/products')
const apiAuth= require('./routes/api/auth')
const boom = require('boom')
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')
const { logErrors,wrapError,clientError,errorHanlder } = require('./utils/middlewares/errorValidation')
const app = express()

//midllewares
app.use(bodyParser.json())

//routes
app.get('/',(req,res,next) => res.send('home') )
app.use('/api/products',apiProducts)
app.use('/api/auth',apiAuth)

//errorHandlers
app.use((req,res,next) => {
  const {
    output : {statusCode,payload}
  } = boom.notFound()

  if(isRequestAjaxOrApi(req))
  {
    res.status(statusCode,payload)
  }

  res.status(404).json(payload)
})

app.use(logErrors)
app.use(wrapError)
app.use(clientError)
app.use(errorHanlder)

//server init
const port = process.env.PORT || 3000
const server = app.listen(port, () => debug(`server listen on : http://localhost:${server.address().port}`) )