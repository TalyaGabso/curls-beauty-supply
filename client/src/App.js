import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
// import User from './components/User.component';
import HomePage from './pages/HomePage.component';
import Header from './components/Header.component';
import Footer from './components/Footer.component';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <div className='route-container'>
          <Route exact path='/' component={HomePage} />
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
