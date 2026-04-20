const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Place order
// @route   POST /api/orders
const createOrder = async (req, res, next) => {
  try {
    const { items, deliveryType, deliveryAddress, paymentMethod, specialInstructions } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    // Validate products and calculate pricing
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || !product.isAvailable) {
        return res.status(400).json({ success: false, message: `Product "${item.name}" is not available` });
      }

      const price = product.discountPrice || product.price;
      subtotal += price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        price,
        quantity: item.quantity,
        image: product.images[0]?.url || ''
      });
    }

    const deliveryCharge = deliveryType === 'delivery' && subtotal < 500 ? 50 : 0;
    const total = subtotal + deliveryCharge;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      deliveryType,
      deliveryAddress: deliveryType === 'delivery' ? deliveryAddress : null,
      pricing: { subtotal, deliveryCharge, discount: 0, total },
      paymentMethod,
      specialInstructions
    });

    await order.populate('user', 'name email phone');

    // Emit real-time notification to admin
    const io = req.app.get('io');
    io.emit('newOrder', {
      orderId: order._id,
      orderNumber: order.orderNumber,
      total: order.pricing.total,
      customerName: order.user.name
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's orders
// @route   GET /api/orders/my-orders
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email phone');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Ensure user can only access their own orders (unless admin)
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (!['placed', 'confirmed'].includes(order.status)) {
      return res.status(400).json({ success: false, message: 'Order cannot be cancelled at this stage' });
    }

    order.status = 'cancelled';
    order.cancelReason = req.body.reason || 'Cancelled by customer';
    order.statusHistory.push({ status: 'cancelled', message: order.cancelReason });
    await order.save();

    const io = req.app.get('io');
    io.to(`order_${order._id}`).emit('orderStatusUpdate', { status: 'cancelled', order });

    res.json({ success: true, message: 'Order cancelled', data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
const getAllOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      data: orders,
      pagination: { total, page: Number(page), pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, message } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    order.statusHistory.push({ status, message: message || `Order ${status}` });
    await order.save();

    // Emit to specific order room
    const io = req.app.get('io');
    io.to(`order_${order._id}`).emit('orderStatusUpdate', { status, message, order });
    io.emit('orderUpdated', { orderId: order._id, status });

    res.json({ success: true, message: 'Order status updated', data: order });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getMyOrders, getOrder, cancelOrder, getAllOrders, updateOrderStatus };
