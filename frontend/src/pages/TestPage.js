import React, { useState } from 'react';
import Slider from '../components/Slider';
import LanguageCheckboxButton from '../components/LanguageCheckboxButton';

const TestPage = () => {
  const [index, setIndex] = useState(0);

  const slides = [
    (<div>
      <LanguageCheckboxButton languageCode={'pl'} />
      <h3>Hamara xd</h3>
      <h4>Hamara hamara xd</h4>
      
      <input className="form-control"></input>
      <div>jakiś content</div>
      <button className="btn btn-primary" disabled={true}>Wstecz</button>
      <button className="btn btn-primary" onClick={() => {
        setIndex(prev => prev + 1);
      }}>Dalej</button>
    </div>),
    (<div>
      <div>jakiś inny content</div>
      <button className="btn btn-primary" onClick={() => {
        setIndex(prev => prev - 1);
      }}>Wstecz</button>
      <button className="btn btn-primary" onClick={() => {
        setIndex(prev => prev + 1);
      }}>Dalej</button>
    </div>),
    (<div>
      <div>jeszcze jakiś inny content</div>
      <button className="btn btn-primary" onClick={() => {
        setIndex(prev => prev - 1);
      }}>Wstecz</button>
      <button className="btn btn-primary" disabled={true}>Dalej</button>
    </div>)
  ];

  return (
    <div className="col-6">
      <Slider slides={slides} index={index} />
    </div>
    
  );
};

export default TestPage;