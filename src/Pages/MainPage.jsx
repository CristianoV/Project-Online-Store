import React from 'react';
import Categories from './Categories';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="mainpage">
          <input
            type="text"
            id="mainpage"
          />
        </label>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categories />

      </div>
    );
  }
}

export default MainPage;
