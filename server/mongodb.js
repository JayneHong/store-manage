const MongoDB = require('mongodb')
const MongoClient = MongoDB.MongoClient
const ObjectID = MongoDB.ObjectId

const CONFIG = {
  dbUrl: 'mongodb://127.0.0.1:27017/',
  dbName: 'storeManage',
}
const options = { useNewUrlParser: false, useUnifiedTopogy: false }

class DB {
  static getInstance() {
    if (!DB.instance) {
      DB.instance = new DB()
    }
    return DB.instance
  }
  constructor() {
    dbClient: ''
    this.connect()
  }

  /** 连接数据库 */
  connect() {
    return new Promise(async (resolve, reject) => {
      let self = this
      if (!self.dbClient) {
        try {
          const client = await MongoClient.connect(CONFIG.dbUrl)
          self.dbClient = client.db(CONFIG.dbName)
          resolve(self.dbClient)
        } catch (error) {
          reject(error)
        }
      } else {
        resolve(self.dbClient)
      }
    })
  }

  insertDocuments(collectionName, jsonArr) {
    if (!collectionName || !jsonArr || !(jsonArr instanceof Array))
      throw '参数错误'
    return new Promise((resolve, reject) => {
      this.connect().then(async (db) => {
        try {
          const collect = db.collection(collectionName)
          const result = await collect.insertMany(jsonArr)
          resolve(result)
        } catch (error) {
          reject(err)
        }
      })
    })
  }

  findDocuments(collectionName, json) {
    if (!collectionName || !json) throw '参数错误'
    return new Promise(async (resolve, reject) => {
      this.connect().then(async (db) => {
        try {
          const result = db.collection(collectionName).find(json)
          resolve(await result.toArray())
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  removeDocument(collectionName, json) {
    if (!collectionName || !json) throw '参数错误'
    return new Promise((resolve, reject) => {
      this.connect().then(async (db) => {
        const collection = db.collection(collectionName)
        try {
          const result = await collection.deleteOne(json)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    })
  }
  updateDocument(collectionName, filter, json) {
    if (!collectionName || !filter || !json) throw '参数错误'
    return new Promise((resolve, reject) => {
      this.connect().then(async (db) => {
        const collection = db.collection(collectionName)
        try {
          const result = await collection.updateOne(filter, { $set: json })
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    })
  }
  getObjectId(id) {
    /*mongodb里面查询 _id 把字符串转换成对象*/
    return new ObjectID(id)
  }
}

module.exports = DB.getInstance()
