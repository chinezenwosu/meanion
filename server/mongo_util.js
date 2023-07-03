"use strict";

let mongoDb = require('mongodb');
let mongoClient = mongoDb.MongoClient;
let _db;

module.exports = {
  connect() {
    mongoClient.connect(process.env.DATABASE_URL || process.env.MONGODB_URI, (err, db) => {
      if (err) {
        console.log("Error connecting to MongoDB. Check your mongod connection");
        process.exit(1);
      }
      console.log('Connected to mongodb')
      _db = db
    });
  },
  dances() {
    return _db.collection('dances');
  }
};