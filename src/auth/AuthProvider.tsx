import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../config/supabase';
import type { User } from '../types/domain';
import { AuthContext } from './AuthContext';

const GUEST_USER_KEY = 'movieapp_guest_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const guestUser = localStorage.getItem(GUEST_USER_KEY);
        if (guestUser) {
          setUser(JSON.parse(guestUser));
          setLoading(false);
          return;
        }

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
      localStorage.removeItem(GUEST_USER_KEY);
      setUser(session?.user as User ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      localStorage.removeItem(GUEST_USER_KEY);
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw new Error(error.message || 'Invalid email or password');
      
      setUser(data.user as User);
    } catch (error) {
      throw error instanceof Error ? error : new Error('Login failed');
    }
  };

  const register = async (email: string, password: string) => {
    try {
      localStorage.removeItem(GUEST_USER_KEY);
      
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) throw new Error(error.message || 'Registration failed');
      
      setUser(data.user as User);
    } catch (error) {
      throw error instanceof Error ? error : new Error('Registration failed');
    }
  };

  const logout = async () => {
    try {
      const isGuest = user?.id?.startsWith('guest-');
      
      if (isGuest) {
        localStorage.removeItem(GUEST_USER_KEY);
        setUser(null);
      } else {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error(error.message || 'Logout failed');
        setUser(null);
      }
    } catch (error) {
      throw error instanceof Error ? error : new Error('Logout failed');
    }
  };

  const loginAsGuest = () => {
    const guestUser: User = {
      id: 'guest-' + Date.now(),
      email: 'guest@movieapp.com',
      created_at: new Date().toISOString(),
    };
    
    localStorage.setItem(GUEST_USER_KEY, JSON.stringify(guestUser));
    setUser(guestUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loginAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
}
