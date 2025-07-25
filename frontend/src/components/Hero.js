import React from 'react';
import { Link } from 'react-router';


function Hero() {
  return (
    <div className="hero d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-xs-12 col-lg-9 py-5">
            <h1>Zajebisty nagłówek na sekcję hero</h1>
            <p className="py-3">
              Sprawdzaj nasz zajebisty produkt skurwysynu
            </p>
            <div className="d-flex gap-1">
              <Link to="/" className="btn btn-primary btn-lg my-2"><i className="bi bi-browser-firefox"></i> Pobierz dla Firefoxa</Link>
              <Link to="/" className="btn btn-outline-secondary btn-lg my-2">Utwórz konto</Link>
            </div>
          </div>

          <div className="col-xs-12 col-lg-3 py-5">
            miejsce na sowę
          </div>

        </div>
      </div>
    </div>
  )
}

export default Hero;