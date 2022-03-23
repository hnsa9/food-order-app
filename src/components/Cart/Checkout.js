import { useRef, useState  } from 'react';
import classes from './Checkout.module.css';


const isEmpty = value => value.trim() === '';
const isNotFiveChars = value => value.trim().length !== 5;

const Checkout = (props) => {

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postcode: true

  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();


  const confirmHandler = (event) => {
    event.preventDefault();

    const etrName = nameInputRef.current.value;
    const etrStreet = streetInputRef.current.value; 
    const etrPostal = postalInputRef.current.value; 
    const etrCity = cityInputRef.current.value;

    const userData = {name: etrName, street: etrStreet, postcode: etrPostal, city: etrCity};

    // console.log(nameInputRef.current.value, streetInputRef.current.value, postalInputRef.current.value, cityInputRef.current.value);
    console.log(etrName, etrStreet, etrPostal, etrCity);

    const nameIsValid = !isEmpty(etrName);
    const streetIsValid = !isEmpty(etrStreet);
    const cityIsValid = !isEmpty(etrCity);
    const postalIsValid = !isNotFiveChars(etrPostal);

    setFormInputsValidity({name: nameIsValid, street: streetIsValid, city: cityIsValid, postcode: postalIsValid});

    const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalIsValid;

    if (!formIsValid) {
      return;
    }

    // submit cart data
    props.onConfirm(userData);

  };

  const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
  const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
  const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;
  const postcodeControlClasses = `${classes.control} ${formInputsValidity.postcode ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
        {!formInputsValidity.street && <p>Please enter a street name!</p>}
      </div>
      <div className={postcodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalInputRef} type='text' id='postal' />
        {!formInputsValidity.postcode && <p>Please enter a valid postcode!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        {!formInputsValidity.city && <p>Please enter a valid city name!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;