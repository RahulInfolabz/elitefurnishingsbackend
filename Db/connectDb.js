const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

async function connectDb() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    console.log("database connected");
    return client.db();
  } catch (e) {
    console.log("Database Connection Faild");
  }
}

module.exports = connectDb;
