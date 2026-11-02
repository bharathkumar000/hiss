"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  LogOut,
  Mail,
  Building2,
  Shield,
  LogIn,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";

interface TopNavProps {
  onSearchClick: () => void;
  pendingOverlapsCount: number;
  onToggleMobileSidebar?: () => void;
}

const ROLE_DISPLAY: Record<
  string,
  { label: string; bureau: string; initials: string; portalRole: string }
> = {
  system_admin: {
    label: "System Administrator",
    bureau: "AICTE Central HQ",
    initials: "SA",
    portalRole: "central_admin",
  },
  central_admin: {
    label: "Central Administrator",
    bureau: "AICTE Central HQ",
    initials: "CA",
    portalRole: "central_admin",
  },
  bureau_officer: {
    label: "Bureau Officer",
    bureau: "Admissions Bureau",
    initials: "BO",
    portalRole: "bureau_officer",
  },
  reviewing_officer: {
    label: "Reviewing Officer",
    bureau: "Overlap Review Desk & Institutional Dossier",
    initials: "RO",
    portalRole: "hei_admin",
  },
  hei_admin: {
    label: "HEI Administrator",
    bureau: "Synthetic Inst. of Tech",
    initials: "HA",
    portalRole: "hei_admin",
  },
  coordination_officer: {
    label: "Coordination Officer",
    bureau: "Inter-Bureau Secretariat",
    initials: "CO",
    portalRole: "super_admin",
  },
  super_admin: {
    label: "Super Administrator",
    bureau: "GovTech Core Architecture",
    initials: "SA",
    portalRole: "super_admin",
  },
  management_viewer: {
    label: "Management Viewer",
    bureau: "Statutory & SLA Vigilance",
    initials: "MV",
    portalRole: "auditor",
  },
  auditor: {
    label: "Auditor",
    bureau: "Statutory & SLA Vigilance",
    initials: "AU",
    portalRole: "auditor",
  },
};

export default function TopNav({
  onSearchClick,
  pendingOverlapsCount,
  onToggleMobileSidebar,
}: TopNavProps) {
  const { user, isAuthenticated, signOut, loading: authLoading } = useAuth();
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConfirmSignOut = async () => {
    setShowSignOutConfirm(false);
    setAccountMenuOpen(false);
    await signOut();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    } else {
      router.replace("/login");
    }
  };

  const handleNavigateSignIn = () => {
    setAccountMenuOpen(false);
    router.replace("/login");
  };

  const getRoleInfo = () => {
    if (user?.role && ROLE_DISPLAY[user.role]) {
      const info = ROLE_DISPLAY[user.role];
      return {
        label: info.label,
        bureau: user.organization || info.bureau,
        initials: info.initials,
      };
    }
    return {
      label: "Central Administrator",
      bureau: user?.organization || "AICTE Central HQ",
      initials: "CA",
    };
  };

  const roleInfo = getRoleInfo();

  return (
    <header className="h-14 bg-white border-b border-[#E8EAF0] sticky top-0 z-20 flex items-center justify-between px-6 select-none">
      {/* Left: Mobile menu toggle + Global search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 -ml-2 rounded-lg text-[#667085] hover:text-[#171923] hover:bg-[#F7F8FA] md:hidden transition-colors"
            title="Open navigation"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={onSearchClick}
          className="w-full flex items-center justify-between px-3.5 h-9 bg-[#F7F8FA] hover:bg-[#F0F1F4] border border-[#E8EAF0] text-[#667085] rounded-lg text-xs transition-colors group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-[#98A2B3] group-hover:text-[#667085] transition-colors" />
            <span className="text-[#667085] text-[13px] font-normal">
              Search AISHE, cases, bureaus...
            </span>
          </div>
          <kbd className="hidden sm:inline-block bg-white text-[#98A2B3] text-[11px] font-mono px-2 py-0.5 rounded border border-[#E8EAF0]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Notification & Authenticated Account Menu */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setAccountMenuOpen(false);
            }}
            className="relative h-9 w-9 rounded-lg flex items-center justify-center text-[#667085] hover:text-[#171923] hover:bg-[#F7F8FA] border border-[#E8EAF0] transition-colors"
            title="Regulatory alerts"
          >
            <Bell className="w-4 h-4" />
            {pendingOverlapsCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#D93649] rounded-full ring-2 ring-white" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E8EAF0] rounded-xl dropdown-shadow p-3.5 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#E8EAF0]">
                <span className="text-[13px] font-medium text-[#171923]">
                  Regulatory Intelligence Alerts
                </span>
                <span className="text-[11px] text-[#6246EA] cursor-pointer hover:underline font-medium">
                  Mark all read
                </span>
              </div>
              <div className="mt-2.5 space-y-2">
                <div className="p-3 bg-[#FDF2F4] border border-[#FAD2D8] rounded-lg">
                  <p className="font-medium text-[#D93649] flex items-center gap-1.5 text-[12px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D93649]" />
                    Critical Conflict Alert (91% Score)
                  </p>
                  <p className="text-[#667085] text-[12px] mt-1 leading-snug">
                    Admissions ↔ Examinations collision for Synthetic Inst. of Tech.
                  </p>
                </div>
                <div className="p-3 bg-[#FCF8E8] border border-[#F6E8B6] rounded-lg">
                  <p className="font-medium text-[#C88918] flex items-center gap-1.5 text-[12px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C88918]" />
                    Consultation Response Due
                  </p>
                  <p className="text-[#667085] text-[12px] mt-1 leading-snug">
                    COORD-2026-101 has 4 days remaining before statutory deadline.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Authenticated Account Menu Dropdown */}
        <div className="relative" ref={accountMenuRef}>
          {isAuthenticated && user ? (
            <button
              onClick={() => {
                setAccountMenuOpen(!accountMenuOpen);
                setNotifOpen(false);
              }}
              className="h-9 flex items-center gap-2.5 pl-2.5 pr-3 rounded-lg border border-[#E8EAF0] hover:bg-[#F7F8FA] transition-colors"
              aria-expanded={accountMenuOpen}
              aria-haspopup="true"
            >
              <div className="w-7 h-7 rounded-md bg-[#F3F0FF] text-[#6246EA] font-medium text-[12px] flex items-center justify-center border border-[#E8EAF0] shrink-0 font-mono">
                {roleInfo.initials}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-[12px] font-medium text-[#171923] leading-none">
                  {roleInfo.label}
                </div>
                <div className="text-[10px] text-[#98A2B3] leading-none mt-1 truncate max-w-[140px]">
                  {roleInfo.bureau}
                </div>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#98A2B3] ml-0.5 transition-transform duration-150 ${
                  accountMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          ) : (
            <button
              onClick={handleNavigateSignIn}
              className="h-9 px-3.5 rounded-lg bg-[#6246EA] hover:bg-[#5338D6] text-white text-[13px] font-medium flex items-center gap-2 transition-colors shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Account Menu Content (Strictly Account Info & Actions Only) */}
          {accountMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-[#E8EAF0] rounded-xl dropdown-shadow p-2 z-50 animate-in fade-in slide-in-from-top-1">
              {isAuthenticated && user ? (
                <>
                  {/* Section 1: Account Information */}
                  <div className="p-2.5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#F3F0FF] text-[#6246EA] font-semibold text-[13px] flex items-center justify-center border border-[#E8EAF0] shrink-0 font-mono">
                        {roleInfo.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium text-[#171923] truncate leading-tight">
                          {user.full_name || roleInfo.label}
                        </p>
                        <p className="text-[11px] text-[#667085] truncate font-mono mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#F7F8FA] border border-[#E8EAF0] rounded-lg p-2.5 space-y-2 text-[12px]">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[#98A2B3] flex items-center gap-1.5 text-[11px]">
                          <Shield className="w-3.5 h-3.5 text-[#6246EA]" />
                          Role
                        </span>
                        <span className="font-medium text-[#171923] text-right truncate">
                          {roleInfo.label}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[#98A2B3] flex items-center gap-1.5 text-[11px]">
                          <Building2 className="w-3.5 h-3.5 text-[#6246EA]" />
                          Organisation
                        </span>
                        <span className="font-medium text-[#171923] text-right truncate">
                          {roleInfo.bureau}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[#98A2B3] flex items-center gap-1.5 text-[11px]">
                          <Mail className="w-3.5 h-3.5 text-[#6246EA]" />
                          Account
                        </span>
                        <span className="font-mono text-[#171923] text-[11px] text-right truncate">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Subtle Divider */}
                  <div className="my-1 border-t border-[#E8EAF0]" />

                  {/* Section 2: Account Actions */}
                  <div className="p-1">
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        setShowSignOutConfirm(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-[13px] font-medium text-[#D93649] hover:bg-[#FDF2F4] transition-colors"
                    >
                      <LogOut className="w-4 h-4 shrink-0" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-2">
                  <div className="p-3 text-center space-y-2">
                    <p className="text-[13px] font-medium text-[#171923]">Not Signed In</p>
                    <p className="text-[11px] text-[#667085]">
                      Please sign in with your enterprise credentials.
                    </p>
                  </div>
                  <div className="border-t border-[#E8EAF0] pt-2">
                    <button
                      onClick={handleNavigateSignIn}
                      className="w-full flex items-center justify-center gap-2 h-9 rounded-lg bg-[#6246EA] hover:bg-[#5338D6] text-white text-[13px] font-medium transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Sign In</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sign Out Confirmation Modal Dialog */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#171923]/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-xl modal-shadow border border-[#E8EAF0] w-full max-w-sm p-6 space-y-5 animate-in zoom-in-95">
            <div className="text-center space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] border border-[#FAD2D8] flex items-center justify-center mx-auto text-[#D93649]">
                <LogOut className="w-5 h-5" />
              </div>
              <h3 className="text-[16px] font-semibold text-[#171923]">
                Confirm Sign Out
              </h3>
              <p className="text-[13px] text-[#667085] leading-relaxed">
                Are you sure you want to sign out? Your current session and portal access will be closed.
              </p>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 h-9 rounded-lg border border-[#E8EAF0] bg-white hover:bg-[#F7F8FA] text-[#171923] font-medium text-[13px] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSignOut}
                className="flex-1 h-9 rounded-lg bg-[#D93649] hover:bg-[#C02F1A] text-white font-medium text-[13px] transition-colors shadow-xs"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
