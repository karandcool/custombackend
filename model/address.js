
const mongoose = require("mongoose")
const { Schema } = mongoose;

const addressSchema = new Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  },
  addressLine1: {
    type: String
  },
  addressLine2: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  pincode : {
    type: String
  },
  saveAs: {
    type: String
  },
});

const Address = mongoose.model('address', addressSchema);

module.exports = Address