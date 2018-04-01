/* eslint-disable */

export default class Cart {
  constructor(outlet = 0) {
    if (outlet === 0) {
      // throw error that outlet must be provided to create a cart
    }
    this.outlet = outlet;
    this.items = [];
  }

  getItems() {
    return this.items;
  }

  addItem() {
    /*
      if no matching product_id
        append the new item in `this.items`
      else
        increase the unit count of the index in `this.items` where we found the product id
     */
  }

  updateCart() {
    // basic functionality to update the cart
  }

  removeItem() {
    /*
      if no matching product_id
        return error
      else
        remove the index from `this.items` where we found the product id
     */
  }

  getTotalCost(couponCode = '') {
    const totalprice = 0; // calculate the total price of cart
    let discount = 0;
    if (couponCode) {
      discount = this.calculateDiscount(couponCode);
    }
    return totalprice - discount;
  }

  calculateDiscount() {

  }
}
