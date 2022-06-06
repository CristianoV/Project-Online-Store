import React from 'react';
import PropTypes from 'prop-types';
import CheckoutForm from './CheckoutForm';

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
        const teste = prices.reduce((acc, elemento) => acc + elemento);
        this.setState({
          totalPrice: teste || 0.00,
        });
      }

      handleChange = ({ target }) => {
        const { id, value } = target;
        this.setState({
          [id]: value,
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
        // const { totalProducts } = this.props;
        const { totalPrice, totalProducts } = this.state;
        return (
          <div>
            <h1>Seus produtos:</h1>
            <div className="products">
              {totalProducts
              && totalProducts.map((product) => (
                <div key={ product.id }>
                  <img src={ product.thumbnail } alt={ product.title } />
                  <h3>{product.title}</h3>
                  <h4>
                    Preço: R$
                    { product.price }
                  </h4>
                  <p>
                    Quantidade:
                    {product.quantity}
                  </p>
                </div>
              ))}
            </div>
            <h2>
              Preço total:
              { totalPrice.toFixed(2) }
            </h2>
            <form>
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
            <div className="payment">
              <h2>Método de pagamento</h2>
              <div>
                <label htmlFor="paymentMethod">
                  Boleto
                  <input
                    type="radio"
                    id="paymentMethod"
                    value="boleto"
                    name="pay"
                    onChange={ this.handleChange }
                  />
                </label>
                <p>Cartão de Crédito</p>
                <label htmlFor="paymentMethod" onChange={ this.handleChange }>
                  Visa
                  <input
                    type="radio"
                    id="paymentMethod"
                    value="visa"
                    name="pay"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="paymentMethod" onChange={ this.handleChange }>
                  Mastercard
                  <input
                    type="radio"
                    id="paymentMethod"
                    value="mastercard"
                    name="pay"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="paymentMethod">
                  Elo
                  <input
                    type="radio"
                    id="paymentMethod"
                    value="elo"
                    name="pay"
                    onChange={ this.handleChange }
                  />
                </label>
              </div>
              <button type="button" onClick={ this.validateInfos }>Comprar</button>
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
