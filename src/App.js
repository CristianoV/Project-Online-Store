import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import ShopCart from './Pages/ShopCart';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ MainPage } />
            <Route path="/shopcart" component={ ShopCart } />
          </Switch>
        </BrowserRouter>
      </div>

    );
  }
}
export default App;
