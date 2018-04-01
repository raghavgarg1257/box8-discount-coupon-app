/* eslint-disable */

import assert from 'assert';

import getDiscount from '../src/discount';

const cartItems = [
  {
    product_id: 1,
    quantity: 2,
    unit_cost: 100,
  },
];

describe('[coupon|type| discount ]', () => {

  it('`BOX8FREE` should return invalid coupon', done => {
    const discount = getDiscount(cartItems, 'BOX8FREE', 2);
    assert.equal(false, discount.valid);
    done();
  });

  it('`BOX8XOB` should return invalid coupon | no type id associated, it is an backend error', done => {
    const discount = getDiscount(cartItems, 'BOX8XOB', 2);
    assert.equal(false, discount.valid);
    assert.equal(0, discount.discount);
    done();
  });

  it('`HELLOBOX8` should return invalid coupon | minimum order amount', done => {
    const discount = getDiscount(cartItems, 'HELLOBOX8', 2);
    assert.equal(false, discount.valid);
    assert.equal(0, discount.discount);
    done();
  });

  it('`HELLOBOX8` should return valid coupon with 150 as discount', done => {
    const newCartItem = [
      {
        product_id: 2,
        quantity: 1,
        unit_cost: 75,
      },
    ];
    const discount = getDiscount([...cartItems, ...newCartItem], 'HELLOBOX8', 2);
    assert.equal(true, discount.valid);
    assert.equal(150, discount.discount);
    done();
  });

});
