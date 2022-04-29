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

  handleClickCat = async (id) => {
    const categoryList = await api.getProductsFromCategoryAndQuery(id, null);
    this.setState({
      productsList: categoryList.results,
    });
  }

  /*   handleClickToCart = async (id) => {
      if (localStorage.getItem('items') !== null) {
        const item = await api.getProductDetail(id);
        item.quantity = 1;
        const addProductSelected = JSON.parse(localStorage.getItem('items'));
        addProductSelected.push(item);
        localStorage.setItem('items', JSON.stringify(addProductSelected));
      } else {
        const item = await api.getProductDetail(id);
        item.quantity = 1;
        const addProductSelected = [item];
        localStorage.setItem('items', JSON.stringify(addProductSelected));
      }
    } */

  handleClickToCart = (item) => {
    if (localStorage.getItem('items') !== null) {
      item.quantity = 1;
      const addProductSelected = JSON.parse(localStorage.getItem('items'));
      addProductSelected.push(item);
      localStorage.setItem('items', JSON.stringify(addProductSelected));
    } else {
      item.quantity = 1;
      const addProductSelected = [item];
      localStorage.setItem('items', JSON.stringify(addProductSelected));
    }
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
        <Categories
          handleClickCat={ this.handleClickCat }
        />
        <div>
          { productsList.length !== 0 && productsList.map((product) => (
            <CardShow
              key={ product.title }
              title={ product.title }
              thumbnail={ product.thumbnail }
              price={ product.price }
              id={ product.id }
              /* putElementCart={ this.handleClickToCart } */
              putElementCart={ () => this.handleClickToCart(product) }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default MainPage;
