import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class CardDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      product: '',
      email: '',
      radio: '',
      textarea: '',
      comments: '',
      quantidade: this.cartDetails(),
      // quantidade: 0,
    };
  }

  async componentDidMount() {
    await this.product();
    this.comments();
    // this.cartDetails();
  }

  textClear = () => {
    this.setState({ email: '',
      radio: '',
      textarea: '' });
  }

  cartDetails = () => {
    const results = JSON.parse(localStorage.getItem('items'));
    if (results) {
      const quantity = results.map((acc) => acc.quantity);
      const quantityTotal = quantity.reduce((acc, elemento) => acc + elemento);
      // this.setState({ quantidade: quantityTotal });
      return quantityTotal;
    }
    return 0;
  }

    product = async () => {
      const { match: { params: { id } } } = this.props;
      const detail = await api.getProductDetail(id);
      this.setState({ product: detail });
    }

    comments = () => {
      const results = JSON.parse(localStorage.getItem('comments'));
      this.setState({ comments: results });
    }

    putCardDetails = (item) => {
      let addProductSelected = JSON.parse(localStorage.getItem('items')) || [];
      const cartProduct = addProductSelected.find((product) => product.id === item.id);
      if (cartProduct) {
        addProductSelected = addProductSelected.map((element) => {
          if (element.id === item.id) {
            element.quantity += 1;
            return element;
          } return element;
        });
      } else {
        item.quantity = 1;
        addProductSelected.push(item);
      }
      localStorage.setItem('items', JSON.stringify(addProductSelected));
      this.cartDetails();
    }

    commentsSave = () => {
      const { email, radio, textarea, product } = this.state;
      const coment = { email,
        radio,
        textarea,
        id: product.id };
      if (localStorage.getItem('comments') !== null) {
        const addProductSelected = JSON.parse(localStorage.getItem('comments'));
        console.log(addProductSelected);
        addProductSelected.push(coment);
        localStorage.setItem('comments', JSON.stringify(addProductSelected));
      } else {
        const addProductSelected = [coment];
        localStorage.setItem('comments', JSON.stringify(addProductSelected));
      }
      this.comments();
      this.textClear();
    }

    handleChange =({ target }) => {
      const { type, value, id } = target;
      return type === 'radio' ? this.setState({ [type]: id })
        : this.setState({ [type]: value });
    }

    render() {
      const { product, email, radio, textarea, comments, quantidade } = this.state;

      return (
        <>
          <div>
            <Link data-testid="shopping-cart-button" to="/shopcart">
              {/* <img src="https://w7.pngwing.com/pngs/304/721/png-transparent-graphy-shopping-cart-computer-icons-web-button-thumbnail.png" alt="carrinho" /> */}
              <p data-testid="shopping-cart-size">
                {quantidade}
              </p>
            </Link>
          </div>
          <div>
            <p data-testid="product-detail-name">{product.title}</p>
            <img src={ product.thumbnail } alt={ product.title } />
            <p>{product.price}</p>
            {product.shipping?.free_shipping
            && <p data-testid="free-shipping">FRETE GRATIS</p>}
            <button
              type="submit"
              onClick={ () => this.putCardDetails(product) }
              data-testid="product-detail-add-to-cart"
            >
              Adicionar ao carrinho
            </button>
            <form>
              <label htmlFor="emailInput">
                Email
                <input
                  type="email"
                  name=""
                  required
                  id="emailInput"
                  data-testid="product-detail-email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
              <input
                type="radio"
                name="avaliacao"
                id="1"
                required
                data-testid="1-rating"
                onChange={ this.handleChange }
                value={ radio }
              />
              <input
                type="radio"
                name="avaliacao"
                id="2"
                required
                data-testid="2-rating"
                onChange={ this.handleChange }
                value={ radio }
              />
              <input
                type="radio"
                name="avaliacao"
                id="3"
                required
                data-testid="3-rating"
                onChange={ this.handleChange }
                value={ radio }
              />
              <input
                type="radio"
                name="avaliacao"
                id="4"
                required
                data-testid="4-rating"
                onChange={ this.handleChange }
                value={ radio }
              />
              <input
                type="radio"
                name="avaliacao"
                id="5"
                required
                data-testid="5-rating"
                onChange={ this.handleChange }
                value={ radio }
              />
              <label htmlFor="comentario">
                Avaliações
                <textarea
                  name=""
                  id="comentario"
                  cols="30"
                  required
                  rows="10"
                  value={ textarea }
                  data-testid="product-detail-evaluation"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                data-testid="submit-review-btn"
                onClick={ () => this.commentsSave() }
              >
                Avaliar
              </button>
            </form>
            {comments && comments.map((comment, index) => {
              let coment;
              if (comment.id === product.id) {
                coment = (
                  <div key={ index }>
                    <p>{comment.email}</p>
                    <p>{comment.radio}</p>
                    <p>{comment.textarea}</p>
                  </div>
                );
              } return coment;
            })}
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
