const express = require('express');
const router = express.Router();
const { getDashboardStats, getUsers, toggleUser } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect, adminOnly);
router.get('/stats', getDashboardStats);
router.get('/users', getUsers);
router.put('/users/:id/toggle', toggleUser);

module.exports = router;
