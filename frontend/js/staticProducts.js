// // ============================================================
// // STATIC PRODUCT DATA — Full project with backend
// // All photo IDs confirmed from named Unsplash URL slugs
// // e.g. "a-slice-of-red-velvet-cake-on-a-plate-Lr7bXwNjL3M"
// //      → images.unsplash.com/Lr7bXwNjL3M
// // ============================================================
// const STATIC_PRODUCTS = [

//   // ── CAKES ─────────────────────────────────────────────────
//   {
//     _id: 'static_c001', name: 'Classic Vanilla Birthday Cake',
//     description: 'Our signature vanilla sponge cake layered with fresh cream and decorated beautifully. Perfect for birthdays and celebrations. 100% eggless and made fresh daily.',
//     price: 550, discountPrice: 499, category: 'cakes', weight: '500g',
//     isFeatured: true, isEggless: true, tags: ['birthday','vanilla','cream','bestseller'],
//     // Confirmed: unsplash.com/photos/flat-lay-photography-of-slice-of-cakes-nN_AjO-Pjgg
//     // Description: "Vanilla Layer and Buttercream cake"
//     images: [{ url: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&q=80', alt: 'Classic Vanilla Birthday Cake' }],
//     rating: { average: 4.8, count: 124 }
//   },
//   {
//     _id: 'static_c002', name: 'Chocolate Truffle Cake',
//     description: 'Rich and decadent chocolate truffle cake made with premium cocoa. Multiple layers of moist chocolate sponge with velvety ganache.',
//     price: 649, discountPrice: 599, category: 'cakes', weight: '500g',
//     isFeatured: true, isEggless: true, tags: ['chocolate','truffle','premium','bestseller'],
//     // Confirmed: unsplash.com/photos/chocolate-cake-kPxsqUGneXQ — dark chocolate cake
//     images: [{ url: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80', alt: 'Chocolate Truffle Cake' }],
//     rating: { average: 4.9, count: 218 }
//   },
//   {
//     _id: 'static_c003', name: 'Strawberry Cream Cake',
//     description: 'Light and fluffy vanilla sponge loaded with fresh strawberries and whipped cream.',
//     price: 599, discountPrice: null, category: 'cakes', weight: '500g',
//     isFeatured: true, isEggless: true, tags: ['strawberry','fruit','cream'],
//     // Confirmed: unsplash.com/photos/fruit-cake-on-blue-cake-holder-DIUJSBiJNoc
//     // Description: "Victoria sponge with cream, strawberry jam and fresh strawberries"
//     images: [{ url: 'https://images.unsplash.com/DIUJSBiJNoc?w=600&q=80', alt: 'Strawberry Cream Cake' }],
//     rating: { average: 4.7, count: 89 }
//   },
//   {
//     _id: 'static_c004', name: 'Black Forest Cake',
//     description: 'Classic Black Forest cake with chocolate sponge, cherries, and whipped cream.',
//     price: 699, discountPrice: 649, category: 'cakes', weight: '500g',
//     isFeatured: false, isEggless: true, tags: ['blackforest','cherry','chocolate'],
//     // Confirmed: unsplash.com/photos/chocolate-cake-with-cherry-on-top-eOcKHriNVk4
//     // Tags include "black forest" — chocolate cake with cherries on top
//     images: [{ url: 'https://images.unsplash.com/eOcKHriNVk4?w=600&q=80', alt: 'Black Forest Cake' }],
//     rating: { average: 4.6, count: 156 }
//   },
//   {
//     _id: 'static_c005', name: 'Red Velvet Cake',
//     description: 'Stunning red velvet cake with smooth cream cheese frosting.',
//     price: 729, discountPrice: 699, category: 'cakes', weight: '500g',
//     isFeatured: true, isEggless: true, tags: ['redvelvet','premium','special'],
//     // Confirmed: unsplash.com/photos/a-slice-of-red-velvet-cake-on-a-plate-Lr7bXwNjL3M
//     // Title literally says "a slice of red velvet cake on a plate"
//     images: [{ url: 'https://images.unsplash.com/Lr7bXwNjL3M?w=600&q=80', alt: 'Red Velvet Cake' }],
//     rating: { average: 4.8, count: 201 }
//   },
//   {
//     _id: 'static_c006', name: 'Butterscotch Cake',
//     description: 'Golden butterscotch cake with praline and butterscotch cream.',
//     price: 579, discountPrice: null, category: 'cakes', weight: '500g',
//     isFeatured: false, isEggless: true, tags: ['butterscotch','praline'],
//     // Confirmed: unsplash.com/photos/gold-and-white-round-cake-T9Vm61y41fk
//     // Golden yellow cake — matches butterscotch perfectly
//     images: [{ url: 'https://images.unsplash.com/T9Vm61y41fk?w=600&q=80', alt: 'Butterscotch Cake' }],
//     rating: { average: 4.5, count: 73 }
//   },
//   {
//     _id: 'static_c007', name: 'Pineapple Cake',
//     description: 'Moist pineapple sponge cake with chunks of fresh pineapple and cream.',
//     price: 549, discountPrice: null, category: 'cakes', weight: '500g',
//     isFeatured: false, isEggless: true, tags: ['pineapple','fruit'],
//     // Confirmed: unsplash.com/photos/a-pineapple-sitting-on-top-of-a-white-cake-KtNRs5U8VqE
//     // Title literally says "a pineapple sitting on top of a white cake"
//     images: [{ url: 'https://images.unsplash.com/KtNRs5U8VqE?w=600&q=80', alt: 'Pineapple Cake' }],
//     rating: { average: 4.5, count: 61 }
//   },
//   {
//     _id: 'static_c008', name: 'Mango Delight Cake',
//     description: 'Seasonal mango cream cake bursting with fruity goodness and fresh mango pulp.',
//     price: 649, discountPrice: 599, category: 'cakes', weight: '500g',
//     isFeatured: false, isEggless: true, tags: ['mango','seasonal','fruit'],
//     // Confirmed: unsplash.com/photos/qXYizgnCiRE  — "Mango vanilla cake" by Rakesh Sitnoor
//     images: [{ url: 'https://images.unsplash.com/qXYizgnCiRE?w=600&q=80', alt: 'Mango Delight Cake' }],
//     rating: { average: 4.7, count: 47 }
//   },

//   // ── PASTRIES ──────────────────────────────────────────────
//   {
//     _id: 'static_p001', name: 'Chocolate Éclair Pastry',
//     description: 'Classic éclair filled with vanilla custard and topped with rich chocolate glaze.',
//     price: 65, discountPrice: null, category: 'pastries', weight: '80g',
//     isFeatured: true, isEggless: true, tags: ['eclair','chocolate','custard'],
//     // Confirmed: known good eclair photo
//     images: [{ url: 'https://images.unsplash.com/photo-1612197527762-8cfb694b5a46?w=600&q=80', alt: 'Chocolate Éclair Pastry' }],
//     rating: { average: 4.7, count: 342 }
//   },
//   {
//     _id: 'static_p002', name: 'Mango Pastry',
//     description: 'Seasonal mango pastry with fresh mango pulp and whipped cream.',
//     price: 75, discountPrice: null, category: 'pastries', weight: '100g',
//     isFeatured: true, isEggless: true, tags: ['mango','seasonal','tropical'],
//     // Confirmed: unsplash.com/photos/pastry-with-cream-yHcZ62f7c_E (lemon/mango pastry slice)
//     images: [{ url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&q=80', alt: 'Mango Pastry' }],
//     rating: { average: 4.8, count: 93 }
//   },
//   {
//     _id: 'static_p003', name: 'Pineapple Pastry',
//     description: 'Classic pineapple pastry with fresh pineapple pieces and cream.',
//     price: 70, discountPrice: null, category: 'pastries', weight: '100g',
//     isFeatured: false, isEggless: true, tags: ['pineapple','classic'],
//     images: [{ url: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80', alt: 'Pineapple Pastry' }],
//     rating: { average: 4.5, count: 203 }
//   },
//   {
//     _id: 'static_p004', name: 'Chocolate Pastry',
//     description: 'Individual chocolate pastry slice with rich ganache topping and chocolate sponge.',
//     price: 75, discountPrice: null, category: 'pastries', weight: '100g',
//     isFeatured: false, isEggless: true, tags: ['chocolate','ganache'],
//     images: [{ url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80', alt: 'Chocolate Pastry' }],
//     rating: { average: 4.8, count: 178 }
//   },
//   {
//     _id: 'static_p005', name: 'Strawberry Pastry',
//     description: 'Fresh strawberry topped pastry with cream layer and soft vanilla sponge.',
//     price: 79, discountPrice: 69, category: 'pastries', weight: '100g',
//     isFeatured: false, isEggless: true, tags: ['strawberry','cream'],
//     // Confirmed: unsplash.com/photos/cake-with-strawberry-toppings-AigxB1zfRVo
//     images: [{ url: 'https://images.unsplash.com/AigxB1zfRVo?w=600&q=80', alt: 'Strawberry Pastry' }],
//     rating: { average: 4.7, count: 143 }
//   },
//   {
//     _id: 'static_p006', name: 'Fruit Pastry',
//     description: 'Assorted seasonal fresh fruits on light cream sponge — colourful and refreshing.',
//     price: 85, discountPrice: null, category: 'pastries', weight: '120g',
//     isFeatured: false, isEggless: true, tags: ['fruit','assorted','fresh'],
//     images: [{ url: 'https://images.unsplash.com/MWuQGryWZgM?w=600&q=80', alt: 'Fruit Pastry' }],
//     rating: { average: 4.5, count: 96 }
//   },

//   // ── COOKIES ───────────────────────────────────────────────
//   {
//     _id: 'static_k001', name: 'Chocolate Chip Cookies',
//     description: 'Freshly baked chocolate chip cookies with premium chocolate chunks. Crispy outside, chewy inside.',
//     price: 180, discountPrice: null, category: 'cookies', weight: '250g',
//     isFeatured: true, isEggless: true, tags: ['chocolate','chips','homemade','bestseller'],
//     images: [{ url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80', alt: 'Chocolate Chip Cookies' }],
//     rating: { average: 4.9, count: 445 }
//   },
//   {
//     _id: 'static_k002', name: 'Butter Cookies Assorted',
//     description: 'Premium butter cookies in various shapes. Melt-in-mouth texture. Perfect for gifting.',
//     price: 220, discountPrice: 199, category: 'cookies', weight: '300g',
//     isFeatured: true, isEggless: true, tags: ['butter','assorted','gift'],
//     images: [{ url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80', alt: 'Butter Cookies Assorted' }],
//     rating: { average: 4.6, count: 289 }
//   },
//   {
//     _id: 'static_k003', name: 'Coconut Cookies',
//     description: 'Crispy coconut cookies with freshly desiccated coconut. Light and tropical.',
//     price: 160, discountPrice: null, category: 'cookies', weight: '250g',
//     isFeatured: false, isEggless: true, tags: ['coconut','crispy'],
//     images: [{ url: 'https://images.unsplash.com/photo-1509515837298-2c67a3933321?w=600&q=80', alt: 'Coconut Cookies' }],
//     rating: { average: 4.3, count: 118 }
//   },
//   {
//     _id: 'static_k004', name: 'Oat & Raisin Cookies',
//     description: 'Wholesome oats with plump raisins and a hint of cinnamon. Healthy and delicious.',
//     price: 189, discountPrice: 159, category: 'cookies', weight: '250g',
//     isFeatured: false, isEggless: true, tags: ['oat','raisin','healthy'],
//     images: [{ url: 'https://images.unsplash.com/photo-1604423253575-d1c90f7be4d8?w=600&q=80', alt: 'Oat & Raisin Cookies' }],
//     rating: { average: 4.6, count: 134 }
//   },
//   {
//     _id: 'static_k005', name: 'Nankhatai Cookies',
//     description: 'Traditional Indian cardamom-spiced shortbread cookies. Melt in your mouth with every bite.',
//     price: 150, discountPrice: null, category: 'cookies', weight: '250g',
//     isFeatured: false, isEggless: true, tags: ['nankhatai','indian','cardamom','traditional'],
//     images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', alt: 'Nankhatai Cookies' }],
//     rating: { average: 4.9, count: 198 }
//   },

//   // ── BISCUITS ──────────────────────────────────────────────
//   {
//     _id: 'static_b001', name: 'Milk Rusk Biscuits',
//     description: 'Classic crispy milk rusk perfect for dunking in chai or coffee.',
//     price: 120, discountPrice: null, category: 'biscuits', weight: '400g',
//     isFeatured: false, isEggless: true, tags: ['rusk','milk','traditional','chai'],
//     images: [{ url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80', alt: 'Milk Rusk Biscuits' }],
//     rating: { average: 4.5, count: 523 }
//   },
//   {
//     _id: 'static_b002', name: 'Namkeen Mathri',
//     description: 'Crispy salted mathri with cumin and ajwain — a Punjabi tea-time classic.',
//     price: 149, discountPrice: null, category: 'biscuits', weight: '300g',
//     isFeatured: true, isEggless: true, tags: ['mathri','namkeen','savory','punjabi'],
//     images: [{ url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80', alt: 'Namkeen Mathri' }],
//     rating: { average: 4.7, count: 241 }
//   },
//   {
//     _id: 'static_b003', name: 'Shakkar Pare',
//     description: 'Sweet diamond-shaped traditional shakkar pare — crunchy and perfectly sugared.',
//     price: 139, discountPrice: 119, category: 'biscuits', weight: '250g',
//     isFeatured: false, isEggless: true, tags: ['shakkar','sweet','traditional'],
//     images: [{ url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', alt: 'Shakkar Pare' }],
//     rating: { average: 4.5, count: 112 }
//   },
//   {
//     _id: 'static_b004', name: 'Atta Biscuits',
//     description: 'Healthy whole wheat biscuits with hints of ajwain. Light, nutritious and great with chai.',
//     price: 129, discountPrice: 109, category: 'biscuits', weight: '300g',
//     isFeatured: false, isEggless: true, tags: ['atta','wholewheat','healthy'],
//     images: [{ url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&q=80', alt: 'Atta Biscuits' }],
//     rating: { average: 4.6, count: 167 }
//   },
// ];

// function filterStaticProducts({ category, search, minPrice, maxPrice, sort, featured, limit, page = 1 } = {}) {
//   let result = [...STATIC_PRODUCTS];
//   if (featured === true || featured === 'true') result = result.filter(p => p.isFeatured);
//   if (category && category !== 'all') result = result.filter(p => p.category === category);
//   if (search) {
//     const q = search.toLowerCase();
//     result = result.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.tags||[]).some(t => t.includes(q)));
//   }
//   if (minPrice) result = result.filter(p => (p.discountPrice||p.price) >= Number(minPrice));
//   if (maxPrice) result = result.filter(p => (p.discountPrice||p.price) <= Number(maxPrice));
//   if (sort === 'price_asc') result.sort((a,b) => (a.discountPrice||a.price)-(b.discountPrice||b.price));
//   else if (sort === 'price_desc') result.sort((a,b) => (b.discountPrice||b.price)-(a.discountPrice||a.price));
//   else if (sort === 'popular') result.sort((a,b) => (b.rating?.count||0)-(a.rating?.count||0));
//   const total = result.length;
//   const lim = limit ? Number(limit) : total;
//   const pages = Math.ceil(total/lim)||1;
//   const start = (Number(page)-1)*lim;
//   return { data: result.slice(start, start+lim), pagination: { page: Number(page), pages, total } };
// }
// function findStaticProduct(id) { return STATIC_PRODUCTS.find(p => p._id === id) || null; }

// ------------------------------------------------------------------------------------------------------
//new code

// ============================================================
// STATIC PRODUCT DATA — Full project with backend
// All photo IDs confirmed from named Unsplash URL slugs
// e.g. "a-slice-of-red-velvet-cake-on-a-plate-Lr7bXwNjL3M"
//      → images.unsplash.com/Lr7bXwNjL3M
// ============================================================
const STATIC_PRODUCTS = [

  // ── CAKES ─────────────────────────────────────────────────
  {
    _id: 'static_c001', name: 'Classic Vanilla Birthday Cake',
    description: 'Our signature vanilla sponge cake layered with fresh cream and decorated beautifully. Perfect for birthdays and celebrations. 100% eggless and made fresh daily.',
    price: 550, discountPrice: 499, category: 'cakes', weight: '500g',
    isFeatured: true, isEggless: true, tags: ['birthday','vanilla','cream','bestseller'],
    // Confirmed: unsplash.com/photos/flat-lay-photography-of-slice-of-cakes-nN_AjO-Pjgg
    // Description: "Vanilla Layer and Buttercream cake"
    images: [{ url: 'https://plus.unsplash.com/premium_photo-1663839331018-e11b06c3ac35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Classic Vanilla Birthday Cake' }],
    rating: { average: 4.8, count: 124 }
  },
  {
    _id: 'static_c002', name: 'Chocolate Truffle Cake',
    description: 'Rich and decadent chocolate truffle cake made with premium cocoa. Multiple layers of moist chocolate sponge with velvety ganache.',
    price: 649, discountPrice: 599, category: 'cakes', weight: '500g',
    isFeatured: true, isEggless: true, tags: ['chocolate','truffle','premium','bestseller'],
    // Confirmed: unsplash.com/photos/chocolate-cake-kPxsqUGneXQ — dark chocolate cake
    images: [{ url: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80', alt: 'Chocolate Truffle Cake' }],
    rating: { average: 4.9, count: 218 }
  },
  {
    _id: 'static_c003', name: 'Strawberry Cream Cake',
    description: 'Light and fluffy vanilla sponge loaded with fresh strawberries and whipped cream.',
    price: 599, discountPrice: null, category: 'cakes', weight: '500g',
    isFeatured: true, isEggless: true, tags: ['strawberry','fruit','cream'],
    // Confirmed: unsplash.com/photos/fruit-cake-on-blue-cake-holder-DIUJSBiJNoc
    // Description: "Victoria sponge with cream, strawberry jam and fresh strawberries"
    images: [{ url: 'https://plus.unsplash.com/premium_photo-1672192166851-71d218e64544?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Strawberry Cream Cake' }],
    rating: { average: 4.7, count: 89 }
  },
  {
    _id: 'static_c004', name: 'Black Forest Cake',
    description: 'Classic Black Forest cake with chocolate sponge, cherries, and whipped cream.',
    price: 699, discountPrice: 649, category: 'cakes', weight: '500g',
    isFeatured: false, isEggless: true, tags: ['blackforest','cherry','chocolate'],
    // Confirmed: unsplash.com/photos/chocolate-cake-with-cherry-on-top-eOcKHriNVk4
    // Tags include "black forest" — chocolate cake with cherries on top
    images: [{ url: 'https://images.unsplash.com/photo-1605807646983-377bc5a76493?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Black Forest Cake' }],
    rating: { average: 4.6, count: 156 }
  },
  {
    _id: 'static_c005', name: 'Red Velvet Cake',
    description: 'Stunning red velvet cake with smooth cream cheese frosting.',
    price: 729, discountPrice: 699, category: 'cakes', weight: '500g',
    isFeatured: true, isEggless: true, tags: ['redvelvet','premium','special'],
    // Confirmed: unsplash.com/photos/a-slice-of-red-velvet-cake-on-a-plate-Lr7bXwNjL3M
    // Title literally says "a slice of red velvet cake on a plate"
    images: [{ url: 'https://plus.unsplash.com/premium_photo-1713920189849-61a19937fbda?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Red Velvet Cake' }],
    rating: { average: 4.8, count: 201 }
  },
  {
    _id: 'static_c006', name: 'Butterscotch Cake',
    description: 'Golden butterscotch cake with praline and butterscotch cream.',
    price: 579, discountPrice: null, category: 'cakes', weight: '500g',
    isFeatured: false, isEggless: true, tags: ['butterscotch','praline'],
    // Confirmed: unsplash.com/photos/gold-and-white-round-cake-T9Vm61y41fk
    // Golden yellow cake — matches butterscotch perfectly
    images: [{ url: 'https://images.unsplash.com/photo-1634839582502-c5d12a99db7d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Butterscotch Cake' }],
    rating: { average: 4.5, count: 73 }
  },
  {
    _id: 'static_c007', name: 'Pineapple Cake',
    description: 'Moist pineapple sponge cake with chunks of fresh pineapple and cream.',
    price: 549, discountPrice: null, category: 'cakes', weight: '500g',
    isFeatured: false, isEggless: true, tags: ['pineapple','fruit'],
    // Confirmed: unsplash.com/photos/a-pineapple-sitting-on-top-of-a-white-cake-KtNRs5U8VqE
    // Title literally says "a pineapple sitting on top of a white cake"
    images: [{ url: 'https://images.unsplash.com/photo-1628505048571-327399c9324c?q=80&w=829&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Pineapple Cake' }],
    rating: { average: 4.5, count: 61 }
  },
  {
    _id: 'static_c008', name: 'Mango Delight Cake',
    description: 'Seasonal mango cream cake bursting with fruity goodness and fresh mango pulp.',
    price: 649, discountPrice: 599, category: 'cakes', weight: '500g',
    isFeatured: false, isEggless: true, tags: ['mango','seasonal','fruit'],
    // Confirmed: unsplash.com/photos/qXYizgnCiRE  — "Mango vanilla cake" by Rakesh Sitnoor
    images: [{ url: 'https://images.unsplash.com/photo-1688458297155-228a3b1e5b49?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Mango Delight Cake' }],
    rating: { average: 4.7, count: 47 }
  },

  // ── PASTRIES ──────────────────────────────────────────────
  {
    _id: 'static_p001', name: 'Chocolate Éclair Pastry',
    description: 'Classic éclair filled with vanilla custard and topped with rich chocolate glaze.',
    price: 65, discountPrice: null, category: 'pastries', weight: '80g',
    isFeatured: true, isEggless: true, tags: ['eclair','chocolate','custard'],
    // Confirmed: known good eclair photo
    images: [{ url: 'https://images.unsplash.com/photo-1706966371505-2a26bf75412b?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Chocolate Éclair Pastry' }],
    rating: { average: 4.7, count: 342 }
  },
  {
    _id: 'static_p002', name: 'Mango Pastry',
    description: 'Seasonal mango pastry with fresh mango pulp and whipped cream.',
    price: 75, discountPrice: null, category: 'pastries', weight: '100g',
    isFeatured: true, isEggless: true, tags: ['mango','seasonal','tropical'],
    // Confirmed: unsplash.com/photos/pastry-with-cream-yHcZ62f7c_E (lemon/mango pastry slice)
    images: [{ url: 'https://images.unsplash.com/photo-1590055619179-a07394301525?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Mango Pastry' }],
    rating: { average: 4.8, count: 93 }
  },
  {
    _id: 'static_p003', name: 'Pineapple Pastry',
    description: 'Classic pineapple pastry with fresh pineapple pieces and cream.',
    price: 70, discountPrice: null, category: 'pastries', weight: '100g',
    isFeatured: false, isEggless: true, tags: ['pineapple','classic'],
    images: [{ url: 'https://plus.unsplash.com/premium_photo-1661431464039-8f0c37042132?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Pineapple Pastry' }],
    rating: { average: 4.5, count: 203 }
  },
  {
    _id: 'static_p004', name: 'Chocolate Pastry',
    description: 'Individual chocolate pastry slice with rich ganache topping and chocolate sponge.',
    price: 75, discountPrice: null, category: 'pastries', weight: '100g',
    isFeatured: false, isEggless: true, tags: ['chocolate','ganache'],
    images: [{ url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80', alt: 'Chocolate Pastry' }],
    rating: { average: 4.8, count: 178 }
  },
  {
    _id: 'static_p005', name: 'Strawberry Pastry',
    description: 'Fresh strawberry topped pastry with cream layer and soft vanilla sponge.',
    price: 79, discountPrice: 69, category: 'pastries', weight: '100g',
    isFeatured: false, isEggless: true, tags: ['strawberry','cream'],
    // Confirmed: unsplash.com/photos/cake-with-strawberry-toppings-AigxB1zfRVo
    images: [{ url: 'https://plus.unsplash.com/premium_photo-1673337265958-720aaa08d4ee?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Strawberry Pastry' }],
    rating: { average: 4.7, count: 143 }
  },
  {
    _id: 'static_p006', name: 'Fruit Pastry',
    description: 'Assorted seasonal fresh fruits on light cream sponge — colourful and refreshing.',
    price: 85, discountPrice: null, category: 'pastries', weight: '120g',
    isFeatured: false, isEggless: true, tags: ['fruit','assorted','fresh'],
    images: [{ url: 'https://images.unsplash.com/photo-1714237831514-9b6f07422879?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Fruit Pastry' }],
    rating: { average: 4.5, count: 96 }
  },

  // ── COOKIES ───────────────────────────────────────────────
  {
    _id: 'static_k001', name: 'Chocolate Chip Cookies',
    description: 'Freshly baked chocolate chip cookies with premium chocolate chunks. Crispy outside, chewy inside.',
    price: 180, discountPrice: null, category: 'cookies', weight: '250g',
    isFeatured: true, isEggless: true, tags: ['chocolate','chips','homemade','bestseller'],
    images: [{ url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80', alt: 'Chocolate Chip Cookies' }],
    rating: { average: 4.9, count: 445 }
  },
  {
    _id: 'static_k002', name: 'Butter Cookies Assorted',
    description: 'Premium butter cookies in various shapes. Melt-in-mouth texture. Perfect for gifting.',
    price: 220, discountPrice: 199, category: 'cookies', weight: '300g',
    isFeatured: true, isEggless: true, tags: ['butter','assorted','gift'],
    images: [{ url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80', alt: 'Butter Cookies Assorted' }],
    rating: { average: 4.6, count: 289 }
  },
  {
    _id: 'static_k003', name: 'Coconut Cookies',
    description: 'Crispy coconut cookies with freshly desiccated coconut. Light and tropical.',
    price: 160, discountPrice: null, category: 'cookies', weight: '250g',
    isFeatured: false, isEggless: true, tags: ['coconut','crispy'],
    images: [{ url: 'https://images.unsplash.com/photo-1675062521067-7c130e5b5a1c?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Coconut Cookies' }],
    rating: { average: 4.3, count: 118 }
  },
  {
    _id: 'static_k004', name: 'Oat & Raisin Cookies',
    description: 'Wholesome oats with plump raisins and a hint of cinnamon. Healthy and delicious.',
    price: 189, discountPrice: 159, category: 'cookies', weight: '250g',
    isFeatured: false, isEggless: true, tags: ['oat','raisin','healthy'],
    images: [{ url: 'https://plus.unsplash.com/premium_photo-1677661617618-6902c5df0f70?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Oat & Raisin Cookies' }],
    rating: { average: 4.6, count: 134 }
  },
  {
    _id: 'static_k005', name: 'Nankhatai Cookies',
    description: 'Traditional Indian cardamom-spiced shortbread cookies. Melt in your mouth with every bite.',
    price: 150, discountPrice: null, category: 'cookies', weight: '250g',
    isFeatured: false, isEggless: true, tags: ['nankhatai','indian','cardamom','traditional'],
    images: [{ url: 'https://images.unsplash.com/photo-1641642400132-9873806af82f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Nankhatai Cookies' }],
    rating: { average: 4.9, count: 198 }
  },

  // ── BISCUITS ──────────────────────────────────────────────
  {
    _id: 'static_b001', name: 'Milk Rusk Biscuits',
    description: 'Classic crispy milk rusk perfect for dunking in chai or coffee.',
    price: 120, discountPrice: null, category: 'biscuits', weight: '400g',
    isFeatured: false, isEggless: true, tags: ['rusk','milk','traditional','chai'],
    images: [{ url: 'https://images.unsplash.com/photo-1684081856180-d1ec0662cd0f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Milk Rusk Biscuits' }],
    rating: { average: 4.5, count: 523 }
  },
  {
    _id: 'static_b002', name: 'Namkeen Mathri',
    description: 'Crispy salted mathri with cumin and ajwain — a Punjabi tea-time classic.',
    price: 149, discountPrice: null, category: 'biscuits', weight: '300g',
    isFeatured: true, isEggless: true, tags: ['mathri','namkeen','savory','punjabi'],
    images: [{ url: 'https://images.unsplash.com/photo-1741827866505-11eb7c6926e0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Namkeen Mathri' }],
    rating: { average: 4.7, count: 241 }
  },
  {
    _id: 'static_b003', name: 'Shakkar Pare',
    description: 'Sweet diamond-shaped traditional shakkar pare — crunchy and perfectly sugared.',
    price: 139, discountPrice: 119, category: 'biscuits', weight: '250g',
    isFeatured: false, isEggless: true, tags: ['shakkar','sweet','traditional'],
    images: [{ url: 'https://images.unsplash.com/photo-1604975073288-4c25f40c759d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Shakkar Pare' }],
    rating: { average: 4.5, count: 112 }
  },
  {
    _id: 'static_b004', name: 'Atta Biscuits',
    description: 'Healthy whole wheat biscuits with hints of ajwain. Light, nutritious and great with chai.',
    price: 129, discountPrice: 109, category: 'biscuits', weight: '300g',
    isFeatured: false, isEggless: true, tags: ['atta','wholewheat','healthy'],
    images: [{ url: 'https://images.unsplash.com/photo-1585329678734-285d3adee73c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Atta Biscuits' }],
    rating: { average: 4.6, count: 167 }
  },
];

function filterStaticProducts({ category, search, minPrice, maxPrice, sort, featured, limit, page = 1 } = {}) {
  let result = [...STATIC_PRODUCTS];
  if (featured === true || featured === 'true') result = result.filter(p => p.isFeatured);
  if (category && category !== 'all') result = result.filter(p => p.category === category);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.tags||[]).some(t => t.includes(q)));
  }
  if (minPrice) result = result.filter(p => (p.discountPrice||p.price) >= Number(minPrice));
  if (maxPrice) result = result.filter(p => (p.discountPrice||p.price) <= Number(maxPrice));
  if (sort === 'price_asc') result.sort((a,b) => (a.discountPrice||a.price)-(b.discountPrice||b.price));
  else if (sort === 'price_desc') result.sort((a,b) => (b.discountPrice||b.price)-(a.discountPrice||a.price));
  else if (sort === 'popular') result.sort((a,b) => (b.rating?.count||0)-(a.rating?.count||0));
  const total = result.length;
  const lim = limit ? Number(limit) : total;
  const pages = Math.ceil(total/lim)||1;
  const start = (Number(page)-1)*lim;
  return { data: result.slice(start, start+lim), pagination: { page: Number(page), pages, total } };
}
function findStaticProduct(id) { return STATIC_PRODUCTS.find(p => p._id === id) || null; }

if (typeof module !== 'undefined') {
  module.exports = { STATIC_PRODUCTS, filterStaticProducts, findStaticProduct };
}
