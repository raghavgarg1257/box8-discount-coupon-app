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

describe('[coupon|type| bogo ]', () => {

  it('`BOGOS` should return invalid coupon', done => {
    const discount = getDiscount(cartItems, 'BOGOS', 2);
    assert.equal(false, discount.valid);
    done();
  });

  it('`BOGO` should return invalid coupon because outlet id is invalid', done => {
    const discount = getDiscount(cartItems, 'BOGO', 8);
    assert.equal(false, discount.valid);
    done();
  });

  it('`BOGO` should return invalid coupon | minimum order amount', done => {
    const discount = getDiscount(cartItems, 'BOGO', 2);
    assert.equal(false, discount.valid);
    done();
  });

  it('`BOGO` should return valid coupon with 100 as discount', done => {
    const newCartItem = [
      {
        product_id: 2,
        quantity: 1,
        unit_cost: 200,
      }
    ];
    const discount = getDiscount([...cartItems, ...newCartItem], 'BOGO', 2);
    assert.equal(true, discount.valid);
    assert.equal(100, discount.discount);
    done();
  });

  it('`BOGO` should return valid coupon with 150 as discount | maximum cashback', done => {
    const newCartItem = [
      {
        product_id: 2,
        quantity: 2,
        unit_cost: 100,
      }
    ];
    const discount = getDiscount([...cartItems, ...newCartItem], 'BOGO', 2);
    assert.equal(true, discount.valid);
    assert.equal(150, discount.discount);
    done();
  });


  //
  it('`BOGO` should return valid coupon with 100 as discount | Eg 1', done => {
    const newCartItem = [
      {
        product_id: 2,
        quantity: 1,
        unit_cost: 100,
      },
      {
        product_id: 1,
        quantity: 1,
        unit_cost: 200,
      }
    ];
    const discount = getDiscount(newCartItem, 'BOGO', 2);
    assert.equal(true, discount.valid);
    assert.equal(100, discount.discount);
    done();
  });
  it('`BOGO` should return valid coupon with 100 as discount | Eg 2', done => {
    const newCartItem = [
      {
        product_id: 2,
        quantity: 2,
        unit_cost: 100,
      },
      {
        product_id: 1,
        quantity: 1,
        unit_cost: 200,
      }
    ];
    const discount = getDiscount(newCartItem, 'BOGO', 2);
    assert.equal(true, discount.valid);
    assert.equal(100, discount.discount);
    done();
  });
  it('`BOGO` should return valid coupon with 150 as discount | maximum cashback | Eg 3', done => {
    const newCartItem = [
      {
        product_id: 2,
        quantity: 2,
        unit_cost: 100,
      },
      {
        product_id: 1,
        quantity: 2,
        unit_cost: 200,
      }
    ];
    const discount = getDiscount(newCartItem, 'BOGO', 2);
    assert.equal(true, discount.valid);
    assert.equal(150, discount.discount);
    done();
  });

});
