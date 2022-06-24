import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        cartTotalQuantity: 0,
        cartTotalPrice: 0
    },
    reducers: {
        addToCart: (currentState, actionObject)=> {
            const item = actionObject.payload;
            currentState.cartItems.push(item);
            currentState.cartTotalQuantity += 1;
            currentState.cartTotalPrice += (+item.price) ;
        },
        deleteFromCart: (currentState, actionObject)=> {
            const { item, quantity } = actionObject.payload;
            const itemIndex = currentState.cartItems.findIndex(itemInCart => itemInCart.id === item.id);
            currentState.cartItems.splice(itemIndex, 1);
            currentState.cartTotalQuantity -= 1;
            currentState.cartTotalPrice -= item.price ;
        }
    }
})

//get action creator functions
export const { addToCart, deleteFromCart } = cartSlice.actions;

//export reducer
export default cartSlice.reducer;