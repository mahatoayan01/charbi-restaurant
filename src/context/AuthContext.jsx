import React, { createContext, useContext, useState, useEffect } from "react";
import { isFirebaseConfigured, auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext(null);

const DEMO_USER_KEY = "charbi_demo_auth_user_v1";

// Demo credentials for testing without Firebase setup (clearly documented in .env.example)
export const DEMO_CREDENTIALS = {
  email: "admin@charbirestaurant.com",
  password: "password123",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isDemoMode = !isFirebaseConfigured;

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // Demo Mode: read cached demo login
      const cached = localStorage.getItem(DEMO_USER_KEY);
      if (cached) {
        try {
          setUser(JSON.parse(cached));
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    }
  }, [isDemoMode]);

  const login = async (email, password) => {
    if (isFirebaseConfigured && auth) {
      return signInWithEmailAndPassword(auth, email, password);
    }

    // Demo Mode validation
    if (
      email.trim().toLowerCase() === DEMO_CREDENTIALS.email.toLowerCase() &&
      password === DEMO_CREDENTIALS.password
    ) {
      const demoUser = {
        email: DEMO_CREDENTIALS.email,
        displayName: "Charbi Owner (Demo)",
        uid: "demo-owner-uid-001",
        isDemo: true,
      };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
      setUser(demoUser);
      return { user: demoUser };
    } else {
      throw new Error("Invalid email or password. Use demo credentials from .env.example.");
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    localStorage.removeItem(DEMO_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        loading,
        isDemoMode,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

