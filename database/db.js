const mongoose = require('mongoose');

// const db = mongoose.connect(process.env.DATABASE_URL);

async function connectDb() {
  try {
    const res =await mongoose.connect('mongodb://localhost:27017/job-post');
    console.log('Connected to db successfully');
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { connectDb };