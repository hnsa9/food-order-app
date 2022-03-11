import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

function App() {
  
  // change the visibility of the cart using state 
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };






  return ( 
   <React.Fragment>
     {/* show cart if cartIsShown is true */}
    {cartIsShown && <Cart onClose={hideCartHandler} />} 
    <Header onShowCart={showCartHandler} />
    <main>
      <Meals/>
    </main>

  </React.Fragment>
  
  );
}

export default App;
