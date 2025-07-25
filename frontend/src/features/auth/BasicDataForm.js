import React, { useContext, useMemo } from 'react';
import { checkUserExists } from '../../services/auth';
import FormField, { validator, hintValidator, isNotEmpty, isEqual, isEmail, hasLetter,
  hasDigit, minLength, allowedCharacters } from '../../components/FormField';
import RegisterContext from '../../contexts/RegisterContext';

const isUsernameAvailable = async value => !(await checkUserExists({username: value}));
const isEmailAvailable = async value => !(await checkUserExists({email: value}));
const isPasswordValid = param => () => param;

function BasicDataForm() {
  const { fields, setFields, setCreateAccountStep } = useContext(RegisterContext);

  const isValid = () => {
    let allValid = true;

    for (const field of Object.values(fields)) {
      if (!field.isValid && !Array.isArray(field)) allValid = false;
    }

    return allValid;
  };

  const usernameValidators = useMemo(() => [
    validator(isNotEmpty, 'Nazwa użytkownika nie może być pusta'),
    validator(allowedCharacters(/^[\w.@+-]+$/), 'Dozwolone są tylko litery, cyfry oraz znaki @ . + - _'),
    validator(isUsernameAvailable, 'Ta nazwa użytkownika jest zajęta', 'Nazwa dostępna', true)
  ], []);
  const passwordValidators = useMemo(() => [
    validator(isNotEmpty, 'Hasło nie może być puste'),
    hintValidator('Hasło powinno zawierać:', [
      {
        condition: 'przynajmniej jedną literę,',
        validate: hasLetter
      },
      {
        condition: 'przynajmniej jedną cyfrę,',
        validate: hasDigit
      },
      {
        condition: 'przynajmniej 8 znaków',
        validate: minLength(8),
      }
    ])
  ], []);
  const confirmPasswordValidators = useMemo(() => [
    validator(isNotEmpty, 'Hasło nie może być puste'),
    validator(isEqual(fields.passwordInput?.value || ''), 'Hasła muszą się zgadzać'),
    validator(isPasswordValid(fields.passwordInput?.isValid))
  ], [fields.passwordInput]);
  const emailValidators = useMemo(() => [
    validator(isNotEmpty, 'E-mail nie może być pusty'),
    validator(isEmail, 'E-mail niepoprawny'),
    validator(isEmailAvailable, 'Użytkownik o podanym adresie e-mail już istnieje', null, true)
  ], []);


  return (<>
    <div className="mb-4">
      <h3>Wprowadź dane dla swojego konta</h3>
    </div>

    <div className="mb-2">
      <FormField
        id="usernameInput"
        label="Nazwa użytkownika"
        prefix="@"
        setFields={setFields}
        validators={usernameValidators}
      />
    </div>

    <div className="row mb-2">
      <div className="col-6">
        <FormField
          id="passwordInput"
          label="Hasło"
          type="password"
          setFields={setFields}
          validators={passwordValidators}
        />
      </div>

      <div className="col-6">
        <FormField
          id="confirmPasswordInput"
          label="Powtórz hasło"
          type="password"
          setFields={setFields}
          validators={confirmPasswordValidators}
        />
      </div>
    </div>
    
    <div className="mb-2">
      <FormField
        id="emailInput"
        label="Adres e-mail"
        type="email"
        setFields={setFields}
        validators={emailValidators}
      />
    </div>

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

      <button
        type="submit"
        className="btn btn-primary ms-auto"
        disabled={!isValid()}
      >
        Załóż konto
      </button>

    </div>
  </>);
}

export default BasicDataForm;