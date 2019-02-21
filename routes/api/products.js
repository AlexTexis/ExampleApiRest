const express = require('express')
const router = express.Router()
const serviceProducts = require('../../services/products')
const services = new serviceProducts()
const passport =  require('passport')
const { createProductSchema } = require('../../utils/schemas/schemas')
const validation = require('../../utils/middlewares/dataValidation')

require('../../services/auth/jwt')

router.get('/',async (req,res,next) => {
  try 
  {
    const alumns = await services.getAll()
    res.status(200).json({
      payload : alumns,
      message:'productos obtenidos'
    })
    
  }
  catch(e)
  {
    next(e)
  }
})

router.get('/:id',async (req,res,next) => {
  const { id } = req.params
  try 
  {
    const alumn = await services.getOne({id})
    res.status(200).json({
      payload : alumn,
      message : 'producto obtenido'
    })
  }
  catch(e)
  {
    next(e)
  }
})


router.post('/',passport.authenticate('jwt',{session:false}),validation(createProductSchema),async (req,res,next) => {
  const { body } = req
  try  
  {
    const alumnCreate = await services.create({body})
    res.status(200).json({
      payload : alumnCreate,
      message : 'producto creado'
    })
  }
  catch(e)
  {
    next(e)
  }
})

router.put('/:id',passport.authenticate('jwt',{session:false}),async (req,res,next) => {
  const { id } = req.params
  const { body } = req
  try 
  {
    const alumnUpdate = await services.update({id,body})
    res.status(200).json({
      payload : alumnUpdate,
      message : 'producto actualizado'
    })
  }
  catch(e)
  {
    next(e)
  }
})

router.delete('/:id',passport.authenticate('jwt',{session:false}),async (req,res,next) => {
  const { id } = req.params
  try 
  {
    const alumnDelete = await services.delete({id})
    res.status(200).json({
      payload : alumnDelete,
      message : 'producto eliminado'
    })
  }
  catch(e)
  {
    next(e)
  }
})

module.exports = router