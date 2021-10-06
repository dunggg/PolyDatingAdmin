const mongoose = require('mongoose');
const Int32 = require('mongoose-int32').loadType(mongoose);
const { Schema } = mongoose;

const reportSchema = new Schema({
  emailUser: { type: String, require: true },
  emailReport: { type: String, require: true },
  content: String,
  imgUrl: Array,
  status: Int32,
  title: String,
  createAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('reports', reportSchema);
