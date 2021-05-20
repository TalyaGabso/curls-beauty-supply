import React, { useState } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../redux/actions/cart.action';
// component
import Form from '../components/Form/Form.component';
import Checkout from '../components/Checkout/Checkout.component';


const Shipping = ({ history }) => {

   const cart = useSelector((state) => state.cart)
   const { shippingAddress } = cart

   const [address, setAddress] = useState(shippingAddress.address)
   const [city, setCity] = useState(shippingAddress.city)
   const [zipCode, setZipCode] = useState(shippingAddress.zipCode)
   const [country, setCountry] = useState(shippingAddress.country)

   const dispatch = useDispatch();

   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(saveShippingAddress({ address, city, zipCode, country }))
      history.push('/checkout/place_order')
   }
   return (
      <div>
         <h1>Checkout</h1>
         <Form>
            <h3>Shipping</h3>
            <Checkout step1 step2 />
            <form onSubmit={submitHandler}>
               <div>
                  <label htmlFor="address"> Address </label>
                  <input
                     type="text"
                     id="address"
                     placeholder="Enter Address"
                     value={address}
                     required
                     onChange={(e) => setAddress(e.target.value)}
                  />
               </div>
               <div>
                  <label htmlFor="city"> City </label>
                  <input
                     type="text"
                     id="city"
                     placeholder="Enter City"
                     value={city}
                     required
                     onChange={(e) => setCity(e.target.value)}
                  />
               </div>
               <div>
                  <label htmlFor="zipCode"> Zip Code </label>
                  <input
                     type="text"
                     id="zipCode"
                     placeholder="Enter Zip Code"
                     value={zipCode}
                     required
                     onChange={(e) => setZipCode(e.target.value)}
                  />
               </div>
               <div>
                  <label htmlFor="country"> Country </label>
                  <input
                     type="text"
                     id="country"
                     placeholder="Enter Country"
                     value={country}
                     required
                     onChange={(e) => setCountry(e.target.value)}
                  />
               </div>
               <button type="submit">Continue to Place Order</button>
            </form>
         </Form>
      </div>
   );
};

export default Shipping
