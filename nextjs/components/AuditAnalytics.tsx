"use client";

import React, { useState } from "react";
import { AuditLogItem } from "../lib/data";
import {
  History,
  ShieldCheck,
  TrendingUp,
  BarChart2,
  Calendar,
  Filter,
  Download,
  CheckCircle,
  FileText,
  Lock,
} from "lucide-react";

interface AuditAnalyticsProps {
  auditLogs: AuditLogItem[];
}

export default function AuditAnalytics({ auditLogs }: AuditAnalyticsProps) {
  const [filterPeriod, setFilterPeriod] = useState("30d");
  const [selectedBureau, setSelectedBureau] = useState("ALL");

  const bureauMetrics = [
    { name: "Admissions Bureau", activeCases: 2, resolvedRate: "94%", avgDays: 4.2 },
    { name: "Approval Bureau", activeCases: 2, resolvedRate: "98%", avgDays: 6.8 },
    { name: "Examinations Bureau", activeCases: 1, resolvedRate: "91%", avgDays: 3.5 },
    { name: "Vigilance Bureau", activeCases: 1, resolvedRate: "100%", avgDays: 5.1 },
    { name: "Grievance Cell", activeCases: 1, resolvedRate: "88%", avgDays: 7.4 },
    { name: "Research & Grants", activeCases: 1, resolvedRate: "96%", avgDays: 8.0 },
  ];

  const filteredLogs = auditLogs.filter(
    (l) => selectedBureau === "ALL" || l.bureau.includes(selectedBureau)
  );

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
          <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-[26px] font-medium text-[#171923] tracking-tight leading-tight">
                    Regulatory Audit & Intelligence Analytics
                  </h1>
                    <span className="font-mono text-[11px] text-[#078B68] bg-[#E8F8F2] px-2 py-0.5 rounded-md border border-[#D1F0E4] font-medium">
                      SHA-256 Provenance
                    </span>
                  </div>
                    <p className="text-[13px] text-[#667085] leading-relaxed">
                      Inter-bureau compliance performance, resolution throughput, and cryptographic audit ledger.
                    </p>
                  </div>

                      <div className="flex items-center gap-2.5">
          <div className="flex bg-[#F7F8FA] p-1 rounded-lg border border-[#E8EAF0] text-xs">
            {["7d", "30d", "90d", "1y"].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPeriod(p)}
                className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors ${
                  filterPeriod === p
                    ? "bg-white text-[#171923] shadow-xs"
                    : "text-[#667085] hover:text-[#171923]"
                }`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert("Audit ledger exported as verified CSV report.")}
            className="h-9 px-4 rounded-lg text-[13px] font-medium bg-white hover:bg-[#F7F8FA] border border-[#E8EAF0] text-[#171923] flex items-center gap-2 transition-colors shadow-xs"
          >
            <Download className="w-4 h-4 text-[#667085]" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Analytical KPI Performance Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-[#E8EAF0] rounded-xl card-shadow space-y-1.5">
          <span className="text-[13px] text-[#667085] font-medium">Collision Prevention Rate</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[26px] font-semibold text-[#078B68] font-mono tabular-nums leading-none">96.4%</span>
            <span className="text-[11px] text-[#078B68] font-medium bg-[#E8F8F2] px-2 py-0.5 rounded-md border border-[#D1F0E4] font-mono">
              +1.8% vs Q2
            </span>
          </div>
          <p className="text-[12px] text-[#98A2B3] pt-0.5">
            Contradictory directives neutralized
          </p>
        </div>

        <div className="p-5 bg-white border border-[#E8EAF0] rounded-xl card-shadow space-y-1.5">
          <span className="text-[13px] text-[#667085] font-medium">Mean Inter-Bureau Turnaround</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[26px] font-semibold text-[#171923] font-mono tabular-nums leading-none">1.8 Days</span>
            <span className="text-[11px] text-[#078B68] font-medium bg-[#E8F8F2] px-2 py-0.5 rounded-md border border-[#D1F0E4] font-mono">
              -0.6d improvement
            </span>
          </div>
          <p className="text-[12px] text-[#98A2B3] pt-0.5">
            From detection to reconciled directive
          </p>
        </div>

        <div className="p-5 bg-white border border-[#E8EAF0] rounded-xl card-shadow space-y-1.5">
          <span className="text-[13px] text-[#667085] font-medium">SLA Adherence Rate</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[26px] font-semibold text-[#171923] font-mono tabular-nums leading-none">94.2%</span>
            <span className="text-[11px] text-[#C88918] font-medium bg-[#FCF8E8] px-2 py-0.5 rounded-md border border-[#F6E8B6] font-mono">
              2 Pending SLA
            </span>
          </div>
          <p className="text-[12px] text-[#98A2B3] pt-0.5">
            Cases resolved within statutory timeline
          </p>
        </div>

        <div className="p-5 bg-white border border-[#E8EAF0] rounded-xl card-shadow space-y-1.5">
          <span className="text-[13px] text-[#667085] font-medium">Ledger Audit Consensus</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[26px] font-semibold text-[#6246EA] font-mono tabular-nums leading-none">100%</span>
            <span className="text-[11px] text-[#6246EA] font-medium bg-[#F3F0FF] px-2 py-0.5 rounded-md border border-[#E8EAF0] font-mono">
              SHA-256 Valid
            </span>
          </div>
          <p className="text-[12px] text-[#98A2B3] pt-0.5">
            Zero tamper anomalies detected
          </p>
        </div>
      </div>

      {/* Bureau Throughput Benchmark */}
      <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow overflow-hidden">
        <div className="p-5 border-b border-[#E8EAF0] flex items-center justify-between">
          <h2 className="text-[13px] font-semibold text-[#171923] uppercase tracking-wide">
            Bureau Regulatory Throughput & Compliance Matrix
          </h2>
          <span className="text-[11px] text-[#98A2B3] font-mono">
            Rolling 30-Day Evaluation
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#F7F8FA] border-b border-[#E8EAF0] text-[11px] font-medium text-[#667085] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 font-medium">AICTE Bureau</th>
                <th className="py-3 px-4 font-medium">Active Docket Cases</th>
                <th className="py-3 px-4 font-medium">Compliance Concordance</th>
                <th className="py-3 px-4 font-medium">Mean Resolution Time</th>
                <th className="py-3 px-4 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAF0]">
              {bureauMetrics.map((b, idx) => (
                <tr key={idx} className="hover:bg-[#F7F8FA] transition-colors">
                  <td className="py-3.5 px-4 font-medium text-[#171923]">
                    {b.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono tabular-nums text-[#171923]">
                    {b.activeCases}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[12px] font-medium text-[#171923] tabular-nums">{b.resolvedRate}</span>
                      <div className="w-24 bg-[#F7F8FA] border border-[#E8EAF0] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#078B68] h-full rounded-full"
                          style={{ width: b.resolvedRate }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono tabular-nums text-[#667085]">
                    {b.avgDays} days
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[10px] font-medium text-[#078B68] bg-[#E8F8F2] px-2 py-0.5 rounded-md border border-[#D1F0E4] font-mono">
                      Operational
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Immutable SHA-256 Audit Ledger Table */}
      <div className="bg-white border border-[#E8EAF0] rounded-xl card-shadow overflow-hidden">
        <div className="p-5 border-b border-[#E8EAF0] flex items-center justify-between">
          <div>
            <h2 className="text-[13px] font-semibold text-[#171923] flex items-center gap-2 uppercase tracking-wide">
              <History className="w-4 h-4 text-[#6246EA]" />
              Immutable Regulatory Audit Trail
            </h2>
            <p className="text-[12px] text-[#98A2B3] mt-0.5">
              Cryptographically chained SHA-256 ledger recording every cross-bureau intervention.
            </p>
          </div>
          <span className="text-[10px] font-mono font-medium text-[#078B68] bg-[#E8F8F2] px-2 py-0.5 rounded-md border border-[#D1F0E4]">
            Tamper-Proof
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#F7F8FA] border-b border-[#E8EAF0] text-[11px] font-medium text-[#667085] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 font-medium">Timestamp</th>
                <th className="py-3 px-4 font-medium">Actor & Role</th>
                <th className="py-3 px-4 font-medium">Intervention Description</th>
                <th className="py-3 px-4 font-medium">Target Entity</th>
                <th className="py-3 px-4 font-medium">Origin Bureau</th>
                <th className="py-3 px-4 font-mono text-right font-medium">Verification Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAF0]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F7F8FA] transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[12px] text-[#667085] tabular-nums">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-[#171923] block leading-tight">{log.actor}</span>
                    <span className="text-[11px] text-[#98A2B3]">{log.role}</span>
                  </td>
                  <td className="py-3.5 px-4 font-normal text-[#171923]">
                    {log.action}
                  </td>
                  <td className="py-3.5 px-4 text-[#667085]">
                    {log.target}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[11px] font-medium bg-[#F7F8FA] border border-[#E8EAF0] px-2 py-0.5 rounded-md text-[#667085]">
                      {log.bureau}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[12px] text-[#078B68] font-medium text-right tabular-nums">
                    {log.hash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
