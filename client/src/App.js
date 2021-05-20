import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Pages
import HomePage from './pages/Home.page';
import ShopPage from './pages/Shop.page';
import ProductPage from './pages/Product.page';
import CartPage from './pages/Cart.page';
import Shipping from './pages/Shipping.page'
import PlaceOrder from './pages/PlaceOrder.page'
import LoginPage from './pages/Login.page';
import RegisterPage from './pages/Register.page';
import ProfilePage from './pages/Profile.page';
// Components
import Header from './components/Header/Header.component';
import Footer from './components/Footer/Footer.component';
// CSS

import './App.css'

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/shop' exact component={ShopPage} />
          <Route path={`/shop/product/:id`} exact component={ProductPage} />
          <Route path='/account' exact component={ProfilePage} />
          <Route path='/login' exact component={LoginPage} />
          <Route path='/register' exact component={RegisterPage} />
          <Route path='/cart/:id?' component={CartPage} />
          <Route path='/checkout/shipping' component={Shipping} />
          <Route path='/checkout/place_order' component={PlaceOrder} />
          {/* <Route path='/blog' exact component={BlogPage} /> */}
          {/* <Route path='/FQA' exact component={FQAPage} /> */}
          {/* <Route path='/about' exact component={AboutPage} /> */}
          {/* <Route path='/contact' exact component={ContactPage} /> */}
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
