const mongoose = require("mongoose");

const dbURI = process.env.MONGO_CONN;

mongoose
  .connect(`${dbURI}/auth_app`)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Compass", err);
  });

module.exports = mongoose.connection;
