import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import type { AuthMode } from '../config/types';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/movies';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    try {
      if (mode === 'login') {
        await login(email, password);
        navigate(from, { replace: true });
      } else {
        await register(email, password);
        navigate('/movies', { replace: true });
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message || `Error ${mode === 'login' ? 'signing in' : 'creating account'}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-900 to-secondary-800 px-4">
      <div className="max-w-md w-full bg-secondary-800/50 backdrop-blur-sm border border-white/10 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          🎬 {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h1>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              mode === 'login'
                ? 'bg-primary-400 text-black'
                : 'bg-secondary-700 text-gray-400'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              mode === 'register'
                ? 'bg-primary-400 text-black'
                : 'bg-secondary-700 text-gray-400'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-secondary-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-secondary-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-secondary-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary-400 text-black font-bold py-3 rounded-lg hover:bg-primary-300 transition-colors"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}