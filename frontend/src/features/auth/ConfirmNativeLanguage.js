import React, { useContext } from 'react';
import LanguageCheckboxButton from '../../components/LanguageCheckboxButton';
import RegisterContext from '../../contexts/RegisterContext';


function ConfirmNativeLanguage({ setChooseNativeLanguageStep }) {
  const { setCreateAccountStep, setFields } = useContext(RegisterContext);

  const nativeLanguage = navigator.language || 'en';

  return(<>
    <div className="mb-4">
      <h3>Czy to twój język ojczysty?</h3>
    </div>

    <LanguageCheckboxButton languageCode={nativeLanguage} disabled={true} />

    <div className="mb-2 d-flex">
      <div className="w-100"></div>

      <button
        type="button"
        className="btn btn-primary flex-shrink-0"
        onClick={event => {
          event.preventDefault();
          setCreateAccountStep(prev => prev + 1);
          setFields(prev => ({...prev, nativeLanguages: [nativeLanguage]}))
        }}
      >
        Tak, to mój język ojczysty
      </button>

      <div className="w-100">
        <button
          type="button"
          className="btn btn-link"
          onClick={event => {
            event.preventDefault();
            setChooseNativeLanguageStep(prev => prev + 1);
          }}
        >
          Wybierz inny język
        </button>
      </div>
    </div>
  </>);
}

export default ConfirmNativeLanguage;