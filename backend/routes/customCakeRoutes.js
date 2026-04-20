const express = require('express');
const router = express.Router();
const { createRequest, getMyRequests, getAllRequests, updateRequest } = require('../controllers/customCakeController');
const { protect, adminOnly, optionalAuth } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', optionalAuth, upload.single('referenceImage'), createRequest);
router.get('/my-requests', protect, getMyRequests);
router.get('/', protect, adminOnly, getAllRequests);
router.put('/:id', protect, adminOnly, updateRequest);

module.exports = router;
