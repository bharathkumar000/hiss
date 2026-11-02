"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, AlertCircle, ArrowRight, Shield, Building2, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../components/AuthProvider";

const DEMO_PRESETS = [
  {
    roleTitle: "System Administrator",
    bureau: "AICTE Central HQ",
    initials: "SA",
    email: "admin@example.com",
    password: "admin123",
    color: "bg-[#F3F0FF] text-[#6246EA] border-[#E8EAF0]",
  },
  {
    roleTitle: "Bureau Officer",
    bureau: "Admissions Bureau",
    initials: "BO",
    email: "officer1@example.com",
    password: "officer123",
    color: "bg-[#EBF3FC] text-[#3478C9] border-[#D5E6F8]",
  },
  {
    roleTitle: "Reviewing Officer",
    bureau: "Synthetic Inst. of Tech / Review Desk",
    initials: "RO",
    email: "reviewer@example.com",
    password: "review123",
    color: "bg-[#E8F8F2] text-[#078B68] border-[#D1F0E4]",
  },
  {
    roleTitle: "Coordination Officer",
    bureau: "Inter-Bureau Secretariat",
    initials: "CO",
    email: "coord@example.com",
    password: "coord123",
    color: "bg-[#F3F0FF] text-[#6246EA] border-[#E8EAF0]",
  },
  {
    roleTitle: "Management Viewer",
    bureau: "Statutory & SLA Vigilance",
    initials: "MV",
    email: "viewer@example.com",
    password: "viewer123",
    color: "bg-[#FCF8E8] text-[#C88918] border-[#F6E8B6]",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to dashboard immediately
  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      router.replace("/");
    } else if (!isAuthenticated) {
      setIsSubmitting(false);
      setAuthError(null);
    }
  }, [loading, isAuthenticated, user, router]);

  // Clean up submitting state on unmount
  useEffect(() => {
    return () => {
      setIsSubmitting(false);
    };
  }, []);

  const handleSelectPreset = (preset: (typeof DEMO_PRESETS)[0]) => {
    setEmail(preset.email);
    setPassword(preset.password);
    setAuthError(null);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setAuthError("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    setAuthError(null);

    try {
      await signIn(cleanEmail, cleanPassword);
      setIsSubmitting(false);
      // Immediately navigate on first click
      router.replace("/");
      router.refresh();
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed. Please verify credentials.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* SYNAPSE Branding */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[#6246EA] flex items-center justify-center text-white font-semibold text-sm shadow-xs">
            S
          </div>
          <span className="font-semibold text-[22px] text-[#171923] tracking-tight">
            SYNAPSE
          </span>
          <span className="px-2 py-0.5 text-[11px] font-medium text-[#6246EA] bg-[#F3F0FF] rounded-md border border-[#E8EAF0]">
            v2.4
          </span>
        </div>
        <p className="text-center text-[13px] text-[#667085] max-w-sm mx-auto">
          Enterprise Regulatory Intelligence & Cross-Bureau Harmonization
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#E8EAF0] pb-4">
            <h2 className="text-[18px] font-semibold text-[#171923]">Sign In</h2>
            <p className="text-[13px] text-[#667085] mt-1">
              Authenticate to open your designated portal session.
            </p>
          </div>

          {authError && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FDF2F4] border border-[#FAD2D8] text-[12px] text-[#D93649] animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#171923] mb-1.5">
                Official Email Address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full h-10 px-3 bg-[#F7F8FA] hover:bg-white border border-[#E8EAF0] rounded-lg text-[13px] text-[#171923] placeholder-[#98A2B3] focus:outline-none focus:border-[#6246EA] focus:bg-white transition-colors disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#171923] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your security credentials"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full h-10 px-3 pr-10 bg-[#F7F8FA] hover:bg-white border border-[#E8EAF0] rounded-lg text-[13px] text-[#171923] placeholder-[#98A2B3] focus:outline-none focus:border-[#6246EA] focus:bg-white transition-colors disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#98A2B3] hover:text-[#171923] transition-colors"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 rounded-lg bg-[#6246EA] hover:bg-[#5338D6] text-white text-[13px] font-medium transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* 5 Seeded Enterprise Accounts Preset Strip */}
          <div className="pt-4 border-t border-[#E8EAF0] space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-[#98A2B3] font-medium uppercase tracking-wider">
              <span>Seeded Enterprise Accounts (5 Roles)</span>
              <span>1-Click Fill</span>
            </div>

            <div className="space-y-1.5">
              {DEMO_PRESETS.map((p) => {
                const isSelected = email.toLowerCase() === p.email.toLowerCase();
                return (
                  <button
                    key={p.email}
                    type="button"
                    onClick={() => handleSelectPreset(p)}
                    disabled={isSubmitting}
                    className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-[#F3F0FF] border-[#6246EA]/40 ring-1 ring-[#6246EA]/20"
                        : "bg-[#F7F8FA] border-[#E8EAF0] hover:bg-white hover:border-[#D1D5DB]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-md font-mono text-[11px] font-semibold flex items-center justify-center border shrink-0 ${p.color}`}
                      >
                        {p.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] font-medium text-[#171923] leading-tight truncate">
                          {p.roleTitle}
                        </p>
                        <p className="text-[11px] text-[#667085] truncate font-mono mt-0.5">
                          {p.email} • {p.bureau}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-medium text-[#6246EA] shrink-0 pl-2">
                      Use
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-[#98A2B3] mt-6 font-mono">
          AICTE Central Intelligence Platform • Protected Statutory Environment
        </p>
      </div>
    </div>
  );
}
