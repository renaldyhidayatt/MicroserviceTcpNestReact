export const getCartItemById = (cartItems: any, cartId: any) => {
  return cartItems.find((item: any) => item.cart_id === cartId) || null;
};
