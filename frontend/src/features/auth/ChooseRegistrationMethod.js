import React, { useContext } from 'react';
import RegisterContext from '../../contexts/RegisterContext';

function ChooseRegistrationMethod() {
  const { setCreateAccountStep } = useContext(RegisterContext);

  return (<>
    <div className="mb-4">
      <h3>Jak chcesz się zarejestrować?</h3>
    </div>

    <button type="button" className="d-flex justify-content-center w-100 p-3 mb-2 rounded btn btn-form">
      <i className="bi bi-google me-2"></i>
      <h5 className="m-0">Użyj konta Google</h5>
    </button>

    <button type="button" className="d-flex justify-content-center w-100 p-3 mb-2 rounded btn btn-form">
      <i className="bi bi-apple me-2"></i>
      <h5 className="m-0">Użyj konta Apple</h5>
    </button>

    <button type="button" className="d-flex justify-content-center w-100 p-3 mb-2 rounded btn btn-form">
      <i className="bi bi-facebook me-2"></i>
      <h5 className="m-0">Użyj konta Facebook</h5>
    </button>

    <hr data-content="lub" className="my-4" />

    <button
      type="button"
      className="d-flex justify-content-center w-100 p-3 mb-2 rounded btn btn-form"
      onClick={event => {
        event.preventDefault();
        setCreateAccountStep(prev => prev + 1);
      }}
    >
      <i className="bi bi-envelope me-2"></i>
      <h5 className="m-0">Załóż konto za pomocą e-maila</h5>
    </button>

    <div className="mb-2 d-flex">

      <button
        type="button"
        className="btn btn-secondary"
        onClick={event => {
          event.preventDefault();
          setCreateAccountStep(prev => prev -1);
        }}
      >
        Wstecz
      </button>

    </div>
  </>);
}

export default ChooseRegistrationMethod;