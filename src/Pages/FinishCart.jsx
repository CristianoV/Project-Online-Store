import React from 'react';
import PropTypes from 'prop-types';
import CheckoutForm from './CheckoutForm';
import './FinishCart.css';

export default class FinishCart extends React.Component {
  constructor() {
    super();
    this.state = {
      totalPrice: 0,
      fullName: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      paymentMethod: '',
      totalProducts: '',
    };
  }

  componentDidMount() {
    const results = JSON.parse(localStorage.getItem('items'));
    if (results !== null) {
      this.setState({ totalProducts: results }, this.renderFinalPrice(results));
    }
  }

      renderFinalPrice = (products) => {
        const prices = products.map((acc) => acc.price * acc.quantity);
        if (prices.length > 0) {
          const totalPrice = prices.reduce((acc, elemento) => acc + elemento);
          this.setState({ totalPrice: totalPrice.toFixed(2) });
        } else {
          this.setState({ totalPrice: 0.00 });
        }
      }

      handleChange = ({ target }) => {
        const { id, value } = target;
        this.setState({
          [id]: value,
        });
      }

      handleChangeInput = ({ target }) => {
        const { value } = target;
        this.setState({
          paymentMethod: value,
        });
      }

      validateInfos = () => {
        const { fullName, email, cpf, phone, cep, address, paymentMethod } = this.state;
        if (
          fullName.length > 0
          && email.length > 0
          && cpf.length > 0
          && phone.length > 0
          && cep.length > 0
          && address.length > 0
          && paymentMethod.length > 0
        ) {
          this.setState({
            fullName: '',
            email: '',
            cpf: '',
            phone: '',
            cep: '',
            address: '',
            paymentMethod: '',
          });
          localStorage.removeItem('items');
          const { history } = this.props;
          history.push('/');
        } else {
          alert('Preencha todos os campos.');
        }
      }

      render() {
        const { totalPrice } = this.state;
        return (
          <div className="container-finish">
            <form className="mb-3 form-finish">
              <CheckoutForm
                testId="checkout-fullname"
                placeholder="Nome Completo"
                id="fullName"
                onChange={ this.handleChange }
              />
              <CheckoutForm
                testId="checkout-email"
                placeholder="E-mail"
                id="email"
                onChange={ this.handleChange }
              />
              <CheckoutForm
                testId="checkout-cpf"
                placeholder="CPF"
                id="cpf"
                onChange={ this.handleChange }
              />
              <CheckoutForm
                testId="checkout-phone"
                placeholder="Telefone"
                id="phone"
                onChange={ this.handleChange }
              />
              <CheckoutForm
                testId="checkout-cep"
                placeholder="CEP"
                id="cep"
                onChange={ this.handleChange }
              />
              <CheckoutForm
                testId="checkout-address"
                placeholder="Endereço"
                id="address"
                onChange={ this.handleChange }
              />
            </form>
            <div className="price-finishcart">
              <h2>Parcelamento</h2>
              <label htmlFor="price">
                R$:
                {totalPrice}
                <select name="" className="form-select" id="price">
                  <option value="1">
                    1 x
                    {' '}
                    R$:
                    {totalPrice}
                  </option>
                  <option value="2">
                    2 x
                    {' '}
                    R$:
                    {(totalPrice / 2).toFixed(2)}
                  </option>
                  <option value="3">
                    3 x
                    {' '}
                    R$:
                    {(totalPrice / 3).toFixed(2)}
                  </option>
                  <option value="4">
                    4 x
                    {' '}
                    R$:
                    {(totalPrice / 4).toFixed(2)}
                  </option>
                  <option value="5">
                    5 x
                    {' '}
                    R$:
                    {(totalPrice / 5).toFixed(2)}
                  </option>
                </select>
              </label>
            </div>
            <div className="payment">
              <h2>Método de pagamento</h2>
              <div className="input-finish">
                <label htmlFor="boleto">
                  <input
                    type="radio"
                    id="boleto"
                    value="boleto"
                    name="pay"
                    onChange={ this.handleChangeInput }
                  />
                  Boleto
                </label>
                <h2>Cartão de Crédito</h2>
                <label htmlFor="visa" onChange={ this.handleChangeInput }>
                  <input
                    type="radio"
                    id="visa"
                    value="visa"
                    name="pay"
                    onChange={ this.handleChangeInput }
                  />
                  Visa
                </label>
                <label htmlFor="mastercard" onChange={ this.handleChangeInput }>
                  <input
                    type="radio"
                    id="mastercard"
                    value="mastercard"
                    name="pay"
                    onChange={ this.handleChangeInput }
                  />
                  Mastercard
                </label>
                <label htmlFor="elo">
                  <input
                    type="radio"
                    id="elo"
                    value="elo"
                    name="pay"
                    onChange={ this.handleChangeInput }
                  />
                  Elo
                </label>
              </div>
              <button
                type="button"
                className="btn btn-warning"
                onClick={ this.validateInfos }
              >
                Comprar

              </button>
            </div>
          </div>
        );
      }
}
FinishCart.propTypes = {
  // totalProducts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
