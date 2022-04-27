import React from 'react';
import { Link } from 'react-router-dom';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="mainpage">
          <input
            type="text"
            id="mainpage"
          />
        </label>
        <Link data-testid="shopping-cart-button" to="/shopcart">
          {/* <img src="https://w7.pngwing.com/pngs/304/721/png-transparent-graphy-shopping-cart-computer-icons-web-button-thumbnail.png" alt="carrinho" /> */}
          carrinho
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

      </div>
    );
  }
}

export default MainPage;
