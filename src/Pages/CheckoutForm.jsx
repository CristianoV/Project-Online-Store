import React from 'react';
import PropTypes from 'prop-types';

class CheckoutForm extends React.Component {
  render() {
    const { testId, placeholder, id, onChange } = this.props;
    return (
      <label htmlFor={ id }>
        { placeholder }
        <input
          data-testid={ testId }
          type="text"
          id={ id }
          placeholder={ placeholder }
          onChange={ onChange }
        />
      </label>
    );
  }
}
CheckoutForm.propTypes = {
  testId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default CheckoutForm;
