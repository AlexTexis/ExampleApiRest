const Joi = require('joi')

const namePoductSchema = Joi.string().min(1).max(30).error(new Error('nombre requerido'))

const createProductSchema = {
  name : namePoductSchema
}

module.exports = {
  createProductSchema
}