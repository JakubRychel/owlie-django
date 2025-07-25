import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import FormField from './FormField';

function LoginForm() {
  const [fields, setFields] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await login(fields.usernameInput.value, fields.passwordInput.value);
      navigate('/');
    }
    catch (error) {
      console.error('error');
    }
  };

  return (<>
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <h3>Zaloguj się</h3>
      </div>

      <div className="mb-2">
        <FormField
          id="usernameInput"
          label="Nazwa użytkownika"
          type="text"
          setFields={setFields}
        />
      </div>

      <div className="mb-2">
        <FormField
          id="passwordInput"
          label="Hasło"
          type="password"
          setFields={setFields}
        />
      </div>

      <button type="submit" className="btn btn-primary mb-2">Zaloguj</button>

    </form>
  </>);
}

export default LoginForm;