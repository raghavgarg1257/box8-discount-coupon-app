export function getTotalCartPrice(cart) {
  const cartTotal = cart.reduce((sum, item) => sum + (item.quantity * item.unit_cost), 0);
  return parseInt(cartTotal, 10);
}

export function getCartPricesFlatten(cart) {
  return cart
    .map(item => new Array(item.quantity).fill(item.unit_cost))
    .reduce((a, b) => [...a, ...b], [])
    .sort((a, b) => a - b);
}
