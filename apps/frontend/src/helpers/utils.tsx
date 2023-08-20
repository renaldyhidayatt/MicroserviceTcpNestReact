export const calculateSubtotal = (cartItems: any): any => {
  return cartItems.reduce((total: any, item: any) => {
    return total + item.quantity * item.price;
  }, 0);
};

export const calculateTotalProducts = (cartItems: any): any => {
  return cartItems.reduce((total: any, item: any) => {
    return total + item.quantity;
  }, 0);
};

export const calculateWeight = (cartItems: any): any => {
  return cartItems.reduce((totalWeight: any, item: any) => {
    return totalWeight + item.quantity * item.weight;
  }, 0);
};
