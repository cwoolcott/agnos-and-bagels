const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true
    },
    menuItems: [
      {
        type: Schema.Types.ObjectId,
        ref: 'MenuItems'
      }
    ],
    orderReadyTime: {
      type: Date,
      default: Math.floor(Date.now() + (15 * 60000)) //add 15 minutes
    },
    subTotal: {
      type: Number
    },
    discount: {
      type: Number
    },
    taxes: {
      type: Number
    },
    total: {
      type: Number
    },
    notified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Order = model('Order', orderSchema);

module.exports = Order;
