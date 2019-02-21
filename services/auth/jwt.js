const passport =  require('passport')
const mongoLib = require('../../lib/mongo')
const boom = require('boom')
const {Strategy,ExtractJwt} = require('passport-jwt')
const {config} = require('../../config/index')

passport.use( 
  new Strategy(
  {
    secretOrKey : config.secretKey,
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  async (tokenPayload,cb) => {
  const mongo = new mongoLib()

  try 
  {
    const [user] = await mongo.getAll('users',{username : tokenPayload.sub})

    if(!user) 
    {
      return cb(boom.unauthorized(),false)
    }

    return cb(null,user)
  }
  catch(e)
  {
    cb(e)
  }
} ) )