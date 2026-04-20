const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

// @desc    Get all products with filter/search/pagination
// @route   GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, search, featured, sort, page = 1, limit = 12 } = req.query;

    const query = { isAvailable: true };

    if (category && category !== 'all') query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$text = { $search: search };
    }

    let sortOption = { sortOrder: 1, createdAt: 1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    else if (sort === 'price_desc') sortOption = { price: -1 };
    else if (sort === 'popular') sortOption = { 'rating.count': -1 };
    else if (sort === 'featured') sortOption = { isFeatured: -1, sortOrder: 1, createdAt: 1 };

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        limit: Number(limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Create product (Admin)
// @route   POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, discountPrice, category, weight, ingredients, tags, isFeatured, stock } = req.body;

    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        images.push({
          url: `/uploads/products/${file.filename}`,
          alt: name
        });
      });
    } else if (req.body.imageUrl) {
      images.push({ url: req.body.imageUrl, alt: name });
    }

    const product = await Product.create({
      name, description, price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : null,
      category, weight, images,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      tags: tags ? JSON.parse(tags) : [],
      isFeatured: isFeatured === 'true',
      stock: Number(stock) || 999
    });

    res.status(201).json({ success: true, message: 'Product created', data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const updates = { ...req.body };
    if (updates.ingredients && typeof updates.ingredients === 'string') {
      updates.ingredients = JSON.parse(updates.ingredients);
    }
    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = JSON.parse(updates.tags);
    }
    if (updates.isFeatured !== undefined) updates.isFeatured = updates.isFeatured === 'true';
    if (updates.price) updates.price = Number(updates.price);
    if (updates.discountPrice) updates.discountPrice = Number(updates.discountPrice);

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        url: `/uploads/products/${file.filename}`,
        alt: product.name
      }));
      updates.images = [...(product.images || []), ...newImages];
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    res.json({ success: true, message: 'Product updated', data: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Delete associated images
    product.images.forEach(img => {
      if (img.url.startsWith('/uploads')) {
        const filePath = path.join(__dirname, '..', img.url);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    });

    await product.deleteOne();
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get categories with count
// @route   GET /api/products/categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.aggregate([
      { $match: { isAvailable: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getCategories };
