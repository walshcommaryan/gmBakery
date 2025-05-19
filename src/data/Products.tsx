// Example bakery items data
const featuredBase = [
  {
    product_id: 1,
    name: 'Apple Tart',
    price: 6.99,
    itemImage: '/assets/images/apple_tart.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    product_id: 1,
    name: 'Tart',
    price: 5.99,
    itemImage: '/assets/images/tart.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    product_id: 2,
    name: 'Madeleines',
    price: 3.99,
    itemImage: '/assets/images/madeleines.png',
    plateImage: '/assets/images/display_circle.png',
  },
];

const productBase = [
  {
    product_id: 3,
    name: 'Lemon Tart',
    price: 5.99,
    itemImage: '/assets/images/lemon_tart.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    product_id: 4,
    name: 'Macaron',
    price: 2.99,
    itemImage: '/assets/images/macaron.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    product_id: 5,
    name: 'Apple Tart',
    price: 6.99,
    itemImage: '/assets/images/apple_tart.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    product_id: 1,
    name: 'Tart',
    price: 5.99,
    itemImage: '/assets/images/tart.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    product_id: 2,
    name: 'Madeleines',
    price: 3.99,
    itemImage: '/assets/images/madeleines.png',
    plateImage: '/assets/images/display_circle.png',
  },
];

const featured = featuredBase.map(item => ({
  ...item,
  sizeClass: 'w-40 h-40 sm:w-48 sm:h-48 md:w-80 md:h-80 lg:w-96 lg:h-96, xl:w-96 xl:h-96',
}));

const productItems = productBase.map(item => ({
  ...item,
  sizeClass: 'w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-72 lg:h-72, xl:w-72 xl:h-72',
}));

const products = {
  featured,
  productItems
};

export default products;