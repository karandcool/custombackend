
const mongoose = require("mongoose")
const { Schema } = mongoose;

const orderSchema = new Schema({
  items : [{
    name: {
      type: String,
    },
    price: {
      type:Number
    },
    picture: [{
      type:String
    }],
    fontSize: String,
    fontFamily: String,
    mobileNumber:Number,
    size: {
      type: String
    },
    color: {
      type: String
    },
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
    finalcustomiseImage: {
      type:String
    },
    customisePrice : {
      type: Number
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
    categoryId: {
      type: mongoose.SchemaTypes.ObjectId,
    ref: 'category'
    }
  }],
  razorpay_payment_id: String,
  razorpay_order_id: String,
  razorpay_signature: String,
  totalItems: {
    type: Number
},
  userId : {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
  },
  price:{
    type: Number
  },
  shipping: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  paymentMode: {
    type: String
  },
  orderStatus : {
    type: String
  },
  paymentStatus: {
    type: String,
    // enum: [pending, completed]
  },
  feedbackId : {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'feedback',
    autopopulate: true
  },
  DeliveryAddress : {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'address',
    autopopulate: true
  },
  mobileNumber: Number
});

orderSchema.plugin(require('mongoose-autopopulate'));

const Order = mongoose.model('order', orderSchema);

module.exports = Order