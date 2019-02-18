const boom = require('boom')
const { config } = require('../../config/index')
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi')
const debug = require('debug')('app:log-err')

const withStack = (err,stack) => 
{
  if(config.dev)
  {
    return {
      ...err,
      stack
    }
  }
}

const logErrors = (err,req,res,next) => 
{
  debug(err.stack)
  next(err)
}

const wrapError = (err,req,res,next) => 
{
  if(!err.isBoom)
  {
    next(boom.badImplementation())
  }

  next(err)
}

const clientError = (err,req,res,next) => 
{
  const {
    output : { statusCode,payload }
  } = err

  if(isRequestAjaxOrApi(req) || res.headersSent)
  {
   res.status(statusCode).json(withStack(payload,err.stack))
  }
  else
  {
    next(err)
  }
 
}

const errorHanlder = (err,req,res,next) => 
{
  const {
    output : { statusCode,payload }
  } = err

  res.status(statusCode).json(withStack(payload,err.stack))
}


module.exports = {
  logErrors,
  wrapError,
  clientError,
  errorHanlder
}