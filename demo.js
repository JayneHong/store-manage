import { MongoClient } from 'mongodb'

var url = 'mongodb://localhost:27017/'

MongoClient.connect(url, (err, db) => {
  if (err) throw err
  var dbo = db.db('addam_cesium')
  dbo
    .collection('carTable')
    .find({})
    .toArray(function (err, result) {
      // 返回集合中所有数据
      if (err) throw err
      console.log(result)
      db.close()
    })
})
