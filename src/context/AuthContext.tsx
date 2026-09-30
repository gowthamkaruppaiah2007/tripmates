import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  loading: boolean;
  isSupabaseConfigured: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (isSupabaseConfigured) {
      // Check active Supabase session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            avatarUrl: session.user.user_metadata?.avatar_url
          });
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            avatarUrl: session.user.user_metadata?.avatar_url
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      // Local demo auth fallback
      const savedUser = localStorage.getItem('tripmates_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem('tripmates_user');
        }
      }
      setLoading(false);
    }
  }, []);

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });
      if (error) return { error: error.message };
      
      // Also create profile record
      if (data.user) {
        await supabase.from('profiles').insert([{
          id: data.user.id,
          email,
          full_name: fullName
        }]);
      }
      return {};
    } else {
      // Demo authentication state
      const mockUser: UserProfile = {
        id: 'user_' + Date.now(),
        email,
        fullName
      };
      setUser(mockUser);
      localStorage.setItem('tripmates_user', JSON.stringify(mockUser));
      return {};
    }
  };

  const signIn = async (email: string, password: string) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) return { error: error.message };
      return {};
    } else {
      // Demo authentication state
      const mockUser: UserProfile = {
        id: 'user_demo_123',
        email,
        fullName: email.split('@')[0] || 'Traveler'
      };
      setUser(mockUser);
      localStorage.setItem('tripmates_user', JSON.stringify(mockUser));
      return {};
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('tripmates_user');
    }
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isSupabaseConfigured,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signUp,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
