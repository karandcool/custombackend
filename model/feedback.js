
const mongoose = require("mongoose")
const { Schema } = mongoose;

const ownerSchema = new Schema({
  userId : {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  },
  item : {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'items'
  },
  star: {
    type: Number
  },
  feedback: {
    type: String
  },
});

const Owner = mongoose.model('owner', ownerSchema);

module.exports = Owner