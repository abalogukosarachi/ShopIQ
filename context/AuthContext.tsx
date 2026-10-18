"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/**
 * ⚠️ DEMO-ONLY AUTH.
 * This stores users and passwords in plain text in the browser's
 * localStorage purely so the Sign Up / Sign In / Dashboard UI has
 * something real to react to. It is NOT secure and must NOT be used
 * as-is for a real product — replace with NextAuth.js + a real database
 * (bcrypt-hashed passwords, server-side sessions) in the backend sprint.
 */

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isHydrated: boolean;
  signUp: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const USERS_KEY = "shopiq_users_demo";
const SESSION_KEY = "shopiq_session_demo";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // No session — start signed out.
    } finally {
      setIsHydrated(true);
    }
  }, []);

  function getUsers(): StoredUser[] {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function signUp(name: string, email: string, password: string) {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const newUser: StoredUser = { name, email, password };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    const session: AuthUser = { name, email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  }

  function signIn(email: string, password: string) {
    const users = getUsers();
    const match = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );
    if (!match) {
      return { ok: false, error: "Incorrect email or password." };
    }
    const session: AuthUser = { name: match.name, email: match.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  }

  function signOut() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isHydrated, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
