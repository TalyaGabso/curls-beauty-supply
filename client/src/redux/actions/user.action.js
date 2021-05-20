import axios from 'axios';
import {
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_REGISTER_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGIN_FAIL,
   USER_PROFILE_REQUEST,
   USER_PROFILE_SUCCESS,
   USER_PROFILE_FAIL,
   USER_UPDATE_PROFILE_REQUEST,
   USER_UPDATE_PROFILE_SUCCESS,
   USER_UPDATE_PROFILE_FAIL,
   USER_LOGOUT,
} from '../constants/user.constant';

export const login = (email, password) => async (dispatch) => {
   try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };
      const { data } = await axios.post(
         '/api/users/login',
         { email, password },
         config
      );
      console.log('USER LOGIN - DATA: ', data);

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data
      });

      localStorage.setItem('User Info', JSON.stringify(data))
   } catch (err) {
      console.log('USER LOGIN - ERROR: ', err.response);
      dispatch({
         type: USER_LOGIN_FAIL,
         payload: err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
   };
};

export const logout = () => async (dispatch) => {
   localStorage.removeItem('Cart Item');
   localStorage.removeItem('User Info');
   dispatch({ type: USER_LOGOUT });
};

export const register = (firstName, lastName, email, password) => async (dispatch) => {
   try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };
      const { data } = await axios.post(
         '/api/users/register',
         { firstName, lastName, email, password },
         config
      );
      console.log('USER REGISTER - DATA: ', data);
      dispatch({
         type: USER_REGISTER_SUCCESS,
         payload: data
      });

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data
      });

      localStorage.setItem('User Info', JSON.stringify(data))
   } catch (err) {
      console.log('USER REGISTER - ERROR: ', err.response);
      dispatch({
         type: USER_REGISTER_FAIL,
         payload: err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
   };
};

export const profile = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: USER_PROFILE_REQUEST });

      const { userLogin: { userInfo } } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
         }
      };

      const { data } = await axios.get('/api/users/account', config);
      console.log('USER PROFILE - DATA: ', data);

      dispatch({
         type: USER_PROFILE_SUCCESS,
         payload: data
      });

   } catch (err) {
      console.log('USER PROFILE - ERROR: ', err.response);
      dispatch({
         type: USER_PROFILE_FAIL,
         payload: err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
   };
};

export const updateProfile = (user) => async (dispatch, getState) => {
   try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

      const { userLogin: { userInfo } } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
         }
      };
      const { data } = await axios.get(
         '/api/users/account/update',
         user,
         config
      );
      console.log('USER UPDATE PROFILE - DATA: ', data);

      dispatch({
         type: USER_UPDATE_PROFILE_SUCCESS,
         payload: data
      });
      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data
      });

      localStorage.setItem('User Info', JSON.stringify(data));
   } catch (err) {
      console.log('USER UPDATE PROFILE - ERROR: ', err.response);
      console.log('USER UPDATE PROFILE - ERROR DATA: ', err.response.data);
      dispatch({
         type: USER_UPDATE_PROFILE_FAIL,
         payload: err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
   };
};