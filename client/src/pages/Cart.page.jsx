import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AlertMessage from '../UI/Alert/Alert.component';
import { addToCart, removeFromCart } from '../redux/actions/cart.action';

const CartPage = ({ match, location, history }) => {
   const productId = match.params.id;
   console.log('CART PAGE - PRODUCT ID: ', productId);

   const qty = location.search ? Number(location.search.split('=')[1]) : 1;
   console.log('CART PAGE - QTY: ', qty);

   const dispatch = useDispatch();

   const cart = useSelector(state => state.cart)
   const { cartItems } = cart;

   useEffect(() => {
      if (productId) {
         dispatch(addToCart(productId, qty));
      };
   }, [dispatch, productId, qty]);

   // handlers
   const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
   };
   const checkoutHandler = () => {
      history.push('/login?redirect=checkout/shipping')
   };

   return (
      <div>
         <h1>Shopping Cart</h1>
         <div>{cartItems.length === 0 ?
            <div>
               <AlertMessage>Your cart is empty</AlertMessage>
               {/* <p>Your cart is empty</p> */}
               <Link className='goBack-btn' to='/'>Go Back</Link>
            </div>
            : <div>
               {cartItems.map(item => (
                  <div key={item.product}>
                     <img src={item.image} alt={item.name} />
                     <Link to={`/shop/product/${item.product}`}>{item.name}</Link>
                     <span>${item.price}</span>
                     <select id="selectQty" name="qty" value={item.qty} onChange={(e) =>
                        dispatch(addToCart(item.product, Number(e.target.value)))}>
                        {[...Array(item.availableQty).keys()].map((num) =>
                           (<option key={num + 1} value={num + 1}> {num + 1} </option>)
                        )}
                     </select>
                     <button onClick={() => removeFromCartHandler(item.product)} className="removeFromCart-btn" type='button'>
                        <i className='fas fa-trash' />
                     </button>
                  </div>
               ))}
            </div>}
         </div>
         <div>Subtotal {cartItems.reduce((acc, item) => acc + item.qty, 0)} items</div>
         <div>$ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</div>
         <button type='button' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to Check Out</button>
      </div>
   );
};
export default CartPage;