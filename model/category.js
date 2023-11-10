
const mongoose = require("mongoose")
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    unique:true

  },
  description: {
    type: String
  },
  picture: {
    type:String
  },
  active: {
    type: Boolean,
    default: true

  }
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category