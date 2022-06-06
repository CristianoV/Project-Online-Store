import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './CardShow.module.css';

export default class CardShow extends React.Component {
  render() {
    const { title, thumbnail, price, id,
      information, putElementCart, frete } = this.props;
    return (
      <article data-testid="product" className={ style.container }>
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
          <p>
            R$
            { price.toFixed(2) }
          </p>
        </Link>
        {frete
            && <p data-testid="free-shipping">FRETE GRATIS</p>}
        <button
          type="submit"
          onClick={ () => putElementCart(id) }
          data-testid="product-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </article>

    );
  }
}
CardShow.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,

}.isRequired;
