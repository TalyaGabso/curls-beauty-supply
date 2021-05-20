// import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cart.constant';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cart.constant';

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
   switch (action.type) {
      case CART_ADD_ITEM:
         const item = action.payload;

         const isInCart = state.cartItems.find(selectedItem => selectedItem.product === item.product);

         if (isInCart) {
            return {
               ...state,
               cartItems: [...state.cartItems, item].map(selectedItem =>
                  selectedItem.product === isInCart.product ? item : selectedItem)
            };
         }
         else {
            return {
               ...state,
               cartItems: [...state.cartItems, item]
            };
         };
      case CART_REMOVE_ITEM:
         return {
            ...state,
            cartItems: state.cartItems.filter(selectedItem => selectedItem.product !== action.payload),
         };
      case CART_SAVE_SHIPPING_ADDRESS:
         return {
            ...state,
            shippingAddress: action.payload,
         };

      default: return state;
   };
};