import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { MdPerson, MdLockOutline, MdAlternateEmail } from 'react-icons/md';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!username || !email || !password) {
      alert('Please fill in all the fields.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8081/api/auth/signup', {
        username: username,
        email: email,
        password: password,
      });

      console.log(response.data);
      alert('Signup successful!');
      // Redirect to login form
      window.location.href = '/login'; 
    } catch (error) {
      console.log(error);
      alert('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <Link to={'/'} className="flex items-center gap-2">
          <h2 className="textHeading-Color text-xl text-textColor">
            Meal<span className="textHeading-Color text-xl font-bold text-green-600">Path</span>
          </h2>
        </Link>
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>

      <div className="rounded-lg p-4 flex justify-center">
        <form className="mt-8 space-y-6">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-4">
            <MdPerson className="text-xl text-gray-700" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-4">
            <MdAlternateEmail className="text-xl text-gray-700" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-4">
            <MdLockOutline className="text-xl text-gray-700" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <p className="text-center text-sm text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>

          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-green-600 py-2 px-4 mt-6 flex justify-center items-center gap-2 rounded-md text-white hover:bg-green-700 focus:outline-none focus:bg-green-700"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10-2.647A7.962 7.962 0 0020 12h4c0 6.627-5.373 12-12 12v-4a8 8 0 007.938-6h-3.969zm-8-1.062C5.373 16 8.156 17.865 10.27 16H4.73z"
                  ></path>
                </svg>
              ) : (
                'Sign up'
              )}
            </button>
          </div>
        </form>
      </div>

      <p className="mt-4 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
