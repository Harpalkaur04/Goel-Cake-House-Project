const CustomCake = require('../models/CustomCake');

// @desc    Submit custom cake request
// @route   POST /api/custom-cakes
const createRequest = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.user) data.user = req.user._id;

    if (req.file) {
      data.referenceImage = `/uploads/custom-cakes/${req.file.filename}`;
    }

    const request = await CustomCake.create(data);

    // Generate WhatsApp message for notification
    const waMessage = encodeURIComponent(
      `🎂 New Custom Cake Request!\n` +
      `Request #${request.requestNumber}\n` +
      `Name: ${request.contactName}\n` +
      `Phone: ${request.contactPhone}\n` +
      `Occasion: ${request.occasion}\n` +
      `Size: ${request.cakeSize}\n` +
      `Flavour: ${request.flavour}\n` +
      `Delivery Date: ${new Date(request.deliveryDate).toLocaleDateString('en-IN')}\n` +
      `Please review and confirm.`
    );

    res.status(201).json({
      success: true,
      message: 'Custom cake request submitted successfully! We will contact you within 24 hours.',
      data: request,
      whatsappLink: `https://wa.me/${process.env.WHATSAPP_NUMBER}?text=${waMessage}`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's custom cake requests
// @route   GET /api/custom-cakes/my-requests
const getMyRequests = async (req, res, next) => {
  try {
    const requests = await CustomCake.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all custom cake requests (Admin)
// @route   GET /api/custom-cakes
const getAllRequests = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};

    const total = await CustomCake.countDocuments(query);
    const requests = await CustomCake.find(query)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      data: requests,
      pagination: { total, page: Number(page), pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update custom cake request status (Admin)
// @route   PUT /api/custom-cakes/:id
const updateRequest = async (req, res, next) => {
  try {
    const request = await CustomCake.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.json({ success: true, message: 'Request updated', data: request });
  } catch (error) {
    next(error);
  }
};

module.exports = { createRequest, getMyRequests, getAllRequests, updateRequest };
