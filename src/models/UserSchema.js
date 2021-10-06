const mongoose = require('mongoose');
const Int32 = require('mongoose-int32').loadType(mongoose);
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, require: true, unique: true },
    name: { type: String, default: '' },
    avatar: { type: Array, default: [] },
    hobbies: { type: Array, default: [] },
    birthday: Date,
    gender: String,
    description: String,
    facilities: String,
    specialized: String,
    course: String,
    status: { type: Int32, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model('users', userSchema);
