import React, { useState, useContext } from 'react';
import LanguagesList from '../../components/LanguagesList';
import RegisterContext from '../../contexts/RegisterContext';

function ChooseAnotherLanguage() {
  const { fields, setFields, setCreateAccountStep, availableLanguages } = useContext(RegisterContext);

  const [chosenLanguages, setChosenLanguages] = useState(fields.nativeLanguages || []);

  const saveLanguages = () => setFields(prev => ({...prev, nativeLanguages: chosenLanguages}));

  return (<>
    <div className="mb-4">
      <h3>Wybierz swój język ojczysty</h3>
      <span className="text-muted">
        Możesz wybrać więcej niż jeden.
      </span>
    </div>

    <LanguagesList
      availableLanguages={availableLanguages}
      chosenLanguages={chosenLanguages}
      setChosenLanguages={setChosenLanguages}
    />

    <div className="mb-2 d-flex">

      <button
        type="button"
        className="btn btn-primary ms-auto"
        onClick={event => {
          event.preventDefault();
          saveLanguages();
          setCreateAccountStep(prev => prev + 1);
        }}
        disabled={chosenLanguages.length === 0}
      >
        Dalej
      </button>

    </div>
  </>);
}

export default ChooseAnotherLanguage;