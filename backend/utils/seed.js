require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const { STATIC_PRODUCTS } = require('../../frontend/js/staticProducts');

const fallbackProducts = [
  { name: 'Classic Vanilla Birthday Cake', description: 'Our signature vanilla sponge cake layered with fresh cream and decorated beautifully. Perfect for birthdays and celebrations. 100% eggless and made fresh daily.', price: 550, discountPrice: 499, category: 'cakes', weight: '500g', isFeatured: true, isEggless: true, tags: ['birthday', 'vanilla', 'cream', 'bestseller'], images: [{ url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600', alt: 'Vanilla Birthday Cake' }], ingredients: ['Refined Flour', 'Butter', 'Sugar', 'Vanilla Essence', 'Fresh Cream', 'Milk'], rating: { average: 4.8, count: 124 } },
  { name: 'Chocolate Truffle Cake', description: 'Rich and decadent chocolate truffle cake made with premium cocoa. Multiple layers of moist chocolate sponge with velvety ganache.', price: 649, discountPrice: 599, category: 'cakes', weight: '500g', isFeatured: true, isEggless: true, tags: ['chocolate', 'truffle', 'premium', 'bestseller'], images: [{ url: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600', alt: 'Chocolate Truffle Cake' }], ingredients: ['Dark Chocolate', 'Refined Flour', 'Butter', 'Cocoa Powder', 'Fresh Cream', 'Sugar'], rating: { average: 4.9, count: 218 } },
  { name: 'Strawberry Cream Cake', description: 'Light and fluffy vanilla sponge loaded with fresh strawberries and whipped cream.', price: 599, category: 'cakes', weight: '500g', isFeatured: true, isEggless: true, tags: ['strawberry', 'fruit', 'cream'], images: [{ url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600', alt: 'Strawberry Cream Cake' }], ingredients: ['Vanilla Sponge', 'Fresh Strawberries', 'Whipped Cream'], rating: { average: 4.7, count: 89 } },
  { name: 'Black Forest Cake', description: 'Classic Black Forest cake with chocolate sponge, cherries, and whipped cream.', price: 699, discountPrice: 649, category: 'cakes', weight: '500g', isFeatured: false, isEggless: true, tags: ['blackforest', 'cherry', 'chocolate'], images: [{ url: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600', alt: 'Black Forest Cake' }], ingredients: ['Chocolate Sponge', 'Cherries', 'Whipped Cream'], rating: { average: 4.6, count: 156 } },
  { name: 'Red Velvet Cake', description: 'Stunning red velvet cake with smooth cream cheese frosting.', price: 729, discountPrice: 699, category: 'cakes', weight: '500g', isFeatured: true, isEggless: true, tags: ['redvelvet', 'premium', 'special'], images: [{ url: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600', alt: 'Red Velvet Cake' }], ingredients: ['Red Sponge', 'Cream Cheese', 'Butter', 'Vanilla'], rating: { average: 4.8, count: 201 } },
  { name: 'Butterscotch Cake', description: 'Golden butterscotch cake with praline and butterscotch cream.', price: 579, category: 'cakes', weight: '500g', isFeatured: false, isEggless: true, tags: ['butterscotch', 'praline'], images: [{ url: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=600', alt: 'Butterscotch Cake' }], ingredients: ['Vanilla Sponge', 'Butterscotch Sauce', 'Praline'], rating: { average: 4.5, count: 73 } },
  { name: 'Chocolate Éclair Pastry', description: 'Classic éclair filled with vanilla custard and topped with rich chocolate glaze.', price: 65, category: 'pastries', weight: '80g', isFeatured: true, isEggless: true, tags: ['eclair', 'chocolate', 'custard'], images: [{ url: 'https://images.unsplash.com/photo-1612197527762-8cfb694b5a46?w=600', alt: 'Eclair' }], ingredients: ['Choux Pastry', 'Vanilla Custard', 'Dark Chocolate'], rating: { average: 4.7, count: 342 } },
  { name: 'Mango Pastry', description: 'Seasonal mango pastry with fresh mango pulp and whipped cream.', price: 75, category: 'pastries', weight: '100g', isFeatured: true, isEggless: true, tags: ['mango', 'seasonal', 'tropical'], images: [{ url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600', alt: 'Mango Pastry' }], ingredients: ['Vanilla Sponge', 'Fresh Mango Pulp', 'Whipped Cream'], rating: { average: 4.8, count: 93 } },
  { name: 'Pineapple Pastry', description: 'Classic pineapple pastry with fresh pineapple pieces and cream.', price: 70, category: 'pastries', weight: '100g', isFeatured: false, isEggless: true, tags: ['pineapple', 'classic'], images: [{ url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600', alt: 'Pineapple Pastry' }], ingredients: ['Vanilla Sponge', 'Pineapple Pieces', 'Cream'], rating: { average: 4.5, count: 203 } },
  { name: 'Chocolate Chip Cookies', description: 'Freshly baked chocolate chip cookies with premium chocolate chunks.', price: 180, category: 'cookies', weight: '250g', isFeatured: true, isEggless: true, tags: ['chocolate', 'chips', 'homemade'], images: [{ url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600', alt: 'Chocolate Chip Cookies' }], ingredients: ['Refined Flour', 'Butter', 'Brown Sugar', 'Chocolate Chips'], rating: { average: 4.9, count: 445 } },
  { name: 'Butter Cookies Assorted', description: 'Premium butter cookies in various shapes. Perfect for gifting.', price: 220, discountPrice: 199, category: 'cookies', weight: '300g', isFeatured: true, isEggless: true, tags: ['butter', 'assorted', 'gift'], images: [{ url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600', alt: 'Butter Cookies' }], ingredients: ['Refined Flour', 'Premium Butter', 'Powdered Sugar'], rating: { average: 4.6, count: 289 } },
  { name: 'Coconut Cookies', description: 'Crispy coconut cookies with freshly desiccated coconut.', price: 160, category: 'cookies', weight: '250g', isFeatured: false, isEggless: true, tags: ['coconut', 'crispy'], images: [{ url: 'https://images.unsplash.com/photo-1509515837298-2c67a3933321?w=600', alt: 'Coconut Cookies' }], ingredients: ['Refined Flour', 'Desiccated Coconut', 'Butter', 'Sugar'], rating: { average: 4.3, count: 118 } },
  { name: 'Milk Rusk Biscuits', description: 'Classic crispy milk rusk perfect for dunking in chai or coffee.', price: 120, category: 'biscuits', weight: '400g', isFeatured: false, isEggless: true, tags: ['rusk', 'milk', 'traditional', 'chai'], images: [{ url: 'https://images.unsplash.com/photo-1591985666643-9a09f9e7f6e3?w=600', alt: 'Milk Rusk' }], ingredients: ['Refined Flour', 'Milk', 'Sugar', 'Butter'], rating: { average: 4.5, count: 523 } },
  { name: 'Namkeen Biscuits', description: 'Savory crispy biscuits with cumin and ajwain.', price: 90, category: 'biscuits', weight: '250g', isFeatured: false, isEggless: true, tags: ['namkeen', 'savory', 'snack'], images: [{ url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600', alt: 'Namkeen Biscuits' }], ingredients: ['Refined Flour', 'Butter', 'Cumin', 'Ajwain', 'Salt'], rating: { average: 4.4, count: 187 } }
];

const products = (STATIC_PRODUCTS && STATIC_PRODUCTS.length ? STATIC_PRODUCTS : fallbackProducts)
  .map(({ _id, ...product }, index) => ({ ...product, sortOrder: index + 1 }));

const seed = async () => {
  try {
    await connectDB();
    console.log('Starting seed...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await User.create({ name: 'Goel Admin', email: process.env.ADMIN_EMAIL || 'admin@goelcakehouse.com', password: process.env.ADMIN_PASSWORD || 'Admin@12345', phone: '9592285145', role: 'admin' });
    await User.create({ name: 'Test Customer', email: 'customer@test.com', password: 'Customer@123', phone: '9876543210', role: 'user' });
    await Product.insertMany(products);
    console.log('Seeded successfully!');
    console.log('Admin: admin@goelcakehouse.com / Admin@12345');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};
seed();
