import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerAction } from '../../redux/auth';
import { useAppDispatch } from '../../redux/store';

export default function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChangeFirstname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };

  const handleChangeLastname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match');
      return;
    }

    const formData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };

    dispatch(registerAction(formData));

    navigate('/login');
  };

  return (
    <>
      <h1 className="auth-title">Sign Up</h1>
      <p className="auth-subtitle mb-5">
        Input your data to register to our website.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group position-relative has-icon-left mb-4">
          <input
            type="text"
            className="form-control form-control-xl"
            placeholder="Firstname"
            value={firstname}
            onChange={handleChangeFirstname}
          />
          <div className="form-control-icon">
            <i className="bi bi-person" />
          </div>
        </div>
        <div className="form-group position-relative has-icon-left mb-4">
          <input
            type="text"
            className="form-control form-control-xl"
            placeholder="Lastname"
            value={lastname}
            onChange={handleChangeLastname}
          />
          <div className="form-control-icon">
            <i className="bi bi-person" />
          </div>
        </div>
        <div className="form-group position-relative has-icon-left mb-4">
          <input
            type="text"
            className="form-control form-control-xl"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
          />
          <div className="form-control-icon">
            <i className="bi bi-envelope" />
          </div>
        </div>

        <div className="form-group position-relative has-icon-left mb-4">
          <input
            type="password"
            className="form-control form-control-xl"
            placeholder="Password"
            value={password}
            onChange={handleChangePassword}
          />
          <div className="form-control-icon">
            <i className="bi bi-shield-lock" />
          </div>
        </div>
        <div className="form-group position-relative has-icon-left mb-4">
          <input
            type="password"
            className="form-control form-control-xl"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <div className="form-control-icon">
            <i className="bi bi-shield-lock" />
          </div>
        </div>
        <button className="btn btn-primary btn-block btn-lg shadow-lg mt-5">
          Sign Up
        </button>
      </form>
      <div className="text-center mt-5 text-lg fs-4">
        <p className="text-gray-600">
          Already have an account?
          <Link to="/" className="font-bold">
            Sign up
          </Link>
          .
        </p>
      </div>
    </>
  );
}
