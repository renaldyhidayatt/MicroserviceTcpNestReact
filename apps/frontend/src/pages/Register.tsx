import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerAction } from '../redux/auth';
import { useAppDispatch } from '../redux/store';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
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
      firstname,
      lastname,
      email,
      password,
    };

    dispatch(registerAction(formData));

    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-xl">
        <div className="bg-white shadow-xl p-6 rounded-lg">
          <h2 className="text-center text-2xl font-semibold mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstname"
              placeholder="Firstname"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={firstname}
              onChange={handleFirstnameChange}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Lastname"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={lastname}
              onChange={handleLastnameChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                REGISTER
              </button>
            </div>
          </form>
          <Link to="/login" className="block mt-4 text-center">
            Click Here To Login
          </Link>
        </div>
      </div>
    </div>
  );
}
