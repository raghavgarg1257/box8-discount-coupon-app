/* eslint-disable */

import assert from 'assert';

import getDiscount from '../src/discount';

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

describe('[coupon|type| percentage and cashback ]', () => {

  it('`BOX8FREE` should return invalid coupon', done => {
    const discount = getDiscount(cartItems, 'BOX8FREE', 2);
    assert.equal(false, discount.valid);
    done();
  });

  it('`GETSOMECASHBACK` should return valid coupon with 150 as discount and cashback | maximum cashback', done => {
    const newCartItem = [
      {
        product_id: 1,
        quantity: 2,
        unit_cost: 1000,
      },
      {
        product_id: 1,
        quantity: 1,
        unit_cost: 100,
      },
    ];
    const discount = getDiscount([...cartItems, ...newCartItem], 'GETSOMECASHBACK', 2);
    assert.equal(true, discount.valid);
    assert.equal(150, discount.discount);
    done();
  });

  it('`GETSOMECASHBACK` should return valid coupon with 40 as discount', done => {
    const discount = getDiscount(cartItems, 'GETSOMECASHBACK', 2);
    assert.equal(true, discount.valid);
    assert.equal(40, discount.discount);
    done();
  });

});
