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
      if (mode === 'register' && error.message.includes('already registered')) {
        setError('This email is already registered. Try signing in.');
      } else {
        setError(error.message || `Error ${mode === 'login' ? 'signing in' : 'creating account'}. Please try again.`);
      }
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
    setConfirmPassword('');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-app px-4">
      <div className="max-w-md w-full card-glass p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            🎬 {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-300">
            {mode === 'login' 
              ? 'Sign in to explore movies and series' 
              : 'Sign up to start exploring content'
            }
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => switchMode('login')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              mode === 'login'
                ? 'bg-primary-400 text-black font-bold'
                : 'bg-slate-800/50 text-gray-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => switchMode('register')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              mode === 'register'
                ? 'bg-primary-400 text-black font-bold'
                : 'bg-slate-800/50 text-gray-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg backdrop-blur-sm">
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
