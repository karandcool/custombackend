
const mongoose = require("mongoose")
const { Schema } = mongoose;

const cartSchema = new Schema({
  items: [{
    item: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'items',
    autopopulate: true
    },
    qty: {
      type:Number
    },
    // customImage: {
    //   type:String
    // },
    finalcustomiseImage:{
      type:String
    },
    selectedSize: {
      type:String
    },
    selectedColor: {
      type:String
    },
    selectedText: {
      name: String,
      position: {
        x: Number,
        y: Number
      },
      size: {
        width:String,
        height: String
      }
    },
    fontSize: String,
    fontFamily: String,
    customImage: {
      image: String,
      position: {
        x: Number,
        y: Number
      },
      size: {
        width:String,
        height: String
      }
    },
    customisePrice: {
      type:Number
    }

  }],
  
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
    },
});
cartSchema.plugin(require('mongoose-autopopulate'));

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart