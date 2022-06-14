import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './CardShow.module.css';

export default class CardShow extends React.Component {
  render() {
    const { title, thumbnail, price, id,
      information, putElementCart, frete } = this.props;
    return (
      <article data-testid="product" className={ `card ${style.container}` }>
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
          <img src={ thumbnail } className="card-img-top" alt={ title } />
          <div className="card-body">
            <h5 className="card-title">{ title }</h5>
            <p className="card-text">
              R$
              { price.toFixed(2) }
            </p>
            {frete
            && <p data-testid="free-shipping" className="card-text">FRETE GRATIS</p>}
          </div>
        </Link>
        <button
          type="submit"
          className="btn btn-primary"
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
