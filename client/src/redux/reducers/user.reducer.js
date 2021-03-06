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
   USER_UPDATE_PROFILE_RESET,
   USER_LOGOUT,
} from '../constants/user.constant';

export const userLoginReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_LOGIN_REQUEST:
         return { loading: true };
      case USER_LOGIN_SUCCESS:
         return { loading: false, userLogin: action.payload };
      case USER_LOGIN_FAIL:
         return { loading: false, error: action.payload };
      case USER_LOGOUT:
         return {};
      default:
         return state
   };
};

export const userRegisterReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_REGISTER_REQUEST:
         return { loading: true };
      case USER_REGISTER_SUCCESS:
         return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
         return { loading: false, error: action.payload };

      default:
         return state
   };
};

export const userProfileReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case USER_PROFILE_REQUEST:
         return { ...state, loading: true };
      case USER_PROFILE_SUCCESS:
         return { loading: false, user: action.payload.user };
      case USER_PROFILE_FAIL:
         return { loading: false, error: action.payload };

      default:
         return state
   };
};

export const userUpdateProfileReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
         return { loading: true };
      case USER_UPDATE_PROFILE_SUCCESS:
         return { loading: false, success: true, userInfo: action.payload };
      case USER_UPDATE_PROFILE_FAIL:
         return { loading: false, error: action.payload };
      case USER_UPDATE_PROFILE_RESET:
         return {};

      default:
         return state
   };
};