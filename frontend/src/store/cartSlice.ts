import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  name: string;
  price: string; // price as string in BCHN tokens
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    setQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const it = state.items.find(i => i.id === action.payload.id);
      if (it) it.quantity = action.payload.quantity;
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, setQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
