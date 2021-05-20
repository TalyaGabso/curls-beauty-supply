import React from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/user.action';
// Pages
// Components
// CSS
import './navbar.css'

const Navbar = () => {
   const dispatch = useDispatch()

   const userLogin = useSelector(state => state.userLogin);
   const { userInfo } = userLogin;

   const logoutHandler = () => {
      dispatch(logout())
   };

   return (
      <nav className="navbar-container">
         <ul className="left-navbar-list">
            <li className="left-navbar-logo"><Link to="/">LOGO</Link></li>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/shop">SHOP</Link></li>
            <li><Link to="/about">ABOUT</Link></li>
            {/* <li>BLOG</li>
            <li>FAQ</li>
            <li>CONTACT</li> */}
         </ul>
         <ul className="right-navbar-list">
            <li><Link to="/">SEARCH</Link></li>
            {userInfo ? (
               <li>
                  <ul>
                     <li><Link to="/account">ACCOUNT</Link></li>
                     <li><Link to='/' onClick={logoutHandler}>LOGOUT</Link> </li>
                  </ul>
               </li>
            ) : (
               <li><Link to="/login">LOGIN</Link></li>
            )}
            <li><Link to="/cart">CART</Link></li>
         </ul>
      </nav>
   );
};

export default Navbar;