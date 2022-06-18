import React from 'react';
import PropTypes from 'prop-types';
import './ShopCart.css';

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

  calculate = () => {
    const { products } = this.state;
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total.toFixed(2);
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
    localStorage.setItem('items', JSON.stringify(products));
  }

  removeToCart(item) {
    const { products } = this.state;
    this.setState({
      products: products.map((element) => {
        if (element.id === item) {
          element.quantity -= 1;
        }
        if (element.quantity === 0) {
          this.setState({
            products: products.filter((acc) => acc.quantity !== 0) });
        } return element;
      }),
    });
    const filterNegativeItem = products.filter((element) => element.quantity !== 0);
    this.setState({
      products: filterNegativeItem },
    localStorage.setItem('items', JSON.stringify(filterNegativeItem)));
  }

  render() {
    const { products } = this.state;
    return (
      <div className="container-shopcart">
        {products.length !== 0
          ? (
            <div className="container-shopcart-item">
              {products.map((item) => (
                <div
                  key={ item.id }
                  data-testid="shopping-cart-product-name"
                  className="card card-product image-container-shopcart"
                >
                  <img
                    src={ item.thumbnail }
                    className="card-img-top image-product"
                    alt={ item.title }
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <h5 className="card-title price">
                      R$:
                      { item.price }
                    </h5>
                    <div className="shopcart-buttons">
                      <button
                        data-testid="product-decrease-quantity"
                        type="button"
                        onClick={ () => this.removeToCart(item.id) }
                        className="btn btn-secondary btn-sm"
                      >
                        -
                      </button>
                      <p data-testid="shopping-cart-product-quantity">
                        {item.quantity}
                      </p>
                      <button
                        data-testid="product-increase-quantity"
                        type="button"
                        onClick={ () => this.addToCart(item.id) }
                        className="btn btn-secondary btn-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>)
          : (<h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>)}
        <div className="final-cart">
          <p>
            Total: R$
            {this.calculate()}

          </p>
          <button
            data-testid="checkout-products"
            type="button"
            onClick={ this.redirectCheckout }
            className="btn btn-primary btn-sm"
          >
            Finalizar Carrinho
          </button>
        </div>
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
