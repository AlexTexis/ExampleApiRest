const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const {config} = require('../../config/index')
const boom = require('boom')

require('../../services/auth/basic')

router.post('/',async (req,res,next) => {
  passport.authenticate('basic', (err,user) => {
    try 
    {
      if(err || !user) 
      {
        next(boom.unauthorized())
      }

      req.login(user,{session:false},async (err) => {

        if(err) 
        {
         next(err)
        }

        const payload = { sub : user.username }
        const token = jwt.sign(payload,config.secretKey,{expiresIn : '15m'})

        return res.json({
          token
        })

      })
    }
    catch(e)
    {
      next(e)
    }
  })(req,res,next)
})

module.exports = router