import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

type HeaderProps = {

};

const Header: React.FC<HeaderProps> = (props) => {
  const isActive = false;

  const isActiveProp = (isActive: boolean): string => {
    return 'navlink' + isActive ? '-active' : '';
  };

  return (
    <nav className='header'>
      <NavLink
        to="/"
        className={({ isActive }) => "nav-link" + (isActive ? "-active" : "")}
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) => "nav-link" + (isActive ? "-active" : "")}
      >
        About
      </NavLink>
    </nav>
  );
};

export default Header;