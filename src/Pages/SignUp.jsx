import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { signUp } from '../Lib/Auth';

const SignUp = () => {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);




  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)
    console.log("username",username),
    console.log("email",email),
    console.log("password",password),
    console.log("confirm",confirmPassword)


    if (password !== confirmPassword) {
      setError('Passwords do not match')
     // alert("do not match")
      setIsLoading(false)
      setError("Passwords do not match")
      return
    }

    try {
     
      await signUp(email, password,username)

      if (error){ 
        throw error,
        setError(error.message)


      }

      setSuccess(true)

      setTimeout(() => {

        navigate('/Signin')
        
    

        
      },3000);

  
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)

    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <div className="text-green-500 text-6xl mb-4 animate-bounce">✓</div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Account Created!</h2>
            <p className="text-gray-600 mb-5">
              Your account has been created successfully.<br />
              Please check your email to verify it.
            </p>
            <p className="text-sm text-gray-400 italic">
              Redirecting to sign-in page in a few seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4">
      <div className="backdrop-blur-xl bg-white/60 shadow-2xl border border-blue-100 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Create Your Account</h2>
        {
        error && (
          <>
          <p className='text-red-900 bg-red-100 p-3 rounded-md mb-4'>{error}</p>
          </>
        )
       }

        <form className="space-y-5" onSubmit={HandleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-blue-500" />
            <input
              type="text"
              value={username}

              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder:text-gray-400"
            />
          </div>

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

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-blue-500" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/Signin" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
