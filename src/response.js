export function ok(message, discount, cashback) {
  return {
    valid: true,
    message,
    discount,
    cashback,
  };
}

export function error(message) {
  return {
    valid: false,
    message,
    discount: 0,
    cashback: 0,
  };
}
