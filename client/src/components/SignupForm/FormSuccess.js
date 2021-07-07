import React from 'react';

// this file will just show some kind of image/notification that the form submitted successfully
const FormSuccess = () => {
  return (
    <div className="form-content-right">
      <div className="form-success">We have received your request!</div>
      {/* success image that relates to the image on the left of the form */}
      <img src="#" alt="success" className="form-img-2" />
    </div>
  );
};

export default FormSuccess;
