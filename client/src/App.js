// React
import React from 'react';
// Pages
import SignIn from './pages/signin';
import Home from './pages/home';
import Coffee from './pages/coffee';
import SignUp from './pages/signup';
import Cart from './pages/user/cart';
import Checkout from './pages/user/chekcout';
import Category from './pages/admin/category';
// Components
import Menu from './components/Navigation/Menu';
// Utils
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {UserAuth} from './components/Middleware/Auth';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/coffee">
            <UserAuth>
              <Coffee />
            </UserAuth>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/cart">
            <UserAuth>
              <Cart />
            </UserAuth>
          </Route>
          <Route path="/checkout">
            <UserAuth>
              <Checkout />
            </UserAuth>
          </Route>
          <Route path="/category">
            <UserAuth>
              <Category />
            </UserAuth>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
