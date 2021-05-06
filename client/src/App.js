import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
// import User from './components/User.component';
import HomePage from './components/HomePage.component';

const App = () => {
  return (
    <Router>
      <Route exact path='/' component={HomePage} />
    </Router>
  );
};

export default App;
