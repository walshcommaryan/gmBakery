// Example bakery items data
const featuredBase = [
  {
    name: 'Apple Tart',
    price: '$6',
    itemImage: '/assets/images/apple_tart.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    name: 'Tart',
    price: '$5',
    itemImage: '/assets/images/tart.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    name: 'Madeleines',
    price: '$3',
    itemImage: '/assets/images/madeleines.png',
    plateImage: '/assets/images/display_circle.png',
  },
];

const productBase = [
  {
    name: 'Lemon Tart',
    price: '$6',
    itemImage: '/assets/images/lemon_tart.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    name: 'Macaron',
    price: '$2',
    itemImage: '/assets/images/macaron.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    name: 'Apple Tart',
    price: '$6',
    itemImage: '/assets/images/apple_tart.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    name: 'Tart',
    price: '$5',
    itemImage: '/assets/images/tart.png',
    plateImage: '/assets/images/display_circle.png',
  },
  {
    name: 'Madeleines',
    price: '$3',
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