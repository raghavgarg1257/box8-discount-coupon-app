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

describe('[coupon|type| discount&cashback ]', () => {

  it('`BOX8FREE` should return invalid coupon', done => {
    const discount = getDiscount(cartItems, 'BOX8FREE', 2);
    assert.equal(false, discount.valid);
    done();
  });

  it('`GETCASHBACK` should return invalid coupon | minimum order amount', done => {
    const discount = getDiscount(cartItems, 'GETCASHBACK', 2);
    assert.equal(false, discount.valid);
    assert.equal(0, discount.discount);
    assert.equal(0, discount.cashback);
    done();
  });

  it('`GETCASHBACK` should return valid coupon with 150 as discount and cashback', done => {
    const newCartItem = [
      {
        product_id: 1,
        quantity: 1,
        unit_cost: 100,
      },
      {
        product_id: 2,
        quantity: 1,
        unit_cost: 75,
      },
    ];
    const discount = getDiscount([...cartItems, ...newCartItem], 'GETCASHBACK', 2);
    assert.equal(true, discount.valid);
    assert.equal(150, discount.discount);
    assert.equal(150, discount.cashback);
    done();
  });

});
