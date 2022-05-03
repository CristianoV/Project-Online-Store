import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import ShopCart from './Pages/ShopCart';
import CardDetails from './Pages/CardDetails';
import FinishCart from './Pages/FinishCart';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ MainPage } />
            <Route path="/shopcart" component={ ShopCart } />
            <Route path="/product/:id" component={ CardDetails } />
            <Route path="/finishCart" component={ FinishCart } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
