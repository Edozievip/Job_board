const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/job-post');

module.exports = db;