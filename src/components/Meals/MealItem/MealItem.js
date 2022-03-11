import  React, { useContext, Fragment } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = props => {
    // return <Fragment>
    //     <div className={classes.meal}>
    //         <h3>
    //             {props.meal.name}
    //         </h3>
    //     </div>
    //     <div className={classes.description}>
    //         {props.meal.description}
    //     </div>
    //     <div className={classes.price}>
    //         {props.meal.description}
    //     </div>
    // </Fragment>

    const price = `RM${props.price.toFixed(2)}`;

    const cartCtx = useContext(CartContext);

    const addItemToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })


    };

    return <li className={classes.meal}>
            <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addItemToCartHandler}/>
                {/* form to enter amount and add to cart button */}
            </div>
        
    </li>
    

};

export default MealItem;