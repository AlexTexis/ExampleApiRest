const {MongoClient,ObjectId} = require('mongodb')
const {config} = require('../config/index')
const debug = require('debug')('app:mongo')

const DB_USER = encodeURIComponent(config.dbUser) 
const DB_PASSWORD = encodeURIComponent(config.dbPassword) 
const DB_PORT = config.dbPort 
const DB_HOST = config.dbHost
const DB_NAME = config.dbName

const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/?authSource=${DB_NAME}`

class MongoLib
{
  constructor()
  {
    this.client = MongoClient(MONGO_URI,{useNewUrlParser : true})
    debug(this.client)
    this.dbName = DB_NAME
  }

  connect() 
  {
    return new Promise((res,rej) => {
      this.client.connect( err => {
        if(err)
        {
          rej(err)
        }

        debug('conectados a mongo')
        res(this.client.db(this.dbName))
      })
    })
  }

  getAll(collection,query)
  {
    return this.connect()
    .then( db => db.collection(collection).find(query).toArray() )
  }

  getOne(collection,id)
  {
    return this.connect()
    .then( db => db.collection(collection).findOne({_id : ObjectId(id)}))
  }
  
  create(collection,body)
  {
    return this.connect()
    .then( db => db.collection(collection).insertOne(body))
    .then(result => result.insertedId);
  }

  delete(collection,id)
  {
    return this.connect()
    .then( db => db.collection(collection).deleteOne({_id:ObjectId(id)}))
    .then(result => result.upsertedId || id);
  }

  update(collection,id,body)
  {
    return this.connect()
    .then( db => db.collection(collection).updateOne({_id:ObjectId(id)},{$set:body},{upsert:true}))
    .then(() => id)
  }
}

module.exports = MongoLib
