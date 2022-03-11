import React, { useContext } from 'react';
import CartContext from './cart-context';

const CartProvider = props => {

    const addItemToCartHandler = item => {};

    const removeItemHandler = id => {};

    // dynamic content
    const cartContext = {
        items: [],
        totalAmount: 0,
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