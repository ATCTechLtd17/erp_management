import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { email: string; name: string };
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Default credentials
const DEFAULT_EMAIL = 'admin@example.com';
const DEFAULT_PASSWORD = 'admin123';

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email: string, password: string) => {
    if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      set({
        isAuthenticated: true,
        user: { email, name: 'Admin User' },
      });
      return true;
    }
    return false;
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));