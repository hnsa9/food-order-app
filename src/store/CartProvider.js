import React, { useReducer } from 'react';
import CartContext from './cart-context';


const defaultCartState = {
    items: [],
    totalAmount: 0
};


const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
        
        // check if item is already is cart
        // findindex - The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. 
        // Otherwise, it returns -1, indicating that no element passed the test.
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];
        
        // let updatedItem;
        let updatedItems;

        // if existingcartitem is not null
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            // create new array by copying old objects
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            // updatedItem = {...action.item};
            updatedItems = state.items.concat(action.item);
        }

        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'REMOVE') {

        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];

        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        
        // check if amount is 1 - if yes remove item totally, if not just update amount number
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id) // return items with id not equal to action.id

        } else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }

    
    }


    return defaultCartState;
};



const CartProvider = props => {

    // reducer returns 2 element - state and dispatch action
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type:'ADD', item: item})
    };

    const removeItemHandler = id => {
        dispatchCartAction({type:'REMOVE', id: id})
    };

    // dynamic content
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler, 
        removeItem: removeItemHandler
    };


    return ( 
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
    );
}

export default CartProvider;