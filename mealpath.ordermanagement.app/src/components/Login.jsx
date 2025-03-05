// import {Link} from 'react-router-dom';
// import React, { useState } from 'react'
// import {MdPerson, MdLockOutline} from "react-icons/md";
// import axios from 'axios';

// const Login = () => {

//   const [username, setUsername] = useState('');
//   const[password,setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);


//   const handleLogin = () => {
//     setIsLoading(true);

//     const loginData = {
//       username: username,
//       password: password
//     };


//     axios.post('http://localhost:8081/api/auth/signin', loginData)
//       .then(response => {
//         // Handle successful login here
//         console.log(response.data);
//         setIsLoading(false);
//         // Show success alert or redirect to the next page
//         // Example using alert:
//         alert('Login successful');
//       })
//       .catch(error => {
//         // Handle login error here
//         console.error(error);
//         setIsLoading(false);
//         // Show error alert
//         // Example using alert:
//         alert('Login failed');
//       });
//   };

//     return(
//         <div className="mb-10">
//             <div className="flex justify-center">
//             <Link to={'/'} className="flex items-center gap-2">
//                 <h2 className="textHeading-Color text-xl text-textColor">Meal<span className="textHeading-Color text-xl font-bold text-green-600">Path</span></h2>

//             </Link>
             
                  
//             </div>
//             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Login to your account
//             </h2>
            

//             <div className=' space-y-6w-[90%]  rounded-lg p-4 flex justify-center'>
//             <form className="mt-8 space-y-6">

//             <div className=" w-full py-2 border-b border-gray-300 flex items-center gap-4">
//           <MdPerson className="text-xl text-gray-700" />
//           <input
//             type="text"
//             required
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//             className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
//           />
//            </div>
//            <div className=" w-full py-2 border-b border-gray-300 flex items-center gap-2">
//           <MdLockOutline className="text-xl text-gray-700" />
//           <input
//             type="Password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
//           />
//            </div>

//            <p className="text-center text-sm text-gray-600 ">
//             Don't have an account yet? {' '}
//             <Link to={'/signup'} className="font-medium text-green-600 hover:text-green-500">
//             Sign up
//             </Link>
//             </p>

//            <div className="flex justify-center ">
//           <button
//             type="button"
//             className=" w-full md:w-auto border-none outline-none
//             //  bg-green-600 px-12 py-2 rounded-lg text-lg text-white font-semibold "
//             onClick={handleLogin}
//             disabled={isLoading}
//           >
//              {isLoading ? 'Logging in...' : 'Login'}
//           </button>
//         </div>
//       </form>
//       </div>
            
            
//         </div>

        
//     )
// }
// export default Login



import React, { useState } from 'react';
import { MdPerson, MdLockOutline } from 'react-icons/md';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:8081/api/auth/signin', loginData);
      console.log(response.data);
      setIsLoading(false);
      alert('Login successful!');
      // Redirect to index page
      navigate('/');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert('Login failed!');
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
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>

      <div className="space-y-6w-[90%] rounded-lg p-4 flex justify-center">
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
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
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

          <p className="text-center text-sm text-gray-600">
            Don't have an account yet?{' '}
            <Link to={'/signup'} className="font-medium text-green-600 hover:text-green-500">
              Sign up
            </Link>
          </p>

          <div className="flex justify-center">
            <button
              type="button"
              className="w-full md:w-auto border-none outline-none
              bg-green-600 px-12 py-2 rounded-lg text-lg text-white font-semibold"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
