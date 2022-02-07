const { Schema, model } = require('mongoose');

const menuItemsSchema = new Schema(
  {
    itemNumber: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    promotion: {
      type: String,
      trim: true
    },
    taxType: {
      type: String,
      required: true,
      trim: true
    },
    taxCategory: {
      type: Schema.Types.ObjectId,
      ref: 'TaxCategory'
    }
  }
);

const MenuItems = model('MenuItems', menuItemsSchema);

module.exports = MenuItems;
