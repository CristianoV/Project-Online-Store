import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardShow extends React.Component {
  handleClick = (id) => {
    const productSelected = [localStorage.getItem('cartItems')];
    productSelected.push(id);
    localStorage.setItem('cartItems', productSelected);
    console.log(id);
  }

  render() {
    const { title, thumbnail, price, id, information } = this.props;
    return (
      <div data-testid="product">
        <Link
          key={ id }
          data-testid="product-detail-link"
          to={ {
            pathname: `/product/${id}`,
            state: {
              information,
            },
          } }
        >
          <p>{ title }</p>
          <img src={ thumbnail } alt={ title } />
          <p>{ price }</p>
        </Link>
        <button
          type="submit"
          onClick={ () => this.handleClick(id) }
          data-testid="product-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </div>

    );
  }
}
CardShow.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,

}.isRequired;
