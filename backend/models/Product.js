const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  discountPrice: {
    type: Number,
    default: null
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['cakes', 'pastries', 'cookies', 'biscuits', 'specials'],
    lowercase: true
  },
  images: [{
    url: { type: String, required: true },
    alt: { type: String, default: '' }
  }],
  weight: {
    type: String,
    default: '500g'
  },
  ingredients: [String],
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isEggless: {
    type: Boolean,
    default: true
  },
  tags: [String],
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  stock: {
    type: Number,
    default: 999
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Index for search and filtering
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ isFeatured: -1, createdAt: -1 });

// Virtual for effective price
productSchema.virtual('effectivePrice').get(function () {
  return this.discountPrice && this.discountPrice < this.price
    ? this.discountPrice
    : this.price;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
