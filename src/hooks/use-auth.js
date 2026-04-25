"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";

// ── Auth context for app-wide state ──
const AuthContext = createContext(null);

/**
 * Simple email/password auth system using localStorage.
 * Falls back to mock user when backend is unavailable.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lexis_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // corrupted data
      localStorage.removeItem("lexis_user");
    }
    setIsLoaded(true);
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem("lexis_user", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("lexis_user");
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem("lexis_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext value={{
      user,
      isLoaded,
      isSignedIn: !!user,
      login,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext>
  );
}

/**
 * Hook to access auth state.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // Fallback if used outside provider (shouldn't happen)
    return {
      user: null,
      isLoaded: true,
      isSignedIn: false,
      login: () => {},
      logout: () => {},
      updateUser: () => {},
    };
  }
  return ctx;
}

/**
 * Hook to access user data.
 */
export function useUser() {
  const { user, isLoaded, isSignedIn } = useAuth();
  return { user, isLoaded, isSignedIn };
}
