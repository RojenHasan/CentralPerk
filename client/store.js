import { configureStore } from "@reduxjs/toolkit"
import restaurantSlice from "./slices/restaurantSlice"
import cartSlice from "./slices/cartSlice"


const store = configureStore({
  reducer: {
    restaurant: restaurantSlice,
    cart: cartSlice,
  }
})

export default store