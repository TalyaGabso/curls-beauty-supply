import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productInfoReducer } from './reducers/product.reducer';
import { cartReducer } from './reducers/cart.reducer';
import { userLoginReducer, userProfileReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/user.reducer';

const reducer = combineReducers({
   productList: productListReducer,
   productInfo: productInfoReducer,
   cart: cartReducer,
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   userProfile: userProfileReducer,
   userUpdateProfile: userUpdateProfileReducer
});

const cartStorage = localStorage.getItem('Cart Items') ? JSON.parse(localStorage.getItem('Cart Items')) : [];
const userStorage = localStorage.getItem('User Info') ? JSON.parse(localStorage.getItem('User Info')) : null;
const shippingAddressStorage = localStorage.getItem('Shipping Address') ? JSON.parse(localStorage.getItem('Shipping Address')) : {};

const initialState = {
   cart: { cartItems: cartStorage, shippingAddress: shippingAddressStorage },
   userLogin: { userInfo: userStorage },
};

console.log('STORE - INITIONAL STATE: ', initialState);
const middleware = [thunk];

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
);

export default store;