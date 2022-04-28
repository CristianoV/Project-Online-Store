import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class CardDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      product: '',
    };
  }

  async componentDidMount() {
    await this.product();
  }

    product = async () => {
      const { match: { params: { id } } } = this.props;
      const detail = await api.getProductDetail(id);
      this.setState({ product: detail });
    }

    render() {
      const { product } = this.state;

      return (
        <>
          <div>
            <Link data-testid="shopping-cart-button" to="/shopcart">
              {/* <img src="https://w7.pngwing.com/pngs/304/721/png-transparent-graphy-shopping-cart-computer-icons-web-button-thumbnail.png" alt="carrinho" /> */}
              carrinho
            </Link>
          </div>
          <div>
            <p data-testid="product-detail-name">{product.title}</p>
            <img src={ product.thumbnail } alt={ product.title } />
            <p>{product.price}</p>
          </div>

        </>

      );
    }
}
CardDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default CardDetails;
