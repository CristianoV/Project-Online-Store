/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import './CardDetails.css';
import InputComment from '../componentes/InputComment';

class CardDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      product: '',
      email: '',
      radio: '',
      textarea: '',
      comments: '',
      quantidade: 0,
    };
  }

  async componentDidMount() {
    await this.product();
    this.comments();
    this.cartDetails();
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
      this.setState({ quantidade: quantityTotal });
    }
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
      const { price } = product;
      const { pictures, attributes } = product;
      console.log(attributes);

      return (
        <div className="CardDetail-container">
          <div>
            <Link data-testid="shopping-cart-button" to="/shopcart">
              {/* <img src="https://w7.pngwing.com/pngs/304/721/png-transparent-graphy-shopping-cart-computer-icons-web-button-thumbnail.png" alt="carrinho" /> */}
              <p data-testid="shopping-cart-size">
                <i className="bi bi-cart">
                  {quantidade}
                </i>
              </p>
            </Link>
          </div>
          <div className="slides-container">
            <p data-testid="product-detail-name">{product.title}</p>
            { pictures
              ? (
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    { pictures.map((picture, index) => (
                      <div
                        key={ index }
                        className={ `carousel-item ${index === 0 ? 'active' : ''}` }
                      >
                        <img
                          src={ picture.secure_url }
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>)
              : (
                <div className="spinner-border text-secondary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>)}
            <p>
              R$:
              { price && price.toFixed(2)}
            </p>
            {product.shipping?.free_shipping
            && <p data-testid="free-shipping">FRETE GRATIS</p>}
            <button
              type="submit"
              onClick={ () => this.putCardDetails(product) }
              data-testid="product-detail-add-to-cart"
              className="btn btn-primary"
            >
              Adicionar ao carrinho
            </button>
            <div className="specs">
              <div className="attributes-container">
                <p>Atributos:</p>
                {attributes
            && attributes.map((attribute, index) => (
              <div key={ index }>
                <p>
                  {attribute.name}
                  :
                  {attribute.value_name}
                </p>
              </div>
            ))}
              </div>
              <form>
                <label htmlFor="emailInput">
                  Email
                  <input
                    type="email"
                    name=""
                    required
                    id="emailInput"
                    className="form-control"
                    data-testid="product-detail-email"
                    value={ email }
                    onChange={ this.handleChange }
                  />
                </label>
                <InputComment radio={ radio } handleChange={ this.handleChange } />
                <div>
                  <label htmlFor="comentario">
                    Avaliações
                    <textarea
                      name=""
                      id="comentario"
                      className="form-control"
                      cols="30"
                      required
                      rows="10"
                      value={ textarea }
                      data-testid="product-detail-evaluation"
                      onChange={ this.handleChange }
                    />
                  </label>
                </div>
                <button
                  type="button"
                  data-testid="submit-review-btn"
                  onClick={ () => this.commentsSave() }
                >
                  Avaliar
                </button>
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
              </form>
            </div>
          </div>
        </div>
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
