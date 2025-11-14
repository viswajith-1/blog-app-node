// api/db.js
const mongoose = require("mongoose");

const opts = {
  // modern options
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // bounds for serverless environments
  serverSelectionTimeoutMS: 5000, // fail fast if server not reachable
  connectTimeoutMS: 10000,
};

let cached = global._mongooseCache || { conn: null, promise: null };
if (!global._mongooseCache) global._mongooseCache = cached;

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.DB_URL, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((err) => {
        // reset promise so next invocation can retry
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  console.log("MongoDB Connected");
  return cached.conn;
}

module.exports = { connectDB };
