import React from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.css';

export default class Header extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <div className={ style.container }>
        <Link to="/">
          <img src="https://pbs.twimg.com/profile_images/1412038025098444800/Kx6Wj0hl_400x400.jpg" alt="carrinho" />
          <p>promoção dos dias das mães</p>
        </Link>
      </div>
    );
  }
}
