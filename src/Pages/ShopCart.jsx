import React from 'react';
import * as api from '../services/api';

class ShopCart extends React.Component {
  render() {
    const results = JSON.parse(localStorage.getItem('items'));
    return (
      <div>
        {results !== null
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
                  <p data-testid="shopping-cart-product-quantity">
                    {item.quantity}
                  </p>
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
