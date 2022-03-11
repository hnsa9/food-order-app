import React from "react";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';

import CartContext from "../../store/cart-context";
import { useContext, useState, useEffect } from 'react';
// import CartProvider from "../../store/CartProvider";

// button - icon, text, badge-current number of items in cart


const HeaderCartButton = props => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    
    const { items } = cartCtx;
    

    // animate cart button
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
  
    useEffect(() => {
      if (items.length === 0) {
        return;
      }
      setBtnIsHighlighted(true);
  
      // unhighlight button after 300ms
      const timer = setTimeout(() => {
        setBtnIsHighlighted(false);
      }, 300);
      
      // cleanup function - clear timer when it reruns
      return () => {
        clearTimeout(timer);
      };
    }, [items]);
  

    

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0); // reduce - single output

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}><CartIcon/></span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>

}

export default HeaderCartButton;