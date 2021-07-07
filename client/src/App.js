import React from 'react';
import './App.css';
import RecipesComponent from './components/RecipesComponent';
import Navbar from './components/Navbar/Navbar';
import SignupForm from './components/SignupForm/Form';
import LoginForm from './components/LoginForm/Form';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import UserScreen from './components/screens/UserScreen';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/user" component={UserScreen} />
          <Route path="/" exact component={RecipesComponent} />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/register-screen" component={RegisterScreen} />
          <Route path="/login-screen" component={LoginScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
