const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const CustomCake = require('../models/CustomCake');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
const getDashboardStats = async (req, res, next) => {
  try {
    const [totalOrders, totalRevenue, totalProducts, totalUsers, pendingOrders, customRequests] = await Promise.all([
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $group: { _id: null, total: { $sum: '$pricing.total' } } }
      ]),
      Product.countDocuments({ isAvailable: true }),
      User.countDocuments({ role: 'user' }),
      Order.countDocuments({ status: { $in: ['placed', 'confirmed', 'preparing'] } }),
      CustomCake.countDocuments({ status: 'pending' })
    ]);

    const recentOrders = await Order.find()
      .populate('user', 'name phone')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalProducts,
        totalUsers,
        pendingOrders,
        pendingCustomRequests: customRequests,
        recentOrders
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'user' }).sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle user active status
// @route   PUT /api/admin/users/:id/toggle
const toggleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.isActive = !user.isActive;
    await user.save();
    res.json({ success: true, message: `User ${user.isActive ? 'activated' : 'deactivated'}`, data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardStats, getUsers, toggleUser };
