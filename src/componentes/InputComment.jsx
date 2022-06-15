import React from 'react';
import PropTypes from 'prop-types';

class InputComment extends React.Component {
  render() {
    const { radio, handleChange } = this.props;
    return (
      <div className="comment">
        <label htmlFor="1">
          <input
            type="radio"
            name="avaliacao"
            id="1"
            required
            data-testid="1-rating"
            onChange={ handleChange }
            value={ radio }
          />
          {radio < 1 ? <i className="bi bi-star" /> : <i className="bi bi-star-fill" />}
        </label>
        <label htmlFor="2">
          <input
            type="radio"
            name="avaliacao"
            id="2"
            required
            data-testid="1-rating"
            onChange={ handleChange }
            value={ radio }
          />
          {radio < 2 ? <i className="bi bi-star" /> : <i className="bi bi-star-fill" />}
        </label>
        <label htmlFor="3">
          <input
            type="radio"
            name="avaliacao"
            id="3"
            required
            data-testid="1-rating"
            onChange={ handleChange }
            value={ radio }
          />
          {radio < 3 ? <i className="bi bi-star" /> : <i className="bi bi-star-fill" />}
        </label>
        <label htmlFor="4">
          <input
            type="radio"
            name="avaliacao"
            id="4"
            required
            data-testid="1-rating"
            onChange={ handleChange }
            value={ radio }
          />
          {radio < 4 ? <i className="bi bi-star" /> : <i className="bi bi-star-fill" />}

        </label>
        <label htmlFor="5">
          <input
            type="radio"
            name="avaliacao"
            id="5"
            required
            data-testid="1-rating"
            onChange={ handleChange }
            value={ radio }
          />
          {radio < 5 ? <i className="bi bi-star" /> : <i className="bi bi-star-fill" />}
        </label>
      </div>
    );
  }
}

InputComment.propTypes = {
  Radio: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;

export default InputComment;
