import React from 'react';

class ShopCart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: '',
    };
  }

  componentDidMount() {
    const results = JSON.parse(localStorage.getItem('items'));
    this.setState({ products: results });
  }

  addToCart(item) {
    const { products } = this.state;
    this.setState({
      products: products.map((element) => {
        if (element.id === item) {
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
        } return element;
      }),
    });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        {products
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

export default ShopCart;
