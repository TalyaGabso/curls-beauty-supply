import React, { } from 'react';
// Redux
import { useSelector } from 'react-redux';
// component
import AlertMessage from '../UI/Alert/Alert.component';
import Checkout from '../components/Checkout/Checkout.component';
import { Link } from 'react-router-dom';


const Payment = ({ history }) => {
   // const dispatch = useDispatch();

   const cart = useSelector((state) => state.cart);

   if (!cart.shippingAddress.address) {
      history.push('/checkout/shipping')
   };


   const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
   };
   cart.totalPrice = addDecimals(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
   );
   const placeOrderHandler = () => {
      <div>Your Order Was Processed Successfully!</div>
      setTimeout(() => {
         history.push('/')
      }, 1000);
   }

   console.log(cart.cartItems)
   return (
      <div>
         <h1>Checkout</h1>
         <h3>Place Order</h3>
         <Checkout step1 step2 step3 />
         <div>
            <h4>Shipping</h4>
            <p>
               <strong>Address:</strong>
               {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
               {cart.shippingAddress.zipCode},{' '}
               {cart.shippingAddress.country}
            </p>
         </div>
         <div>
            <h4>My Cart</h4>
            {cart.cartItems.length === 0 ? <AlertMessage>Your cart is empty.</AlertMessage> : (
               cart.cartItems.map((item, index) => (
                  <div key={index}>
                     <span> image </span>
                     <span> <Link to={`/product/${item.product}`}> {item.name} </Link> </span>
                     <span>{item.qty} </span> <span> ${item.price} </span> <span> {item.qty * item.price} </span>
                  </div>
               )))}
         </div>
         <div>
            <h4>Order Summary</h4>
            <strong> Total </strong><span> ${cart.totalPrice}</span>
         </div>
         <div>
            <button
               type='button'
               disabled={cart.cartItems === 0}
               onClick={placeOrderHandler}
            >Place Order
            </button>
         </div>
      </div >
   );
};

export default Payment
