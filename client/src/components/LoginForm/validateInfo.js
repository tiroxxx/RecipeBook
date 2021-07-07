export default function validateInfo(values) {

  let errors = {};

  if (!values.username.trim()) {
    errors.username = 'Username required';
  }

  if (!values.password.trim()) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be 6 or more characters';
  }
  return errors;
}

