const mongoose = require('mongoose');
const Schema = mongoose.Schema

const versionSchema = new Schema({
  version : {
    type : Number,
    default : 0
  }
});

const Version = mongoose.model('Version',versionSchema);

module.exports = Version;
