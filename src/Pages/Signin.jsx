import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { signIn } from '../Lib/Auth';

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const HandleSubmit=async(event)=>{
    event.preventDefault();


    try {

      setIsLoading(true);
      setError(null)

    let {data}=  await signIn(email,password);
    console.log("data",data)

      navigate("/")


    }catch(error){

      setError("Invalid email or password",error.message)
      console.log("error",error)

    }
    finally{
      setIsLoading(false)
    }

  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4">
      <div className="backdrop-blur-xl bg-white/60 shadow-2xl border border-blue-100 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome Back</h2>

        {
          error && (
            <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg p-4 mb-4">
              <p>{error}</p>
            </div>
          )
        }

        <form onSubmit={HandleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-blue-500" />
            <input
              type="email"

              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-blue-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Link to Signup */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
