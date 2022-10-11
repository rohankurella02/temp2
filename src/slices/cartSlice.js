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
            const existingItem = currentState.cartItems.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
                currentState.cartTotalQuantity += item.quantity;
                currentState.cartTotalPrice += item.price * item.quantity;
            } else {
            item.quantity = 1;
            currentState.cartItems.push(item);
            currentState.cartTotalQuantity += 1;
            currentState.cartTotalPrice += (+item.price) ;
            }
        },
        deleteFromCart: (currentState, actionObject)=> {
            const { item, quantity } = actionObject.payload;
            const existingItem = currentState.cartItems.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity -= quantity;
                currentState.cartTotalQuantity -= quantity;
                currentState.cartTotalPrice -= item.price * quantity;
                if (existingItem.quantity === 0) {
                    currentState.cartItems = currentState.cartItems.filter((cartItem) => cartItem.id !== item.id);
                }
            }
            // const itemIndex = currentState.cartItems.findIndex(itemInCart => itemInCart.id === item.id);
            // currentState.cartItems.splice(itemIndex, 1);
            // currentState.cartTotalQuantity -= 1;
            // currentState.cartTotalPrice -= item.price ;
        }
    }
})

//get action creator functions
export const { addToCart, deleteFromCart } = cartSlice.actions;

//export reducer
export default cartSlice.reducer;