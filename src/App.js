import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import ShopCart from './Pages/ShopCart';
import CardDetails from './Pages/CardDetails';
import FinishCart from './Pages/FinishCart';
import Header from './componentes/Header';
import Nav from './componentes/Nav';

class App extends React.Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Header />
          <Nav />
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
        </HashRouter>
      </div>
    );
  }
}
export default App;
