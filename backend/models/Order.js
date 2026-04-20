const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String }
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  deliveryType: {
    type: String,
    enum: ['pickup', 'delivery'],
    required: true
  },
  deliveryAddress: {
    name: String,
    phone: String,
    street: String,
    city: String,
    pincode: String,
    landmark: String
  },
  pricing: {
    subtotal: { type: Number, required: true },
    deliveryCharge: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true }
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'online'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'placed'
  },
  statusHistory: [{
    status: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
  }],
  specialInstructions: String,
  estimatedDelivery: Date,
  cancelReason: String
}, { timestamps: true });

// Auto-generate order number
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `GCH${Date.now().toString().slice(-6)}${(count + 1).toString().padStart(3, '0')}`;
  }
  // Add initial status to history
  if (this.isNew) {
    this.statusHistory.push({ status: 'placed', message: 'Order placed successfully' });
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
