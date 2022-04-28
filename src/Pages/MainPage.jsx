import React from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import * as api from '../services/api';
import CardShow from '../CardShow';

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      productSearch: '',
      productsList: [],
    };
  }

  handleChange =({ target }) => {
    this.setState({ productSearch: target.value });
  }

  handleClick = async (param) => {
    const products = await api.getProductsFromCategoryAndQuery(null, param);
    this.setState({
      productSearch: '',
      productsList: products.results,
    });
  }

  render() {
    const { productSearch, productsList } = this.state;
    return (
      <div>
        <label htmlFor="mainpage">
          <input
            data-testid="query-input"
            type="text"
            id="mainpage"
            value={ productSearch }
            onChange={ this.handleChange }
          />
        </label>
        <input
          type="button"
          data-testid="query-button"
          value="pesquisar"
          onClick={ () => this.handleClick(productSearch) }
        />

        <Link data-testid="shopping-cart-button" to="/shopcart">
          {/* <img src="https://w7.pngwing.com/pngs/304/721/png-transparent-graphy-shopping-cart-computer-icons-web-button-thumbnail.png" alt="carrinho" /> */}
          carrinho
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categories />
        <div>
          { productsList.length !== 0 && productsList.map((product) => (
            <CardShow
              key={ product.title }
              title={ product.title }
              thumbnail={ product.thumbnail }
              price={ product.price }
            />
          ))}

        </div>

      </div>
    );
  }
}

export default MainPage;
