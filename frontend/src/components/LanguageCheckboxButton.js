import React from 'react';

const flagCodes = {
  en: 'gb',     // English - United Kingdom
  es: 'es',     // Spanish - Spain
  fr: 'fr',     // French - France
  de: 'de',     // German - Germany
  it: 'it',     // Italian - Italy
  pt: 'pt',     // Portuguese - Portugal
  ru: 'ru',     // Russian - Russia
  zh: 'cn',     // Chinese - China
  ja: 'jp',     // Japanese - Japan
  ko: 'kr',     // Korean - South Korea
  pl: 'pl',     // Polish - Poland
  nl: 'nl',     // Dutch - Netherlands
  sv: 'se',     // Swedish - Sweden
  tr: 'tr',     // Turkish - Turkey
  ar: 'sa',     // Arabic - Saudi Arabia
  hi: 'in',     // Hindi - India
  he: 'il',     // Hebrew - Israel
  el: 'gr',     // Greek - Greece
  no: 'no',     // Norwegian - Norway
  da: 'dk',     // Danish - Denmark
  th: 'th',     // Thai - Thailand
  vi: 'vn',     // Vietnamese - Vietnam
  ro: 'ro',     // Romanian - Romania
  hu: 'hu',     // Hungarian - Hungary
  cs: 'cz',     // Czech - Czech Republic
  fi: 'fi',     // Finnish - Finland
  uk: 'ua',     // Ukrainian - Ukraine
  id: 'id',     // Indonesian - Indonesia
  ms: 'my',     // Malay - Malaysia
  fa: 'ir'      // Persian (Farsi) - Iran
};

const languageNames = {
  en: 'angielski',
  es: 'hiszpański',
  fr: 'francuski',
  de: 'niemiecki',
  it: 'włoski',
  pt: 'portugalski',
  ru: 'rosyjski',
  zh: 'chiński',
  ja: 'japoński',
  ko: 'koreański',
  pl: 'polski',
  nl: 'niderlandzki',
  sv: 'szwedzki',
  tr: 'turecki',
  ar: 'arabski',
  hi: 'hindi',
  he: 'hebrajski',
  el: 'grecki',
  no: 'norweski',
  da: 'duński',
  th: 'tajski',
  vi: 'wietnamski',
  ro: 'rumuński',
  hu: 'węgierski',
  cs: 'czeski',
  fi: 'fiński',
  uk: 'ukraiński',
  id: 'indonezyjski',
  ms: 'malajski',
  fa: 'perski'
};

function LanguageCheckboxButton({ setChosenLanguages, languageCode, disabled=false, checked=false }) {
  const handleChange = event => {
    setChosenLanguages(prev => event.target.checked ? [...prev, languageCode] : prev.filter(el => el !== languageCode));
  };

  return (<>
    <input
      type="checkbox"
      onChange={handleChange}
      className="btn-check"
      id={'lang-' + languageCode}
      checked={checked}
      disabled={disabled}
    />
    <label htmlFor={'lang-' + languageCode} className="d-flex justify-content-center w-100 p-3 mb-2 rounded btn btn-form">
      <i className={`round-flag-icon round-flag-${flagCodes[languageCode]} me-2`}></i>
      <h5 className="m-0">{languageNames[languageCode]}</h5>
    </label>
  </>);
}

export default LanguageCheckboxButton;