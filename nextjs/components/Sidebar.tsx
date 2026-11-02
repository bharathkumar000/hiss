"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Layers,
  Sparkles,
  Users,
  ShieldCheck,
  Search,
  Settings,
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingOverlapsCount: number;
  onSearchClick: () => void;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  pendingOverlapsCount,
  onSearchClick,
  onSettingsClick,
  onHelpClick,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const mainNavItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "institutions", label: "Institutions", icon: Building2 },
    { id: "cases", label: "Case Registry", icon: Layers },
    {
      id: "overlaps",
      label: "AI Overlap Engine",
      icon: Sparkles,
      badge: pendingOverlapsCount > 0 ? pendingOverlapsCount : undefined,
    },
    { id: "coordination", label: "Coordination Hub", icon: Users },
    { id: "audit", label: "Audit & Analytics", icon: ShieldCheck },
  ];

  const bottomNavItems = [
    { id: "search", label: "Search", icon: Search, onClick: onSearchClick, shortcut: "⌘K" },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      onClick: onSettingsClick || (() => setActiveTab("settings")),
    },
    {
      id: "help",
      label: "Help & Docs",
      icon: HelpCircle,
      onClick: onHelpClick || (() => setActiveTab("help")),
    },
  ];

  return (
    <aside
      className={`bg-white border-r border-[#E8EAF0] flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none transition-all duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Brand Header (56px) */}
        <div className="h-14 px-4 border-b border-[#E8EAF0] flex items-center justify-between">
          {!collapsed ? (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#6246EA] flex items-center justify-center text-white font-medium text-xs shadow-xs shrink-0">
                S
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[13px] text-[#171923] tracking-tight leading-none">
                    SYNAPSE
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-medium text-[#6246EA] bg-[#F3F0FF] rounded-md leading-none border border-[#E8EAF0]">
                    v2.4
                  </span>
                </div>
                <span className="text-[11px] text-[#98A2B3] leading-none mt-1 truncate">
                  AICTE Intelligence
                </span>
              </div>
            </div>
          ) : (
            <div className="w-7 h-7 mx-auto rounded-lg bg-[#6246EA] flex items-center justify-center text-white font-medium text-xs shadow-xs">
              S
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md text-[#98A2B3] hover:text-[#171923] hover:bg-[#F7F8FA] transition-colors shrink-0"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="p-2.5 space-y-1">
          {!collapsed && (
            <div className="px-3 pt-2 pb-1 text-[11px] font-medium text-[#98A2B3] uppercase tracking-wider">
              Navigation
            </div>
          )}

          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-colors relative group ${
                  isActive
                    ? "bg-[#F3F0FF] text-[#6246EA] font-medium"
                    : "text-[#667085] hover:text-[#171923] hover:bg-[#F7F8FA] font-normal"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-[#6246EA]" : "text-[#667085] group-hover:text-[#171923]"
                    }`}
                  />
                  {!collapsed && (
                    <span className="truncate leading-none">{item.label}</span>
                  )}
                </div>

                {!collapsed && item.badge !== undefined && (
                  <span
                    className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-[#6246EA] text-white"
                        : "bg-[#FDF2F4] text-[#D93649] border border-[#FAD2D8]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {collapsed && item.badge !== undefined && (
                  <span className="w-2 h-2 rounded-full bg-[#D93649] absolute right-2 top-2.5 ring-2 ring-white" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Nav: Search, Settings, Help & Cluster Status */}
      <div className="p-2.5 border-t border-[#E8EAF0] space-y-1">
        {!collapsed && (
          <div className="px-3 pt-1 pb-1 text-[11px] font-medium text-[#98A2B3] uppercase tracking-wider">
            System
          </div>
        )}

        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-colors group ${
                isActive
                  ? "bg-[#F3F0FF] text-[#6246EA] font-medium"
                  : "text-[#667085] hover:text-[#171923] hover:bg-[#F7F8FA] font-normal"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? "text-[#6246EA]" : "text-[#667085] group-hover:text-[#171923]"
                  }`}
                />
                {!collapsed && (
                  <span className="truncate leading-none">{item.label}</span>
                )}
              </div>

              {!collapsed && item.shortcut && (
                <kbd className="text-[10px] font-mono text-[#98A2B3] bg-[#F7F8FA] px-1.5 py-0.5 rounded border border-[#E8EAF0]">
                  {item.shortcut}
                </kbd>
              )}
            </button>
          );
        })}

        {/* Server Status Indicator */}
        {!collapsed ? (
          <div className="mt-2 pt-2.5 px-3 pb-1 border-t border-[#E8EAF0] flex items-center justify-between text-[11px] text-[#667085]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#078B68]" />
              <span className="font-mono text-[11px] text-[#171923] font-medium">IND-CENTRAL-01</span>
            </div>
            <span className="text-[11px] text-[#078B68] font-medium">Operational</span>
          </div>
        ) : (
          <div className="flex justify-center pt-2">
            <span className="w-2 h-2 rounded-full bg-[#078B68]" title="IND-CENTRAL-01 Operational" />
          </div>
        )}
      </div>
    </aside>
  );
}
