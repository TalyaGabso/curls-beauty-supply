import axios from 'axios';
import {
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   PRODUCT_LIST_FAIL, PRODUCT_INFO_REQUEST,
   PRODUCT_INFO_SUCCESS,
   PRODUCT_INFO_FAIL
} from '../constants/product.constant';

export const listProducts = () => async (dispatch) => {
   try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get('/api/products/all');
      console.log('ACTIONS LIST PRODUCTS - DATA: ', data);
      dispatch({
         type: PRODUCT_LIST_SUCCESS,
         payload: data
      });

   } catch (err) {
      console.log('ACTIONS LIST PRODUCTS - ERROR: ', err);
      dispatch({
         type: PRODUCT_LIST_FAIL,
         payload: err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
   };
};

export const infoProduct = (id) => async (dispatch) => {
   try {
      dispatch({ type: PRODUCT_INFO_REQUEST });
      const { data } = await axios.get(`/api/products/product/${id}`);
      console.log('ACTIONS INFO PRODUCTS - DATA: ', data);

      dispatch({
         type: PRODUCT_INFO_SUCCESS,
         payload: data
      });

   } catch (err) {
      console.log('ACTIONS INFO PRODUCTS - ERROR: ', err);
      dispatch({
         type: PRODUCT_INFO_FAIL,
         payload: err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
   };
};