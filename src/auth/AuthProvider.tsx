import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../config/supabase';
import type { User } from '../config/interfaces';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user as User ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user as User ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw new Error(error.message || 'Invalid email or password');
      
      setUser(data.user as User);
    } catch (error) {
      throw error instanceof Error ? error : new Error('Login failed');
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) throw new Error(error.message || 'Registration failed');
      
      setUser(data.user as User);
    } catch (error) {
      throw error instanceof Error ? error : new Error('Registration failed');
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw new Error(error.message || 'Logout failed');
      
      setUser(null);
    } catch (error) {
      throw error instanceof Error ? error : new Error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
