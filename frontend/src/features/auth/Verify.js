import React, { useState, useEffect, useRef, useContext } from 'react';
import { verify } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import RegisterContext from '../../contexts/RegisterContext';

function Verify() {
  const { registerResponse, setVerifyResponse, setRegisterStep } = useContext(RegisterContext);

  const [token, setToken] = useState(Array(6).fill(''));
  const [error, setError] = useState({});

  const inputsRef = useRef([]);


  const navigate = useNavigate();

  useEffect(() => {
    if (token.join('').length === 6) handleVerify();

  }, [token]);

  const handleVerify = async () => {
    try {
      const response = await verify(
        registerResponse.username,
        token.join('')
      );
      setVerifyResponse(response);
      if (response.is_verified) {
        setRegisterStep(prev => prev + 1);
        setTimeout(() => navigate('/login'), 4000);
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const handlePaste = event => {
    event.preventDefault();

    const pasted = event.clipboardData.getData('Text');

    if (/^\d{6}$/.test(pasted)) {
      const newToken = pasted.split('');
      setToken(newCode);
      newToken.forEach((_, index) => {
        inputsRef.current[index].value = newToken[index]
      });
    }
  };

  const handleChange = (event, index) => {
    const value = event.target.value;

    if (/^\d$/.test(value)) {
      const newToken = [...token];
      newToken[index] = value;
      setToken(newToken);

      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const newToken = [...token];
      if (token[index]) {
        newToken[index] = '';
        setToken(newToken);
      }
      else if (index > 0) {
        newToken[index - 1] = '';
        setToken(newToken);
        inputsRef.current[index - 1].focus();
      }
    }
  };

  return (<>
    <div className="mb-4">
      <h3>Gratulacje!</h3>
    </div>
    <div className="mb-2">
      <p>
        Udało się zarejestrować. Na podany przez Ciebie adres e-mail {registerResponse.email} został wysłany kod weryfikacyjny. Wpisz go poniżej aby zweryfikować swoje konto. 
      </p>
    </div>
    <div className="d-flex justify-content-center gap-2 mb-2" onPaste={handlePaste}>
      {token.map((digit, index) => (
        <input
          key={index}
          type="text"
          className="form-control form-control-lg text-center"
          style={{ width: '2.5em' }}
          value={digit}
          maxLength={1}
          onChange={event => handleChange(event, index)}
          onKeyDown={event => handleKeyDown(event, index)}
          ref={el => inputsRef.current[index] = el}
        />
      ))}
    </div>
    <div className="mb-2 d-flex">
      <button
        type="button"
        className="btn btn-primary ms-auto"
        onClick={event => {
          event.preventDefault();
          handleVerify();
        }}
      >Potwierdź</button>
    </div>
  </>);
}

export default Verify;