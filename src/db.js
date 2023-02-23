require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/InstaClone",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected to MongoDB");
      }
    }
  );
  
};

module.exports = connectDB;
