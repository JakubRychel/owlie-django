import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import NavItem from './NavItem';
import UserOptions from './UserOptions';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`navbar navbar-expand-lg fixed-top${ (scrolled) ? ' navbar-scrolled' : '' }`}>
      <div className="container px-0">

        <div className="collapse navbar-collapse w-100">
          <ul className="navbar-nav me-auto">
            <NavItem path="/">Strona główna</NavItem>
            <NavItem path="/flashcards">Fiszki</NavItem>
            <NavItem path="/dictionary">Słownik</NavItem>
            <NavItem path="/text-collection">Baza tekstów</NavItem>
          </ul>
        </div>

        <Link to="/" className="navbar-brand mx-0 d-flex align-items-center gap-1">
          <img src="/static/images/logo.svg" /> Owlie
        </Link>

        <UserOptions />

      </div>
    </nav>
  )
}

export default Navbar;