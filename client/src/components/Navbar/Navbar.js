import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import { Button } from '../Button';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [clicked, setClicked] = useState(false);

  return (
    <nav className="NavbarItems">

      <Link to="/" className="routerLink">

        <h1 className="navbar-logo">
          Recipe Book <i className="fas fa-drumstick-bite"></i>
        </h1>
      </Link>
      <div className="menu-icon" onClick={() => setClicked(!clicked)}>
        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
        {MenuItems.map((item, index) => {
          return (
            <Link key={index} className="routerLink" to={item.url}>
              <li className={item.cName} href={item.url}>
                {item.title}
              </li>
            </Link>
          );
        })}
      </ul>
      <Link to="/user">
        <Button>My Recipebook</Button>
      </Link>
      <Link to="/signup">
        <Button>Sign Up</Button>
      </Link>
      <Link to="/login-screen">
        <Button>Login screen</Button>
      </Link>
      <Link to="/register-screen">
        <Button>Register screen</Button>
      </Link>
    </nav>
  );
}
