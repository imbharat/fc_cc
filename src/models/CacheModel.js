const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cache = new Schema({
    key: Number,
    value: String,
    validTill: {
      type: Date
    }
});

//here 3rd argument is collection name
module.exports = mongoose.model('Cache', Cache, 'Cache');