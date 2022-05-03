import React from 'react';
import PropTypes from 'prop-types';

class ShopCart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const results = JSON.parse(localStorage.getItem('items'));
    if (results !== null) {
      this.setState({ products: results });
    }
  }

  redirectCheckout = () => {
    const { history } = this.props;
    history.push('/finishCart');
  }

  addToCart(item) {
    const { products } = this.state;
    this.setState({
      products: products.map((element) => {
        if (element.id === item && element.quantity !== element.available_quantity) {
          element.quantity += 1;
        } return element;
      }),
    });
  }

  removeToCart(item) {
    const { products } = this.state;
    this.setState({
      products: products.map((element) => {
        if (element.id === item) {
          element.quantity -= 1;
          if (element.quantity === 0) {
            this.setState({
              products: products.filter((acc) => acc.quantity !== 0) });
          }
        } return element;
      }),
    });
    this.setState({
      products: products.filter((element) => element.quantity !== 0) });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <button
          data-testid="checkout-products"
          type="button"
          onClick={ this.redirectCheckout }
        >
          Finalizar Carrinho
        </button>
        {products.length !== 0
          ? (
            <div>
              {products.map((item) => (
                <div
                  key={ item.id }
                  data-testid="shopping-cart-product-name"
                >
                  <p>{item.title}</p>
                  <img src={ item.thumbnail } alt={ item.title } />
                  <p>{ item.price }</p>
                  <button
                    data-testid="product-increase-quantity"
                    type="button"
                    onClick={ () => this.addToCart(item.id) }
                  >
                    +
                  </button>
                  <p data-testid="shopping-cart-product-quantity">
                    {item.quantity}
                  </p>
                  <button
                    data-testid="product-decrease-quantity"
                    type="button"
                    onClick={ () => this.removeToCart(item.id) }
                  >
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

ShopCart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default ShopCart;
