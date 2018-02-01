const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/entertainme', {
  useMongoClient: true,
});

const tvseriesSchema = new Schema({
  poster_path:  String,
  overview: String,
  name:   String,
  popularity:   String,
  tag: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
});

const TvSeries = mongoose.model('TvSeries', tvseriesSchema);

module.exports = TvSeries;