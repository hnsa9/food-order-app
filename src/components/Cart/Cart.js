import { Fragment, useContext, useState  } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {

    const [isCheckout, setIsCheckout] = useState(false);

    // submit post request - checkout form
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount:1});
    };


    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);

        await fetch('https://react-http-ab96c-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({user: userData, orderedItems: cartCtx.items }),
        })
        
        setIsSubmitting(false);
        setDidSubmit(true);

        cartCtx.clearCart();
    

    };




    // use items from cartctx
    const cartItems = <ul className={classes['cart-items']}> {cartCtx.items.map(item => 
    <CartItem key={item.id} name={item.name} 
        amount={item.amount} price={item.price}
        onRemove={cartItemRemoveHandler.bind(null, item.id)} 
        onAdd={cartItemAddHandler.bind(null,item)} 
    />)}</ul>;
    
    // bind - preconfigure argument

    const totalAmount = `RM${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;


    const modalActions = <div className={classes.action}><button className={classes['button--alt']} onClick={props.onClose}>Close</button>{hasItems && <button className={classes.button} 
    onClick={orderHandler}>Order</button>}</div>


    // control the content of the modal - before submit and after submit
    const cartModalContent = <Fragment>
        {cartItems}
    <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
    </div> 
    {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
    {!isCheckout && modalActions} 
    </Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = <Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.action}><button className={classes.button} onClick={props.onClose}>Close</button></div>
    
    </Fragment>

    return <Modal onClose={props.onClose}>
        
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}

     
        </Modal>
    
};

export default Cart;