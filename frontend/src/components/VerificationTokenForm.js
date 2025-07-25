import React, { useState, useRef, useEffect } from 'react';

function VerificationTokenForm({ handleVerify, setVerificationToken }) {
  const [code, setCode] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);

  useEffect(() => {
    const token = code.join('');
    
    if (token.length === 6) setVerificationToken(token);

  }, [code]);

  const handlePaste = event => {
    event.preventDefault();

    const pasted = event.clipboardData.getData('Text');

    if (/^\d{6}$/.test(pasted)) {
      const newCode = pasted.split('');
      setCode(newCode);
      newCode.forEach((_, index) => {
        inputsRef.current[index].value = newCode[index]
      });
    }
  };

  const handleChange = (event, index) => {
    const value = event.target.value;

    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }

  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const newCode = [...code];
      if (code[index]) {
        newCode[index] = '';
        setCode(newCode);
      }
      else if (index > 0) {
        newCode[index - 1] = '';
        setCode(newCode);
        inputsRef.current[index - 1].focus();
      }
    }
  };

  return (<>
    <div className="d-flex justify-content-center gap-2 mb-2" onPaste={handlePaste}>
      {code.map((digit, index) => (
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
      <button className="btn btn-primary ms-auto" onClick={handleVerify}>Potwierdź</button>
    </div>
  </>);
}

export default VerificationTokenForm;