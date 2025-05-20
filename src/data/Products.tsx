// Example bakery items data
const productBase = [
  {
    product_id: 1,
    name: 'Lemon Tart',
    price: 5.99,
    itemImage: '/assets/images/gm_1.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    product_id: 2,
    name: 'Macaron',
    price: 2.99,
    itemImage: '/assets/images/gm_2.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    product_id: 3,
    name: 'Apple Tart',
    price: 6.99,
    itemImage: '/assets/images/gm_3.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    product_id: 4,
    name: 'Tart',
    price: 5.99,
    itemImage: '/assets/images/gm_4.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    product_id: 5,
    name: 'Madeleines',
    price: 3.99,
    itemImage: '/assets/images/gm_5.png',
    plateImage: '/assets/images/display_circle.png',
  },
];

const productItems = productBase.map(item => ({
  ...item,
  sizeClass: 'w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-72 lg:h-72, xl:w-72 xl:h-72',
}));

const products = {
  productItems
};

export default products;