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

  /* handleClickCat = async (id) => {
    const categoryList = await api.getProductsFromCategoryAndQuery(id, null);
    console.log(categoryList.results);
  } */

  render() {
    const { categories } = this.state;
    const { handleClickCat } = this.props;
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
                onClick={ () => handleClickCat(cats.id) }
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
