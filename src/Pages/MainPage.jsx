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
      quantidade: 0,
    };
  }

  componentDidMount() {
    this.cartDetails();
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

  cartDetails = () => {
    const results = JSON.parse(localStorage.getItem('items'));
    if (results) {
      const quantity = results.map((acc) => acc.quantity);
      const quantityTotal = quantity.reduce((acc, elemento) => acc + elemento);
      this.setState({ quantidade: quantityTotal });
    }
  }

  handleClickToCart = (item) => {
    let addProductSelected = JSON.parse(localStorage.getItem('items')) || [];
    const cartProduct = addProductSelected.find((product) => product.id === item.id);
    if (cartProduct) {
      addProductSelected = addProductSelected.map((element) => {
        if (element.id === item.id) {
          element.quantity += 1;
          return element;
        } return element;
      });
    } else {
      item.quantity = 1;
      addProductSelected.push(item);
    }
    localStorage.setItem('items', JSON.stringify(addProductSelected));
    this.cartDetails();
  }

  render() {
    const { productSearch, productsList, quantidade } = this.state;
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
          <p data-testid="shopping-cart-size">
            {quantidade}
          </p>
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
              frete={ product.shipping.free_shipping }
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
