import couponCodes from './config/coupon_codes';
import * as response from './response';
import { getTotalCartPrice, getCartPricesFlatten } from './util';

export default function getDiscount(cartItems, couponCode, outletId) {
  const codes = couponCodes.map(coupon => coupon.code);
  const couponIndex = codes.indexOf(couponCode);

  // 1. check if coupon code exists
  if (couponIndex === -1) {
    return response.error('Coupon code does not exist');
  }

  const coupon = couponCodes[couponIndex];

  const now = new Date();
  const startDate = new Date(coupon.start_date);
  const endDate = new Date(coupon.end_date);

  // 2. check for validity of the coupon
  if (startDate > now || endDate < now || coupon.active === false) {
    return response.error('Coupon code expired.');
  }

  // 3. check for the outlet in coupon object
  if (
    coupon.applicable_outlet_ids.length > 0 &&
    coupon.applicable_outlet_ids.indexOf(outletId) === -1
  ) {
    return response.error(`Coupon code is not applicable for the selected(${outletId}) outlet`);
  }

  const totalCartPrice = getTotalCartPrice(cartItems);
  const afterCouponPrices = {
    discount: 0,
    cashback: 0,
  };

  // 4. apply coupon and give discount and cashback
  switch (coupon.type) {
    case 'Percentage':
      afterCouponPrices.discount = parseInt((totalCartPrice * coupon.value) / 100, 10);
      break;

    case 'Discount':
      afterCouponPrices.discount = coupon.value;
      break;

    case 'Discount&Cashback':
      afterCouponPrices.discount = coupon.value;
      afterCouponPrices.cashback = coupon.cashback_value;
      break;

    case 'Percentage&Cashback':
      afterCouponPrices.discount = parseInt((totalCartPrice * coupon.value) / 100, 10);
      afterCouponPrices.cashback = coupon.cashback_value;
      break;

    // eslint-disable-next-line
    case 'Bogo':
      const prices = getCartPricesFlatten(cartItems);
      const pricesLength = (prices % 2 === 0) ? prices.length / 2 : (prices.length - 1) / 2;
      for (let i = 0; i < pricesLength; i += 1) {
        afterCouponPrices.discount += prices[i];
      }
      break;

    default:
      return response.error('Coupon code does not apllied. Something went wrong');
  }

  // 5. check for minimums/maximums
  if (afterCouponPrices.discount > coupon.maximum_discount) {
    afterCouponPrices.discount = coupon.maximum_discount;
  }

  const cartPriceAfterDiscount = totalCartPrice - afterCouponPrices.discount;

  if (cartPriceAfterDiscount < coupon.minimum_delivery_amount_after_discount) {
    return response.error(`Coupon code does not apllied. The minimum amount after discount should be more than ${coupon.minimum_delivery_amount_after_discount}`);
  }

  // 6. give response
  return response.ok('Coupon applied', afterCouponPrices.discount, afterCouponPrices.cashback);
}
