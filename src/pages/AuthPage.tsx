import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
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

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
    setConfirmPassword('');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-900 to-secondary-800 px-4">
      <div className="max-w-md w-full bg-secondary-800/50 backdrop-blur-sm border border-white/10 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          🎬 {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h1>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => switchMode('login')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              mode === 'login'
                ? 'bg-primary-400 text-black font-bold'
                : 'bg-secondary-700 text-gray-400'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => switchMode('register')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              mode === 'register'
                ? 'bg-primary-400 text-black font-bold'
                : 'bg-secondary-700 text-gray-400'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <Input
            type="email"
            label="Email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={mode === 'register' ? 'Minimum 6 characters' : undefined}
            required
          />

          {mode === 'register' && (
            <Input
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>

          <p className="text-center text-sm">
            <Link to="/" className="text-gray-400 hover:text-gray-300">
              ← Back to home
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}