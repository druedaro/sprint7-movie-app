import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../hooks/useAuth';
import { loginSchema, registerSchema } from '../schemas/authSchema';
import type { LoginFormData, RegisterFormData } from '../schemas/authSchema';
import Button from '../components/atoms/Button';
import FormInput from '../components/atoms/FormInput';
import type { AuthMode } from '../types/common';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [error, setError] = useState('');
  
  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/movies';

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    setError('');
    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Error signing in. Please try again.');
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    setError('');
    try {
      await registerUser(data.email, data.password);
      navigate('/movies', { replace: true });
    } catch (err) {
      const error = err as Error;
      if (error.message.includes('already registered')) {
        setError('This email is already registered. Try signing in.');
      } else {
        setError(error.message || 'Error creating account. Please try again.');
      }
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
    resetLogin();
    resetRegister();
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

        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg backdrop-blur-sm">
                {error}
              </div>
            )}

            <FormInput
              label="Email"
              type="email"
              placeholder="you@email.com"
              error={loginErrors.email?.message}
              {...registerLogin('email')}
            />

            <FormInput
              label="Password"
              type="password"
              placeholder="••••••••"
              error={loginErrors.password?.message}
              {...registerLogin('password')}
            />

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Sign In
            </Button>

            <p className="text-center text-sm">
              <Link to="/" className="text-gray-400 hover:text-gray-300">
                ← Back to home
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg backdrop-blur-sm">
                {error}
              </div>
            )}

            <FormInput
              label="Email"
              type="email"
              placeholder="you@email.com"
              error={registerErrors.email?.message}
              {...registerRegister('email')}
            />

            <FormInput
              label="Password"
              type="password"
              placeholder="••••••••"
              error={registerErrors.password?.message}
              helperText={!registerErrors.password ? 'Minimum 6 characters' : undefined}
              {...registerRegister('password')}
            />

            <FormInput
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              error={registerErrors.confirmPassword?.message}
              {...registerRegister('confirmPassword')}
            />

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Create Account
            </Button>

            <p className="text-center text-sm">
              <Link to="/" className="text-gray-400 hover:text-gray-300">
                ← Back to home
              </Link>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
