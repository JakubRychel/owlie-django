import React, { useState, useEffect } from 'react';
import { getLanguageList } from '../../services/dict';
import { register } from '../../services/auth';
import RegisterContext from '../../contexts/RegisterContext';
import Slider from '../../components/Slider';
import BasicDataForm from './BasicDataForm';
import ChooseNativeLanguage from './ChooseNativeLanguage';
import ChooseLanguagesToLearn from './ChooseLanguagesToLearn';
import ChooseRegistrationMethod from './ChooseRegistrationMethod';
import Verify from './Verify';
import Success from './Success';

function Register() {
  const [registerStep, setRegisterStep] = useState(0);
  const [createAccountStep, setCreateAccountStep] = useState(0);
  const [fields, setFields] = useState({});
  const [registerResponse, setRegisterResponse] = useState({});
  const [verifyResponse, setVerifyResponse] = useState({});
  const [availableLanguages, setAvailableLanguages] = useState([]);
  
  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await getLanguageList();
      setAvailableLanguages(response);
    };

    fetchLanguages();
  }, []);

  const handleRegister = async event => {
    event.preventDefault();

    try {
      const response = await register(
        fields.usernameInput.value,
        fields.emailInput.value,
        fields.passwordInput.value,
        fields.nativeLanguages,
        fields.languagesToLearn
      );
      setRegisterResponse(response);
      setRegisterStep(prev => prev + 1);
    }
    catch (error) {
      console.error('error');
    }
  };

  const createAccountSlides = [
    <ChooseNativeLanguage />,
    <ChooseLanguagesToLearn />,
    <ChooseRegistrationMethod />,
    <BasicDataForm />
  ];

  const registerSlides = [
    <form onSubmit={handleRegister}><Slider index={createAccountStep} slides={createAccountSlides} /></form>,
    <Verify />,
    <Success />
  ];

  return (<>
    <RegisterContext.Provider value={{
      fields,
      setFields,
      setCreateAccountStep,
      setRegisterStep,
      registerResponse,
      setRegisterResponse,
      verifyResponse,
      setVerifyResponse,
      availableLanguages
    }}>
      <div className="progress mb-4">
        <div className="progress-bar" style={{
          width: (createAccountStep+registerStep) === 0 ? '1%' :
            ((createAccountStep+registerStep)/(createAccountSlides.length+registerSlides.length-2))*100+'%'
        }}></div>
      </div>
      <Slider index={registerStep} slides={registerSlides} />
    </RegisterContext.Provider>
  </>);
}

export default Register;