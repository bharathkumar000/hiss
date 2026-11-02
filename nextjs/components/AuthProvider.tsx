"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { UserRead } from "./schemas/user";

interface AuthContextType {
  user: UserRead | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<UserRead>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Seeded Accounts for SYNAPSE Enterprise Coordination Platform
export const SEEDED_ACCOUNTS: Record<
  string,
  {
    id: string;
    email: string;
    password: string;
    full_name: string;
    role: string;
    organization: string;
  }
> = {
  // 1. System Administrator
  "admin@example.com": {
    id: "usr-001",
    email: "admin@example.com",
    password: "admin123",
    full_name: "System Administrator",
    role: "system_admin",
    organization: "AICTE Central HQ",
  },
  // 2. Bureau Officer
  "officer1@example.com": {
    id: "usr-002",
    email: "officer1@example.com",
    password: "officer123",
    full_name: "Bureau Officer",
    role: "bureau_officer",
    organization: "Admissions Bureau",
  },
  // 3. Reviewing Officer
  "reviewer@example.com": {
    id: "usr-003",
    email: "reviewer@example.com",
    password: "review123",
    full_name: "Reviewing Officer",
    role: "reviewing_officer",
    organization: "Overlap Review Desk & Institutional Dossier",
  },
  "hei.admin@example.com": {
    id: "usr-003b",
    email: "hei.admin@example.com",
    password: "hei123",
    full_name: "HEI Administrator",
    role: "reviewing_officer",
    organization: "Synthetic Inst. of Tech",
  },
  // 4. Coordination Officer
  "coord@example.com": {
    id: "usr-004",
    email: "coord@example.com",
    password: "coord123",
    full_name: "Coordination Officer",
    role: "coordination_officer",
    organization: "Inter-Bureau Secretariat",
  },
  "superadmin@example.com": {
    id: "usr-004b",
    email: "superadmin@example.com",
    password: "super123",
    full_name: "Super Administrator",
    role: "coordination_officer",
    organization: "GovTech Core Architecture",
  },
  // 5. Management Viewer
  "viewer@example.com": {
    id: "usr-005",
    email: "viewer@example.com",
    password: "viewer123",
    full_name: "Management Viewer",
    role: "management_viewer",
    organization: "Statutory & SLA Vigilance",
  },
  "auditor@example.com": {
    id: "usr-005b",
    email: "auditor@example.com",
    password: "audit123",
    full_name: "Auditor",
    role: "management_viewer",
    organization: "Statutory & SLA Vigilance",
  },
};

function setAuthCookies(token: string, role: string) {
  if (typeof document === "undefined") return;
  document.cookie = `access_token=${encodeURIComponent(token)}; path=/; max-age=86400; SameSite=Lax`;
  document.cookie = `synapse_role=${encodeURIComponent(role)}; path=/; max-age=86400; SameSite=Lax`;
  document.cookie = `synapse_logged_in=1; path=/; max-age=86400; SameSite=Lax`;
}

function clearAuthCookies() {
  if (typeof document === "undefined") return;
  document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "synapse_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "synapse_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

function getStoredUser(): UserRead | null {
  if (typeof window === "undefined") return null;
  const isLoggedOut = localStorage.getItem("synapse_logged_out") === "true";
  const token = localStorage.getItem("access_token");
  if (isLoggedOut && !token) return null;

  const stored = localStorage.getItem("synapse_user");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem("synapse_user");
    }
  }

  if (token && token.startsWith("synapse-auth-")) {
    const role = token.replace("synapse-auth-", "");
    const matching = Object.values(SEEDED_ACCOUNTS).find((a) => a.role === role);
    if (matching) {
      return {
        id: matching.id,
        email: matching.email,
        full_name: matching.full_name,
        is_active: true,
        role: matching.role,
        organization: matching.organization,
      };
    }
  }

  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserRead | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMe = useCallback(async () => {
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("access_token");
    const isLoggedOut = localStorage.getItem("synapse_logged_out") === "true";

    // If explicit log out occurred and no new token, remain unauthenticated
    if (isLoggedOut && !token) {
      setUser(null);
      setLoading(false);
      return;
    }

    // Check stored user first
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
      setLoading(false);
      return;
    }

    // Default to initial System Administrator session if clean slate
    const defaultAccount = SEEDED_ACCOUNTS["admin@example.com"];
    const initialUser: UserRead = {
      id: defaultAccount.id,
      email: defaultAccount.email,
      full_name: defaultAccount.full_name,
      is_active: true,
      role: defaultAccount.role,
      organization: defaultAccount.organization,
    };
    setUser(initialUser);
    localStorage.setItem("access_token", "synapse-auth-system_admin");
    localStorage.setItem("synapse_user", JSON.stringify(initialUser));
    setAuthCookies("synapse-auth-system_admin", initialUser.role);
    localStorage.removeItem("synapse_logged_out");
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const signIn = async (email: string, password: string): Promise<UserRead> => {
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // 1. Try Backend API first if available (with 1200ms timeout)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);

      const resp = await fetch(`${API_BASE}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (resp.ok) {
        const data = await resp.json();
        if (data && data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          if (data.refresh_token) {
            localStorage.setItem("refresh_token", data.refresh_token);
          }
          localStorage.removeItem("synapse_logged_out");

          // Fetch user profile from backend
          const meResp = await fetch(`${API_BASE}/api/v1/users/me`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.access_token}`,
            },
          });

          if (meResp.ok) {
            const meData = await meResp.json();
            const authenticatedUser: UserRead = {
              id: meData.id,
              email: meData.email,
              full_name: meData.full_name,
              is_active: meData.is_active,
              role: meData.role,
              organization: meData.organization || SEEDED_ACCOUNTS[meData.email]?.organization || "AICTE Central HQ",
            };

            localStorage.setItem("synapse_user", JSON.stringify(authenticatedUser));
            setAuthCookies(data.access_token, authenticatedUser.role);
            setUser(authenticatedUser);
            setLoading(false);
            return authenticatedUser;
          }
        }
      }
    } catch {
      // Backend unavailable or timed out, fallback to seeded enterprise accounts
    }

    // 2. Validate against seeded enterprise accounts
    const seeded = SEEDED_ACCOUNTS[cleanEmail];
    if (seeded && seeded.password === cleanPassword) {
      const authenticatedUser: UserRead = {
        id: seeded.id,
        email: seeded.email,
        full_name: seeded.full_name,
        is_active: true,
        role: seeded.role,
        organization: seeded.organization,
      };

      const token = `synapse-auth-${seeded.role}`;
      localStorage.setItem("access_token", token);
      localStorage.setItem("synapse_user", JSON.stringify(authenticatedUser));
      localStorage.removeItem("synapse_logged_out");
      setAuthCookies(token, authenticatedUser.role);

      setUser(authenticatedUser);
      setLoading(false);
      return authenticatedUser;
    }

    setLoading(false);
    throw new Error("Invalid credentials. Please verify your email and password.");
  };

  const signOut = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("synapse_user");
      localStorage.setItem("synapse_logged_out", "true");
      clearAuthCookies();
    }
    setUser(null);
    setLoading(false);
  };

  const refreshUser = fetchMe;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        signIn,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
