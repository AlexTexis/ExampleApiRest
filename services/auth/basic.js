const passport = require('passport')
const {BasicStrategy} = require('passport-http')
const bcrypt = require('bcrypt')
const boom = require('boom')

const mongoLib = require('../../lib/mongo')

passport.use( new BasicStrategy(async (username,password,cb) => {

  const mongo = new mongoLib()

  try 
  {
    const [user] = await mongo.getAll('users',{username})
    console.log('usuario',user)
    if(!user)
    {
      return cb(boom.unauthorized(),false)
    }
    
    if(!(await bcrypt.compare(password,user.password)))
    {
      return cb(boom.unauthorized(),false)
      
    }

    return cb(null,user)
  }
  catch(e)
  {
    cb(e)
  }
}) )