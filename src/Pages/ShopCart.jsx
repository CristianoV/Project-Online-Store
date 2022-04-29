import React from 'react';

class ShopCart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: '',
      quantity: '',
    };
  }

  componentDidMount() {
    const results = JSON.parse(localStorage.getItem('items'));
    this.setState({ products: results });
  }

  addToCart(item) {
    // console.log('10');
    const { products } = this.state;
    // console.log(products);
    const product = products.find((items) => items.id === item);
    console.log(product);
    // console.log(product);
    this.setState((prevState) => ({
      quantity: prevState.products.find((items) => items.id === item).quantity++,
    }));
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
                    type="button"
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
