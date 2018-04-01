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

describe('[coupon|type| percentage ]', () => {

  it('`BOX8FREE` should return invalid coupon', done => {
    const discount = getDiscount(cartItems, 'BOX8FREE', 2);
    assert.equal(false, discount.valid);
    done();
  });

  it('`BOX8LOVE` should return invalid coupon because outlet id is invalid', done => {
    const discount = getDiscount(cartItems, 'BOX8LOVE', 8);
    assert.equal(false, discount.valid);
    done();
  });

  it('`ILOVEBOX8` should return invalid coupon because it is not active', done => {
    const discount = getDiscount(cartItems, 'ILOVEBOX8', 2);
    assert.equal(false, discount.valid);
    done();
  });

  it('`BOX8LOVE` should return valid coupon with 200 as discount | maximum cashback', done => {
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
    const discount = getDiscount([...cartItems, ...newCartItem], 'BOX8LOVE', 2);
    assert.equal(true, discount.valid);
    assert.equal(200, discount.discount);
    done();
  });

  it('`BOX8LOVE` should return valid coupon with 40 as discount', done => {
    const discount = getDiscount(cartItems, 'BOX8LOVE', 2);
    assert.equal(true, discount.valid);
    assert.equal(40, discount.discount);
    done();
  });

});
