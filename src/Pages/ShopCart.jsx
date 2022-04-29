import React from 'react';
import * as api from '../services/api';

class ShopCart extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.listProducts();
  }

  listProducts = () => {
    let listItems = localStorage.getItem('cartItems');
    listItems = listItems.split(',');
    const items = [];
    listItems.map(async (id) => {
      const item = await api.getProductDetail(id);
      items.push(item);
      this.setState({ results: items });
    });
  }

  render() {
    const { results } = this.state;
    return (
      <div>
        {results.length !== 0
          ? (
            <div>
              {results.map((item) => (
                <div
                  key={ item.id }
                  data-testid="shopping-cart-product-name"
                >
                  <p>{item.title}</p>
                  <img src={ item.thumbnail } alt={ item.title } />
                  <p>{ item.price }</p>
                  <button type="button">
                    +
                  </button>
                  <p data-testid="shopping-cart-product-quantity">1</p>
                  <button type="button">
                    -
                  </button>
                </div>
              ))}
            </div>)
          : (<h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>)}
      </div>
    );
  }
}

export default ShopCart;
