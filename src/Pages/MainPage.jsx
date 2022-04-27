import React from 'react';

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

      </div>
    );
  }
}

export default MainPage;
