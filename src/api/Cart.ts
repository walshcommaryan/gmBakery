import api from './index';

export type CartItemUpdatePayload = {
  product_id: number;
  quantity: number;
};

// Update quantity or remove item (if quantity <= 0)
export const updateCartItem = async (payload: CartItemUpdatePayload) => {
  return api.post('/cart', payload);
};

// Clear items in cart
export const clearItemsInCart = async () => {
  return api.delete('/cart/clear');
};

// Fetch current cart items
export const fetchCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const mergeGuestCart = async (payload: CartItemUpdatePayload[]) => {
  const response = await api.post('/cart/merge', payload);
  return response.data
};
