import React from 'react';
import * as api from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    await this.categories();
  }

  categories = async () => {
    const cats = await api.getCategories();
    this.setState({ categories: cats });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        { categories.map((cats) => (
          <div key={ cats.id }>
            <label
              htmlFor={ cats.id }
            >
              <input
                type="radio"
                id={ cats.id }
                data-testid="category"
                name="category"
              />
              { cats.name }
            </label>
          </div>
        )) }
      </div>
    );
  }
}

export default Categories;
