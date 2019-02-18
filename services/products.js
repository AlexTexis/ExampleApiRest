const mongoLib = require('../lib/mongo')

class ServicesProducts 
{
  constructor()
  {
    this.collection = 'products'
    this.mongo = new mongoLib()
  }

  async getAll()
  {
    const products = await this.mongo.getAll(this.collection)
    return products || []
  }

  async getOne({id})
  {
    const product = await this.mongo.getOne(this.collection,id)
    return product
  }

  async create({body})
  {
    const newProduct = await this.mongo.create(this.collection,body)
    return newProduct 
  }

  async update({id,body})
  {
    const productUpdate = await this.mongo.update(this.collection,id,body)
    return productUpdate 
  }

  async delete({id})
  {
    const productDelete = await this.mongo.delete(this.collection,id)
    return productDelete 
  }
}

module.exports = ServicesProducts