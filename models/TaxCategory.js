const { Schema, model } = require('mongoose');

const taxCategorySchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    taxRate: {
      type: Number
    }
  }
);

const TaxCategory = model('TaxCategory', taxCategorySchema);

module.exports = TaxCategory;
