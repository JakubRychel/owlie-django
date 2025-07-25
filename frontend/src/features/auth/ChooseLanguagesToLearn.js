import React, { useState, useEffect, useContext } from 'react';
import LanguagesList from '../../components/LanguagesList';
import RegisterContext from '../../contexts/RegisterContext';

function ChooseLanguagesToLearn() {
  const { fields, setFields, setCreateAccountStep, availableLanguages } = useContext(RegisterContext);

  const [chosenLanguages, setChosenLanguages] = useState(fields.languagesToLearn || []);
  const [availableLanguagesToLearn, setAvailableLanguagesToLearn] = useState(availableLanguages);

  useEffect(() => {
    setAvailableLanguagesToLearn(prev => prev.filter(language => !fields.nativeLanguages.includes(language.code)));
  }, [fields.nativeLanguages]);

  const saveLanguages = () => setFields(prev => ({...prev, languagesToLearn: chosenLanguages}));

  return (<>
    <div className="mb-4">
      <h3>Wybierz języki których chcesz się nauczyć</h3>
    </div>

    <LanguagesList
      availableLanguages={availableLanguagesToLearn}
      chosenLanguages={chosenLanguages}
      setChosenLanguages={setChosenLanguages}
    />

    <div className="mb-2 d-flex">

      <button
        type="button"
        className="btn btn-secondary"
        onClick={event => {
          event.preventDefault();
          saveLanguages();
          setCreateAccountStep(prev => prev -1);
        }}
      >
        Wstecz
      </button>

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

export default ChooseLanguagesToLearn;