import React from 'react';
import useForm from './useForm';
import validate from './validateInfo';
import './LoginForm.css';
import { Link } from 'react-router-dom';

const Form = ({ submitForm }) => {
  const { handleChange, values, handleSubmit, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className="form-container-login">
      <form className="form-login" onSubmit={handleSubmit}>
        <h1>Welcome Back!</h1>
        <div className="form-inputs-login">
          <label htmlFor="username" className="form-label-login">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            className="form-input-login"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>

        <div className="form-inputs-login">
          <label htmlFor="password" className="form-label-login">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-input-login"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button className="form-input-btn-login" type="submit">
          Log in
        </button>
        <span className="form-input-login2">
          Don't have an account? Sign up, <Link to="/signup">here</Link>

        </span>
      </form>
    </div>
  );
};

export default Form;
