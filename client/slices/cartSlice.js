
import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromCart: (state, action) => {
      let newCart = [...state.items]
      let index = state.items.findIndex(item => item._id == action.payload.id)
      if (index >= 0) {
        newCart.splice(index, 1)
      } else {
        console.log("Item is not in the cart")
      }
      state.items = newCart
    },
    emptyCart: (state, action) => {
      state.items = [];
    },
  },
})

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions

export const selectCartItems = state => state.cart.items;

export const selectCartItemsById = (state, id) => {
  return state.cart.items.reduce((filteredItems, item) => {
    if (item._id === id) {
      filteredItems.push(item);
    }
    return filteredItems;
  }, []);
};

export const selectCartTotal = state => state.cart.items.reduce((total, item) => total = total + item.price, 0)

export default cartSlice.reducer;
