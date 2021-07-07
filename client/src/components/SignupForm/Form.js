import React, { useState } from 'react';
import FormSignup from './FormSignUp';
import FormSuccess from './FormSuccess';
import './Form.css';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <>
      <div className="form-container">
        <span className="close-btn">x</span>
        <div className="form-content-left">
          {/* add in food/cooking image that looks cool maybe a plate icon that has food or a drumstick on the left and then when the form submits its an empty plate or drumstick with a bite taken out. svg icons work well here*/}
          <img src="img" alt="#" className="form-img" />
        </div>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default Form;
