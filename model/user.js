
const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName : {
    type: String,
    required: true
  },
  email:{
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  picture: {
    type: Buffer
  },
  phone : String,

});

const User = mongoose.model('user', userSchema);

module.exports = User