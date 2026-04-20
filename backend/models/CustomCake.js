const mongoose = require('mongoose');

const customCakeSchema = new mongoose.Schema({
  requestNumber: { type: String, unique: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // Contact info (for non-logged-in users)
  contactName: { type: String, required: [true, 'Name is required'] },
  contactPhone: { type: String, required: [true, 'Phone is required'] },
  contactEmail: String,

  // Cake details
  occasion: {
    type: String,
    enum: ['birthday', 'wedding', 'anniversary', 'baby_shower', 'graduation', 'festival', 'corporate', 'other'],
    required: true
  },
  cakeSize: {
    type: String,
    enum: ['0.5kg', '1kg', '1.5kg', '2kg', '3kg', '4kg', '5kg+'],
    required: true
  },
  flavour: {
    type: String,
    required: [true, 'Flavour is required']
  },
  shape: String,
  tiers: { type: Number, default: 1, min: 1, max: 5 },
  theme: String,
  cakeMessage: String,
  specialRequirements: String,

  // Reference image (optional)
  referenceImage: String,

  // Delivery
  deliveryDate: { type: Date, required: [true, 'Delivery date is required'] },
  deliveryType: { type: String, enum: ['pickup', 'delivery'], default: 'pickup' },
  deliveryAddress: String,

  // Status & Admin
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'quoted', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  quotedPrice: Number,
  adminNotes: String,
  estimatedPrice: String
}, { timestamps: true });

customCakeSchema.pre('save', async function (next) {
  if (!this.requestNumber) {
    const count = await mongoose.model('CustomCake').countDocuments();
    this.requestNumber = `CCR${Date.now().toString().slice(-5)}${(count + 1).toString().padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('CustomCake', customCakeSchema);
