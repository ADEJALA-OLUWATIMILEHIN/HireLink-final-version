import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../../Components/Footer';
import { Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../../api/authAPI/loginApi';

const Login: React.FC = () => {
  // User type toggle
  const [userType, setUserType] = useState<'jobseeker' | 'employer'>('jobseeker');


  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage,setErrorMessage]= useState('');
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      email,
      password,
      role : userType,
    };

    try {
      const res = await loginApi(payload);
      console.log(res);
      setErrorMessage(res.message);
      if (res.message === 'success' && res.role === 'jobseeker') {
        navigate('/jobseeker');
      }

      if (res.message === 'success' && res.role === 'employer') {
        navigate('/employer/dashboard');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
          
          {/* Logo and Title */}
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-1xl font-medium text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 mt-1">Login to your HireLink account</p>
          </div>

          {/* User Type Toggle */}
          <div className="bg-gray-50 p-1 rounded-lg flex mb-6">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                userType === 'jobseeker'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setUserType('jobseeker')}
            >
              Job Seeker
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                userType === 'employer'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setUserType('employer')}
            >
              Employer
            </button>
          </div>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
            >
              {isLoading ? 'Logging in...' : 'Login'}
              
            </button>
            <p className='text-red-600 text-center'>{errorMessage}</p>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Sign up
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
