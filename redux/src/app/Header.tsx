import React from 'react';
import { NavLink } from 'react-router-dom';


const Header: React.FC = () => {

  return (
    <nav className='header'>
      <NavLink
        to="/"
        className={({ isActive }) => "nav-link" + (isActive ? "-active" : "")}
      >
        Home
      </NavLink>

      <NavLink
        to="/courses"
        className={({ isActive }) => "nav-link" + (isActive ? "-active" : "")}
      >
        Courses
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