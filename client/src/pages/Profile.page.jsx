import React, { useEffect, useState } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { profile, updateProfile } from '../redux/actions/user.action';
// Pages
// Components

// CSS
import Loader from '../UI/Loader/Loader.component';
import AlertMessage from '../UI/Alert/Alert.component';

const Profile = ({ history }) => {
   const dispatch = useDispatch();

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [message, setMessage] = useState(null);

   const userProfile = useSelector(state => state.userProfile);
   const { loading, error, user } = userProfile;

   const userLogin = useSelector(state => state.userLogin);
   const { userInfo } = userLogin;

   const userUpdateProfile = useSelector(state => state.userUpdateProfile);
   const { success } = userUpdateProfile;

   useEffect(() => {
      if (!userInfo) {
         history.push('/login');
      } else {
         dispatch(profile('account'))
         setFirstName(user.firstName);
         setLastName(user.lastName);
         setEmail(user.email);
      };
   }, [userInfo, history, dispatch]);

   const submitHandler = (e) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
         setMessage('Confirm Password Do Not Match Your Password ');
      } else {
         dispatch(updateProfile({ id: user._id, firstName, lastName, email, newPassword }));
      };
   };

   return (
      <div>
         <div>
            <h2>Account Profile</h2>
            {message && <AlertMessage>{message}</AlertMessage>}
            {error && <AlertMessage>{error}</AlertMessage>}
            {success && <AlertMessage>{success}</AlertMessage>}
            {loading && <Loader />}
            <div>
               <p>Name: {firstName}</p>
               <p>Last Name: {lastName}</p>
               <p>Email: {email}</p>
               <p>Shipping Address: </p>
            </div>
            <form action="submit" onSubmit={submitHandler}>
               <span>Update Account</span>
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
                  <label htmlFor="newPassword"> New Password </label>
                  <input
                     type="newPassword"
                     id="newPassword"
                     placeholder="Enter New Password"
                     value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)}
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
               <button type="submit">Update</button>
            </form>
         </div>
         <div>
            <h2>MY ORDERS</h2>
         </div>
      </div>
   );
};
export default Profile;