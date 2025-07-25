import React from 'react';

function PageContent({ children, narrow }) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={`rounded-3 p-4 my-4 page-content ${narrow ? 'col-6' : 'col-12'}`}>
        {children}        
        </div>        
      </div>
    </div>
  );
}

export default PageContent;