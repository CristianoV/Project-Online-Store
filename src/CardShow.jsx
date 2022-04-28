import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardShow extends React.Component {
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
      </div>

    );
  }
}
CardShow.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,

}.isRequired;
