const mongoose = require('mongoose');

const connectDB = (url) => {
  if (url) {
    try {
      mongoose.connect(url);
      console.log('MongoDB Connected');
    } catch (error) {
      console.log('Invalid MONGO_URI or connection failed, using in-memory data');
    }
  } else {
    console.log('No MONGO_URI provided, using in-memory data store');
  }
};

module.exports = connectDB;
