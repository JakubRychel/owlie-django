import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

function UserOptions() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <div className="collapse navbar-collapse w-100">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item position-relative">
          <button className="nav-link">
            <i className="bi bi-bell-fill position-relative">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                2
                <span className="visually-hidden">unread messages</span>
              </span>  
            </i>
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={() => toggleTheme()}>
            {theme === 'dark' ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
          </button>
        </li>
        <li className="nav-item dropdown">

          <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <i className="bi bi-translate"></i>
          </button>

          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">
              <i className="round-flag-icon round-flag-pl"></i>polski
            </a></li>
            <li><a className="dropdown-item" href="#">
              <i className="round-flag-icon round-flag-gb"></i>angielski
            </a></li>
            <li><a className="dropdown-item" href="#">
              <i className="round-flag-icon round-flag-de"></i>niemiecki
            </a></li>
          </ul>
          
        </li>
        <li className="nav-item">
          <div className="d-flex gap-1">
            { user? (<>
              <button onClick={handleLogout} className="btn btn-primary">Wyloguj się</button>
            </>) : (<>
              <Link to="/login" className="btn btn-primary">Zaloguj się</Link>
              <Link to="/register" className="btn btn-outline-secondary">Zarejestruj się</Link>
            </>)}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default UserOptions;