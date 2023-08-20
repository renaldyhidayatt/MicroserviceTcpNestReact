import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginAction } from '../../redux/auth';
import { useAppDispatch, useAppSelector } from '../../redux/store';

export default function Login() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { user, token, error, loading } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const login = {
      email: email,
      password: password,
    };

    dispatch(loginAction(login))
      .then((data) => {
        console.log(data);
        navigate('/admin');
      })
      .catch((error) => {
        console.log('Login error:', error);
      });
  };

  if (loading) {
    <h1>Loading</h1>;
  }

  if (error) {
    <h1>{error.message}</h1>;
  }

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user]);

  return (
    <>
      <h1 className="auth-title">Log in.</h1>
      <p className="auth-subtitle mb-5">
        Log in with your data that you entered during registration.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group position-relative has-icon-left mb-4">
          <input
            type="email"
            className="form-control form-control-xl"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
          />
          <div className="form-control-icon">
            <i className="bi bi-person" />
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
        <div className="form-check form-check-lg d-flex align-items-end">
          <input
            className="form-check-input me-2"
            type="checkbox"
            defaultValue=""
            id="flexCheckDefault"
          />
          <label
            className="form-check-label text-gray-600"
            htmlFor="flexCheckDefault"
          >
            Keep me logged in
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block btn-lg shadow-lg mt-5"
        >
          Log in
        </button>
      </form>
      <div className="text-center mt-5 text-lg fs-4">
        <p className="text-gray-600">
          Don't have an account?
          <Link to="/register" className="font-bold">
            Sign up
          </Link>
          .
        </p>
      </div>
    </>
  );
}
