import React from "react";

import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
    return <React.Fragment>
        <header className={classes.header}>
            <h1>My Restaurant</h1>
            {/* <button>Cart</button> */}
            {/* onShowCart - showCartHandler in app.js */}
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            {/* <img src={mealsImage}/> - local image */}
            <img src="https://raw.githubusercontent.com/academind/react-complete-guide-code/11-practice-food-order-app/extra-files/meals.jpg"
             alt="Food" />            
        </div>

    </React.Fragment>
};

export default Header;