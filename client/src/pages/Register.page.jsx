import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/user.action';
// Pages
// Components
import Form from '../components/Form/Form.component';
// CSS
import Loader from '../UI/Loader/Loader.component';
import AlertMessage from '../UI/Alert/Alert.component';

const Register = ({ location, history }) => {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [message, setMessage] = useState(null);

   const dispatch = useDispatch();

   const userRegister = useSelector(state => state.userRegister);
   const { loading, error, userInfo } = userRegister;

   const redirect = location.search ? location.search.split('=')[1] : '/';

   useEffect(() => {
      if (userInfo) {
         history.push(redirect);
      };
   }, [history, userInfo, redirect]);

   const submitHandler = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
         setMessage('Confirm Password Do Not Match Your Password ');
      } else {
         dispatch(register(firstName, lastName, email, password));
      };
   };

   return (
      <Form>
         <h1>Sing Up</h1>
         {message && <AlertMessage>{message}</AlertMessage>}
         {error && <AlertMessage>{error}</AlertMessage>}
         {loading && <Loader />}
         <form onSubmit={submitHandler}>
            <div>
               <label htmlFor="firstName">Name</label>
               <input
                  type="firstName"
                  id="firstName"
                  placeholder="Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
               />
            </div>
            <div>
               <label htmlFor="lastName">Last Name</label>
               <input
                  type="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
               />
            </div>
            <div>
               <label htmlFor="email"> Email Address </label>
               <input
                  type="email"
                  id="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div>
               <label htmlFor="password"> Password </label>
               <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <div>
               <label htmlFor="confirmPassword"> Confirm Password </label>
               <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
               />
            </div>
            <button type="submit">Sing In</button>
         </form>
         <div>Have an account? <Link to={redirect
            ? `/login?redirect=${redirect}`
            : '/login'}> Login </Link>
         </div>
      </Form>
   );
};
export default Register;