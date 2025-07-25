import React, { useState, useEffect } from 'react';


export const validator = (validate, invalid, valid, debounce=false) => {
  return {
    validFeedback: valid,
    invalidFeedback: invalid,
    validate,
    debounce
  };
};

export const hintValidator = (hint, conditions) => {
  return {
    hint,
    conditions
  };
}

export const isNotEmpty = value => value !== '';
export const isEqual = param => value => value === param;
export const isEmail = value => /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(value);
export const allowedCharacters = param => value => param.test(value);
export const hasLetter = value => /[a-zA-Z]/.test(value);
export const hasDigit = value => /\d/.test(value);
export const minLength = param => value => value.length >= param;


function FormField({ id, type, label, placeholder, help, required, prefix, suffix, setFields, validators }) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [hints, setHints] = useState(() => validators && validators.filter(validator => validator.hint).map(validator => ({
    hint: validator.hint,
    conditions: validator.conditions.map(({condition}) => ({condition}))
  })));
  const [touched, setTouched] = useState(false);

  const handleChange = event => {
    if (!touched) setTouched(true);
    setValue(event.target.value);
  }

  useEffect(() => {
    let isCancelled = false;

    const handleValidation = async () => {
      const newHints = [];
      let allValid = false;

      if (validators && touched) {
        allValid = true;

        for (const validator of validators) {
          if (value === '' && validator.validate !== isNotEmpty && !validator.hint) continue;
          if (validator.conditions) {
            const conditions = validator.conditions.map(condition => {
              const valid = condition.validate(value);
              if (!valid) allValid = false;

              return {
                condition: condition.condition,
                valid
              };
            });

            newHints.push({
              hint: validator.hint,
              conditions
            });
          }
          else if(validator.validate) {
            const valid = await validator.validate(value);
            if (!valid) allValid = false;

            newHints.push({
              feedback: valid ? validator.validFeedback : validator.invalidFeedback,
              valid
            });
          }
        }
      }

      if (!isCancelled) {
        if (validators && touched) {
          setIsValid(allValid);
          setHints(newHints);
        }
        setFields(prev => ({ ...prev, [id]: { value, isValid: allValid } }));
      }
    }

    handleValidation();

    return () => { isCancelled = true };
  }, [value, validators]);

  const input = (
    <input 
      value={value}
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      className={`form-control ${isValid !== null ? (isValid ? 'is-valid' : 'is-invalid') : ''}`}
    />
  );

  return (<>
    {label && <label htmlFor={id} className="form-label">{label}</label>}

    {prefix || suffix ? (
      <div className="input-group">
        {prefix && <span className="input-group-text" id="basic-addon1">{prefix}</span>}
        {input}
        {suffix && <span className="input-group-text" id="basic-addon1">{suffix}</span>}
      </div>
    ) : input}

    {help && <div className="form-text">{help}</div>}
    {hints && hints.filter(hint => hint.valid === isValid || hint.hint).map((hint, i) => {
      if (hint.hint) return (
        <div key={i} className="form-text">
          {hint.hint}
          <ul className="list-unstyled">
            {hint.conditions.map((condition, j) => 
              <li key={j} className={`${condition.valid !== undefined ? (condition.valid ? 'text-success' : 'text-danger') : ''} d-block`}>
                {condition.condition}
              </li>
            )}
          </ul>
        </div>
      )
      return (
        <div key={i} className={`${hint.valid ? 'valid-feedback' : 'invalid-feedback'} d-block`}>{hint.feedback}</div>
      );
    })}
  </>);
}

export default FormField;