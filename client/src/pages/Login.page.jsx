import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/user.action';
// Pages
// Components
import Form from '../components/Form/Form.component';
// CSS
import Loader from '../UI/Loader/Loader.component';
import AlertMessage from '../UI/Alert/Alert.component';

const Login = ({ location, history }) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const dispatch = useDispatch();

   const userLogin = useSelector(state => state.userLogin);
   const { loading, error, userInfo } = userLogin;

   const redirect = location.search ? location.search.split('=')[1] : '/';
   useEffect(() => {
      if (userInfo) {
         history.push(redirect);
      };
   }, [history, userInfo, redirect]);

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password));
      if (userInfo) {
         history.push('/');
      };
   };

   return (
      <Form>
         <h1>Sign In</h1>
         {error && <AlertMessage>{error}</AlertMessage>}
         {loading && <Loader />}
         <form onSubmit={submitHandler}>
            <div className="flex">
               <label className="form-lbl" htmlFor="email"> Email Address </label>
               <input
                  className="form-input"
                  type="email"
                  id="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div className="flex">
               <label className="form-lbl" htmlFor="password"> Password </label>
               <input
                  className="form-input"
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <button className="form-btn" type="submit">Sign In</button>
         </form>
         <div>Don't have an account? <Link to={redirect
            ? `/register?redirect=${redirect}`
            : '/register'}> Sign Up </Link>
         </div>
      </Form>
   );
};
export default Login;