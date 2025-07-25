import React from 'react';
import LanguageCheckboxButton from './LanguageCheckboxButton';

function LanguagesList({ availableLanguages, chosenLanguages, setChosenLanguages }) {
  return (<>
    {
      availableLanguages.map((language, index) => (
        <LanguageCheckboxButton 
          key={index}
          setChosenLanguages={setChosenLanguages}
          languageCode={language.code}
          checked={chosenLanguages.includes(language.code)}
        />
      ))
    }
  </>);
}

export default LanguagesList;