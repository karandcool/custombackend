
const mongoose = require("mongoose")
const { Schema } = mongoose;

const itemSchema = new Schema({
  categoryId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'category'
  },
  name: {
    type: String,
    unique:true
  },
  picture: [{
    type: String
  }],
  active: {
    type: Boolean,
    default: true
  },
  
customisePrice : {
  type: String
},
  customiseAvailable: {
    type: Boolean
  },

  allSizes: [
    {
      type: String
    }
    ],
  availableSize : [
    {
      type: String
    }
    
  ],
  sex:{
    type: String
  },
  material: {
    type: String
  },
  allColors: [
    {
      type: String
    }
    ],
  availableColor : [
    {
      type: String
    }
    
  ],
  price: {
    type: Number
  },
  description: {
    type: String
  },
  discountPercentage: {
    type: String
  },
  flatDiscount: {
    type: String
  },
});

const Item = mongoose.model('items', itemSchema);

module.exports = Item