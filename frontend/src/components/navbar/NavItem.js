import React from 'react';
import { Link } from 'react-router';

function NavItem({ children, path, dropdown }) {
  return (
    <li className="nav-item">
      <Link to={path} className="nav-link">{children}</Link>
    </li>
  );
}

export default NavItem;