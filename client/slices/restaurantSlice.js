// This code defines a Redux slice named 'restaurant' with an initial state, a 'setRestaurant' action to update the state, and a selector to access the 'restaurant' field.It also exports the 'setRestaurant' action and the reducer for use in your Redux store.
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  restaurant: null,
}
export const restaurantSlice = createSlice({
  // Set the name of the slice as 'restaurant'
  name: 'restaurant',
  // Set the initial state of the restaurant as 'null'
  initialState,
  // Reducers describe how the state can be updated in response to actions
  reducers: {
    // This 'setRestaurant' reducer takes the current 'state' and an 'action' with a 'payload'
    // It updates the 'restaurant' field in the state to the value provided in the 'action.payload'
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
})

// Export the 'setRestaurant' action from the slice 
export const { setRestaurant } = restaurantSlice.actions

// Selects the 'restaurant' field from the Redux state, providing access to restaurant-related data.
export const selectRestaurant = state => state.restaurant.restaurant;

// Export the reducer from the 'restaurantSlice' to manage the state of the restaurant-related data in the Redux store (A Redux store is a central and immutable object in the Redux state management pattern that holds the entire state of your applicatio).
export default restaurantSlice.reducer;
