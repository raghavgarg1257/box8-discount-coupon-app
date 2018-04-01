import getDiscount from './discount';

const cartItems = [
  {
    product_id: 1,
    quantity: 2,
    unit_cost: 100,
  },
  {
    product_id: 2,
    quantity: 1,
    unit_cost: 200,
  },
];
console.log('Percentage: ', getDiscount(cartItems, 'BOX8LOVE', 2));
console.log('Discount: ', getDiscount(cartItems, 'HELLOBOX8', 2));
console.log('Percentage&Cashback: ', getDiscount(cartItems, 'GETSOMECASHBACK', 2));
console.log('Discount&Cashback: ', getDiscount(cartItems, 'GETCASHBACK', 2));
console.log('Bogo: ', getDiscount(cartItems, 'BOGO', 2));
