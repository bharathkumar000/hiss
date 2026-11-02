"use client";

import React, { useState } from "react";
import {
  Sliders,
  Shield,
  Bell,
  Cpu,
  Key,
  Database,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function SettingsView() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    nlpSensitivity: 75,
    autoCoordination: true,
    emailAlerts: true,
    slaAlertDays: 3,
    apiEndpoint: "https://api.aicte-india.org/synapse/v2",
    auditRetention: "7 Years (Statutory)",
    selectedLLM: "Bi-Encoder + RoBERTa Fine-Tuned (Local Cluster)",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
            <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-[26px] font-medium text-[#171923] tracking-tight leading-tight">
                  Platform Configuration & Regulatory Governance
                </h1>
                  <p className="text-[13px] text-[#667085] leading-relaxed">
                    Configure cross-bureau overlap sensitivity, automated SLA escalations, and AICTE cluster parameters.
                  </p>
              </div>
              {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8F8F2] text-[#078B68] text-[12px] font-medium border border-[#D1F0E4]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: AI Overlap Engine Parameters */}
        <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3.5 border-b border-[#E8EAF0]">
            <Cpu className="w-4 h-4 text-[#6246EA]" />
            <h2 className="text-[13px] font-semibold text-[#171923] uppercase tracking-wide">
              AI Engine & Matching Thresholds
            </h2>
          </div>

          <div className="space-y-5 text-[13px]">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-medium text-[#171923]">
                  Cross-Bureau Semantic Conflict Threshold
                </span>
                <span className="font-mono font-medium text-[#6246EA] tabular-nums">
                  {settings.nlpSensitivity}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={settings.nlpSensitivity}
                onChange={(e) =>
                  setSettings({ ...settings, nlpSensitivity: Number(e.target.value) })
                }
                className="w-full accent-[#6246EA] cursor-pointer"
              />
              <p className="text-[12px] text-[#667085] mt-1.5">
                Higher sensitivity reduces false positives; lower sensitivity flags potential early-stage conflicts.
              </p>
            </div>

            <div>
              <label className="font-medium text-[#171923] block mb-1.5">
                Active Embedding Model Architecture:
              </label>
              <select
                value={settings.selectedLLM}
                onChange={(e) =>
                  setSettings({ ...settings, selectedLLM: e.target.value })
                }
                className="w-full h-10 px-3 bg-[#F7F8FA] border border-[#E8EAF0] rounded-lg text-[13px] text-[#171923] focus:outline-none focus:border-[#6246EA] transition-colors"
              >
                <option value="Bi-Encoder + RoBERTa Fine-Tuned (Local Cluster)">
                  Bi-Encoder + RoBERTa Fine-Tuned (Local Cluster IND-01)
                </option>
                <option value="BERT Multilingual + Entity Graph Disambiguation">
                  BERT Multilingual + Entity Graph Disambiguation
                </option>
                <option value="Symbolic Rule Engine Only (Deterministic)">
                  Symbolic Rule Engine Only (Deterministic)
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Automated Inter-Bureau Workflows */}
        <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3.5 border-b border-[#E8EAF0]">
            <Sliders className="w-4 h-4 text-[#6246EA]" />
            <h2 className="text-[13px] font-semibold text-[#171923] uppercase tracking-wide">
              Conciliation & Statutory SLA Automations
            </h2>
          </div>

          <div className="space-y-3 text-[13px]">
            <label className="flex items-center justify-between p-3.5 rounded-lg bg-[#F7F8FA] border border-[#E8EAF0] cursor-pointer hover:bg-[#F0F1F4] transition-colors">
              <div>
                <p className="font-medium text-[#171923]">
                  Auto-Launch Inter-Bureau Coordination
                </p>
                <p className="text-[#667085] text-[12px] mt-0.5">
                  Automatically draft conciliation threads when overlap score exceeds 90%.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoCoordination}
                onChange={(e) =>
                  setSettings({ ...settings, autoCoordination: e.target.checked })
                }
                className="w-4 h-4 accent-[#6246EA] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-lg bg-[#F7F8FA] border border-[#E8EAF0] cursor-pointer hover:bg-[#F0F1F4] transition-colors">
              <div>
                <p className="font-medium text-[#171923]">
                  Statutory SLA Breach Notifications
                </p>
                <p className="text-[#667085] text-[12px] mt-0.5">
                  Send high-priority alerts to nodal officers when case due date is within {settings.slaAlertDays} days.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={(e) =>
                  setSettings({ ...settings, emailAlerts: e.target.checked })
                }
                className="w-4 h-4 accent-[#6246EA] cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="h-9 px-4 rounded-lg font-medium bg-[#6246EA] hover:bg-[#5338D6] text-white transition-colors flex items-center gap-2 text-[13px] shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
