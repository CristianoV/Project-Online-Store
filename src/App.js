import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import ShopCart from './Pages/ShopCart';
import CardDetails from './Pages/CardDetails';
import FinishCart from './Pages/FinishCart';
import Header from './componentes/Header';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={ MainPage } />
            {/* <Route
              exact
              path="/"
              render={ (props) => (
                <MainPage { ...props }>
                  <Header />
                </MainPage>
              ) }
            /> */}
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
