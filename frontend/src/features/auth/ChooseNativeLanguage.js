import React, { useContext, useState } from 'react';
import Slider from '../../components/Slider';
import ConfirmNativeLanguage from './ConfirmNativeLanguage';
import ChooseAnotherLanguage from './ChooseAnotherLanguage';
import RegisterContext from '../../contexts/RegisterContext';

function ChooseNativeLanguage() {
  const { fields } = useContext(RegisterContext);

  const [chooseNativeLanguageStep, setChooseNativeLanguageStep] = useState(fields.nativeLanguages ? 1 : 0);

  return (<>
    <Slider index={chooseNativeLanguageStep} slides={[
      <ConfirmNativeLanguage setChooseNativeLanguageStep={setChooseNativeLanguageStep} />,
      <ChooseAnotherLanguage />
    ]} />
  </>);
}

export default ChooseNativeLanguage;